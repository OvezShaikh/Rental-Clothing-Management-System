import { useState, useEffect } from "react";
import axiosInstance from "../axios";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData?.access) {
          setError("No active session. Please log in.");
          setLoading(false);
          return;
        }

        const res = await axiosInstance.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/list/`,
          {
            headers: { Authorization: `Bearer ${userData.access}` },
          }
        );

        setUsers(res.data || []);
      } catch (err) {
        console.error("❌ Users fetch error:", err.response?.data || err.message);
        setError("Failed to fetch users. Please login again.");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}
