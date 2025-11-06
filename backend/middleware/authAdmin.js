import jwt from "jsonwebtoken";
import Staff from "../models/staffModel.js";
import 'dotenv/config.js';

// Middleware to protect admin routes
const authAdmin = async (req, res, next) => {
  try {
    // You can send token as either Authorization header (Bearer token) or custom header
    const token =
      req.headers.authorization?.split(" ")[1] || req.headers.atoken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token belongs to a valid admin
    const admin = await Staff.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or admin not found.",
      });
    }

    // Attach admin data to request for further use
    req.admin = admin;

    next();
  } catch (error) {
    console.error("❌ Admin Auth Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};

export default authAdmin;
