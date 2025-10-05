import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const CommentSchema = new Schema(
  {
    postId: {
      type: Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
      index: true, // speeds up queries filtering by postId
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true, // speeds up queries filtering by userId
    },
    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true, // removes unnecessary whitespace
      maxlength: [500, "Comment text cannot exceed 500 characters"], // optional limit
    },
  },
  {
    timestamps: true,
    versionKey: false, // remove __v field if not needed
  }
);

// Optional: compound index for faster post-specific queries
CommentSchema.index({ postId: 1, createdAt: -1 });

export default model("Comment", CommentSchema);
