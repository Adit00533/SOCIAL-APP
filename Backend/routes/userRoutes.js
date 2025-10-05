import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ===========================
   PROFILE ROUTES
=========================== */

// Get my profile
router.get("/me", verifyToken, async (req, res) => {
  console.log("🚀 Get profile for user:", req.user.id || req.user._id);
  try {
    const user = await User.findById(req.user.id || req.user._id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found ❌" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("🔥 Get profile error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update profile
router.put("/me", verifyToken, async (req, res) => {
  console.log("🚀 Update profile request:", req.body);
  try {
    const user = await User.findById(req.user.id || req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found ❌" });

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;

    const updatedUser = await user.save();
    console.log("✅ Profile updated:", updatedUser._id);
    res.status(200).json({ success: true, message: "Profile updated successfully ✅", user: updatedUser });
  } catch (err) {
    console.error("🔥 Update profile error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ===========================
   SEARCH ROUTES
=========================== */

// Search users by username
router.get("/search/users", async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query) return res.status(400).json({ success: false, message: "Search query is required ❌" });

    const users = await User.find({ username: { $regex: query, $options: "i" } })
      .select("username email");
    res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    console.error("🔥 Search users error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Search posts by content
router.get("/search/posts", async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query) return res.status(400).json({ success: false, message: "Search query is required ❌" });

    const posts = await Post.find({ content: { $regex: query, $options: "i" } })
      .populate("userId", "username email");
    res.status(200).json({ success: true, count: posts.length, posts });
  } catch (err) {
    console.error("🔥 Search posts error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ===========================
   FOLLOW / UNFOLLOW ROUTES
=========================== */

// Follow a user
router.put("/:id/follow", verifyToken, async (req, res) => {
  try {
    if (req.user.id === req.params.id) return res.status(400).json({ success: false, message: "You can't follow yourself ❌" });

    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id || req.user._id);

    if (!userToFollow || !currentUser) return res.status(404).json({ success: false, message: "User not found ❌" });
    if (userToFollow.followers.includes(req.user.id || req.user._id)) return res.status(400).json({ success: false, message: "Already following ⚠️" });

    userToFollow.followers.push(req.user.id || req.user._id);
    currentUser.following.push(req.params.id);

    await userToFollow.save();
    await currentUser.save();

    console.log(`✅ ${currentUser.username} followed ${userToFollow.username}`);
    res.status(200).json({ success: true, message: "User followed successfully ✅" });
  } catch (err) {
    console.error("🔥 Follow user error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Unfollow a user
router.put("/:id/unfollow", verifyToken, async (req, res) => {
  try {
    if (req.user.id === req.params.id) return res.status(400).json({ success: false, message: "You can't unfollow yourself ❌" });

    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id || req.user._id);

    if (!userToUnfollow || !currentUser) return res.status(404).json({ success: false, message: "User not found ❌" });
    if (!userToUnfollow.followers.includes(req.user.id || req.user._id)) return res.status(400).json({ success: false, message: "You are not following this user ⚠️" });

    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== (req.user.id || req.user._id));
    currentUser.following = currentUser.following.filter(id => id.toString() !== req.params.id);

    await userToUnfollow.save();
    await currentUser.save();

    console.log(`✅ ${currentUser.username} unfollowed ${userToUnfollow.username}`);
    res.status(200).json({ success: true, message: "User unfollowed successfully ✅" });
  } catch (err) {
    console.error("🔥 Unfollow user error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ===========================
   SUGGESTED USERS
=========================== */

router.get("/suggestions", verifyToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id || req.user._id);
    const suggestions = await User.find({
      _id: { $nin: [...currentUser.following, req.user.id || req.user._id] }
    }).select("username email");

    res.status(200).json({ success: true, count: suggestions.length, suggestions });
  } catch (err) {
    console.error("🔥 Suggested users error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
