import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { FORBIDDEN, UNAUTHORIZED } from "@/config/api-messages";
import { requireAdmin } from "@/lib/auth-utils";
import { redis } from "@/lib/redis";
import { CACHE_TTL, IMAGES_ALL_CACHE_KEY } from "@/config/redis";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const isAdmin = await requireAdmin(session);

  if (!session?.user) return UNAUTHORIZED;
  if (!isAdmin) return FORBIDDEN;

  try {
    const { categoryId, caption, url } = await request.json();
    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    // Create image in database
    const newImage = await prisma.image.create({
      data: {
        url: url,
        caption: caption || "",
        categoryId: categoryId,
      },
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        action: "GALLARY_CATEGORY_UPDATE",
        userId: session.user.id,
        details: `Added new image to category id : ${categoryId}`,
        metadata: {
          categoryId: categoryId,
          imageId: newImage.id,
          caption: caption || "",
          imageUrl: url,
        },
      },
    });

    // Invalidate Redis cache
    await redis.del(`category:${categoryId}:images`);
    await redis.del(IMAGES_ALL_CACHE_KEY);

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error("Error adding image:", error);
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}



export async function GET(request: Request,{ params }: { params: { categoryId: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '6');
    const { categoryId } = await params;

    // Validate categoryId
    if (!categoryId || typeof categoryId !== 'string' || !/^[a-zA-Z0-9-]+$/.test(categoryId)) {
      return NextResponse.json(
        { error: 'Invalid category ID format' },
        { status: 400 }
      );
    }

    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!categoryExists) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const cacheKey = `images:category:${categoryId}:page:${page}:perPage:${perPage}`;

    // Check Redis cache first
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData));
    }

    const skip = (page - 1) * perPage;

    const [images, totalCount] = await prisma.$transaction([
      prisma.image.findMany({
        where: { categoryId },
        include: {
          category: {
            select: {
              id: true,
              title: true,
              location: true,
              description: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: perPage
      }),
      prisma.image.count({ where: { categoryId } })
    ]);

    const totalPages = Math.ceil(totalCount / perPage);

    const responseData = {
      images,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        perPage,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };

    // Cache the response
    await redis.set(cacheKey, JSON.stringify(responseData), 'EX', CACHE_TTL);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching category images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category images' },
      { status: 500 }
    );
  }
}
