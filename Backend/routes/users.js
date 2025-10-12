import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getUserById,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";

const router = express.Router();

// Get user by ID
router.get("/:id", verifyToken, getUserById);

// Follow user
router.put("/:id/follow", verifyToken, followUser);

// Unfollow user
router.put("/:id/unfollow", verifyToken, unfollowUser);

export default router;
