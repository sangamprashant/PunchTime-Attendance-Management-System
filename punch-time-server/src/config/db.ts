// src/config/db.ts
import mongoose from "mongoose";
import { seedAdmin } from "../utils/seedAdmin";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "", {
      dbName: "punch-time",
    });
    console.log("✅ MongoDB connected");
    await seedAdmin();
  } catch (error) {
    console.error("❌ DB connection failed", error);
    process.exit(1);
  }
};
