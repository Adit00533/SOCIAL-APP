import express from "express";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Upload single media
router.post("/upload", verifyToken, upload.single("media"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(201).json({ success: true, message: "File uploaded", url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
