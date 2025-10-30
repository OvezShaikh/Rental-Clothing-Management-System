import React from "react";
import { images } from "../constants/images";

export default function TrendingLooks() {
  const banner = images.groupphoto; // replace with your banner image path
  const products = [
    images.d6,
    images.d5,
    images.d3,
    images.d4,
    images.d2,
    images.d1,
  ];

  return (
    <section className="mx-auto px-4 py-10 dark:bg-black w-full">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-wide text-gray-900 dark:text-gray-100">
          TOP TRENDING LOOKS
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Trendsetting Collections
        </p>
      </div>

      {/* Banner Image */}
      <div className="mb-10">
        <img
          src={banner}
          alt="Trending Banner"
          className="w-full h-[500px] rounded-xl shadow-lg object-cover object-top"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
        {products.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-md bg-white dark:bg-gray-800 hover:scale-105 transition-transform"
          >
            <img
              src={img}
              alt={`Trending ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
