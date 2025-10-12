import express from "express";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { uploadMedia } from "../controllers/mediaController.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("media"), uploadMedia);

export default router;
