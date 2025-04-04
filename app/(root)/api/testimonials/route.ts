import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redis } from "@/lib/redis";

// Cache configuration
const TESTIMONIALS_CACHE_PREFIX = "testimonials";
const CACHE_TTL = 300; // 5 minutes in seconds

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Validate query parameters
    const approvedParam = searchParams.get("approved");
    if (searchParams.size > 0 && !approvedParam) {
      return NextResponse.json(
        { error: "Invalid query parameters. Only 'approved' is allowed." },
        { status: 400 }
      );
    }

    // Check session and permissions
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === "admin";
    const approvedOnly = approvedParam?.toLowerCase() === "true";

    // Generate cache key based on query and permissions
    const cacheKey = `${TESTIMONIALS_CACHE_PREFIX}:${
      approvedOnly ? "approved" : "all"
    }:${isAdmin ? "admin" : "public"}`;

    // Try to get from cache first

    const cachedTestimonials = await redis.get(cacheKey);
    if (cachedTestimonials) {
      return NextResponse.json(JSON.parse(cachedTestimonials));
    }

    // Fetch from database if not in cache
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        AND: [
          ...(approvedOnly ? [{ approved: true }] : []),
          { userId: { not: undefined } } 
        ]
      },
      take: isAdmin ? undefined : 6,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
      },

    });


    // Cache the result
    await redis.set(cacheKey, JSON.stringify(testimonials), "EX", CACHE_TTL);
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch testimonials",
        ...(process.env.NODE_ENV === "development" && {
          details: error instanceof Error ? error.message : undefined,
        }),
      },
      { status: 500 }
    );
  }
}
