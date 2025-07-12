import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { images } from "../constants/images";
import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/solid";

const categories = [
  { label: "Sherwani", icon: images.sherwani },
  { label: "Gowns", icon: images.gown },
  { label: "Blazers", icon: images.blazer },
  { label: "Party Wear", icon: images.partywear },
  { label: "Formal Wear", icon: images.formal },
  { label: "Ethnic Wear", icon: images.ethnic },
  { label: "Indo-Western", icon: images.indowestern },
  { label: "Western Wear", icon: images.western },
  { label: "All", icon: images.all },
];

const allProducts = [
  { id: 1, name: "Evening Gown", image: images.gown, price: "₹799", category: "Gowns" },
  { id: 2, name: "Saree", image: images.ethnic, price: "₹499", category: "Ethnic Wear" },
  { id: 3, name: "Tuxedo", image: images.formal, price: "₹999", category: "Formal Wear" },
  { id: 4, name: "Sherwani", image: images.sherwani, price: "₹1199", category: "Sherwani" },
  { id: 5, name: "Blazer", image: images.blazer, price: "₹899", category: "Blazers" },
  { id: 6, name: "Indo-Western Suit", image: images.indowestern, price: "₹1099", category: "Indo-Western" },
  { id: 7, name: "Western Dress", image: images.western, price: "₹599", category: "Western Wear" },
  { id: 8, name: "Party Wear Dress", image: images.partywear, price: "₹749", category: "Party Wear" },
  { id: 9, name: "Gown Deluxe", image: images.gown, price: "₹999", category: "Gowns" },
  { id: 10, name: "Classic Sherwani", image: images.sherwani, price: "₹1299", category: "Sherwani" },
];

const ITEMS_TO_SHOW = 4;

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_TO_SHOW);
  const [viewMode, setViewMode] = useState("grid");

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((item) => item.category === selectedCategory);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(ITEMS_TO_SHOW);
  };

  const handleLoadMore = () => {
    setVisibleCount(filteredProducts.length);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-pink-600 mb-6">Catalog</h1>

      {/* Category Tabs */}
      <div className="flex flex-wrap md:flex-wrap gap-3 mb-6 pb-2 md:overflow-x-auto md:scrollbar-thin md:scrollbar-thumb-gray-300">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => handleCategoryChange(cat.label)}
            className={`flex flex-col items-center 
        w-1/4 sm:w-[22%] md:w-auto 
        text-[11px] sm:text-xs md:text-sm 
        px-2 py-2 rounded-md whitespace-nowrap
        transition-all duration-150
        ${selectedCategory === cat.label
                ? "bg-pink-100 text-pink-600"
                : "bg-gray-100 text-gray-700"
              }`}
          >
            <img
              src={cat.icon}
              alt={cat.label}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 mb-1 object-contain rounded-xl"
            />
            {cat.label}
          </button>
        ))}
      </div>



      {/* View Toggle */}
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded ${viewMode === "grid" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          <Squares2X2Icon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded ${viewMode === "list" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          <ListBulletIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Product View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition flex flex-col min-h-[22rem]" // 👈 key change
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 sm:h-56 object-cover rounded-md mb-3"
              />

              <div className="flex-1 flex flex-col">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-pink-600 font-semibold">{item.price}</p>

                <div className="mt-auto">
                  <button className="px-4 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 w-max">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {visibleProducts.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-32 sm:h-32 object-cover rounded-md"
              />

              {/* Text + Button container */}
              <div className="flex-1 flex flex-col justify-between h-full min-h-[8rem] sm:min-h-0">
                <div className="mb-2">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-pink-600 font-semibold">{item.price}</p>
                </div>
                <div className="mt-auto">
                  <button className="px-4 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 w-max">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Products */}
      {visibleProducts.length === 0 && (
        <p className="text-gray-500 col-span-full text-center mt-4">No products found.</p>
      )}

      {/* Load More Button */}
      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Load More
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
