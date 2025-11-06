import Staff from "../models/staffModel.js";
import bcrypt from "bcrypt";
import 'dotenv/config';

export const createSuperAdminIfNotExists = async () => {
  try {
    const existing = await Staff.findOne({ role: "superadmin" });
    if (!existing) {
      const hashed = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10);
      await Staff.create({
        name: "Super Admin",
        email: process.env.SUPER_ADMIN_EMAIL,
        password: hashed,
        role: "superadmin",
      });
      console.log("✅ Super Admin created from .env");
    } else {
      console.log("Super Admin already exists.");
    }
  } catch (err) {
    console.error("mayur", err);
    console.error("❌ Error creating Super Admin:", err);
    
  }
};
