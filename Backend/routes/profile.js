import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getMyProfile,
  updateMyProfile,
  searchUsers,
  searchPosts,
  followUser,
  unfollowUser,
  getSuggestedUsers,
} from "../controllers/profileController.js";

const router = express.Router();

// Profile
router.get("/me", verifyToken, getMyProfile);
router.put("/me", verifyToken, updateMyProfile);

// Search
router.get("/search/users", searchUsers);
router.get("/search/posts", searchPosts);

// Follow / Unfollow
router.put("/:id/follow", verifyToken, followUser);
router.put("/:id/unfollow", verifyToken, unfollowUser);

// Suggested users
router.get("/suggestions", verifyToken, getSuggestedUsers);

export default router;
