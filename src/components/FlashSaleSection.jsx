import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { images } from "../constants/images";

const flashProducts = [
  {
    name: "Designer Blazer",
    rent: 499,
    originalRent: 999,
    image: images.blazer,
    rented: 8,
  },
  {
    name: "Evening Gown",
    rent: 699,
    originalRent: 1299,
    image: images.gown,
    rented: 12,
  },
  {
    name: "Royal Sherwani",
    rent: 899,
    originalRent: 1499,
    image: images.sherwani,
    rented: 15,
  },
  {
    name: "Kurta Set",
    rent: 399,
    originalRent: 799,
    image: images.indowestern,
    rented: 6,
  },
  {
    name: "Designer Saree",
    rent: 749,
    originalRent: 1499,
    image: images.saree,
    rented: 10,
  },
];

const FlashSaleSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="bg-white py-10 px-4 sm:px-12">
      {/* Header row with title and buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
          ⚡ Flash Sale
        </h2>
        <div className="flex gap-2">
          <button
            ref={prevRef}
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
          </button>
          <button
            ref={nextRef}
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

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
        {flashProducts.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-50 shadow rounded-lg p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-sm font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-indigo-600 font-bold text-lg">
                ₹{item.rent}
                <span className="text-gray-400 text-sm line-through ml-2">
                  ₹{item.originalRent}
                </span>
              </p>
              {/* <div className="mt-2 text-xs text-gray-600">
                Rented {item.rented} times
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FlashSaleSection;
