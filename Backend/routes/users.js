import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ===========================
   GET USER BY ID
=========================== */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found ❌" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("🔥 Get user error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ===========================
   FOLLOW USER
=========================== */
router.put("/:id/follow", verifyToken, async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({ success: false, message: "Cannot follow yourself ❌" });
    }

    const [userToFollow, currentUser] = await Promise.all([
      User.findById(req.params.id),
      User.findById(req.user.id),
    ]);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ success: false, message: "User not found ❌" });
    }

    if (userToFollow.followers.includes(req.user.id)) {
      return res.status(400).json({ success: false, message: "Already following ⚠️" });
    }

    userToFollow.followers.push(req.user.id);
    currentUser.following.push(req.params.id);

    await Promise.all([userToFollow.save(), currentUser.save()]);

    console.log(`✅ ${currentUser.username} followed ${userToFollow.username}`);
    res.status(200).json({ success: true, message: "User followed successfully ✅" });
  } catch (err) {
    console.error("🔥 Follow user error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ===========================
   UNFOLLOW USER
=========================== */
router.put("/:id/unfollow", verifyToken, async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({ success: false, message: "Cannot unfollow yourself ❌" });
    }

    const [userToUnfollow, currentUser] = await Promise.all([
      User.findById(req.params.id),
      User.findById(req.user.id),
    ]);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ success: false, message: "User not found ❌" });
    }

    if (!userToUnfollow.followers.includes(req.user.id)) {
      return res.status(400).json({ success: false, message: "You are not following this user ⚠️" });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== req.user.id);
    currentUser.following = currentUser.following.filter(id => id.toString() !== req.params.id);

    await Promise.all([userToUnfollow.save(), currentUser.save()]);

    console.log(`✅ ${currentUser.username} unfollowed ${userToUnfollow.username}`);
    res.status(200).json({ success: true, message: "User unfollowed successfully ✅" });
  } catch (err) {
    console.error("🔥 Unfollow user error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
