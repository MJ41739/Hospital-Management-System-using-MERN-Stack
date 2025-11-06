// src/components/AdminTable.jsx
import React from "react";

const AdminTable = ({ admins, onDelete }) => {
  if (!admins.length) {
    return <p className="text-gray-600">No admins found.</p>;
  }

  return (
    <table className="w-full border border-gray-300 rounded-lg">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Created At</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {admins.map((admin) => (
          <tr key={admin._id} className="border-t hover:bg-gray-50">
            <td className="p-3">{admin.name}</td>
            <td className="p-3">{admin.email}</td>
            <td className="p-3">
              {new Date(admin.createdAt).toLocaleDateString()}
            </td>
            <td className="p-3 text-center">
              <button
                onClick={() => onDelete(admin._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
