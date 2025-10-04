import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get user by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) { res.status(500).json(err); }
});

// Follow user
router.put("/:id/follow", verifyToken, async (req, res) => {
  try {
    if (req.user.id === req.params.id) return res.status(400).json({ error: "Cannot follow yourself" });
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow.followers.includes(req.user.id)) {
      userToFollow.followers.push(req.user.id);
      currentUser.following.push(req.params.id);
      await userToFollow.save();
      await currentUser.save();
      res.json({ message: "User followed" });
    } else {
      res.status(400).json({ error: "Already following" });
    }
  } catch (err) { res.status(500).json(err); }
});

// Unfollow user
router.put("/:id/unfollow", verifyToken, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    userToUnfollow.followers = userToUnfollow.followers.filter(f => f.toString() !== req.user.id);
    currentUser.following = currentUser.following.filter(f => f.toString() !== req.params.id);

    await userToUnfollow.save();
    await currentUser.save();
    res.json({ message: "User unfollowed" });
  } catch (err) { res.status(500).json(err); }
});

export default router;
