import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createReport,
  getAllReports,
  updateReportStatus,
} from "../controllers/reportController.js";

const router = express.Router();

router.post("/", verifyToken, createReport);
router.get("/", verifyToken, getAllReports); // Admin only
router.put("/:id/status", verifyToken, updateReportStatus); // Admin only

export default router;
