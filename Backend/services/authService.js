import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "YOUR_DEFAULT_SECRET";

export const handleRegister = async ({ name, username, email, password }) => {
  if (!username || !email || !password) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Username, email, and password are required",
      },
    };
  }

  const existingEmail = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });

  if (existingEmail) {
    return {
      status: 400,
      body: { success: false, message: "Email already registered" },
    };
  }

  if (existingUsername) {
    return {
      status: 400,
      body: { success: false, message: "Username already taken" },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, username, email, password: hashedPassword });
  await newUser.save();

  return {
    status: 201,
    body: {
      success: true,
      message: "User registered successfully 🎉",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    },
  };
};

export const handleLogin = async ({ email, password }) => {
  if (!email || !password) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Email and password are required",
      },
    };
  }

  const user = await User.findOne({ email });
  if (!user) {
    return {
      status: 400,
      body: { success: false, message: "User not found ❌" },
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      status: 400,
      body: { success: false, message: "Invalid password ⚠️" },
    };
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  return {
    status: 200,
    body: {
      success: true,
      message: "Logged in successfully ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    },
  };
};
