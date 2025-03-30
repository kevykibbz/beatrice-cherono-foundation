import { ITestimonial } from "@/types/types";
import mongoose, { Schema } from "mongoose";


const TestimonialSchema = new Schema<ITestimonial>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    role: { type: String, required: true },
    testimonial: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Check if model already exists
let TestimonialModel: mongoose.Model<ITestimonial>;

try {
  TestimonialModel = mongoose.model<ITestimonial>("Testimonial");
} catch {
  TestimonialModel = mongoose.model<ITestimonial>(
    "Testimonial",
    TestimonialSchema
  );
}

export default TestimonialModel;
