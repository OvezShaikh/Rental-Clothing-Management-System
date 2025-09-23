import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useItems from "../hooks/useItems";
import useCategories from "../hooks/useCategories";

const tabs = ["all", "mens", "womens", "couple"]; // use slugs for matching

const TodaysForYouSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { items, loading } = useItems();
  const { categories } = useCategories();
  const navigate = useNavigate();

  const getCategoryName = (categoryStr, subcategorySlug = null) => {
  if (!categoryStr) return "Unknown";

  // If categoryStr is an object, extract name/slug
  let categoryName = "";
  let categorySlug = "";
  if (typeof categoryStr === "object") {
    categoryName = categoryStr.name || "";
    categorySlug = categoryStr.slug || "";
  } else if (typeof categoryStr === "string") {
    categoryName = categoryStr;
    categorySlug = categoryStr;
  } else {
    return "Unknown";
  }

  const parent = categories.find(
    (cat) =>
      cat.name?.toLowerCase() === categoryName.toLowerCase() ||
      cat.slug?.toLowerCase() === categorySlug.toLowerCase()
  );

  if (!parent) return "Unknown";

  if (subcategorySlug) {
    const sub = parent.subcategories?.find((sc) => sc.slug === subcategorySlug);
    if (sub) return sub.name;
  }

  return parent.name;
};


  const getCategorySlug = (categoryStr) => {
  if (!categoryStr) return "unknown";

  // If categoryStr is an object, try reading its name or slug
  if (typeof categoryStr === "object") {
    categoryStr = categoryStr.name || categoryStr.slug || "";
  }

  if (typeof categoryStr !== "string") return "unknown";

  const found = categories.find(
    (cat) =>
      cat.name?.toLowerCase() === categoryStr.toLowerCase() ||
      cat.slug?.toLowerCase() === categoryStr.toLowerCase()
  );

  return found ? found.slug.toLowerCase() : "unknown";
};

  const filteredItems = items.filter((item) => {
    const categorySlug = getCategorySlug(item.category);
    if (activeTab === "all") return true;
    return categorySlug === activeTab.toLowerCase();
  });

  const handleClick = (item) => {
    navigate(`/product/${item.id}`);
  };

  return (
    <div className="bg-white py-10 px-4 sm:px-12 dark:bg-black dark:text-white justify-end items-end">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-sm px-3 py-3 sm:px-3 sm:py-3 lg:px-4 lg:py-4 rounded-lg ${activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item)}
              className="bg-gray-50 p-4 shadow rounded-md cursor-pointer hover:shadow-md transition"
            >
              <img
                src={
                  item.images?.[0]?.image ||
                  "https://via.placeholder.com/300x400?text=No+Image"
                }
                alt={item.name}
                loading="lazy"
                className="w-full h-[300px] object-cover rounded-md mb-3"
              />
              <h3 className="text-md font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">
                {getCategoryName(item.category, item.subcategory_slug)}
              </p>
              <p className="mt-2 text-indigo-600 font-bold text-lg">
                ₹{parseInt(item.daily_rate)}/day
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaysForYouSection;
