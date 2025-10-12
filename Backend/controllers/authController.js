import { handleRegister, handleLogin } from "../services/authService.js";

export const registerUser = async (req, res) => {
  console.log("🚀 Registration request received:", req.body);
  try {
    const result = await handleRegister(req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Registration error:", err);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
};

export const loginUser = async (req, res) => {
  console.log("🚀 Login request received:", req.body);
  try {
    const result = await handleLogin(req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};
