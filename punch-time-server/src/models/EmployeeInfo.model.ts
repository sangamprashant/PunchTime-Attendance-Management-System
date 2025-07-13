import mongoose, { Schema } from "mongoose";

// models/EmployeeInfo.model.ts
export interface IEmployeeInfo extends Document {
  user: mongoose.Types.ObjectId;
  icon: string;
  label: string;
}

const EmployeeInfoSchema = new Schema<IEmployeeInfo>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  icon: String,
  label: String,
});

export const EmployeeInfoModel = mongoose.model<IEmployeeInfo>(
  "EmployeeInfo",
  EmployeeInfoSchema
);
