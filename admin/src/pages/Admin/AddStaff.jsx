import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddStaff = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    salary: "",
    role: "nurse",
    address: { line1: "", line2: "" },
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const atoken = localStorage.getItem("aToken");
      
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/add-staff`,
        data,
        { headers: { atoken } }
      );

      if (res.data.success) {
        toast.success(`${data.role} added successfully!`);
        setData({
          name: "",
          email: "",
          password: "",
          phone: "",
          salary: "",
          role: "nurse",
          address: { line1: "", line2: "" },
        });
      } else {
        toast.error(res.data.message || "Error adding staff");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while adding staff");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Staff Member</h2>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4 max-w-xl"
      >
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            required
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={data.role}
            onChange={onChangeHandler}
            className="w-full border p-2 rounded-md"
          >
            <option value="nurse">Nurse</option>
            <option value="receptionist">Receptionist</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={onChangeHandler}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Salary</label>
          <input
            type="number"
            name="salary"
            value={data.salary}
            onChange={onChangeHandler}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Address Line 1</label>
          <input
            type="text"
            name="address.line1"
            value={data.address.line1}
            onChange={onChangeHandler}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Address Line 2</label>
          <input
            type="text"
            name="address.line2"
            value={data.address.line2}
            onChange={onChangeHandler}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Staff
        </button>
      </form>
    </div>
  );
};

export default AddStaff;
