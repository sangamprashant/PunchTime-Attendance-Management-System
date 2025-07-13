import mongoose, { Document, Schema } from "mongoose";

// models/Announcement.model.ts
export interface IAnnouncement extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  date: string;
  type:
    | "Holiday"
    | "Update"
    | "Policy"
    | "Event"
    | "Maintenance"
    | "Reminder"
    | "Training";
}

const AnnouncementSchema = new Schema<IAnnouncement>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  date: String,
  type: String,
});

export const AnnouncementModel = mongoose.model<IAnnouncement>(
  "Announcement",
  AnnouncementSchema
);
