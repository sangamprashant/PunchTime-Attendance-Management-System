import mongoose, { Document, Schema } from "mongoose";

// models/WeekDayStatus.model.ts
export interface IWeekDayStatus extends Document {
  user: mongoose.Types.ObjectId;
  label: string;
  isMarked: boolean;
  isToday: boolean;
}

const WeekDayStatusSchema = new Schema<IWeekDayStatus>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  label: String,
  isMarked: Boolean,
  isToday: Boolean,
});

export const WeekDayStatusModel = mongoose.model<IWeekDayStatus>('WeekDayStatus', WeekDayStatusSchema);