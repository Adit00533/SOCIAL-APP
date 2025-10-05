import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["post", "comment", "user"], required: true },
    target: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "type" },
    reason: { type: String, required: true },
    status: { type: String, enum: ["pending", "reviewed", "dismissed"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
