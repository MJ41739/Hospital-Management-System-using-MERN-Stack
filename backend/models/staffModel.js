import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "nurse", "receptionist", "superadmin"],
    required: true,
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const staffModel = mongoose.models.staff || mongoose.model("staff", staffSchema);
export default staffModel;
