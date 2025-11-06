import express from 'express';
import { loginAdmin, appointmentsAdmin, appointmentCancel, addDoctor, allDoctors, adminDashboard } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
import { addStaff, deleteStaff, getAllStaff, updateStaff } from '../controllers/adminStaffController.js';
const adminRouter = express.Router();

// Staff management routes
adminRouter.post("/add-staff", authAdmin, addStaff);
adminRouter.get("/staff", authAdmin, getAllStaff);
adminRouter.put("/update-staff/:id", authAdmin, updateStaff);
adminRouter.delete("/delete-staff/:id", authAdmin, deleteStaff);

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-doctor", upload.single('image'), addDoctor)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/all-doctors", authAdmin, allDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;