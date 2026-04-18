import mongoose from "mongoose";

const CommandSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    command: { type: String, required: true, unique: true },

    description: String,
    notes: String,

    tags: [String],
    category: { type: String, index: true },

    isFavorite: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },

    usageCount: { type: Number, default: 0 },
    lastUsedAt: Date,

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
  },
  { timestamps: true },
);

export const Command = mongoose.model("Command", CommandSchema);
