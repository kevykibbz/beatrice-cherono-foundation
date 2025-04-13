import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ActivityType } from "@prisma/client";
import { redis } from "@/lib/redis";
import { ADMIN_TESTIMONIALS_CACHE_KEY } from "@/config/redis";
import { FORBIDDEN, UNAUTHORIZED } from "@/config/api-messages";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    // First await the session
    const session = await getServerSession(authOptions);

    if (!session?.user) return UNAUTHORIZED

    // Check if user is admin
    if (session.user.role !== "admin") return FORBIDDEN

    // Destructure params after awaiting session
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    // Get testimonial before deleting for activity log
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!testimonial) {
      return NextResponse.json(
        { message: "Testimonial not found" },
        { status: 404 }
      );
    }

    // Delete testimonial
    await prisma.testimonial.delete({
      where: { id },
    });

    // Get IP address
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Log activity
    await prisma.activity.create({
      data: {
        userId: session.user.id,
        action: ActivityType.TESTIMONIAL_DELETE,
        details: `Deleted testimonial from ${testimonial.user.name}`,
        metadata: {
          testimonialId: testimonial.id,
          userName: testimonial.user.name,
          role: testimonial.role,
          ipAddress,
        },
      },
    });

    // Invalidate Redis cache
    await redis.del(ADMIN_TESTIMONIALS_CACHE_KEY);

    return NextResponse.json(
      { message: "Testimonial deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      {
        message: "Error deleting testimonial",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

