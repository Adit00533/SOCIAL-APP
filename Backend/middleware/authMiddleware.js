import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
      console.log("Token found:", token); // Debug: show token

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Debug: show decoded payload

      // Attach user to request object, excluding password
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.log("User not found for ID:", decoded.id);
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      return next(); // Token valid, user found, continue
    }

    // No token found in header or malformed header
    console.log("No token provided or malformed Authorization header");
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  } catch (error) {
    console.error("Protect middleware error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};

export default protect;
