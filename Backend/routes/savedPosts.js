import express from "express";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

const router = express.Router();

// Save a post
router.post("/:postId/save", verifyToken, async (req, res) => {
  try {
    const postId = req.params.postId;
    const user = await User.findById(req.user.id);

    if (!user.savedPosts) user.savedPosts = [];
    if (user.savedPosts.includes(postId))
      return res.status(400).json({ error: "Post already saved" });

    user.savedPosts.push(postId);
    await user.save();

    res.json({ success: true, message: "Post saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove saved post
router.delete("/:postId/save", verifyToken, async (req, res) => {
  try {
    const postId = req.params.postId;
    const user = await User.findById(req.user.id);

    user.savedPosts = user.savedPosts.filter((id) => id.toString() !== postId);
    await user.save();

    res.json({ success: true, message: "Post removed from saved posts" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all saved posts
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedPosts");
    res.json({ success: true, savedPosts: user.savedPosts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
