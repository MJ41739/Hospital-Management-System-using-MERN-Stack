// routes/superAdminRoutes.js
import express from "express";
const router = express.Router();
import loginSuperAdmin from "../controllers/superAdminController.js";

// POST /api/superadmin/login
router.post("/login", loginSuperAdmin);

export default router;
