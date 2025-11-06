import React from "react";

const StaffDashboard = () => {
  const staffRole = localStorage.getItem("staffRole");

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-black">Welcome to {staffRole} Dashboard</h1>
      <p className="mt-2 text-gray-600">This area will display staff features.</p>
    </div>
  );
};

export default StaffDashboard;
