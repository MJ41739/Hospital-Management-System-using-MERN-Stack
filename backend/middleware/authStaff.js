// middleware/authStaff.js
import jwt from "jsonwebtoken";
import Staff from "../models/staffModel.js";
import bcrypt from "bcrypt";
import 'dotenv/config';

exports.loginStaff = async (req, res) => {
  const { email, password } = req.body;
  try {
    const staff = await Staff.findOne({ email });
    if (!staff) return res.status(401).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, staff.password);
    if (!match) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: staff._id, role: staff.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token, role: staff.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const authStaff = (req, res, next) => {
  try {
    const { stoken } = req.headers; // stoken = staff token
    if (!stoken) {
      return res.json({ success: false, message: "Not Authorized. Please login again." });
    }

    const decoded = jwt.verify(stoken, process.env.JWT_SECRET);
    if (decoded.role !== "nurse" && decoded.role !== "receptionist") {
      return res.json({ success: false, message: "Access Denied" });
    }

    req.staff = decoded;
    next();
  } catch (error) {
    console.log("Staff auth error:", error);
    res.json({ success: false, message: "Authentication failed", error: error.message });
  }
};

export default authStaff;
