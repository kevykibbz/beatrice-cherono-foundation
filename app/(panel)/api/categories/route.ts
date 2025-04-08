import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { FORBIDDEN, UNAUTHORIZED } from "@/config/api-messages";
import { redis } from "@/lib/redis";
import { CACHE_TTL, CATEGORIES_CACHE_KEY } from "@/config/redis";
import { Prisma } from "@prisma/client";


// Helper function to generate cache key with pagination
const getCacheKey = (page: number, limit: number) => `${CATEGORIES_CACHE_KEY}:page_${page}:limit_${limit}`;

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return UNAUTHORIZED;
    if (!session?.user) return FORBIDDEN;

    const { title, location, description } = await request.json();

    const existingCategory = await prisma.category.findUnique({
      where: { title },
    });

    let category;

    if (existingCategory) {
      category = await prisma.category.update({
        where: { title },
        data: {
          location,
          description,
          images: { create: [] },
        },
        include: { images: true },
      });
    } else {
      category = await prisma.category.create({
        data: {
          title,
          location,
          description,
          images: { create: [] },
        },
        include: { images: true },
      });
    }

    await prisma.activity.create({
      data: {
        userId: session.user.id,
        action: existingCategory
          ? "GALLARY_CATEGORY_UPDATE"
          : "GALLARY_CATEGORY_CREATE",
        details: `${existingCategory ? "Updated" : "Created"} image category: ${
          category.title
        }`,
        metadata: {
          categoryId: category.id,
          categoryTitle: category.title,
        },
      },
    });

    const keys = await redis.keys(`${CATEGORIES_CACHE_KEY}:*`);
    if (keys.length > 0) await redis.del(keys);

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create or update category" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "6");
    const skip = (page - 1) * limit;

    const cacheKey = getCacheKey(page, limit);
    const cached = await redis.get(cacheKey);

    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }

    const [categories, totalCount]: [(Prisma.CategoryGetPayload<{ include: { images: true } }>)[],number] = await prisma.$transaction([
      prisma.category.findMany({
        skip,
        take: limit,
        include: {
          images: {
            take: 6,
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { title: "asc" },
      }),
      prisma.category.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const response = {
      data: categories,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage,
        hasPreviousPage,
      },
    };

    await redis.set(cacheKey, JSON.stringify(response), "EX", CACHE_TTL);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}