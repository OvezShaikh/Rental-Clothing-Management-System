// src/pages/TrackOrder.jsx
import { useParams } from "react-router-dom";
import OrderTracker from "../components/OrderTracker"; // adjust path if needed
import DashboardLayout from "../components/DashboardLayout";

export default function TrackOrder() {
  const { orderId } = useParams(); // URL param

  return (
    <DashboardLayout>
    <div className="p-6 w-full h-full">
      <h1 className="text-2xl font-bold mb-6">Track My Order</h1>
      <OrderTracker orderId={orderId} />
    </div>
    </DashboardLayout>
  );
}
