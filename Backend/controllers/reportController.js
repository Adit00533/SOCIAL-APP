import {
  createReport as createReportService,
  getAllReports as getAllReportsService,
  updateReportStatus as updateReportStatusService,
} from "../services/reportService.js";

export const createReport = async (req, res) => {
  try {
    const report = await createReportService(req.body, req.user.id);
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await getAllReportsService(req.user.id); // assuming user id for admin check
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateReportStatus = async (req, res) => {
  try {
    const updatedReport = await updateReportStatusService(req.params.id, req.body.status, req.user.id);
    res.status(200).json(updatedReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
