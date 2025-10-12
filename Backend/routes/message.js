import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  sendMessage,
  getConversationWithUser,
  deleteMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", verifyToken, sendMessage);
router.get("/:userId", verifyToken, getConversationWithUser);
router.delete("/:id", verifyToken, deleteMessage);

export default router;
