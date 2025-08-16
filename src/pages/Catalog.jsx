import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/solid";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import useCategories from "../hooks/useCategories";
import useItems from "../hooks/useItems";
import useSubCategories from "../hooks/useSubcategories";

const ITEMS_TO_SHOW = 4;
const FALLBACK_IMAGE = "https://cdn-icons-png.flaticon.com/512/892/892458.png";

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_TO_SHOW);
  const [viewMode, setViewMode] = useState("grid");

  const { categories, loading: loadingCategories } = useCategories();
  const { items, loading: loadingItems } = useItems();
  const { subCategories, loading: loadingSubCategories } = useSubCategories();

  const navigate = useNavigate();
  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const categoryParam = queryParams.get("category");      // name
const categoryIdParam = queryParams.get("categoryId");  // id from query
const categoryIdFromState = location.state?.categoryId; // id from state
const subcategoryIdParam = queryParams.get("subcategoryId");     // subcategory id (query)
const subcategorySlugParam = queryParams.get("subcategory");     // subcategory slug (query)
const subcategoryIdFromState = location.state?.subcategoryId;    // subcategory id (state)
const subcategorySlugFromState = location.state?.subcategoryName; // subcategory slug/name (state)

useEffect(() => {
  if (categories.length) {
    let selectedId = null;

    // Priority: state → queryId → queryName
    if (categoryIdFromState) {
      selectedId = categoryIdFromState;
    } else if (categoryIdParam) {
      selectedId = categoryIdParam;
    } else if (categoryParam) {
      const matched = categories.find(
        (cat) => cat.name.toLowerCase() === categoryParam.toLowerCase()
      );
      if (matched) selectedId = matched.id;
    }

    if (selectedId) {
      setSelectedCategory(selectedId);

      // ✅ Subcategory handling
      if (subcategoryIdFromState) {
        setSelectedSubCategory(subcategoryIdFromState);
      } else if (subcategoryIdParam) {
        setSelectedSubCategory(subcategoryIdParam);
      } else if (subcategorySlugFromState) {
        setSelectedSubCategory(subcategorySlugFromState);
      } else if (subcategorySlugParam) {
        setSelectedSubCategory(subcategorySlugParam);
      } else {
        setSelectedSubCategory("");
      }

      setVisibleCount(ITEMS_TO_SHOW);
    }
  }
}, [
  categories,
  categoryParam,
  categoryIdParam,
  categoryIdFromState,
  subcategoryIdFromState,
  subcategoryIdParam,
  subcategorySlugFromState,
  subcategorySlugParam,
]);



  // ✅ Get the selected category object (if not "all")
  const selectedCategoryObj = useMemo(() => {
    return selectedCategory === "all"
      ? null
      : categories.find((cat) => cat.id === selectedCategory);
  }, [categories, selectedCategory]);

  // ✅ Filtering logic
  const filteredProducts = useMemo(() => {
    let result = items;

    if (selectedCategoryObj) {
      result = result.filter((item) => item.category?.id === selectedCategoryObj.id);
    }

    if (selectedSubCategory) {
      result = result.filter((item) => {
        const subId = item.subcategory?.id ?? item.subcategory_id;
        const subSlug = item.subcategory?.slug;
        return (
          String(subId) === String(selectedSubCategory) ||
          String(subSlug) === String(selectedSubCategory)
        );
      });
    }

    return result;
  }, [items, selectedCategoryObj, selectedSubCategory]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // ✅ Handlers
  const handleCategoryChange = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setSelectedSubCategory("");
    setVisibleCount(ITEMS_TO_SHOW);
  };

  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
  };

  const handleLoadMore = () => setVisibleCount(filteredProducts.length);

  const handleGoToProduct = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  const handleAddToCart = (item) => {
    navigate("/cart", {
      state: {
        item: {
          id: item.id,
          name: item.name,
          price: item.daily_rate,
          size: "M",
          image: item.images?.[0]?.image || FALLBACK_IMAGE,
        },
      },
    });
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

      {/* ✅ Category Tabs */}
      <div className="flex flex-nowrap gap-4 mb-6 pb-2 sm:overflow-x-auto sm:no-scrollbar">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`flex flex-col items-center px-1 py-1 rounded-md w-14 h-22 sm:w-24 sm:h-22  ${selectedCategory === "all" ? "bg-pink-100 text-pink-600" : "bg-gray-100 text-gray-700"
            }`}
        >
          {selectedCategory === "all" ? (
            <FcOpenedFolder className="w-8 h-8 mb-1" />
          ) : (
            <FcFolder className="w-8 h-8 mb-1" />
          )}
          <span className="text-center text-xs truncate">All</span>
        </button>

        {categories
          .filter((cat) => ["Mens", "Womens", "Couple"].includes(cat.name))
          .map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-md w-14 h-22 sm:w-24 sm:h-22 ${selectedCategory === cat.id ? "bg-pink-100 text-pink-600" : "bg-gray-100 text-gray-700"
                }`}
            >
              <img
                src={cat.image || FALLBACK_IMAGE}
                alt={cat.name}
                className="w-8 h-8 mb-1 object-cover rounded-full"
              />
              <span className="text-center text-xs break-words w-20 px-1">{cat.name}</span>
            </button>
          ))}
      </div>

      {/* ✅ Subcategory Dropdown */}
      {selectedCategory !== "all" && !loadingSubCategories && subCategories.length > 0 && (
        <div className="flex mb-6 text-black">
          <select
            onChange={(e) => handleSubCategoryChange(e.target.value)}
            value={selectedSubCategory}
            className="w-full sm:w-64 px-3 py-2 rounded-md border-none text-white 
             bg-gradient-to-r from-yellow-500 to-yellow-700
             focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md"
            style={{
              color: '#5B4500', // Dark gold text
              backgroundColor: '#F9E4B7', // Light gold background
            }}
          >
            <option value="">All</option>
            {subCategories
              .filter((sub) => {
                // Try various ways, fallback if necessary
                const catId = selectedCategoryObj?.id;
                return (
                  String(sub.category_id) === String(catId) ||
                  String(sub.category?.id) === String(catId) ||
                  sub.category_name === selectedCategoryObj?.name
                );
              })
              .map((sub) => (
                <option key={sub.id} value={sub.id} style={{
                  backgroundColor: '#F9E4B7',
                  color: '#5B4500',
                }}>{sub.name}</option>
              ))}
          </select>
        </div>
      )}

      {/* ✅ View Mode Toggle */}
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded ${viewMode === "grid" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          <Squares2X2Icon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded ${viewMode === "list" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          <ListBulletIcon className="w-5 h-5" />
        </button>
      </div>

      {/* ✅ Products */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((item) => (
            <div key={item.id} className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition flex flex-col min-h-[22rem]">
              {item.featured && (
                <div className="absolute top-0 right-0 overflow-hidden w-20 h-20 pointer-events-none">
                  <div className="absolute top-2 right-[-40px] w-[140px] rotate-45 bg-pink-500 text-white text-xs font-bold py-1 text-center shadow-md">
                    Featured
                  </div>
                </div>
              )}
              <div className="cursor-pointer" onClick={() => handleGoToProduct(item)}>
                <img
                  src={item.images?.[0]?.image || FALLBACK_IMAGE}
                  alt={item.name}
                  className="w-full h-[400px] object-cover rounded-md mb-3"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="text-lg font-semibold dark:text-black">{item.name}</h2>
                <p className="text-pink-600 font-semibold">₹{item.daily_rate}</p>
                <div className="mt-auto">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-4 py-1 rounded text-white w-max bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 transition-all duration-300"
                  >
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
            <div key={item.id} className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition relative">
              {item.featured && (
                <div className="absolute top-2 left-2">
                  <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </span>
                </div>
              )}
              <div className="cursor-pointer" onClick={() => handleGoToProduct(item)}>
                <img
                  src={item.images?.[0]?.image || FALLBACK_IMAGE}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <h2 className="text-lg font-semibold dark:text-black">{item.name}</h2>
                <p className="text-pink-600 font-semibold">₹{item.daily_rate}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-2 px-4 py-1 rounded text-white w-max bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 transition-all duration-300"
                >
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {visibleProducts.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No products found.</p>
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
