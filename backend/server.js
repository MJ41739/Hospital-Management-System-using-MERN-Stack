import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import Staff from "./models/staffModel.js";
import bcrypt from "bcrypt";
import { createSuperAdminIfNotExists } from "./utils/createSuperAdmin.js";
import superAdminRoutes from "./routes/superAdminRoute.js";
import staffRoutes from "./routes/staffRoutes.js";


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/staff", staffRoutes);


app.get("/", (req, res) => {
  res.send("API Working")
});

// Routes
app.use("/api/superadmin", superAdminRoutes);

app.listen(port, () => console.log(`Server started on PORT:${port}`))





createSuperAdminIfNotExists();