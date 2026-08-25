import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  plan: "free" | "silver" | "diamond";
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  themePreference: string;
  confettiSoundsEnabled: boolean;
  customGreeting?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: false },
    avatar: { type: String, default: "" },
    plan: { type: String, enum: ["free", "silver", "diamond"], default: "free" },
    stripeCustomerId: { type: String, default: "" },
    stripeSubscriptionId: { type: String, default: "" },
    themePreference: { type: String, default: "festive-crimson" },
    confettiSoundsEnabled: { type: Boolean, default: true },
    customGreeting: { type: String, default: "Happy New Year! Wishing you boundless joy and prosperity!" },
    bio: { type: String, default: "Ready to celebrate and achieve great milestones this year!" },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
