import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import useItems from "../hooks/useItems"; // ✅ Corrected import


const FlashSaleSection = () => {
  const { items, loading, error } = useItems();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const flashItems = items.slice(0, 6); // simulate flash sale

  return (
    <div className="bg-white py-10 sm:px-12 dark:bg-black dark:text-white">
      <div className="flex justify-end items-end mb-6">
        <div className="flex gap-2">
          <button
            ref={prevRef}
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <ChevronLeftIcon className="w-4 h-4 text-gray-600 dark:text-white" />
          </button>
          <button
            ref={nextRef}
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <ChevronRightIcon className="w-4 h-4 text-gray-600 dark:text-white" />
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading Flash Sale...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load items.</p>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
        >
          {flashItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-gray-100 shadow-lg rounded-lg p-4">
                <Link to={`/product/${item.id}`}>
                <img
                  src={
                    item.images?.[0]?.image ||
                    "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  alt={item.name}
                  className="w-full h-[300px] object-cover rounded-md mb-3"
                /></Link>
                <h3 className="text-sm font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-indigo-600 font-bold text-lg">
                  ₹{parseInt(item.daily_rate)}
                  <span className="text-gray-400 text-sm line-through ml-2">
                    ₹{parseInt(item.daily_rate) * 2}
                  </span>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FlashSaleSection;
