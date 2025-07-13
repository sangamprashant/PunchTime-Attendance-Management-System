// src/services/User.service.ts
import { ENV } from "../_env";
import { IUser } from "../models/User.model";
import * as UserRepository from "../repositories/User.repository";

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

export const getAllUsers = async (): Promise<IUser[]> => {
  return await UserRepository.getAllUsers();
};
