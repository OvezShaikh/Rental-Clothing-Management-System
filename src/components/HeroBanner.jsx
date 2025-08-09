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
    image: images.heroimg1,
    title: "Look Luxe, Spend Less",
    subtitle: "Designer-grade outfits, rental prices. 24-hour delivery.",
  },
  {
    image: images.heroimg5,
    title: "Tradition, Tailored",
    subtitle: "Hand-picked sarees, lehengas & kurta sets for every festivity.",
  },
  {
    image: images.heroimg4,
    title: "Rent. Rock. Repeat.",
    subtitle: "One outfit, one night, endless compliments—then back it goes.",
  },
];

const HeroBanner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full">
      {/* Custom Nav Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 z-20 hidden sm:block">
        <button
          ref={prevRef}
          className="bg-opacity-100 p-2 rounded-full shadow hover:bg-indigo-100"
        >
          <ChevronLeftIcon className="w-8 h-8 text-black" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20 hidden sm:block">
        <button
          ref={nextRef}
          className="bg-opacity-100 p-2 rounded-full shadow hover:bg-indigo-100"
        >
          <ChevronRightIcon className="w-8 h-8 text-black" />
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
            <div className="relative w-full h-[500px] flex justify-center items-center overflow-hidden">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-black/40 py-6 px-8">
                <h2 className="text-3xl sm:text-5xl font-bold text-white">{slide.title}</h2>
                <p className="mt-2 text-lg text-gray-200">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
