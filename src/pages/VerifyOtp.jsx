// src/pages/VerifyOtp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import Navbar from "../components/Navbar";
import { FaUserCircle } from "react-icons/fa";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("email");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post(`/api/auth/verify-otp/`, {
        email,
        otp,
      });
      if (res.status === 200 && res.data.access) {
        localStorage.setItem("accessToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);

        localStorage.setItem(
          "user",
          JSON.stringify({
            email: email,
            name: email.split("@")[0], // basic fallback name
            picture: null, // fallback avatar
            access: res.data.access,   // ✅ store token here
            refresh: res.data.refresh, // optional
          })
        );

        setMessage("OTP verified successfully!");
        navigate("/");
      } else {
        setMessage("Verification failed: Missing token in response.");
      }
    } catch (error) {
      setMessage(error.response?.data?.detail || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
            Enter OTP
          </h2>
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-center text-red-600">{message}</p>}
        </div>
      </div>
    </>
  );
}
