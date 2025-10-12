import Report from "../models/Report.js";

export const createReport = async (req, res) => {
  try {
    const { type, target, reason } = req.body;

    if (!type || !target || !reason) {
      return res.status(400).json({
        success: false,
        message: "Type, target, and reason are required ❌"
      });
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
    console.error("🔥 Report error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while submitting report",
      error: err.message
    });
  }
};

export const getAllReports = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only ⚠️"
      });
    }

    const reports = await Report.find()
      .populate("reporter", "username email")
      .populate("target");

    res.status(200).json({
      success: true,
      count: reports.length,
      message: "All reports fetched successfully ✅",
      reports
    });
  } catch (err) {
    console.error("🔥 Fetch reports error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching reports",
      error: err.message
    });
  }
};

export const updateReportStatus = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only ⚠️"
      });
    }

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found ❌"
      });
    }

    const { status } = req.body;
    const validStatuses = ["pending", "reviewed", "dismissed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value ❌"
      });
    }

    report.status = status;
    const updatedReport = await report.save();

    res.status(200).json({
      success: true,
      message: "Report status updated successfully ✅",
      report: updatedReport
    });
  } catch (err) {
    console.error("🔥 Update report status error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating report",
      error: err.message
    });
  }
};
