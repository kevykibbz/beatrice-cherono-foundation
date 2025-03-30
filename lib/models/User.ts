import { IUser } from "@/types/types";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

let UserModel: mongoose.Model<IUser>;

try {
  UserModel = mongoose.model<IUser>("User");
} catch {
  const UserSchema = new mongoose.Schema<IUser>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true, select: false },
      provider: {
        type: String,
        required: true,
        enum: ["google", "credentials"],
        default: "credentials",
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      image: { type: String, required: false },
    },
    { timestamps: true }
  );

  // Hash password before saving
  UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error('Unknown error occurred during password hashing'));
      }
    }
  });

  UserModel = mongoose.model<IUser>("User", UserSchema);
}

export default UserModel;