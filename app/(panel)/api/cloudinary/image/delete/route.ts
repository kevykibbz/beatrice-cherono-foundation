import { FORBIDDEN, UNAUTHORIZED } from "@/config/api-messages";
import { authOptions } from "@/lib/auth";
import { requireAdmin } from "@/lib/auth-utils";
import cloudinary from "@/lib/cloudinary-server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = await requireAdmin(session);
    const { publicId } = await request.json();

    if (!session?.user) return UNAUTHORIZED;
    if (!isAdmin) return FORBIDDEN;

    if (!publicId) {
      return NextResponse.json(
        { error: "Public ID is required" },
        { status: 400 }
      );
    }

    
    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return NextResponse.json(
        { error: "Failed to delete image from Cloudinary" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
