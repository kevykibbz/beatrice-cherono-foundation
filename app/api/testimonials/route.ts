import { NextResponse } from "next/server";
import {UserModel,TestimonialModel} from "@/lib/models";
import connectToDB from "@/lib/db";

export async function GET(request: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const approvedOnly = searchParams.get("approved") !== "false";

    const testimonials = await TestimonialModel.find(
      approvedOnly ? { approved: true } : {}
    )
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "name email image role",
        model: UserModel, 
      })
      .exec();

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
