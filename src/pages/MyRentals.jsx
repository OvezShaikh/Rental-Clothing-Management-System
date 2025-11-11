import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import axiosInstance from "../axios";

export default function MyRentals() {
  const [myRentals, setMyRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchRentals = async () => {
    setLoading(true);
    let userData = null;

    try {
      userData = JSON.parse(localStorage.getItem("user"));
      if (!userData?.access) {
        setError("No active session. Please log in.");
        setLoading(false);
        return;
      }

      const res = await axiosInstance.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/rentals/orders/`,
        { headers: { Authorization: `Bearer ${userData.access}` } }
      );

      // 👇 filter rentals by logged-in user’s email
      const filtered = (res.data || []).filter(
        (rental) =>
          rental.user_email === userData.email || rental.user === userData.username
      );

      setMyRentals(filtered);
    } catch (err) {
      console.error("❌ Rentals fetch error:", err.response?.data || err.message);
      setError("Failed to fetch rentals. Please login again.");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  fetchRentals();
}, []);


  if (loading)
    return (
      <DashboardLayout>
        <p className="text-center text-gray-500">Loading your rentals...</p>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout>
        <p className="text-center text-red-500">{error}</p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-pink-600 mb-6">My Rentals</h1>
      {myRentals.length === 0 ? (
        <p className="text-gray-500">You have no rentals yet.</p>
      ) : (
        <div className="space-y-3">
          {myRentals.map((rental) => (
            <div
              key={rental.id}
              className="bg-white rounded-lg shadow-md flex items-center justify-between gap-3 p-2"
            >
              <div className="flex items-center gap-4">
                <img
                  src={rental.image || "/img/fallback.jpg"}
                  alt={rental.item}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold dark:text-white">
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
              <Link
                to={`/track-order/${rental.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Track Order
              </Link>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
