// src/_env.ts
import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  MONGO_URI: process.env.MONGO_URI || "",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
};
