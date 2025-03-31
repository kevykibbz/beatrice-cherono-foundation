import mongoose from "mongoose";

export type PermissionType = {
  name: string;
  description: string;
  resource: string;
  action: "create" | "read" | "update" | "delete" | "manage";
};

export type PermissionDocument = mongoose.Document & PermissionType;

const PermissionSchema = new mongoose.Schema<PermissionDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    resource: { type: String, required: true }, 
    action: { 
      type: String, 
      required: true,
      enum: ["create", "read", "update", "delete", "manage"]
    }
  },
  { timestamps: true }
);

export const PermissionModel = mongoose.models.Permission || mongoose.model<PermissionDocument>("Permission", PermissionSchema);