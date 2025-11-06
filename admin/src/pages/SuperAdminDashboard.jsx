// src/pages/SuperAdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../components/AdminTable";

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/superadmin/login");
      return;
    }
    fetchAdmins();
  }, [token]);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/staff/admins", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAdmins(data.admins || []);
    } catch (err) {
      setError("Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/staff/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAdmin),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to create admin");
        return;
      }
      alert("✅ Admin created successfully!");
      setNewAdmin({ name: "", email: "", password: "" });
      fetchAdmins();
    } catch (err) {
      setError("Server error while creating admin");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/staff/admins/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete admin");
      alert("Admin deleted successfully");
      fetchAdmins();
    } catch (err) {
      setError("Error deleting admin");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/superadmin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">Super Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Admin</h2>
          <form onSubmit={handleCreateAdmin} className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Admin Name"
              value={newAdmin.name}
              onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Admin Email"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <button
              type="submit"
              className="col-span-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Admin
            </button>
          </form>
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Existing Admins</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AdminTable admins={admins} onDelete={handleDelete} />
          )}
        </section>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
