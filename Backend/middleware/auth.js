import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT token from Authorization header.
 * Expects header: "Authorization: Bearer <token>"
 */
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("[verifyToken] Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("[verifyToken] No token provided or wrong format");
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    console.log("[verifyToken] Extracted Token:", token);

    if (!token) {
      console.error("[verifyToken] Token missing after splitting header");
      return res.status(401).json({ error: "Access denied. Token missing." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("[verifyToken] Token decoded:", decoded);

    if (!decoded) {
      console.error("[verifyToken] Token decoded is falsy");
      return res.status(401).json({ error: "Invalid token." });
    }

    req.user = decoded;
    console.log("[verifyToken] Token is VALID ✅. User set in request:", req.user);
    next();

  } catch (err) {
    console.error("[verifyToken] Error during token verification:", err);

    if (err.name === "TokenExpiredError") {
      console.error("[verifyToken] Token expired");
      return res.status(401).json({ error: "Token expired." });
    }
    if (err.name === "JsonWebTokenError") {
      console.error("[verifyToken] Invalid token");
      return res.status(401).json({ error: "Invalid token." });
    }

    console.error("[verifyToken] Unknown error");
    return res.status(500).json({ error: "Failed to authenticate token." });
  }
};
