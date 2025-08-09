import React, { useEffect, useState } from "react";
import axios from "axios";
import { images } from "../constants/images"; // Adjust path if needed
import { LuSparkle } from "react-icons/lu";

const CategoryIcons = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map category IDs to readable parent names
  const categoryMap = {
    14: "Womens",
    13: "Mens",
    15: "Couple",
    // add more IDs if needed
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await axios.get(
          "https://aliasgar.pythonanywhere.com/api/rentals/subcategories/"
        );
        setSubcategories(res.data || []);
      } catch (err) {
        console.error("Failed to load subcategories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);

  const getSubcategories = (parentName) =>
    subcategories.filter((sub) => categoryMap[sub.category] === parentName);

  // Card Component
  const CategoryCard = ({ cat }) => (
    <div className="group relative overflow-hidden rounded-none shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      {/* Image */}
      <img
        src={cat.image || images.cremejacket}
        alt={cat.name}
        className="w-full h-[320px] object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      {/* Label */}
      <div className="flex flex-row justify-center absolute gap-2 items-center bottom-2 left-0 w-full bg-white/90 text-center py-2 tracking-wider uppercase font-semibold text-gray-800 border-t border-gray-300">
        <LuSparkle size={12} stroke="black" fill="black" style={{ transform: "scaleY(1.5)" }} />
        {cat.name}
        <LuSparkle size={12} stroke="black" fill="black" style={{ transform: "scaleY(1.5)" }} />
      </div>
    </div>
  );

  const CategoryRow = ({ title, items }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {title}
      </h2>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No subcategories found.</p>
      )}
    </div>
  );

  return (
    <div className="px-6 py-10 bg-white dark:bg-gray-900">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <CategoryRow title="Women" items={getSubcategories("Womens")} />
          <CategoryRow title="Mens" items={getSubcategories("Mens")} />
          <CategoryRow title="Couple" items={getSubcategories("Couple")} />
        </>
      )}
    </div>
  );
};

export default CategoryIcons;
