import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createPoll,
  votePoll,
  getPoll,
} from "../controllers/pollController.js";

const router = express.Router();

router.post("/:postId", verifyToken, createPoll);
router.put("/:pollId/vote", verifyToken, votePoll);
router.get("/:pollId", getPoll);

export default router;
