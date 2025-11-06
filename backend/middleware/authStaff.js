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
