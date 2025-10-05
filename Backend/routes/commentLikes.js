import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Comment from "../models/Comment.js";

const router = express.Router();

// Like/unlike comment
router.put("/:id/like", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const userId = req.user.id || req.user._id;
    const liked = comment.likes?.some((id) => id.toString() === userId);

    if (liked) {
      comment.likes = comment.likes.filter((id) => id.toString() !== userId);
      await comment.save();
      return res.json({ success: true, message: "Comment unliked", likesCount: comment.likes.length });
    }

    if (!comment.likes) comment.likes = [];
    comment.likes.push(userId);
    await comment.save();

    res.json({ success: true, message: "Comment liked", likesCount: comment.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
