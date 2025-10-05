import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const TweetSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true, // speeds up fetching tweets by user
    },
    text: {
      type: String,
      required: [true, "Tweet text is required"],
      trim: true,
      maxlength: [280, "Tweet cannot exceed 280 characters"],
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false, // remove __v field
  }
);

// Optional: index for fetching user tweets chronologically
TweetSchema.index({ user: 1, createdAt: -1 });

export default model("Tweet", TweetSchema);
