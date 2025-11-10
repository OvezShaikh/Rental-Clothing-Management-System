import { useEffect, useState } from "react";
import axios from "axios";

export default function useSubCategories() {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/rentals/subcategories/`)
      .then((res) => {
        setSubCategories(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { subCategories, loading, error };
}
