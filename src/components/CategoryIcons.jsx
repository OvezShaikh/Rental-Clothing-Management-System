// components/CategoryIcons.jsx
import React from "react";
import { images } from "../constants/images";

const categories = [
  { label: "Sherwani", icon: images.sherwani },
  { label: "Gowns", icon: images.gown },
  { label: "Blazers", icon: images.blazer },
  { label: "Party Wear", icon: images.partywear },
  { label: "Formal Wear", icon: images.formal },
  { label: "Ethnic Wear", icon: images.ethnic },
  { label: "Indo-Western", icon: images.indowestern },
  { label: "Western Wear", icon: images.western },
  { label: "All", icon: images.all },
];

const CategoryIcons = () => {
  return (
    <div className="flex overflow-x-auto gap-10 px-4 py-6 bg-white justify-center">
      {categories.map((cat, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center min-w-[70px] hover:scale-105 transition-transform duration-200"
        >
          <img
            src={cat.icon}
            alt={cat.label}
            className="w-16 h-16 mb-2 object-cover rounded-full shadow-sm"
          />
          <span className="text-sm text-gray-700">{cat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryIcons;
