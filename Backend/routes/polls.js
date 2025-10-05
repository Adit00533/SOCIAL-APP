import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Poll from "../models/Poll.js";
import Post from "../models/Post.js";

const router = express.Router();

// CREATE poll for a post
router.post("/:postId", verifyToken, async (req, res) => {
  try {
    const { question, options, expiresAt } = req.body;

    if (!question || !options || options.length < 2)
      return res.status(400).json({ error: "Question and at least 2 options required" });

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Only post owner can add poll
    if (post.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    const poll = new Poll({
      post: req.params.postId,
      question,
      options: options.map((text) => ({ text })),
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    });

    await poll.save();
    res.status(201).json({ success: true, message: "Poll created", poll });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VOTE in a poll
router.put("/:pollId/vote", verifyToken, async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    // Check expiration
    if (poll.expiresAt && poll.expiresAt < new Date())
      return res.status(400).json({ error: "Poll has expired" });

    const userId = req.user.id;

    // Remove user vote from all options
    poll.options.forEach((opt) => {
      opt.votes = opt.votes.filter((id) => id.toString() !== userId);
    });

    // Add vote to selected option
    if (poll.options[optionIndex]) poll.options[optionIndex].votes.push(userId);
    else return res.status(400).json({ error: "Invalid option index" });

    await poll.save();
    res.json({ success: true, message: "Vote recorded", poll });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET poll results
router.get("/:pollId", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId).populate("options.votes", "username email");
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    res.json({ success: true, poll });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
