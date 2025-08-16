import React, { useState } from "react";

const Settings = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Here you would send the data to your backend API
    const userData = { name, email, phone, profilePic };
    console.log("Saving user data:", userData);
    alert("Profile saved successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700"
          >
            📷
          </label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@email.com"
        />
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="+91 98765 43210"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Settings;
