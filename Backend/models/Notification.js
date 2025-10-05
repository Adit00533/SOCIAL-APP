import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const NotificationSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true, // speeds up fetching notifications for a user
    },
    type: {
      type: String,
      enum: ["like", "comment", "follow"],
      required: [true, "Notification type is required"],
    },
    fromUser: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
    post: {
      type: Types.ObjectId,
      ref: "Post",
      default: null,
    },
    read: {
      type: Boolean,
      default: false,
      index: true, // optional: helps quickly fetch unread notifications
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
    versionKey: false,
  }
);

// Optional: compound index for fetching unread notifications efficiently
NotificationSchema.index({ user: 1, read: 1, createdAt: -1 });

export default model("Notification", NotificationSchema);
