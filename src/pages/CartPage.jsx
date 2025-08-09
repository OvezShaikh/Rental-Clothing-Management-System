import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function CartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialItem = location.state?.item;

  const bookedDates = [
    { startDate: new Date(2025, 7, 2), endDate: new Date(2025, 7, 5) },
  ];

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (initialItem) {
      const exists = storedCart.find(
        (i) => i.id === initialItem.id && i.size === initialItem.size
      );
      if (!exists) {
        return [...storedCart, { ...initialItem, rentalDays: 3 }];
      }
    }
    return storedCart;
  });

  const [openCalendarIndex, setOpenCalendarIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleDateChange = (ranges, index) => {
    const updated = [...cartItems];
    updated[index].selectedDates = ranges.selection;
    updated[index].rentalDays =
      (ranges.selection.endDate - ranges.selection.startDate) /
        (1000 * 60 * 60 * 24) +
      1;
    setCartItems(updated);
  };

  const removeItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
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

  const disabledDates = bookedDates.flatMap((b) => {
    const days = [];
    let current = new Date(b.startDate);
    while (current <= b.endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  });

  const calendarRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setOpenCalendarIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 bg-white rounded-lg shadow-md my-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 opacity-70"
            />
            <p className="text-gray-500 text-base sm:text-lg mb-4">
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
            {cartItems.map((item, index) => {
              const selected = item.selectedDates || {
                startDate: new Date(),
                endDate: addDays(new Date(), 3),
                key: "selection",
              };

              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b pb-4 mb-4 relative"
                  ref={calendarRef}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 text-sm">Size: {item.size}</p>

                    <div className="mt-3">
                      <label className="font-medium text-sm sm:text-base">
                        Rental Period:
                      </label>
                      <div
                        onClick={() =>
                          setOpenCalendarIndex(
                            openCalendarIndex === index ? null : index
                          )
                        }
                        className="border rounded px-3 py-2 mt-1 cursor-pointer bg-white hover:border-pink-500 w-full sm:w-64 text-sm"
                      >
                        {`${format(
                          selected.startDate,
                          "dd/MM/yyyy"
                        )} - ${format(selected.endDate, "dd/MM/yyyy")}`}
                      </div>

                      {openCalendarIndex === index && (
                        <div className="absolute z-50 mt-2 bg-white shadow-lg rounded w-full sm:w-auto">
                          <DateRange
                            ranges={[selected]}
                            onChange={(ranges) =>
                              handleDateChange(ranges, index)
                            }
                            minDate={new Date()}
                            disabledDates={disabledDates}
                            rangeColors={["#ec4899"]}
                          />
                          <div className="flex justify-end p-2">
                            <button
                              onClick={() => setOpenCalendarIndex(null)}
                              className="px-4 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2 mt-2 sm:mt-0">
                    <div className="text-lg sm:text-xl font-semibold text-pink-600">
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
              );
            })}

            <div className="mt-4 flex justify-between items-center text-base sm:text-lg">
              <p>Security Deposit:</p>
              <p>₹{cartItems.length > 0 ? 500 : 0}</p>
            </div>
            <div className="mt-2 flex justify-between items-center text-lg sm:text-xl font-bold">
              <p>Total Amount:</p>
              <p>₹{totalAmount}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={clearCart}
                className="w-full sm:flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full sm:flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 disabled:bg-gray-300"
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
