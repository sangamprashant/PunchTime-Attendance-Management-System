import mongoose, { Document, Schema } from "mongoose";

// models/OfficeBranch.model.ts
export interface IOfficeBranch extends Document {
  name: string;
  address: string;
  pincode: number;
  state: string;
  city: string;
}

const OfficeBranchSchema = new Schema<IOfficeBranch>({
  name: String,
  address: String,
  pincode: Number,
  state: String,
  city: String,
});

export const OfficeBranchModel = mongoose.model<IOfficeBranch>('OfficeBranch', OfficeBranchSchema);