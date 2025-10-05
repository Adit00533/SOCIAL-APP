import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "YOUR_DEFAULT_SECRET"; // Move to .env in production

/* ===========================
   REGISTER USER
=========================== */
router.post("/register", async (req, res) => {
  console.log("🚀 Registration request received:", req.body);

  try {
    const { name, username, email, password } = req.body;

    if (!username || !email || !password) {
      console.warn("⚠️ Missing required fields:", req.body);
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    // Check if email or username already exists
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      console.warn("❌ Email already registered:", email);
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
    if (existingUsername) {
      console.warn("❌ Username already taken:", username);
      return res.status(400).json({ success: false, message: "Username already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔒 Password hashed successfully");

    // Create and save user
    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();
    console.log("✅ User saved successfully:", newUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully 🎉",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("🔥 Registration error:", err);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
});

/* ===========================
   LOGIN USER
=========================== */
router.post("/login", async (req, res) => {
  console.log("🚀 Login request received:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.warn("⚠️ Missing email or password:", req.body);
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.warn("❌ User not found for email:", email);
      return res.status(400).json({ success: false, message: "User not found ❌" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn("⚠️ Invalid password attempt for user:", email);
      return res.status(400).json({ success: false, message: "Invalid password ⚠️" });
    }
    console.log("✅ Password verified successfully");

    // Sign JWT token (expires in 7 days)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    console.log("🔑 JWT token created for user:", user._id);

    res.status(200).json({
      success: true,
      message: "Logged in successfully ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

export default router;
