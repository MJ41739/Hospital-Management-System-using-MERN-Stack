import React, { useContext } from "react";
import { DoctorContext } from "./context/DoctorContext";
import { AdminContext } from "./context/AdminContext";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import Login from "./pages/Login";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import SuperAdminLogin from "./pages/SuperAdminLogin.jsx";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AddStaff from "./pages/Admin/AddStaff.jsx";
import ManageStaff from "./pages/Admin/ManageStaff.jsx";
import StaffLogin from "./pages/StaffLogin.jsx";
import StaffDashboard from "./pages/StaffDashboard.jsx";
import StaffProtectedRoute from "./components/StaffProtectedRoute.jsx";

const App = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);
  const { sToken } = useContext(AdminContext);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />

        <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />

        <Route path="/staff-login" element={<StaffLogin />} />


        <Route path="/" element={<Login />} />

        {dToken || aToken || sToken ? (
          <Route
            path="/*"
            element={
              <div className="bg-[#F8F9FD]">
                <Navbar />
                <div className="flex items-start">
                  <Sidebar />
                  <Routes>
                    <Route path="/admin-dashboard" element={<Dashboard />} />
                    <Route path="/admin/add-staff" element={<AddStaff />} />
                    <Route path="/admin/manage-staff" element={<ManageStaff />} />
                    <Route path="/staff-dashboard" element={<StaffProtectedRoute><StaffDashboard /></StaffProtectedRoute> } />
                    <Route path="/all-appointments" element={<AllAppointments />} />
                    <Route path="/add-doctor" element={<AddDoctor />} />
                    <Route path="/doctor-list" element={<DoctorsList />} />
                    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                    <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                    <Route path="/doctor-profile" element={<DoctorProfile />} />
                  </Routes>
                </div>
              </div>
            }
          />
        ) : null}
      </Routes>
    </>
  );
};

export default App;
