import { authOptions } from "@/lib/auth";
import { requirePermission } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { extractPublicId } from "@/lib/extractPublicId";
import { redis } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { FORBIDDEN, UNAUTHORIZED } from "@/config/api-messages";
import { CACHE_TTL, CAROUSEL_CACHE_KEY } from "@/config/redis";
import cloudinary from "@/lib/cloudinary-server";



export async function POST(req: Request) {
  try {
    // Authentication and authorization
    const session = await getServerSession(authOptions);
    if (!session?.user) return UNAUTHORIZED;

    const { allowed } = await requirePermission("carousel", "create");
    if (!allowed) return FORBIDDEN;

    // Validate input
    const { title, description, imageUrl } = await req.json();
    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Transaction for atomic operations
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: session.user.id },
        select: { id: true }, // Only select needed field
      });

      if (!user) {
        throw new Error("User not found");
      }

      const image = await tx.carouselImage.create({
        data: {
          title,
          description,
          imageUrl,
          userId: user.id,
        },
      });

      await tx.activity.create({
        data: {
          userId: session.user.id,
          action: "GALLERY_CREATE",
          details: `Created carousel image: ${title}`,
          metadata: {
            imageId: image.id,
            imageUrl,
          },
        },
      });

      return image;
    });

    // Invalidate cache
    await redis.del(CAROUSEL_CACHE_KEY);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Carousel POST error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Operation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Try cache first
    const cached = await redis.get(CAROUSEL_CACHE_KEY);
    if (cached) return NextResponse.json(JSON.parse(cached));

    // Database fallback
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
      CACHE_TTL
    );

    return NextResponse.json(images);
  } catch (error) {
    console.error("Carousel GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch carousel images" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    // Authentication and authorization
    const session = await getServerSession(authOptions);
    if (!session?.user) return UNAUTHORIZED;

    const { allowed } = await requirePermission("carousel", "delete");
    if (!allowed) return FORBIDDEN;

    // Validate input
    const url = new URL(req.url);
    const imageId = url.searchParams.get("id");
    if (!imageId) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    // Define type for the image
    type CarouselImage = {
      id: string;
      title: string;
      imageUrl: string;
    };

    // Transaction for atomic operations
    const image = await prisma.$transaction<CarouselImage | null>(
      async (tx) => {
        const image = await tx.carouselImage.findUnique({
          where: { id: imageId },
          select: { id: true, title: true, imageUrl: true },
        });

        if (!image) {
          throw new Error("Image not found");
        }

        const publicId = extractPublicId(image.imageUrl);

        // Delete directly from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== "ok") {
          throw new Error("Cloudinary deletion failed");
        }

        await tx.carouselImage.delete({ where: { id: imageId } });

        return image;
      }
    );

    if (!image) {
      throw new Error("Image not found after transaction");
    }

    // Create activity log and invalidate cache in parallel
    await Promise.all([
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
      redis.del(CAROUSEL_CACHE_KEY),
    ]);

    return NextResponse.json(
      { success: true, message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Carousel DELETE error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Deletion failed",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.stack
            : undefined,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    // Authentication and authorization
    const session = await getServerSession(authOptions);
    if (!session?.user) return UNAUTHORIZED;

    const { allowed } = await requirePermission("carousel", "update");
    if (!allowed) return FORBIDDEN;

    // Validate input
    const { id, title, description, imageUrl } = await req.json();
    if (!id || !title || !description || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Increase transaction timeout to 10 seconds
    const result = await prisma.$transaction(
      async (tx) => {
        // Check if image exists
        const existingImage = await tx.carouselImage.findUnique({
          where: { id },
        });

        if (!existingImage) {
          throw new Error("Image not found");
        }

        // Update the image first to minimize transaction duration
        const updatedImage = await tx.carouselImage.update({
          where: { id },
          data: {
            title,
            description,
            imageUrl,
            userId: session.user.id,
          },
        });

        // Create activity log within transaction
        await tx.activity.create({
          data: {
            userId: session.user.id,
            action: "GALLERY_UPDATE",
            details: `Updated carousel image: ${title}`,
            metadata: {
              imageId: updatedImage.id,
              oldImageUrl: existingImage.imageUrl,
              newImageUrl: imageUrl,
            },
          },
        });

        return updatedImage;
      },
      {
        maxWait: 10000, // Maximum time to wait for the transaction (10 seconds)
        timeout: 10000, // Maximum time the transaction can run (10 seconds)
      }
    );

    // Handle Cloudinary cleanup outside transaction if image URL changed
    if (result.imageUrl !== imageUrl) {
      try {
        const cloudinaryPublicId = extractPublicId(result.imageUrl);
        await cloudinary.uploader.destroy(cloudinaryPublicId);
      } catch (error) {
        console.error("Failed to delete old image from Cloudinary:", error);
      }
    }

    // Invalidate cache
    await redis.del(CAROUSEL_CACHE_KEY);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Carousel PUT error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2028") {
        return NextResponse.json(
          { error: "Operation timed out. Please try again." },
          { status: 408 } // 408 Request Timeout
        );
      }
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Update failed",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.stack
            : undefined,
      },
      { status: 500 }
    );
  }
}
