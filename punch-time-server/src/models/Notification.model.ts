import mongoose, { Schema } from "mongoose";
import { NotificationType } from "../types/common";

// models/Notification.model.ts
export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  time: string;
  type: NotificationType;
  buttonText?: string;
  icon?: string;
  iconColor?: string;
  badge?: string;
  badgeText?: string;
  badgeColor?: string;
}

const NotificationSchema = new Schema<INotification>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  time: String,
  type: { type: String, enum: ["action", "info", "reminder"] },
  buttonText: String,
  icon: String,
  iconColor: String,
  badge: String,
  badgeText: String,
  badgeColor: String,
});

export const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);