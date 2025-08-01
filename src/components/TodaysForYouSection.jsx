// components/TodaysForYouSection.jsx
import React, { useState } from "react";
import { images } from "../constants/images";
// import ProductCard from "./ProductCard"; // If using your existing card

const tabs = ["All", "Men", "Women", "Occasion"];

const productData = {
  All: [
    {
      name: "Men's Sherwani",
      category: "Men / Wedding",
      rent: 799,
      image: images.whiteshervani,
    },
    {
      name: "Evening Gown",
      category: "Women / Party",
      rent: 899,
      image: images.imggreendress,
    },
    {
      name: "Formal Blazer",
      category: "Men / Formal",
      rent: 599,
      image: images.blazer,
    },
  ],
  Men: [
    {
      name: "Men's Sherwani",
      category: "Men / Wedding",
      rent: 799,
      image: images.whiteshervani,
    },
    {
      name: "Formal Blazer",
      category: "Men / Formal",
      rent: 599,
      image: images.blazer,
    },
  ],
  Women: [
    {
      name: "Evening Gown",
      category: "Women / Party",
      rent: 899,
      image: images.imggreendress,
    },
  ],
  Occasion: [
    {
      name: "Indo-Western Set",
      category: "Men / Reception",
      rent: 999,
      image: images.indowestern,
    },
    {
      name: "Saree Gown",
      category: "Women / Wedding",
      rent: 799,
      image: images.partywear,
    },
  ],
};

const TodaysForYouSection = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="bg-white py-10 px-4 sm:px-12 dark:bg-gray-800 dark:text-white">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white sm:text-xl">
          Today's For You
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-3 lg:gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-sm px-4 py-2 rounded-full ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productData[activeTab].map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 shadow rounded-md">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[300px] object-cover rounded-md mb-3"
            />
            <h3 className="text-md font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="mt-2 text-indigo-600 font-bold text-lg">
              ₹{item.rent}/day
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysForYouSection;
