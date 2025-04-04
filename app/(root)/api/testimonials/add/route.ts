import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redis } from "@/lib/redis";

// Cache configuration (should match GET endpoint)
const TESTIMONIALS_CACHE_PREFIX = "testimonials";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to submit a testimonial" },
        { status: 401 }
      );
    }

    const { role, testimonial } = await request.json();
    const isAdmin = session.user.role === "admin";

    // Check for existing testimonial from this user
    const existingTestimonial = await prisma.testimonial.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (existingTestimonial) {
      return NextResponse.json(
        {
          error: "DUPLICATE_TESTIMONIAL",
          message: "You have already submitted a testimonial",
        },
        { status: 400 }
      );
    }

    // Create new testimonial in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const newTestimonial = await tx.testimonial.create({
        data: {
          userId: session.user.id,
          role,
          testimonial,
          approved: isAdmin, // Auto-approve if admin
        },
      });

      await tx.activity.create({
        data: {
          userId: session.user.id,
          action: "TESTIMONIAL_ADD",
          details: `Created testimonial: ${testimonial}`,
          metadata: {
            testimonialId: newTestimonial.id,
            testimonial,
          },
        },
      });

      return newTestimonial;
    });

    // Clear all testimonial cache variants
    const cacheKeys = await redis.keys(`${TESTIMONIALS_CACHE_PREFIX}:*`);
    if (cacheKeys.length > 0) {
      await redis.del(cacheKeys);
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Testimonial submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}
