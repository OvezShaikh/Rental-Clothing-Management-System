import { useState, useEffect } from "react";
import axiosInstance from "../axios";

export default function OrderTracker({ orderId }) {
  const [order, setOrder] = useState(null);
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("user"))?.access;

  // Fetch order details
 useEffect(() => {
  if (!orderId || !token) return;
  setLoading(true);
  axiosInstance
    .get(`${import.meta.env.VITE_API_BASE_URL}/api/rentals/orders/${orderId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setOrder(res.data))
    .catch((err) => {
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("user");
      } else {
        setError("Failed to fetch order");
      }
    })
    .finally(() => setLoading(false));
}, [orderId, token]);


  const handleCreateShipment = async () => {
    if (!token) {
      setError("No valid session. Please login.");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/rentals/shipping/${orderId}/create-shipment/`,
        {}, // empty body (if API doesn’t require one)
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShipment(res.data);
    } catch {
      setError("Failed to create shipment");
    } finally {
      setLoading(false);
    }
  };

  const handleTrackShipment = async () => {
    if (!token) {
      setError("No valid session. Please login.");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/rentals/shipping/${orderId}/track-shipment/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShipment(res.data); // API response
    } catch {
      setError("Failed to track shipment");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Stepper logic (map shipment_status → step index)
  const steps = [
    "Order Placed",
    "Shipment Created",
    "Pending Pickup",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];

  const shipmentStatus =
    shipment?.tracking_info?.tracking_data?.shipment_status || null;

  const currentStepIndex = shipmentStatus
    ? steps.findIndex(
      (s) => s.toLowerCase() === shipmentStatus.toLowerCase()
    )
    : -1;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Order & Shipment Tracking
      </h2>

      {order ? (
        <div className="mb-4 p-4 border rounded-lg dark:text-black">
          <h3 className="text-lg font-semibold">Order #{order.id}</h3>

          <ul className="list-disc list-inside">
            {order.items.map((orderItem) => (
              <li key={orderItem.id}>
                Item #{orderItem.item} – Size {orderItem.size} × {orderItem.quantity}
              </li>
            ))}
          </ul>

          <p>
            <strong>Status:</strong>{" "}
            <span className="px-2 py-1 bg-blue-100 rounded">
              {order.status}
            </span>
          </p>
          <p>
            <strong>Duration:</strong> {order.start_date} → {order.end_date}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{order.total_price}
          </p>
        </div>

      ) : (
        <p className="text-center">No order found</p>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={handleCreateShipment}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Create Shipment
        </button>
        <button
          onClick={handleTrackShipment}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Track Shipment
        </button>
      </div>

      {/* Shipment Info + Stepper */}
      {shipment && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-center sm:text-left dark:text-black">
            Shipment Progress
          </h3>

          {/* Shipment details */}
          <div className="mb-4 p-4 border rounded-lg bg-gray-50 dark:text-black">
            <p>
              <strong>Shipment ID:</strong> {shipment.shipment_id}
            </p>
            <p>
              <strong>Current Status:</strong>{" "}
              {shipment.tracking_info?.tracking_data?.shipment_status}
            </p>
            <p>
              <strong>Tracking URL:</strong>{" "}
              {shipment.tracking_info?.tracking_data?.track_url}
            </p>
            <p>
              <strong>Expected Delivery:</strong>{" "}
              {shipment.tracking_info?.tracking_data?.expected_delivery ||
                "Not available"}
            </p>
            <p>
              <strong>Days Left:</strong> {shipment.days_left ?? "N/A"}
            </p>
          </div>

          {/* Stepper UI */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center flex-1"
              >
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white dark:text-black z-10
                  ${idx <= currentStepIndex ? "bg-blue-600" : "bg-gray-300 text-gray-600"}`}
                >
                  {idx + 1}
                </div>

                {/* Label */}
                <p
                  className={`mt-2 text-xs sm:text-sm text-center whitespace-nowrap
                  ${idx <= currentStepIndex ? "text-blue-600 font-medium" : "text-gray-500"}`}
                >
                  {step}
                </p>

                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <>
                    {/* Horizontal line for desktop */}
                    <div
                      className={`hidden sm:block absolute top-5 left-1/2 w-full h-0.5
                      ${idx < currentStepIndex ? "bg-blue-600" : "bg-gray-300"}`}
                    ></div>

                    {/* Vertical line for mobile */}
                    <div
                      className={`sm:hidden w-0.5 h-10 mx-auto
                      ${idx < currentStepIndex ? "bg-blue-600" : "bg-gray-300"}`}
                    ></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
