import { IUser } from "@/types/types";
import mongoose from "mongoose";

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

  UserModel = mongoose.model<IUser>("User", UserSchema);
}

export default UserModel;