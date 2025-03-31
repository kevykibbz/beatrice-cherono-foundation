import { NextRequest } from "next/server";
import connectToDB from "@/lib/db";
import TestimonialModel from "@/lib/models/Testimonials";

export async function GET(request: NextRequest) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const sendData = async () => {
    try {
      await connectToDB();
      const testimonials = await TestimonialModel.find({ approved: true })
        .sort({ createdAt: -1 })
        .populate("user", "name email image role");

      await writer.write(
        new TextEncoder().encode(`data: ${JSON.stringify(testimonials)}\n\n`)
      );
    } catch (error) {
      console.error("Error in sendData:", error);
    }
  };

  // Initial send
  sendData().catch(console.error);

  // Set up interval for periodic updates
  const interval = setInterval(async () => {
    try {
      await writer.closed.catch(() => true);
      await sendData();
    } catch {
      clearInterval(interval);
      return;
    }
  }, 5000);
  // Handle client disconnect
  request.signal.addEventListener("abort", () => {
    clearInterval(interval);
    writer.close().catch(() => {}); // Suppress any close errors
  });

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
