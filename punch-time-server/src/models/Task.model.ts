import mongoose, { Document, Schema } from "mongoose";
import { TaskStatus } from "../types/common";

// models/Task.model.ts
export interface ITask extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  dueDate: string;
  status: TaskStatus;
  assignedBy: string;
}

const TaskSchema = new Schema<ITask>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  dueDate: String,
  status: { type: String, enum: ["Pending", "Submitted", "Overdue"] },
  assignedBy: String,
});

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);