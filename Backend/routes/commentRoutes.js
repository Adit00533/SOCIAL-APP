import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Comment from "../models/comments.js";

const router = express.Router();

// Add Comment
router.post("/:postId", verifyToken, async (req, res) => {
  try {
    const comment = new Comment({
      postId: req.params.postId,
      userId: req.user.id || req.user._id,
      text: req.body.text,
    });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Comments of a Post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Comment
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.userId.toString() !== (req.user.id || req.user._id)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    comment.text = req.body.text || comment.text;
    const updated = await comment.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Comment
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.userId.toString() !== (req.user.id || req.user._id)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
