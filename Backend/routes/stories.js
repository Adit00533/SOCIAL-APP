import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Story from "../models/Story.js";

const router = express.Router();

// CREATE story
router.post("/", verifyToken, async (req, res) => {
  try {
    const { media, caption } = req.body;
    if (!media) return res.status(400).json({ error: "Media is required" });

    const story = new Story({
      user: req.user.id,
      media,
      caption,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h expiry
    });

    await story.save();
    res.status(201).json({ success: true, message: "Story created", story });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET stories of following + self
router.get("/feed", verifyToken, async (req, res) => {
  try {
    const currentUser = req.user.id;

    // Fetch stories from self and people you follow
    const user = await User.findById(currentUser);
    const usersToFetch = [...user.following, currentUser];

    const stories = await Story.find({
      user: { $in: usersToFetch },
      expiresAt: { $gt: new Date() }, // only active stories
    })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: stories.length, stories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a story
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });

    if (story.user.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    await story.deleteOne();
    res.json({ success: true, message: "Story deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
