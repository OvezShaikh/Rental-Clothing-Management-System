import React from "react";
import { images } from "../constants/images"; // adjust path if needed

const ShopGallery = () => {
  return (
    <section className=" mx-auto px-4 bg-gray-50 dark:bg-black py-10 transition-colors duration-300">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-100">
        Our Stores
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4 bg-gray-100 dark:bg-black rounded-2xl shadow-inner transition-all duration-300">
        <img
          src={images.shop1}
          alt="Paridhra Shop Exterior"
          className="w-full sm:w-1/2 max-w-md h-60 sm:h-72 object-cover rounded-2xl 
                     shadow-[0_4px_20px_rgba(0,0,0,0.3)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.15)]
                     transition-transform duration-300 hover:scale-[1.02]"
        />
        <img
          src={images.shop2}
          alt="Paridhra Shop Interior"
          className="w-full sm:w-1/2 max-w-md h-60 sm:h-72 object-cover rounded-2xl 
                     shadow-[0_4px_20px_rgba(0,0,0,0.3)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.15)]
                     transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>
    </section>
  );
};

export default ShopGallery;
