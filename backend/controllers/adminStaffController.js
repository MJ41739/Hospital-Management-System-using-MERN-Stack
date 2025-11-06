import bcrypt from "bcrypt";
import staffModel from "../models/staffModel.js";

// ✅ Create staff (nurse/receptionist)
export const addStaff = async (req, res) => {
  try {
    const { name, email, password, role, phone, address, salary } = req.body;

    if (!name || !email || !password || !role) {
      return res.json({ success: false, message: "All required fields are missing." });
    }

    const existing = await staffModel.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "Staff with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new staffModel({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
      salary,
    });

    await newStaff.save();

    res.json({ success: true, message: `${role} added successfully.` });
  } catch (error) {
    console.log("Error creating staff:", error);
    res.json({ success: false, message: "Error creating staff", error: error.message });
  }
};

// ✅ Get all staff (optionally filter by role)
export const getAllStaff = async (req, res) => {
  try {
    const { role } = req.query; // optional filter

    // Allow only "nurse" or "receptionist"
    const allowedRoles = ["nurse", "receptionist"];

    let filter = { role: { $in: allowedRoles } };

    // If role is provided and valid, filter by that role
    if (role && allowedRoles.includes(role.toLowerCase())) {
      filter = { role: role.toLowerCase() };
    }

    const staffList = await staffModel.find(filter);

    res.json({
      success: true,
      data: staffList,
    });
  } catch (error) {
    console.log("Error fetching staff:", error);
    res.json({
      success: false,
      message: "Error fetching staff",
      error: error.message,
    });
  }
};


// ✅ Update staff
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updated = await staffModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) return res.json({ success: false, message: "Staff not found." });

    res.json({ success: true, message: "Staff updated successfully.", data: updated });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating staff", error: error.message });
  }
};

// ✅ Delete staff
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await staffModel.findByIdAndDelete(id);
    if (!deleted) return res.json({ success: false, message: "Staff not found." });
    res.json({ success: true, message: "Staff deleted successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error deleting staff", error: error.message });
  }
};
