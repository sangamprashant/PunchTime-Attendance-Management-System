// src/_env.ts
import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  MONGO_URI: process.env.MONGO_URI || "",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@punchtime.in",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "1234",
};
