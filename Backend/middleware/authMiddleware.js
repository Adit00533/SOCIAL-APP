import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  try {
    // Check for Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object, excluding password
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      return next(); // Proceed to next middleware/route
    }

    // No token found
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
