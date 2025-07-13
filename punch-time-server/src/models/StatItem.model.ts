import mongoose, { Schema } from "mongoose";

// models/StatItem.model.ts
export interface IStatItem extends Document {
  user: mongoose.Types.ObjectId;
  label: string;
  value: number;
  max?: number;
  unit?: string;
}

const StatItemSchema = new Schema<IStatItem>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  label: String,
  value: Number,
  max: Number,
  unit: String,
});

export const StatItemModel = mongoose.model<IStatItem>('StatItem', StatItemSchema);
