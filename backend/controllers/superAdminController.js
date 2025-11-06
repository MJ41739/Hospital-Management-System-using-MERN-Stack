// controllers/superAdminController.js
import Staff from "../models/staffModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Super Admin Login Controller
 * Checks if super admin exists, then verifies credentials from DB
 */
const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find Super Admin in database
    const superAdmin = await Staff.findOne({ role: "superadmin", email });

    if (!superAdmin) {
      return res.status(404).json({ message: "Super Admin not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, superAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: superAdmin._id, role: "superadmin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Super Admin login successful",
      token,
      role: superAdmin.role,
      name: superAdmin.name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default loginSuperAdmin;