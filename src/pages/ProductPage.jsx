import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaShareAlt, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [mainImage, setMainImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    axios
      .get(`https://aliasgar.pythonanywhere.com/api/rentals/items/${id}/`)
      .then((res) => {
        setProduct(res.data);
        if (res.data.images.length > 0) {
          setMainImage(res.data.images[0].image);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch product", err);
      });
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this amazing outfit: ${product.name}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.pageXOffset) / width) * 100;
    const y = ((e.pageY - top - window.pageYOffset) / height) * 100;
    setZoomPosition({ x, y });
  };

  if (!product) {
    return <div className="text-center py-20 text-gray-500">Loading product...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.image}
                  alt={`thumb-${index}`}
                  onClick={() => setMainImage(img.image)}
                  className={`h-20 w-20 object-cover rounded-lg border cursor-pointer ${mainImage === img.image ? "border-pink-500" : "border-gray-300"
                    }`}
                />
              ))}
            </div>
            <div
              className="relative border rounded-xl overflow-hidden w-full"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <img src={mainImage} alt="Main" className="w-full object-cover" />
              {showZoom && (
                <div
                  className="absolute top-0 left-full ml-4 w-80 h-80 border overflow-hidden hidden lg:block"
                  style={{
                    backgroundImage: `url(${mainImage})`,
                    backgroundSize: "200%",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
              <span className="text-sm text-gray-500 ml-2">4.9 (188 reviews)</span>
            </div>

            <div className="text-xl text-pink-600 font-semibold">₹{product.daily_rate}</div>
            <p className="text-gray-600">Rent for 3 days — includes return pickup</p>

            <div>
              <p className="font-medium text-sm text-gray-700 mb-2">Select Size:</p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg ${selectedSize === size
                      ? "bg-pink-600 text-white"
                      : "bg-white text-gray-700"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() =>
                  navigate("/cart", {
                    state: {
                      item: {
                        id: product.id,
                        name: product.name,
                        price: product.daily_rate,
                        size: selectedSize,
                        image: mainImage,
                      },
                    },
                  })
                }
                className="group flex items-center justify-center gap-2 
             bg-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg 
             hover:bg-pink-700 transition-all duration-200 text-sm sm:text-base"
              >
                <FaShoppingCart className="text-base sm:text-lg transform transition-transform duration-500 ease-out group-hover:scale-125 group-hover:rotate-6" />
                <span>Add to Cart</span>
              </button>
              <button className="bg-gray-100 px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-200">
                <FaHeart /> Wishlist
              </button>
              <button
                onClick={handleShare}
                className="bg-gray-100 px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-200"
              >
                <FaShareAlt /> Share
              </button>
            </div>

            <div className="mt-6 border-t pt-4">
              <p className="text-sm text-gray-500">
                Location: <span className="text-gray-700">Mumbai</span> | Delivery in: <span className="text-gray-700">1–2 Days</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-10 border-t pt-6">
          <div className="flex gap-6 text-gray-600 text-sm font-medium border-b pb-2">
            <button
              className={`pb-2 ${activeTab === "description" ? "text-pink-600 border-b-2 border-pink-600" : "hover:text-pink-600"}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`pb-2 ${activeTab === "reviews" ? "text-pink-600 border-b-2 border-pink-600" : "hover:text-pink-600"}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          <div className="mt-4">
            {activeTab === "description" && (
              <>
                <h2 className="text-lg font-semibold mb-2">Product Details</h2>
                <p className="text-gray-600">{product.description}</p>
              </>
            )}

            {activeTab === "reviews" && (
              <div className="text-gray-600">
                <p>No reviews yet. Be the first to rent and review this item!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
