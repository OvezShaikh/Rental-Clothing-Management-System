import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialItem = location.state?.item;

  // Fetch cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (initialItem) {
      // Check if item with same id & size already exists -> update rental days to default 3
      const exists = storedCart.find(
        (i) => i.id === initialItem.id && i.size === initialItem.size
      );
      if (!exists) {
        return [...storedCart, { ...initialItem, rentalDays: 3 }];
      }
    }
    return storedCart;
  });

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Update rental days
  const updateRentalDays = (index, days) => {
    if (days < 1) return;
    const updated = [...cartItems];
    updated[index].rentalDays = days;
    setCartItems(updated);
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const totalAmount =
    cartItems.reduce((acc, item) => acc + item.price * item.rentalDays, 0) +
    (cartItems.length > 0 ? 500 : 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/payment", {
      state: {
        order: {
          items: cartItems,
          securityDeposit: cartItems.length > 0 ? 500 : 0,
        },
      },
    });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md m-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {/* --- Empty Cart --- */}
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-32 h-32 mx-auto mb-4 opacity-70"
            />
            <p className="text-gray-500 text-lg mb-4">
              Your cart is empty. Add some products to rent.
            </p>
            <button
              onClick={() => navigate("/catalog")}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
            >
              Go to Products
            </button>
          </div>
        ) : (
          <>
            {/* --- Cart Items --- */}
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-6 items-center border-b pb-4 mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="font-medium">Rental Days:</label>
                    <input
                      type="number"
                      min={1}
                      value={item.rentalDays}
                      onChange={(e) =>
                        updateRentalDays(index, Number(e.target.value))
                      }
                      className="w-20 border rounded px-2 py-1"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xl font-semibold text-pink-600">
                    ₹{item.price * item.rentalDays}
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* --- Summary --- */}
            <div className="mt-4 flex justify-between items-center text-lg">
              <p>Security Deposit:</p>
              <p>₹{cartItems.length > 0 ? 500 : 0}</p>
            </div>
            <div className="mt-2 flex justify-between items-center text-xl font-bold">
              <p>Total Amount:</p>
              <p>₹{totalAmount}</p>
            </div>

            {/* --- Buttons --- */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={clearCart}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 disabled:bg-gray-300"
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
