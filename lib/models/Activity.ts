import { IUser } from "@/types/types";
import mongoose, { Document, Schema } from "mongoose";

// Define all possible activity types
export const ActivityTypes = {
  LOGIN: "user:login",
  LOGOUT: "user:logout",
  TESTIMONIAL_ADD: "testimonial:add",
  TESTIMONIAL_APPROVE: "testimonial:approve",
  TESTIMONIAL_DELETE: "testimonial:delete",
  TEAM_MEMBER_ADD: "team:add",
  GALLERY_UPLOAD: "gallery:upload",
  // Add more as needed...
} as const;

export type ActivityType = keyof typeof ActivityTypes;

export interface ActivityDocument extends Document {
  user: mongoose.Types.ObjectId | IUser; 
  action: typeof ActivityTypes[ActivityType]; // "user:login", etc.
  details: string; // Human-readable description
  metadata?: {
    // Additional context (e.g., testimonial ID)
    testimonialId?: string;
    ipAddress?: string;
    userAgent?: string;
  };
  createdAt: Date;
}

const ActivitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true, enum: Object.values(ActivityTypes) },
    details: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true } // Auto-adds createdAt/updatedAt
);

// Indexes for faster queries
ActivitySchema.index({ user: 1 });
ActivitySchema.index({ action: 1 });
ActivitySchema.index({ createdAt: -1 });

export const ActivityModel =
  mongoose.models.Activity ||
  mongoose.model<ActivityDocument>("Activity", ActivitySchema);