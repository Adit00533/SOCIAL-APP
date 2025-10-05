import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY"; // Move to .env in production

/* ===========================
   REGISTER USER
=========================== */
router.post("/register", async (req, res) => {
  console.log("🚀 Registration request:", req.body);

  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      console.warn("⚠️ Missing required fields:", req.body);
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    // Check for existing email or username
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      console.warn("❌ Email already registered:", email);
      return res.status(400).json({ success: false, message: "Email already registered ❌" });
    }

    if (existingUsername) {
      console.warn("❌ Username already taken:", username);
      return res.status(400).json({ success: false, message: "Username already taken ❌" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔒 Password hashed");

    // Create user
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log("✅ User saved:", savedUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully 🎉",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (err) {
    console.error("🔥 Registration error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: err.message,
    });
  }
});

/* ===========================
   LOGIN USER
=========================== */
router.post("/login", async (req, res) => {
  console.log("🚀 Login request:", req.body);

  try {
    const { email, password } = req.body;

    // Validate required fields
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
      console.warn("❌ User not found:", email);
      return res.status(400).json({ success: false, message: "User not found ❌" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn("⚠️ Invalid password attempt for:", email);
      return res.status(400).json({ success: false, message: "Invalid credentials ⚠️" });
    }
    console.log("✅ Password verified");

    // Generate JWT token (1 day)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log("🔑 JWT token generated for user:", user._id);

    res.status(200).json({
      success: true,
      message: "Logged in successfully ✅",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: err.message,
    });
  }
});

export default router;
