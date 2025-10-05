import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Report from "../models/Report.js";

const router = express.Router();

/* ---------------- POST A REPORT ---------------- */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { type, target, reason } = req.body;

    if (!type || !target || !reason) {
      return res.status(400).json({ success: false, message: "Type, target, and reason are required ❌" });
    }

    const newReport = new Report({
      reporter: req.user.id || req.user._id,
      type,
      target,
      reason
    });

    const savedReport = await newReport.save();

    res.status(201).json({
      success: true,
      message: "Report submitted successfully ✅",
      report: savedReport
    });
  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({ success: false, message: "Server error while submitting report", error: err.message });
  }
});

/* ---------------- GET ALL REPORTS (ADMIN ONLY) ---------------- */
router.get("/", verifyToken, async (req, res) => {
  try {
    // Optional: Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied. Admins only ⚠️" });
    }

    const reports = await Report.find()
      .populate("reporter", "username email")
      .populate("target"); // populates post/comment/user based on type

    res.status(200).json({
      success: true,
      count: reports.length,
      message: "All reports fetched successfully ✅",
      reports
    });
  } catch (err) {
    console.error("Fetch reports error:", err);
    res.status(500).json({ success: false, message: "Server error while fetching reports", error: err.message });
  }
});

/* ---------------- UPDATE REPORT STATUS (ADMIN ONLY) ---------------- */
router.put("/:id/status", verifyToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied. Admins only ⚠️" });
    }

    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ success: false, message: "Report not found ❌" });

    const { status } = req.body;
    if (!["pending", "reviewed", "dismissed"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value ❌" });
    }

    report.status = status;
    const updatedReport = await report.save();

    res.status(200).json({
      success: true,
      message: "Report status updated successfully ✅",
      report: updatedReport
    });
  } catch (err) {
    console.error("Update report status error:", err);
    res.status(500).json({ success: false, message: "Server error while updating report", error: err.message });
  }
});

export default router;
