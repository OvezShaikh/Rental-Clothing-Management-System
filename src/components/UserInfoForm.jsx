import { useState, useEffect } from "react";

export default function UserInfoForm({ userData, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || ""
      });
    }
  }, [userData]);
 console.log("UserInfoForm", userData, formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and Email are required!");
      return;
    }
    onUpdate(formData); // send updated data to parent
  };

  return (
    <form
      className="bg-white rounded-lg shadow-md p-6 space-y-4"
      onSubmit={handleSave}
    >
      <h2 className="text-xl font-semibold mb-4">User Information</h2>
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Address</label>
        <textarea
          name="address"
          rows="3"
          required
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Save Info
      </button>
    </form>
  );
}
