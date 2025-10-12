import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  savePost,
  unsavePost,
  getSavedPosts,
} from "../controllers/savedController.js";

const router = express.Router();

// Save a post
router.post("/:postId/save", verifyToken, savePost);

// Remove saved post
router.delete("/:postId/save", verifyToken, unsavePost);

// Get all saved posts
router.get("/", verifyToken, getSavedPosts);

export default router;
