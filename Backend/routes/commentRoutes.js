import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Comment from "../models/comments.js";

const router = express.Router();

/* ===========================
   ADD COMMENT
=========================== */
router.post("/:postId", verifyToken, async (req, res) => {
  console.log(`🚀 Add comment request for postId: ${req.params.postId}`, req.body);

  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      console.warn("⚠️ Comment text is missing or empty");
      return res.status(400).json({ success: false, message: "Comment text is required ❌" });
    }

    const comment = new Comment({
      postId: req.params.postId,
      userId: req.user.id || req.user._id,
      text: text.trim(),
    });

    const savedComment = await comment.save();
    console.log("✅ Comment saved:", savedComment._id);

    res.status(201).json({
      success: true,
      message: "Comment added successfully 💬",
      comment: savedComment,
    });
  } catch (err) {
    console.error("🔥 Add comment error:", err);
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
  console.log(`🚀 Fetch comments for postId: ${req.params.postId}`);

  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    console.log(`✅ Fetched ${comments.length} comments`);
    res.status(200).json({
      success: true,
      count: comments.length,
      message: "Comments fetched successfully ✅",
      comments,
    });
  } catch (err) {
    console.error("🔥 Get comments error:", err);
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
  console.log(`🚀 Update comment request: ${req.params.id}`, req.body);

  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      console.warn("❌ Comment not found:", req.params.id);
      return res.status(404).json({ success: false, message: "Comment not found ❌" });
    }

    // Authorization check
    if (comment.userId.toString() !== (req.user.id || req.user._id)) {
      console.warn("⚠️ Unauthorized update attempt by user:", req.user.id || req.user._id);
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this comment ⚠️",
      });
    }

    if (!req.body.text || req.body.text.trim() === "") {
      console.warn("⚠️ Update text is missing or empty");
      return res.status(400).json({ success: false, message: "Comment text cannot be empty ❌" });
    }

    comment.text = req.body.text.trim();
    const updatedComment = await comment.save();
    console.log("✅ Comment updated:", updatedComment._id);

    res.status(200).json({
      success: true,
      message: "Comment updated successfully ✏️",
      comment: updatedComment,
    });
  } catch (err) {
    console.error("🔥 Update comment error:", err);
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
  console.log(`🚀 Delete comment request: ${req.params.id}`);

  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      console.warn("❌ Comment not found:", req.params.id);
      return res.status(404).json({ success: false, message: "Comment not found ❌" });
    }

    // Authorization check
    if (comment.userId.toString() !== (req.user.id || req.user._id)) {
      console.warn("⚠️ Unauthorized delete attempt by user:", req.user.id || req.user._id);
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment ⚠️",
      });
    }

    await comment.deleteOne();
    console.log("🗑️ Comment deleted:", comment._id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully 🗑️",
    });
  } catch (err) {
    console.error("🔥 Delete comment error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while deleting comment",
      error: err.message,
    });
  }
});

export default router;
