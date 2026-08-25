import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResolution extends Document {
  userId?: mongoose.Types.ObjectId;
  userEmail?: string;
  authorName: string;
  goal: string;
  category: "Health & Fitness" | "Career & Tech" | "Mindfulness" | "Financial Freedom" | "Travel & Fun";
  milestones: string[];
  motivationalQuote: string;
  aiPrompt?: string;
  likesCount: number;
  isPublic: boolean;
  createdAt: Date;
}

const ResolutionSchema: Schema<IResolution> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    userEmail: { type: String, lowercase: true, trim: true },
    authorName: { type: String, default: "New Year Champion" },
    goal: { type: String, required: true },
    category: {
      type: String,
      enum: ["Health & Fitness", "Career & Tech", "Mindfulness", "Financial Freedom", "Travel & Fun"],
      default: "Career & Tech",
    },
    milestones: [{ type: String }],
    motivationalQuote: { type: String, default: "" },
    aiPrompt: { type: String, default: "" },
    likesCount: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Resolution: Model<IResolution> =
  mongoose.models.Resolution || mongoose.model<IResolution>("Resolution", ResolutionSchema);
