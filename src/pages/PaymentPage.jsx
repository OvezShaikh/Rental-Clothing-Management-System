import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserInfoForm from "../components/UserInfoForm";
import { SiPhonepe, SiPaytm } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { FaCreditCard } from "react-icons/fa";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const singleItem = location.state?.item;
  const cartOrder = location.state?.order;

  const finalOrder = singleItem
    ? {
        items: [
          {
            name: singleItem.name,
            price: singleItem.price,
            rentalDays: 1,
            image: singleItem.image,
            selectedDates: {
              startDate: new Date(),
              endDate: addDays(new Date(), 1),
              key: "selection",
            },
          },
        ],
        securityDeposit: 0,
      }
    : cartOrder;

  const [orderItems, setOrderItems] = useState(finalOrder?.items || []);
  const [openCalendarIndex, setOpenCalendarIndex] = useState(null);
  const calendarRef = useRef();

  const paymentOptions = [
    {
      value: "upi",
      label: "UPI",
      icons: (
        <div className="flex gap-2">
          <div className="bg-white rounded-lg shadow-md rotate-[-6deg] p-1 -ml-2">
            <FcGoogle className="text-xl" />
          </div>
          <div className="bg-white rounded-lg shadow-md rotate-[0deg] p-1 -ml-2">
            <SiPhonepe className="text-purple-600 text-xl" />
          </div>
          <div className="bg-white rounded-lg shadow-md rotate-[6deg] p-1 -ml-2">
            <SiPaytm className="text-sky-500 text-xl" />
          </div>
        </div>
      ),
    },
    { value: "card", label: "Card", icon: <FaCreditCard className="text-blue-600 text-2xl" /> },
  ];

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [discountCode, setDiscountCode] = useState("");

  const totalAmount =
    orderItems.reduce((acc, item) => acc + item.price * item.rentalDays, 0) +
    (finalOrder?.securityDeposit || 0);

  // Example booked dates
  const bookedDates = [{ startDate: new Date(2025, 7, 2), endDate: new Date(2025, 7, 5) }];
  const disabledDates = bookedDates.flatMap((b) => {
    const days = [];
    let current = new Date(b.startDate);
    while (current <= b.endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  });

  const handleDateChange = (ranges, index) => {
    const updated = [...orderItems];
    updated[index].selectedDates = ranges.selection;
    updated[index].rentalDays =
      (ranges.selection.endDate - ranges.selection.startDate) / (1000 * 60 * 60 * 24) + 1;
    setOrderItems(updated);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setOpenCalendarIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserDetails(res.data);
      } catch (error) {
        console.error("Error fetching user details", error);
        toast.error("Failed to fetch user details");
      }
    };

    if (!finalOrder) {
      toast.error("No order found. Redirecting...");
      navigate("/cart");
    } else {
      fetchUserDetails();
    }
  }, [finalOrder, navigate]);

  const handlePayment = async () => {
    if (!userDetails || !["name", "email", "address", "phone"].every((f) => userDetails[f])) {
      toast.error("Please complete all required delivery details before proceeding to pay.");
      return;
    }
    setIsProcessing(true);
    try {
      await axios.post("/api/payments", {
        order: { items: orderItems, securityDeposit: finalOrder?.securityDeposit || 0 },
        user: userDetails,
        method: paymentMethod,
        discountCode,
      });
      toast.success("Payment successful!");
      navigate("/order-success", { state: { orderId: "ORD12345" } });
    } catch (error) {
      toast.error("Payment failed. Try again!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <UserInfoForm userData={userDetails} onUpdate={setUserDetails} />

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="space-y-3">
              {paymentOptions.map((method) => (
                <label
                  key={method.value}
                  className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <input
                    type="radio"
                    required
                    name="payment"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-indigo-600"
                  />
                  {method.icons || method.icon}
                  <span className="font-medium">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            disabled={isProcessing || !userDetails}
            onClick={handlePayment}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
          >
            {isProcessing ? "Processing..." : `Pay ₹${totalAmount}`}
          </button>
        </div>

        {/* Order Summary with Date Change */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Order Summary</h2>
            {orderItems.map((item, index) => {
              const selected = item.selectedDates || {
                startDate: new Date(),
                endDate: addDays(new Date(), 1),
                key: "selection",
              };
              return (
                <div key={index} className="border-b pb-2 relative" ref={calendarRef}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {/* Date Field */}
                        <div
                          onClick={() =>
                            setOpenCalendarIndex(openCalendarIndex === index ? null : index)
                          }
                          className="border rounded px-3 py-1 mt-1 cursor-pointer bg-gray-50 hover:border-pink-500 text-sm"
                        >
                          {`${format(selected.startDate, "dd/MM/yyyy")} - ${format(
                            selected.endDate,
                            "dd/MM/yyyy"
                          )}`}
                        </div>
                      </div>
                    </div>
                    <p className="font-semibold">₹{item.price * item.rentalDays}</p>
                  </div>

                  {openCalendarIndex === index && (
                    <div className="absolute z-50 mt-2 bg-white shadow-lg rounded">
                      <DateRange
                        ranges={[selected]}
                        onChange={(ranges) => handleDateChange(ranges, index)}
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
              );
            })}

            {/* Discount Code */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Discount code"
                className="border rounded px-3 py-2 flex-1"
              />
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Apply</button>
            </div>

            <div className="pt-4 space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  ₹{orderItems.reduce((acc, item) => acc + item.price * item.rentalDays, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Security Deposit</span>
                <span>₹{finalOrder?.securityDeposit}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-3">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
