import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Comment from "../models/comments.js";

const router = express.Router();

/* ===========================
   ADD COMMENT
=========================== */
router.post("/:postId", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: "Comment text is required ❌" });
    }

    const comment = new Comment({
      postId: req.params.postId,
      userId: req.user.id || req.user._id,
      text,
    });

    const savedComment = await comment.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully 💬",
      comment: savedComment,
    });
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while adding comment",
      error: err.message,
    });
  }
});

/* ===========================
   GET COMMENTS FOR A POST
=========================== */
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      message: "Comments fetched successfully ✅",
      comments,
    });
  } catch (err) {
    console.error("Get comments error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching comments",
      error: err.message,
    });
  }
});

/* ===========================
   UPDATE COMMENT
=========================== */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).json({ success: false, message: "Comment not found ❌" });

    // Authorization check
    if (comment.userId.toString() !== (req.user.id || req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this comment ⚠️",
      });
    }

    comment.text = req.body.text || comment.text;
    const updatedComment = await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment updated successfully ✏️",
      comment: updatedComment,
    });
  } catch (err) {
    console.error("Update comment error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating comment",
      error: err.message,
    });
  }
});

/* ===========================
   DELETE COMMENT
=========================== */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).json({ success: false, message: "Comment not found ❌" });

    // Authorization check
    if (comment.userId.toString() !== (req.user.id || req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment ⚠️",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully 🗑️",
    });
  } catch (err) {
    console.error("Delete comment error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while deleting comment",
      error: err.message,
    });
  }
});

export default router;
