import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { FORBIDDEN, UNAUTHORIZED } from "@/config/api-messages";
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { extractPublicId } from "@/lib/extractPublicId";
import { deleteImageFromCloudinary } from "@/lib/cloudinary-server";
import { Types } from "mongoose";
import { CATEGORIES_CACHE_KEY } from "@/config/redis";


export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  // Authentication and Authorization
  if (!session?.user) return UNAUTHORIZED;
  if (session.user.role !== "admin") return FORBIDDEN;

  // Validate input
  const url = new URL(req.url);
  const categoryId = url.pathname.split("/").pop();

  if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
    return NextResponse.json(
      { error: "Invalid or missing Category ID" },
      { status: 400 }
    );
  }

  try {
    // 1. Get category with images
    const categoryWithImages = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { images: true },
    });

    if (!categoryWithImages) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // 2. Delete images from Cloudinary if they exist
    const numImages = categoryWithImages.images.length;

    if (numImages > 0) {
      const deletePromises = categoryWithImages.images.map(async (image) => {
        const publicId = extractPublicId(image.url);
        if (!publicId) {
          console.error(`Invalid image URL: ${image.url}`);
          throw new Error("Invalid image URL");
        }
        return deleteImageFromCloudinary(publicId);
      });

      await Promise.all(deletePromises);
    }

    // 3. Delete from database in transaction
    const deleteImages = async (categoryId: string) => {
      return prisma.image.deleteMany({
        where: { categoryId: categoryId },
      });
    };

    const deleteCategory = async (categoryId: string) => {
      return prisma.category.delete({
        where: { id: categoryId },
      });
    };

    const logActivity = async (
      userId: string,
      categoryId: string,
      numImages: number,
      title: string
    ) => {
      return prisma.activity.create({
        data: {
          userId: userId,
          action: "GALLARY_CATEGORY_DELETE",
          details: `Deleted category: ${title} with images ${numImages}`,
          metadata: {
            categoryId: categoryId,
            imagesDeleted: numImages,
          },
        },
      });
    };

    await deleteImages(categoryId);
    const deletedCategory = await deleteCategory(categoryId);
    await logActivity(
      session.user.id,
      deletedCategory.id,
      categoryWithImages.images.length,
      deletedCategory.title
    );

    // 4. Clear cache
    const keys = await redis.keys(`${CATEGORIES_CACHE_KEY}:*`);
    if (keys.length > 0) await redis.del(keys);

    return NextResponse.json(
      {
        message: "Category and all images deleted successfully",
        data: {
          categoryId: deletedCategory.id,
          imagesDeleted: categoryWithImages.images.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      {
        error: "Failed to delete category",
        details: error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
