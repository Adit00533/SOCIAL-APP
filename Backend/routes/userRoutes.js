import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js"; // Needed for post search
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* -------- Profile APIs -------- */

// Get my profile
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile
router.put("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------- Search APIs -------- */

// Search users by username
router.get("/search/users", async (req, res) => {
  try {
    const query = req.query.q;
    const users = await User.find({ username: { $regex: query, $options: "i" } })
      .select("username email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search posts by content
router.get("/search/posts", async (req, res) => {
  try {
    const query = req.query.q;
    const posts = await Post.find({ content: { $regex: query, $options: "i" } })
      .populate("userId", "username email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------- Follow / Unfollow APIs -------- */

// Follow a user
router.put("/:id/follow", verifyToken, async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({ error: "You can't follow yourself" });
    }

    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userToFollow.followers.includes(req.user.id)) {
      return res.status(400).json({ error: "Already following" });
    }

    userToFollow.followers.push(req.user.id);
    currentUser.following.push(req.params.id);

    await userToFollow.save();
    await currentUser.save();

    res.json({ message: "User followed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unfollow a user
router.put("/:id/unfollow", verifyToken, async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({ error: "You can't unfollow yourself" });
    }

    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!userToUnfollow.followers.includes(req.user.id)) {
      return res.status(400).json({ error: "You are not following this user" });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== req.user.id
    );
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== req.params.id
    );

    await userToUnfollow.save();
    await currentUser.save();

    res.json({ message: "User unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------- Suggested Users -------- */

router.get("/suggestions", verifyToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const suggestions = await User.find({
      _id: { $nin: [...currentUser.following, req.user.id] }
    }).select("username email");
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
