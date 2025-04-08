import { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { ADMIN_TESTIMONIALS_CACHE_KEY, CACHE_TTL } from "@/config/redis";
import { FORBIDDEN, UNAUTHORIZED } from "@/config/api-messages";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === Role.admin;


  try {
    // Authentication and authorization
    const session = await getServerSession(authOptions);
    if (!session?.user) return UNAUTHORIZED;
    if (!isAdmin) return FORBIDDEN;

    const cached = await redis.get(ADMIN_TESTIMONIALS_CACHE_KEY);
    if (cached) return NextResponse.json(JSON.parse(cached));

    // Parse query parameters
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 4;
    const approvedOnly = searchParams.get("approved") === "true";
    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      ...(approvedOnly && !isAdmin ? { approved: true } : {}),
    };

    // Get testimonials with user data
    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
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
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.testimonial.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const responsedata = {
      testimonials,
      total,
      page,
      limit,
      totalPages,
    };
    // Cache the result
    await redis.set(
      ADMIN_TESTIMONIALS_CACHE_KEY,
      JSON.stringify(responsedata),
      "EX",
      CACHE_TTL
    );
    return NextResponse.json(responsedata, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Internaresl server error" },
      { status: 500 }
    );
  }
}
