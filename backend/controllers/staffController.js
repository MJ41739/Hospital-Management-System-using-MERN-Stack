import Staff from "../models/staffModel.js";
import bcrypt from "bcrypt";

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Staff.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Staff({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save(); 

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (err) {
    console.error("Error creating admin:", err); 
    return res.status(500).json({
      success: false,
      message: "Error creating admin",
      error: err.message,
    });
  }
};


/**
 *  Get all Admins
 *  GET /api/staff/admins
 */
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Staff.find({ role: "admin" }).select("-password");
    res.status(200).json({ admins });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admins", error: err.message });
  }
};

/**
 *  Update Admin details
 *  PUT /api/staff/admins/:id
 */
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedAdmin = await Staff.findOneAndUpdate(
      { _id: id, role: "admin" },
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      message: "Admin updated successfully",
      admin: updatedAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating admin", error: err.message });
  }
};

/**
 * Delete Admin
 *  DELETE /api/staff/admins/:id
 */
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Staff.findOneAndDelete({ _id: id, role: "admin" });

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting admin", error: err.message });
  }
};
