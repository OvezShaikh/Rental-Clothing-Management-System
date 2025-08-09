import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Google Sign-in Initialization
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "800758080563-8cr6c4kpgu8iltqkm86vh8ovv3q5p1b5.apps.googleusercontent.com",
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      {
        theme: "outline",
        size: "large",
        width: 300,
      }
    );
  }, []);

  const handleGoogleLogin = (response) => {
    console.log(window.location.origin);
    const userData = jwtDecode(response.credential);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/catalog");
  };

  const handleSendOtp = async (e) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  try {
    const res = await axios.post("https://aliasgar.pythonanywhere.com/api/auth/send-otp/", {
      email,
    });

    if (res.status === 200 && res.data.detail?.includes("OTP")) {
      setMessage("OTP sent successfully. Please check your email.");
      localStorage.setItem("email", email);
      navigate("/verify-otp");
    } else {
      setMessage(res.data.detail || "Unexpected response.");
    }
  } catch (error) {
    setMessage(error.response?.data?.detail || "Login failed.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Login</h2>

          {/* Email to receive OTP */}
          <form onSubmit={handleSendOtp} className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

          <div className="text-center text-gray-500 my-4">or</div>

          {/* Google Sign-in */}
          <div id="google-signin-btn" className="w-full flex justify-center"></div>

          {message && <p className="mt-4 text-bold text-center text-red-600">{message}</p>}
        </div>
      </div>
    </>
  );
}
