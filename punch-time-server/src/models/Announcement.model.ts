import mongoose, { Document, Schema } from "mongoose";

// models/Announcement.model.ts
export interface IAnnouncement extends Document {
  officeBranch: mongoose.Types.ObjectId;
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
  officeBranch: { type: Schema.Types.ObjectId, ref: "OfficeBranch" },
  title: String,
  description: String,
  date: String,
  type: String,
});

export const AnnouncementModel = mongoose.model<IAnnouncement>(
  "Announcement",
  AnnouncementSchema
);
