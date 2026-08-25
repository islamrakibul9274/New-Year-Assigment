import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRSVP extends Document {
  userId?: mongoose.Types.ObjectId;
  guestName: string;
  guestEmail: string;
  guestsCount: number;
  passType: "standard" | "vip_silver" | "diamond_all_access";
  venue: string;
  eventDate: string;
  celebrationWish?: string;
  ticketCode: string;
  status: "confirmed" | "checked_in" | "cancelled";
  createdAt: Date;
}

const RSVPSchema: Schema<IRSVP> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    guestName: { type: String, required: true, trim: true },
    guestEmail: { type: String, required: true, lowercase: true, trim: true },
    guestsCount: { type: Number, default: 1, min: 1, max: 10 },
    passType: { type: String, enum: ["standard", "vip_silver", "diamond_all_access"], default: "standard" },
    venue: { type: String, default: "New Park Hotel, Beach Garden Florida" },
    eventDate: { type: String, default: "31 December Night" },
    celebrationWish: { type: String, default: "" },
    ticketCode: { type: String, required: true, unique: true },
    status: { type: String, enum: ["confirmed", "checked_in", "cancelled"], default: "confirmed" },
  },
  { timestamps: true }
);

export const RSVP: Model<IRSVP> =
  mongoose.models.RSVP || mongoose.model<IRSVP>("RSVP", RSVPSchema);
