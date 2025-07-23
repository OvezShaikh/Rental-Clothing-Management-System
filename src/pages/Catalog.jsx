import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/solid";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import useCategories from "../hooks/useCategories";
import useItems from "../hooks/useItems";   // ✅ Correct hook import

const ITEMS_TO_SHOW = 4;

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_TO_SHOW);
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  const { categories, loading: loadingCategories } = useCategories();
  const { items, loading: loadingItems } = useItems();  // ✅ Correct usage

  const filteredProducts =
  selectedCategory === "All"
    ? items
    : items.filter((item) => {
        const cat = categories.find((c) => c.id === item.category);
        return cat?.name === selectedCategory;
      });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(ITEMS_TO_SHOW);
  };

  const handleLoadMore = () => {
    setVisibleCount(filteredProducts.length);
  };

  const goToProductPage = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  if (loadingCategories || loadingItems) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-500">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-pink-600 mb-6">Catalog</h1>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-6 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
        <button
          onClick={() => handleCategoryChange("All")}
          className={`flex flex-col items-center px-3 py-1 rounded-md whitespace-nowrap ${
            selectedCategory === "All"
              ? "bg-pink-100 text-pink-600"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {selectedCategory === "All" ? (
            <FcOpenedFolder className="w-8 h-8 mb-1" />
          ) : (
            <FcFolder className="w-8 h-8 mb-1" />
          )}
          All
        </button>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => handleCategoryChange(cat.name)}
            className={`flex flex-col items-center px-3 py-1 rounded-md whitespace-nowrap ${
              selectedCategory === cat.name
                ? "bg-pink-100 text-pink-600"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <img
              src={cat.image || "https://via.placeholder.com/40"}
              alt={cat.name}
              className="w-8 h-8 mb-1 object-cover rounded-full"
            />
            {cat.name}
          </button>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded ${
            viewMode === "grid"
              ? "bg-pink-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <Squares2X2Icon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded ${
            viewMode === "list"
              ? "bg-pink-500 text-white"
              : "bg-gray-200 text-gray-700"
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
              onClick={() => goToProductPage(item)}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition flex flex-col min-h-[22rem] cursor-pointer"
            >
              <img
                src={item.images?.length > 0 ? item.images[0].image : "https://via.placeholder.com/400"}
                alt={item.name}
                className="w-full h-[400px] sm:h-[400px] object-cover rounded-md mb-3 dark:text-black"
              />

              <div className="flex-1 flex flex-col">
                <h2 className="text-lg font-semibold dark:text-black">{item.name}</h2>
                <p className="text-pink-600 font-semibold">₹{item.daily_rate}</p>

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
              onClick={() => goToProductPage(item)}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={item.images?.length > 0 ? item.images[0].image : "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-full sm:w-32 sm:h-32 object-cover rounded-md"
              />

              <div className="flex-1 flex flex-col justify-between h-full min-h-[8rem] sm:min-h-0">
                <div className="mb-2">
                  <h2 className="text-lg font-semibold dark:text-black">{item.name}</h2>
                  <p className="text-pink-600 font-semibold">₹{item.daily_rate}</p>
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

      {visibleProducts.length === 0 && (
        <p className="text-gray-500 col-span-full text-center mt-4">
          No products found.
        </p>
      )}

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
