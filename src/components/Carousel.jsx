import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const total = images.length;
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  // Auto-slide
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide(); // cleanup
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide(); // prevent duplicates
    intervalRef.current = setInterval(nextSlide, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div
      ref={carouselRef}
      className="relative w-full max-w-6xl mx-auto mt-6 group"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* Slide */}
      <div className="overflow-hidden rounded-xl shadow-md">
        <img
          src={images[current].image}
          alt={`Slide ${current}`}
          className="w-full h-[500px] object-cover duration-700 ease-in-out"
        />
      </div>

      {/* Arrows */}
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-md text-gray-700 hover:bg-white/60 p-3 rounded-full shadow-md transition-transform duration-300 hover:scale-110"
        aria-label="Previous Slide"
      >
        <FaChevronLeft className="text-xl" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-md text-gray-700 hover:bg-white/60 p-3 rounded-full shadow-md transition-transform duration-300 hover:scale-110"
        aria-label="Next Slide"
      >
        <FaChevronRight className="text-xl" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${current === index
                ? "bg-blue-600 scale-110"
                : "bg-white border border-gray-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
