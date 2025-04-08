import { FORBIDDEN, UNAUTHORIZED } from "@/config/api-messages";
import { CATEGORIES_CACHE_KEY } from "@/config/redis";
import { authOptions } from "@/lib/auth";
import { requireAdmin } from "@/lib/auth-utils";
import cloudinary from "@/lib/cloudinary-server";
import { prisma } from "@/lib/db";
import { extractPublicId } from "@/lib/extractPublicId";
import { redis } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function DELETE(req: Request) {
  try {
    // Authentication and authorization
    const session = await getServerSession(authOptions);
    if (!session?.user) return UNAUTHORIZED;

    const { allowed } = await requireAdmin(session);
    if (!allowed) return FORBIDDEN;

    // Validate input
    const url = new URL(req.url);
    const imageId = url.searchParams.get("imageId");
    if (!imageId) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    // Transaction for atomic operations
    const deletedImage = await prisma.$transaction(async (tx) => {
      // 1. Get image details
      const image = await tx.carouselImage.findUnique({
        where: { id: imageId },
        select: { id: true, title: true, imageUrl: true },
      });

      if (!image) {
        throw new Error("Image not found");
      }

      // 2. Extract Cloudinary public ID
      const publicId = extractPublicId(image.imageUrl);
      if (!publicId) {
        throw new Error("Invalid image URL");
      }

      // 3. Delete from Cloudinary
      const cloudinaryResult = await cloudinary.uploader.destroy(publicId);
      if (cloudinaryResult.result !== "ok") {
        throw new Error("Cloudinary deletion failed");
      }

      // 4. Delete from database
      await tx.carouselImage.delete({ where: { id: imageId } });

      return image;
    });

    // 5. Parallel operations after transaction
    await Promise.all([
      // Activity log
      prisma.activity.create({
        data: {
          userId: session.user.id,
          action: "GALLERY_DELETE",
          details: `Deleted carousel image: ${deletedImage.title}`,
          metadata: {
            imageId: deletedImage.id,
            imageUrl: deletedImage.imageUrl,
          },
        },
      }),
      // Cache invalidation
      redis.del(CATEGORIES_CACHE_KEY),
      redis.del(`image:${deletedImage.id}`),
    ]);

    return NextResponse.json(
      { 
        success: true, 
        message: "Image deleted successfully",
        deletedId: deletedImage.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Carousel DELETE error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Deletion failed",
        ...(process.env.NODE_ENV === "development" && error instanceof Error
          ? { stack: error.stack }
          : {}),
      },
      { status: 500 }
    );
  }
}