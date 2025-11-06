import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Staff from "../models/staffModel.js";
import {
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  loginStaff,
} from "../controllers/staffController.js";
import authorizeRole from "../middleware/authorizeRole.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/login", loginStaff);
// Protect all routes with JWT + role check
router.use(verifyToken);
router.use(authorizeRole(["superadmin"]));

router.post("/create-admin", createAdmin);
router.get("/admins", getAllAdmins);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);


export default router;