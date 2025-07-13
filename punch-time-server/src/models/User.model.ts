// src/models/User.model.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { Role, Shifts } from "../types/common";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  shift: Shifts;
  role: Role;
  todayLogIn?: string;
  profileImage?: string;
  officeBranch?: mongoose.Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // ✅ password field
  shift: {
    type: String,
    enum: ["Morning Shift", "Evening Shift", "Night Shift"],
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "employee"],
    default: "employee",
  },
  todayLogIn: String,
  profileImage: String,
  officeBranch: { type: Schema.Types.ObjectId, ref: "OfficeBranch" },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<IUser>("User", UserSchema);
