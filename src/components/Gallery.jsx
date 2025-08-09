import React from "react";
import { images } from "../constants/images";

const Gallery = () => {
  const galleryImages = [
    {
      id: 1,
      src: images.ai1,
      alt: "Elegant Evening Dress",
    },
    {
      id: 2,
      src: images.ai2,
      alt: "Casual Party Wear",
    },
    {
      id: 3,
      src: images.ai3,
      alt: "Wedding Sherwani",
    },
    {
      id: 4,
      src: images.ai4,
      alt: "Lehenga Collection",
    },
    {
      id: 5,
      src: images.ai5,
      alt: "Designer Saree",
    },
    {
      id: 6,
      src: images.ai6,
      alt: "Western Gowns",
    },
  ];

  return (
    <section className="py-10 px-5 bg-gray-50 dark:bg-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold text-center mb-8">
        Our <span className="text-pink-500">Gallery</span>
      </h2>
      <div className="h-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="overflow-hidden w-full rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
