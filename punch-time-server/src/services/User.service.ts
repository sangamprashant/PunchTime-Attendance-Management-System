// src/services/User.service.ts
import { ENV } from "../_env";
import { IUser } from "../models/User.model";
import * as UserRepository from "../repositories/User.repository";
import jwt from "jsonwebtoken";

export const createAdminIfNotExists = async () => {
  const existing = await UserRepository.findUserByEmail(ENV.ADMIN_EMAIL);
  if (!existing) {
    await UserRepository.createUser({
      name: "Admin",
      email: ENV.ADMIN_EMAIL,
      shift: "Morning Shift",
      role: "admin",
      password: ENV.ADMIN_PASSWORD,
    });
    console.log("✅ Admin created");
  } else {
    console.log("ℹ️ Admin exists");
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials. Please check your password.");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials. Please check your password.");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    ENV.JWT_SECRET
  );

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      shift: user.shift,
    },
    token,
  };
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return await UserRepository.getAllUsers();
};
