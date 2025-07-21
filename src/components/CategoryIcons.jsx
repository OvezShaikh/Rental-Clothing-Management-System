import React, { useEffect, useState } from "react";
import axios from "axios";
import {images} from "../constants/images"; // Adjust the path as necessary

const CategoryIcons = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://aliasgar.pythonanywhere.com/api/rentals/categories/");
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex overflow-x-auto gap-10 px-4 py-6 bg-white dark:bg-gray-800 dark:text-white justify-center">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center min-w-[70px] hover:scale-105 transition-transform duration-200"
          >
            <img
              src={cat.icon || images.cremejacket} // fallback image
              alt={cat.name}
              className="w-16 h-16 mb-2 object-cover rounded-full shadow-sm"
            />
            <span className="text-sm text-gray-700 dark:text-white">{cat.name}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryIcons;
