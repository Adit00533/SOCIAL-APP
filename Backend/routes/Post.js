import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createPost,
  getAllPosts,
  getFeedPosts,
  updatePost,
  deletePost,
  toggleLikePost,
  getUserPosts,
  getSinglePost,
} from "../controllers/postcontroller.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", getAllPosts);
router.get("/feed", verifyToken, getFeedPosts);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
router.put("/:id/like", verifyToken, toggleLikePost);
router.get("/user/:userId", getUserPosts);
router.get("/:id", getSinglePost);

export default router;
