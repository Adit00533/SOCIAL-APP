import Message from "../models/Message.js";
import User from "../models/User.js";

export const handleSendMessage = async (senderId, { receiverId, text }) => {
  if (!receiverId || !text || text.trim() === "") {
    return {
      status: 400,
      body: { error: "Receiver ID and text are required" },
    };
  }

  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return {
      status: 404,
      body: { error: "Receiver not found" },
    };
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text: text.trim(),
  });

  const saved = await newMessage.save();

  return {
    status: 201,
    body: {
      success: true,
      message: "Message sent successfully 💌",
      data: saved,
    },
  };
};

export const handleGetConversationWithUser = async (currentUserId, userId) => {
  const messages = await Message.find({
    $or: [
      { senderId: currentUserId, receiverId: userId },
      { senderId: userId, receiverId: currentUserId },
    ],
  })
    .sort({ createdAt: 1 })
    .populate("senderId", "username email")
    .populate("receiverId", "username email");

  return {
    status: 200,
    body: {
      success: true,
      count: messages.length,
      messages,
    },
  };
};

export const handleDeleteMessage = async (userId, messageId) => {
  const message = await Message.findById(messageId);
  if (!message) {
    return {
      status: 404,
      body: { error: "Message not found" },
    };
  }

  if (message.senderId.toString() !== userId.toString()) {
    return {
      status: 403,
      body: { error: "Not authorized to delete this message" },
    };
  }

  await message.deleteOne();

  return {
    status: 200,
    body: { success: true, message: "Message deleted successfully 🗑️" },
  };
};
