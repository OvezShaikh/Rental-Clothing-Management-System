import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserInfoForm from "../components/UserInfoForm";
import { SiPhonepe, SiPaytm } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { FaCreditCard } from "react-icons/fa";

export default function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state?.order;

    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [isProcessing, setIsProcessing] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [discountCode, setDiscountCode] = useState("");

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
        {
            value: "card",
            label: "Card",
            icon: <FaCreditCard className="text-blue-600 text-2xl" />,
        },
    ];

    const totalAmount =
        orderData?.items.reduce((acc, item) => acc + item.price * item.rentalDays, 0) +
        orderData?.securityDeposit;

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

        if (!orderData) {
            toast.error("No order found. Redirecting...");
            navigate("/cart");
        } else {
            fetchUserDetails();
        }
    }, [orderData, navigate]);

    const handleUserUpdate = (updatedUser) => {
        setUserDetails(updatedUser);
    };

    const isUserDataValid = (user) => {
        if (!user) return false;
        const requiredFields = ["name", "email", "address", "phone"];
        return requiredFields.every((field) => user[field] && user[field].trim() !== "");
    };

    const handlePayment = async () => {
        if (!isUserDataValid(userDetails)) {
            toast.error("Please complete all required delivery details before proceeding to pay.");
            return;
        }

        setIsProcessing(true);
        try {
            await axios.post("/api/payments", {
                order: orderData,
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
                {/* Left: Delivery, Shipping, Payment, Billing */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Delivery Form */}
                    <UserInfoForm userData={userDetails} onUpdate={handleUserUpdate} />


                    {/* Payment Section */}
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

                    {/* Pay Button */}
                    <button
                        disabled={isProcessing || !isUserDataValid(userDetails)}
                        onClick={handlePayment}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
                    >
                        {isProcessing ? "Processing..." : `Pay ₹${totalAmount}`}
                    </button>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 space-y-4">
                        <h2 className="text-2xl font-semibold border-b pb-2">Order Summary</h2>
                        {orderData?.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">{item.rentalDays} Days</p>
                                    </div>
                                </div>
                                <p className="font-semibold">₹{item.price * item.rentalDays}</p>
                            </div>
                        ))}

                        {/* Discount Code */}
                        <div className="flex gap-2 pt-2">
                            <input
                                type="text"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                placeholder="Discount code"
                                className="border rounded px-3 py-2 flex-1"
                            />
                            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                                Apply
                            </button>
                        </div>

                        {/* Totals */}
                        <div className="pt-4 space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹
                                    {orderData?.items.reduce(
                                        (acc, item) => acc + item.price * item.rentalDays,
                                        0
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Security Deposit</span>
                                <span>₹{orderData?.securityDeposit}</span>
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
