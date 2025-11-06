import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ salary: "", phone: "" });

  const fetchStaff = async () => {
    try {
      const atoken = localStorage.getItem("aToken");
      const res = await axios.get("http://localhost:5000/api/admin/staff", {
        headers: { atoken },
      });
      if (res.data.success) setStaff(res.data.data);
      else toast.error(res.data.message);
    } catch (error) {
      toast.error("Error fetching staff");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const deleteStaff = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;
    try {
      const atoken = localStorage.getItem("aToken");
      const res = await axios.delete(
        `http://localhost:5000/api/admin/delete-staff/${id}`,
        { headers: { atoken } }
      );
      if (res.data.success) {
        toast.success("Deleted successfully");
        fetchStaff();
      } else toast.error(res.data.message);
    } catch (error) {
      toast.error("Error deleting staff");
      console.error(error);
    }
  };

  const startEdit = (item) => {
    setEditing(item._id);
    setEditData({ salary: item.salary, phone: item.phone });
  };

  const updateStaff = async (id) => {
    try {
      const atoken = localStorage.getItem("aToken");
      const res = await axios.put(
        `http://localhost:5000/api/admin/update-staff/${id}`,
        editData,
        { headers: { atoken } }
      );
      if (res.data.success) {
        toast.success("Updated successfully");
        setEditing(null);
        fetchStaff();
      } else toast.error(res.data.message);
    } catch (error) {
      toast.error("Error updating staff");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Staff</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Salary</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2 capitalize">{item.role}</td>
                <td className="p-2">{item.email}</td>
                <td className="p-2">
                  {editing === item._id ? (
                    <input
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    item.phone
                  )}
                </td>
                <td className="p-2">
                  {editing === item._id ? (
                    <input
                      type="number"
                      value={editData.salary}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          salary: e.target.value,
                        }))
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    item.salary
                  )}
                </td>
                <td className="p-2 space-x-2">
                  {editing === item._id ? (
                    <>
                      <button
                        onClick={() => updateStaff(item._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(item)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStaff(item._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStaff;
