import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

const router = express.Router();

/* ===========================
   SEND MESSAGE
=========================== */
router.post("/", verifyToken, async (req, res) => {
  console.log("🚀 Send message request:", req.body);

  try {
    const { receiverId, text } = req.body;
    if (!receiverId || !text || text.trim() === "") {
      console.warn("⚠️ Missing receiverId or empty text");
      return res.status(400).json({ error: "Receiver ID and text are required" });
    }

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      console.warn("❌ Receiver not found:", receiverId);
      return res.status(404).json({ error: "Receiver not found" });
    }

    const newMessage = new Message({
      senderId: req.user.id || req.user._id,
      receiverId,
      text: text.trim(),
    });

    const saved = await newMessage.save();
    console.log("✅ Message sent:", saved._id);

    res.status(201).json({
      success: true,
      message: "Message sent successfully 💌",
      data: saved,
    });
  } catch (err) {
    console.error("🔥 Send message error:", err);
    res.status(500).json({ error: "Server error while sending message", details: err.message });
  }
});

/* ===========================
   GET CONVERSATION WITH USER
=========================== */
router.get("/:userId", verifyToken, async (req, res) => {
  console.log(`🚀 Fetch conversation with userId: ${req.params.userId}`);

  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id || req.user._id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user.id || req.user._id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "username email")
      .populate("receiverId", "username email");

    console.log(`✅ Fetched ${messages.length} messages`);
    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (err) {
    console.error("🔥 Get conversation error:", err);
    res.status(500).json({ error: "Server error while fetching conversation", details: err.message });
  }
});

/* ===========================
   DELETE MESSAGE
=========================== */
router.delete("/:id", verifyToken, async (req, res) => {
  console.log(`🚀 Delete message request: ${req.params.id}`);

  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      console.warn("❌ Message not found:", req.params.id);
      return res.status(404).json({ error: "Message not found" });
    }

    // Only sender can delete message
    if (message.senderId.toString() !== (req.user.id || req.user._id)) {
      console.warn("⚠️ Unauthorized delete attempt by user:", req.user.id || req.user._id);
      return res.status(403).json({ error: "Not authorized to delete this message" });
    }

    await message.deleteOne();
    console.log("🗑️ Message deleted:", message._id);

    res.status(200).json({ success: true, message: "Message deleted successfully 🗑️" });
  } catch (err) {
    console.error("🔥 Delete message error:", err);
    res.status(500).json({ error: "Server error while deleting message", details: err.message });
  }
});

export default router;
