import {
  handleSendMessage,
  handleGetConversationWithUser,
  handleDeleteMessage,
} from "../services/messageService.js";

export const sendMessage = async (req, res) => {
  try {
    const result = await handleSendMessage(req.user.id || req.user._id, req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Send message error:", err);
    res.status(500).json({
      error: "Server error while sending message",
      details: err.message,
    });
  }
};

export const getConversationWithUser = async (req, res) => {
  try {
    const result = await handleGetConversationWithUser(req.user.id || req.user._id, req.params.userId);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Get conversation error:", err);
    res.status(500).json({
      error: "Server error while fetching conversation",
      details: err.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const result = await handleDeleteMessage(req.user.id || req.user._id, req.params.id);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Delete message error:", err);
    res.status(500).json({
      error: "Server error while deleting message",
      details: err.message,
    });
  }
};
