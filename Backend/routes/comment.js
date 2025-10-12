import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/:postId", verifyToken, addComment);
router.get("/:postId", getCommentsByPost);
router.put("/:id", verifyToken, updateComment);
router.delete("/:id", verifyToken, deleteComment);

export default router;
