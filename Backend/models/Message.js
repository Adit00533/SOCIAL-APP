import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const messageSchema = new Schema(
  {
    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Sender ID is required"],
      index: true, // speeds up queries by sender
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Receiver ID is required"],
      index: true, // speeds up queries by receiver
    },
    text: {
      type: String,
      required: [true, "Message text is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"], // optional limit
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false, // remove __v if not needed
  }
);

// Compound index for faster conversation queries
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

export default model("Message", messageSchema);
