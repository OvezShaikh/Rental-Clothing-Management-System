import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

  const [orderItems, setOrderItems] = useState(
    (finalOrder?.items || []).map((item) => ({
      ...item,
      selectedDates: item.selectedDates || {
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        key: "selection",
      },
      rentalDays: item.rentalDays || 1,
    }))
  );

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

  const [userDetails, setUserDetails] = useState(() => {
    // Load from localStorage if exists
    const saved = localStorage.getItem("userDetails");
    return saved ? JSON.parse(saved) : { name: "", email: "", phone: "", address: "" };
  });

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

  const handleUserUpdate = (updated) => {
    setUserDetails(updated);
    localStorage.setItem("userDetails", JSON.stringify(updated));
  };

const handlePayment = async () => {
  if (!userDetails || !["name", "email", "address", "phone"].every(f => userDetails[f])) {
    toast.error("Please complete all required delivery details before proceeding.");
    return;
  }

  setIsProcessing(true);

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access;

    // 1️⃣ Step 1: Create pending order in backend
    const orderPayload = {
      user_email: user?.email || userDetails.email,
      status: "pending", // mark as pending until payment succeeds
      security_deposit: finalOrder?.securityDeposit || 0,
      items: orderItems.map(item => ({
        item: item.id,
        size: item.size || "M",
        quantity: item.quantity || 1,
      })),
      start_date: orderItems[0].selectedDates.startDate.toISOString().split("T")[0],
      end_date: orderItems[0].selectedDates.endDate.toISOString().split("T")[0],
      size: orderItems[0]?.size,
    };

    const createOrderRes = await fetch(`/api/rentals/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(orderPayload),
    });

    if (!createOrderRes.ok) throw new Error("Failed to create order");

    const orderData = await createOrderRes.json();
    const orderId = orderData.id;

    // 2️⃣ Step 2: Create Razorpay payment using backend orderId
    const paymentPayload = {
      order_id: orderId,
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      address: userDetails.address,
    };

    const createPaymentRes = await fetch(`/api/rentals/payment/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(paymentPayload),
    });

    if (!createPaymentRes.ok) throw new Error("Failed to create payment order");

    const paymentData = await createPaymentRes.json();

    // 3️⃣ Load Razorpay script
    const loaded = await loadRazorpayScript();
    if (!loaded) throw new Error("Failed to load Razorpay script");

    // 4️⃣ Open Razorpay checkout
    const options = {
      key: paymentData.razorpay_key,
      amount: paymentData.amount,
      currency: paymentData.currency,
      name: "Rental Payment",
      description: "Payment for rental order",
      order_id: paymentData.razorpay_order_id,
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone,
      },
      handler: async function (response) {
        try {
          // 5️⃣ Update order after successful payment
          await fetch(`/api/rentals/orders/${orderId}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ payment_id: response.razorpay_payment_id, status: "paid" }),
          });

          // 6️⃣ Create shipment
          await fetch(`/api/rentals/shipments/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ order_id: orderId, address: userDetails.address }),
          });

          toast.success("✅ Payment successful, order and shipment created!");
          navigate(`/track-order/${orderId}`);
        } catch (err) {
          console.error("Post-payment Error:", err);
          toast.error(err.message || "Something went wrong after payment.");
        }
      },
      theme: { color: "#3399cc" },
      method: { card: true, upi: true, netbanking: false, wallet: false },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment Error:", err);
    toast.error(err.message || "Something went wrong during payment.");
  } finally {
    setIsProcessing(false);
  }
};




  if (!finalOrder) {
    toast.error("No order found. Redirecting...");
    navigate("/cart");
    return null;
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.getElementById("razorpay-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.id = "razorpay-script";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      } else {
        resolve(true);
      }
    });
  };


  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <UserInfoForm userData={userDetails} onUpdate={handleUserUpdate} />

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

        {/* Order Summary */}
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

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
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
