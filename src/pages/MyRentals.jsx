import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";

export default function MyRentals() {
  const [myRentals, setMyRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchRentals = async () => {
    setLoading(true);
    const userData = JSON.parse(localStorage.getItem("user"));

    try {
      let response;

      if (userData?.access) {
        // ✅ OTP login → use real access token
        response = await axios.get(
          "https://aliasgar.pythonanywhere.com/api/rentals/orders/",
          {
            headers: {
              Authorization: `Bearer ${userData.access}`,
            },
          }
        );
      } else if (userData?.email) {
        // ✅ Google login → still send something in Authorization header
        const identifier = userData.sub || userData.email;
        response = await axios.get(
          "https://aliasgar.pythonanywhere.com/api/rentals/orders/",
          {
            headers: {
              Authorization: `Bearer ${identifier}`, // 👈 ensures header is always present
            },
          }
        );
      } else {
        throw new Error("User not authenticated");
      }

      setMyRentals(response.data);
    } catch (err) {
      console.error("❌ Rentals fetch error:", err.response?.data || err.message);
      setError("Failed to fetch rentals.");
    } finally {
      setLoading(false);
    }
  };

  fetchRentals();
}, []);


  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-500">Loading your rentals...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p className="text-center text-red-500">{error}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-pink-600 mb-6">My Rentals</h1>
      {myRentals.length === 0 ? (
        <p className="text-gray-500">You have no rentals yet.</p>
      ) : (
        <div className="space-y-6">
          {myRentals.map((rental) => (
            <div
              key={rental.id}
              className="bg-white rounded-lg shadow-md flex items-center gap-4 p-4"
            >
              <img
                src={rental.image || "/img/fallback.jpg"}
                alt={rental.item}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold dark:text-black">
                  {rental.item}
                </h2>
                <p className="text-gray-500">
                  Rented from: {rental.start_date} To: {rental.end_date}
                </p>
                <span
                  className={`text-sm px-3 py-1 rounded-full inline-block mt-1 ${
                    rental.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {rental.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
