import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Validate that only "approved" param is present
    const allowedParams = ["approved"];
    for (const param of searchParams.keys()) {
      if (!allowedParams.includes(param)) {
        return NextResponse.json(
          {
            error: `Invalid query parameter: ${param}. Only 'approved' is allowed.`,
          },
          { status: 400 }
        );
      }
    }

    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === "admin";

    const approvedOnly = searchParams.get("approved")?.toLowerCase() === "true";
    const testimonials = await prisma.testimonial.findMany({
      where: { approved: approvedOnly },
      orderBy: { createdAt: "desc" },
      take: isAdmin ? undefined : 6, // Limit to 6 if not admin
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

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
