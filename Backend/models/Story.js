import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    media: { type: String, required: true }, // image/video URL
    caption: { type: String, default: "" },
    expiresAt: { type: Date, required: true }, // auto delete after 24h
  },
  { timestamps: true }
);

// Optional: auto-delete expired stories
StorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Story", StorySchema);
