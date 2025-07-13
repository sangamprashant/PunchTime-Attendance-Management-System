import mongoose, { Schema } from "mongoose";

// models/AttendanceGraph.model.ts
export interface IAttendanceGraph extends Document {
  user: mongoose.Types.ObjectId;
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

const AttendanceGraphSchema = new Schema<IAttendanceGraph>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  labels: [String],
  datasets: [{ data: [Number] }],
});

export const AttendanceGraphModel = mongoose.model<IAttendanceGraph>('AttendanceGraph', AttendanceGraphSchema)