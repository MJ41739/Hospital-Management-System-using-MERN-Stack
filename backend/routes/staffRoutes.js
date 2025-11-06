// routes/staffRoutes.js
import express from "express";
import {
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/staffController.js";
import authorizeRole from "../middleware/authorizeRole.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all routes with JWT + role check
router.use(verifyToken);
router.use(authorizeRole(["superadmin"]));

router.post("/create-admin", createAdmin);
router.get("/admins", getAllAdmins);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);

export default router;
