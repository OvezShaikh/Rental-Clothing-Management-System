import { useEffect, useState } from "react";
import axiosInstance from "../axios";

export default function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/rentals/items/`)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { items, loading, error };
}
