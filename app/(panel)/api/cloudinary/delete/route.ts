import { authOptions } from "@/lib/auth";
import { requirePermission } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { extractPublicId } from "@/lib/extractPublicId";
import { redis } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Cache keys and TTL
const CAROUSEL_CACHE_KEY = "carousel:images";
const CAROUSEL_TTL = 300; // 5 minutes in seconds

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { allowed, error } = await requirePermission("carousel", "create");
  if (!allowed) {
    return NextResponse.json(
      { error: error?.message || "Forbidden" },
      { status: error?.status || 403 }
    );
  }

  const { title, description, imageUrl } = await req.json();
  if (!title || !description || !imageUrl) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true } // Only select needed fields
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const image = await prisma.carouselImage.create({
      data: {
        title,
        description,
        imageUrl,
        userId: user.id,
      },
    });

    await Promise.all([
      prisma.activity.create({
        data: {
          userId: session.user.id,
          action: "GALLERY_CREATE",
          details: `Created carousel image: ${image.title}`,
          metadata: {
            imageId: image.id,
            imageUrl: image.imageUrl,
          },
        },
      }),
      redis.del(CAROUSEL_CACHE_KEY) // Invalidate cache
    ]);

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("Error creating carousel image:", error);
    return NextResponse.json(
      { error: "Failed to create carousel image" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Try to get from cache first
    const cachedImages = await redis.get(CAROUSEL_CACHE_KEY);
    if (cachedImages) {
      return NextResponse.json(JSON.parse(cachedImages));
    }

    // If not in cache, fetch from database
    const images = await prisma.carouselImage.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Cache the result
    await redis.set(
      CAROUSEL_CACHE_KEY,
      JSON.stringify(images),
      "EX",
      CAROUSEL_TTL
    );

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized", }, { status: 401 });
  }

  // Check permissions
  const { allowed, error } = await requirePermission("carousel", "delete");
  if (!allowed) {
    return NextResponse.json(
      { error: error?.message || "Forbidden" },
      { status: error?.status || 403 }
    );
  }

  try {
    // Extract image ID from request URL
    const url = new URL(req.url);
    const imageId = url.searchParams.get("id");

    if (!imageId) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    const image = await prisma.carouselImage.findUnique({
      where: { id: imageId },
      select: { id: true, title: true, imageUrl: true } // Only select needed fields
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const publicId = extractPublicId(image.imageUrl);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;

    const deleteResponse = await fetch(`${baseUrl}/api/cloudinary/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      throw new Error(
        errorData.error || "Failed to delete image from Cloudinary"
      );
    }

    await Promise.all([
      prisma.carouselImage.delete({
        where: { id: imageId },
      }),
      prisma.activity.create({
        data: {
          userId: session.user.id,
          action: "GALLERY_DELETE",
          details: `Deleted carousel image: ${image.title}`,
          metadata: {
            imageId: image.id,
            imageUrl: image.imageUrl,
          },
        },
      }),
      redis.del(CAROUSEL_CACHE_KEY) // Invalidate cache
    ]);

    return NextResponse.json(
      { success: true, message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error 
          ? error.message 
          : "Failed to delete image",
        details: process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.stack
            : null
          : undefined,
      },
      { status: 500 }
    );
  }
}