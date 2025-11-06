# Hospital Management System (HMS)

A complete Hospital Management System built using the MERN Stack (MongoDB, Express.js, React, Node.js) with secure authentication, role-based dashboards, CRUD operations, and management for doctors, staff, and appointments.

## Tech Stack

Frontend:
- React.js (Vite)
- React Router DOM
- Context API
- Axios
- React Toastify
- Tailwind CSS

Backend:
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt.js for password hashing
- Multer for file uploads
- dotenv for environment variables

## User Roles & Access Levels

| Role | Description | Permissions |
|------|--------------|-------------|
| Super Admin | System owner | Can create admins, manage all data |
| Admin | Hospital manager | Manage doctors, staff, appointments |
| Doctor | Medical practitioner | Manage patients, appointments, prescriptions |
| Nurse / Receptionist | Hospital staff | Manage appointments and patient data |
| Patient | User | Book appointments, view doctors, view reports |

## Authentication & Authorization

- Super Admin credentials are stored in the `.env` file
- Other users (Admin, Doctor, Staff) are stored in MongoDB
- Each login generates a JWT stored in localStorage
- Middlewares protect access to restricted dashboards:
  - authSuperAdmin.js
  - authAdmin.js
  - authDoctor.js
  - authStaff.js

## Key Features

- Secure login for each role
- Role-based dashboards
- CRUD operations for doctors, nurses, and receptionists
- Staff handled under a single Staff model
- Appointment booking and management
- File upload for prescriptions
- Validation and error handling
- Responsive design
- Token-based authorization

## Installation & Setup

1. Clone the repository
   git clone https://github.com/MJ41739/Hospital-Management-System-using-MERN-Stack.git
   cd hospital-management-system

2. Backend setup
   cd backend
   npm install

3. Create a .env file inside backend folder:
   MONGODB_URI=mongodb+srv://<database-username>:<password>@cluster0.6d7nwvz.mongodb.net/?appName=Cluster0
   JWT_SECRET=abcdefghijklmnopqrstuvwxyz12345ABCDEFGHIJKLMNOPQRSTUVWXYZ67890
   PORT=5000
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   SUPER_ADMIN_EMAIL=superadmin@hospital.com
   SUPER_ADMIN_PASSWORD=12345678
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

4. Start backend server
   npm run server

5. Frontend setup
   cd ../frontend
   npm install
   npm run dev

6. Open frontend in browser:
   http://localhost:5173

## API Endpoints

| Endpoint | Method | Description | Auth |
|-----------|---------|-------------|------|
| /api/superadmin/login | POST | Super Admin login | Public |
| /api/admin/login | POST | Admin login | Public |
| /api/staff/login | POST | Staff (Nurse/Receptionist) login | Public |
| /api/doctor/login | POST | Doctor login | Public |
| /api/admin/add-doctor | POST | Add Doctor | Admin |
| /api/admin/add-staff | POST | Add Staff (Nurse/Receptionist) | Admin |
| /api/admin/staff | GET | Get all staff | Admin |
| /api/admin/delete-staff/:id | DELETE | Delete staff | Admin |
| /api/doctor/appointments | GET | Get doctor appointments | Doctor |
| /api/user/doctors | GET | Get doctor list | Public |

## Quick Start Demo (Sample Credentials)

Super Admin
Email: superadmin@hospital.com
Password: 12345678
Login URL: http://localhost:5173/superadmin/login
Dashboard: http://localhost:5173/superadmin/dashboard

Admin
Email: admin001@hospital.com
Password: 12345678
Login URL: http://localhost:5174/
Dashboard: http://localhost:5174/admin/dashboard

Doctor
Email: doctor001@gmail.com
Password: 12345678
Login URL: http://localhost:5174/
Dashboard: http://localhost:5174/doctor/dashboard

Staff (Nurse)
Email: nurse001@hospital.com
Password: 12345678
Login URL: http://localhost:5174/staff-login
Dashboard: http://localhost:5174/staff-dashboard

Staff (Receptionist)
Email: receptionist001@hospital.com
Password: 12345678
Login URL: http://localhost:5173/staff-login
Dashboard: http://localhost:5173/staff-dashboard

## Role Permissions

| Role | Permissions |
|------|--------------|
| Super Admin | Create and manage Admins |
| Admin | Manage Doctors, Nurses, Receptionists |
| Doctor | Manage Appointments, View Patients |
| Nurse/Receptionist | Manage Appointments, View Patient Info |
| Patient | Book appointments, View doctors and reports |

## Future Enhancements

- Add real-time chat between doctor and patient
- Add email/SMS notifications
- Appointment reminder system
- Cloud storage integration (AWS/Firebase)
- Patient medical history tracking

## Deployment

Frontend: Vercel
Backend: Render
Database: MongoDB Atlas

## Author

Developed by: Your Name
GitHub: https://github.com/MJ41739
LinkedIn: https://www.linkedin.com/in/mayur-j41739
