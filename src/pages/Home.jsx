import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { images } from "../constants/images";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import BentoGrid from "../components/BentoGrid";
import ProductQuickView from "../components/ProductQuickView";

const tempProduct = [
  {
    name: "Men's Designer Blazer",
    category: "Men / Formal",
    rent: 499,
    image: images.brownjacket,
    colors: [
      { id: "brown", name: "Brown", classes: "bg-yellow-900 checked:outline-yellow-900" },
      { id: "black", name: "Black", classes: "bg-black checked:outline-black" }
    ],
    sizes: [
      { id: "M", name: "M", inStock: true },
      { id: "L", name: "L", inStock: true },
      { id: "XL", name: "XL", inStock: false }
    ]
  },
  {
    name: "Women's Evening Gown",
    category: "Women / Partywear",
    rent: 699,
    image: images.cremejacket,
    colors: [
      { id: "brown", name: "Brown", classes: "bg-yellow-900 checked:outline-yellow-900" },
      { id: "black", name: "Black", classes: "bg-black checked:outline-black" }
    ],
    sizes: [
      { id: "M", name: "M", inStock: true },
      { id: "L", name: "L", inStock: true },
      { id: "XL", name: "XL", inStock: false }
    ]
  },
  {
    name: "Traditional Sherwani",
    category: "Men / Wedding",
    rent: 899,
    image: images.brownjacket,
    colors: [
      { id: "brown", name: "Brown", classes: "bg-yellow-900 checked:outline-yellow-900" },
      { id: "black", name: "Black", classes: "bg-black checked:outline-black" }
    ],
    sizes: [
      { id: "M", name: "M", inStock: true },
      { id: "L", name: "L", inStock: true },
      { id: "XL", name: "XL", inStock: false }
    ]
  }
];

const imageList = [
  { image: images.brownjacket },
  { image: images.cremejacket },
  { image: images.brownjacket }
];

const Home = () => {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const hoverTimer = useRef(null);

  const handleMouseEnter = (product) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setActiveProduct(product);
      setQuickViewOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setQuickViewOpen(false);
      setActiveProduct(null);
    }, 200);
  };

  return (
    <>
      <Navbar />
      <Carousel images={imageList} />

      <main className="min-h-screen bg-white flex flex-col items-center pt-6">
        {/* Hero Section */}
        <section className="max-w-3xl w-full mt-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-6 leading-tight">
            Your Wardrobe, On Demand
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Discover a smarter way to dress. Rent stylish, high-quality clothing with ease — for weddings, formals, parties, and everyday fashion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/products">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition text-sm font-medium">
                Browse Collection
              </button>
            </Link>
            <Link to="/register">
              <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md shadow hover:bg-gray-300 transition text-sm font-medium">
                Join Now
              </button>
            </Link>
          </div>
        </section>

        {/* Product Section */}
        <section className="mt-12 w-full max-w-5xl flex flex-wrap justify-center gap-6">
          {tempProduct.map((product, index) => (
            <div key={index} className="relative">
              <ProductCard
                product={product}
                onImageHoverEnter={() => handleMouseEnter(product)}
                
              />
            </div>
          ))}
        </section>

        {/* Quick View Modal */}
        {activeProduct && (
          <ProductQuickView
            product={activeProduct}
            open={quickViewOpen}
            setOpen={setQuickViewOpen}
            onImageHoverLeave={handleMouseLeave}
          />
        )}

        {/* Bento Grid Section */}
        <section className="mt-12 w-full max-w-8xl flex flex-wrap justify-center gap-4">
          <BentoGrid />
        </section>

        {/* Info Footer */}
        <section className="mt-12 text-gray-500 text-sm text-center px-4">
          <p>
            Explore our collection of high-quality, stylish clothing available for rent. From casual wear to formal attire, we have something for every occasion.
          </p>
          <p className="mt-2">
            <span className="font-semibold">Note:</span> All images are sourced from Unsplash and are used for demonstration purposes only.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
