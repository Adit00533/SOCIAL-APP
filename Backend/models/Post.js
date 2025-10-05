import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const PostSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true, // speeds up fetching posts by user
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
      trim: true,
      maxlength: [2000, "Post content cannot exceed 2000 characters"], // optional limit
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
    likes: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false, // removes __v field
  }
);

// Optional: index for fetching posts by user in chronological order
PostSchema.index({ userId: 1, createdAt: -1 });

export default model("Post", PostSchema);
