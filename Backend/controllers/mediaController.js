import { handleMediaUpload } from "../services/mediaService.js";

export const uploadMedia = (req, res) => {
  try {
    const result = handleMediaUpload(req);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Upload error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during file upload",
      error: err.message,
    });
  }
};
