import mongoose from "mongoose";

const PollSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    question: { type: String, required: true },
    options: [
      {
        text: { type: String, required: true },
        votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      },
    ],
    expiresAt: { type: Date }, // Optional: poll expiration
  },
  { timestamps: true }
);

export default mongoose.model("Poll", PollSchema);
