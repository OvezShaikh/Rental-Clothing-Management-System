// src/pages/Logout.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user"); // if you're saving user data too
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showModal]);

  return (
    showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Sign Out</h2>
          <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  );
}
