import { FORBIDDEN, UNAUTHORIZED } from "@/config/api-messages";
import { CATEGORIES_CACHE_KEY } from "@/config/redis";
import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary-server";
import { prisma } from "@/lib/db";
import { extractPublicId } from "@/lib/extractPublicId";
import { redis } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; imageId: string } }
) {
  try {
    // 1. Authentication and authorization
    const session = await getServerSession(authOptions);
    if (!session?.user) return UNAUTHORIZED;
    if (session?.user.role !== "admin") return FORBIDDEN;

    const { categoryId, imageId } = await params;

    // 2. Validate inputs
    if (!imageId || !categoryId) {
      return NextResponse.json(
        { error: "Both imageId and categoryId are required" },
        { status: 400 }
      );
    }

    // 3. Verify category exists first (outside transaction)
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });
    if (!categoryExists) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // 4. Get image details (outside transaction)
    const image = await prisma.image.findUnique({
      where: {
        id: imageId,
        categoryId: categoryId,
      },
      select: {
        id: true,
        url: true,
        category: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!image) {
      return NextResponse.json(
        { error: "Image not found in specified category" },
        { status: 404 }
      );
    }

    // Extract and validate Cloudinary public ID
    const publicId = extractPublicId(image.url);
    if (!publicId) {
      return NextResponse.json(
        { error: "Invalid image URL format" },
        { status: 400 }
      );
    }

    // 5. Delete from Cloudinary first
    const cloudinaryResult = await cloudinary.uploader.destroy(publicId);
    if (cloudinaryResult.result !== "ok") {
      throw new Error("Failed to delete image from Cloudinary");
    }

    // 6. Database operations (without transaction)
    await prisma.image.delete({
      where: { id: imageId },
    });

    // 7. Post-deletion operations
    await Promise.all([
      // Activity log
      prisma.activity.create({
        data: {
          userId: session.user.id,
          action: "GALLERY_DELETE",
          details: `Deleted image ${image.id} from category ${image.category.title}`,
          metadata: {
            imageId: image.id,
            imageUrl: image.url,
            categoryId: categoryId,
          },
        },
      }),
      // Cache invalidation
      (async () => {
        const keys = await redis.keys(`${CATEGORIES_CACHE_KEY}:*`);
        if (keys.length > 0) await redis.del(keys);
      })(),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Image deleted successfully",
        deletedId: image.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Deletion failed",
        ...(process.env.NODE_ENV === "development"
          ? {
              stack: error instanceof Error ? error.stack : undefined,
              details: error instanceof Error ? error.message : String(error),
            }
          : {}),
      },
      { status: 500 }
    );
  }
}