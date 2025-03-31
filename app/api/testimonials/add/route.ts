import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import TestimonialModel from "@/lib/models/Testimonials";
import connectToDB from "@/lib/db";
import { ActivityLogger } from "@/services/activity.service";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to submit a testimonial" },
        { status: 401 }
      );
    }

    const { role, testimonial } = await request.json();

    // Check for existing testimonial from this user
    const existingTestimonial = await TestimonialModel.findOne({
      user: session.user.id,
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
    const isAdmin = session.user.role === 'admin';
    const newTestimonial = await TestimonialModel.create({
      user: session.user.id,
      role,
      testimonial,
      approved:isAdmin
    });

    await ActivityLogger.logTestimonialAdd(
      session.user.id,
      newTestimonial._id.toString(),
      request
    );
    
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error("Testimonial submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}
