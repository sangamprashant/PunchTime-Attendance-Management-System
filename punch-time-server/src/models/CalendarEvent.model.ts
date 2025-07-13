import mongoose, { Document, Schema } from "mongoose";
import { CalendarEventType } from "../types/common";

// models/CalendarEvent.model.ts
export interface ICalendarEvent extends Document {
  user: mongoose.Types.ObjectId;
  date: string;
  type: CalendarEventType;
}

const CalendarEventSchema = new Schema<ICalendarEvent>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: String,
  type: { type: String, enum: ["today", "test", "holiday"] },
});

export const CalendarEventModel = mongoose.model<ICalendarEvent>('CalendarEvent', CalendarEventSchema);