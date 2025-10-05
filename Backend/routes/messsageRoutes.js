import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

const router = express.Router();

/* ---------------- SEND MESSAGE ---------------- */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    if (!receiverId || !text) {
      return res.status(400).json({ error: "Receiver ID and text are required" });
    }

    const newMessage = new Message({
      senderId: req.user.id || req.user._id,
      receiverId,
      text,
    });

    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- GET CONVERSATION ---------------- */
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user.id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "username email")
      .populate("receiverId", "username email");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- DELETE MESSAGE ---------------- */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    if (message.senderId.toString() !== (req.user.id || req.user._id)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await message.deleteOne();
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
