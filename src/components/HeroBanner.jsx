import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { images } from "../constants/images";

const bannerSlides = [
  {
    title: "Premium Blazers for Rent",
    subtitle: "Perfect for interviews, meetings, and weddings",
    image: images.brownjacket, // replace with your blazer image
    bg: "bg-[#F0F4FF]",
  },
  {
    title: "Stylish Jackets On Demand",
    subtitle: "Stay warm and trendy without the investment",
    image: images.cremejacket, // replace with your jacket image
    bg: "bg-[#FFF5F5]",
  },
  {
    title: "All-Occasion Clothes Rental",
    subtitle: "Rent outfits for parties, dates, or casual outings",
    image: images.all, // replace with your general clothing image
    bg: "bg-[#F5FFF9]",
  },
];


const HeroBanner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full">
      {/* Custom buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 z-10">
        <button
          ref={prevRef}
          className="bg-white p-2 rounded-full shadow hover:bg-indigo-100"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10">
        <button
          ref={nextRef}
          className="bg-white p-2 rounded-full shadow hover:bg-indigo-100"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="w-full"
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`${slide.bg} h-[450px] w-full lg:flex`}>
              {/* Left content */}
              <div className="lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 space-y-4">
                <h2 className="text-3xl sm:text-5xl font-bold text-gray-900">
                  {slide.title}
                </h2>
                <p className="text-gray-600 text-lg">{slide.subtitle}</p>
                <div className="flex gap-4 mt-2">
                  <button className="bg-indigo-600 text-white px-5 py-3 rounded-md text-sm hover:bg-indigo-700">
                    Browse Now
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-5 py-3 rounded-md text-sm hover:bg-gray-300">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right image */}
              <div className="lg:w-1/2 h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
