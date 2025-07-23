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
    image: images.brownjacket,
    bg: "bg-[#F0F4FF]",
  },
  {
    title: "Stylish Jackets On Demand",
    subtitle: "Stay warm and trendy without the investment",
    image: images.cremejacket,
    bg: "bg-[#FFF5F5]",
  },
  {
    title: "All-Occasion Clothes Rental",
    subtitle: "Rent outfits for parties, dates, or casual outings",
    image: images.all,
    bg: "bg-[#F5FFF9]",
  },
];

const HeroBanner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full">
      {/* Custom buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 z-20 hidden sm:block">
        <button
          ref={prevRef}
          className="bg-white p-2 rounded-full shadow hover:bg-indigo-100"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20 hidden sm:block">
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
            <div
              className={`${slide.bg} h-[450px] w-full flex flex-col lg:flex-row items-center relative`}
            >
              {/* Background image only on mobile */}
              <div
                className="absolute inset-0 lg:hidden"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="lg:hidden sm:justify-center sm:text-center absolute inset-0 bg-black/40"></div>

              {/* Left content */}
              <div className="relative z-10 lg:w-1/2 flex flex-col justify-center items-center lg:items-start px-6 sm:px-14 sm:text-wrap space-y-4 text-center lg:text-left h-full">
                <h2 className="text-3xl sm:text-5xl font-bold text-white lg:text-black">
                  {slide.title}
                </h2>
                <p className="text-lg text-gray-200 lg:text-gray-600">
                  {slide.subtitle}
                </p>
                <div className="flex gap-4 mt-2 justify-center lg:justify-start">
                  <button className="bg-indigo-600 text-white px-5 py-3 rounded-md text-sm hover:bg-indigo-700">
                    Browse Now
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-5 py-3 rounded-md text-sm hover:bg-gray-300">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right image for desktop only */}
              <div className="hidden lg:block lg:w-1/2 h-full">
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
