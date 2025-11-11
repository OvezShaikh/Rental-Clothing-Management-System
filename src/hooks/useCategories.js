import { useEffect, useState } from "react";
import axiosInstance from "../axios";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/rentals/categories/`)
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { categories, loading, error };
}