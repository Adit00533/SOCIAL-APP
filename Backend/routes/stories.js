import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createStory,
  getFeedStories,
  deleteStory,
} from "../controllers/storyController.js";

const router = express.Router();

// Create a new story
router.post("/", verifyToken, createStory);

// Get feed stories (self + following)
router.get("/feed", verifyToken, getFeedStories);

// Delete a story
router.delete("/:id", verifyToken, deleteStory);

export default router;
