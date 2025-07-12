import DashboardLayout from "../components/DashboardLayout";
import {
  FaTshirt,
  FaHeart,
  FaUser,
  FaTruck,
  FaCheck,
  FaHistory,
} from "react-icons/fa";

export default function Dashboard() {
  const cards = [
    {
      title: "My Rentals",
      icon: <FaTruck size={28} />,
      value: "6 Active",
      bg: "from-pink-100 to-pink-200",
    },
    {
      title: "Wishlist",
      icon: <FaHeart size={28} />,
      value: "12 Items",
      bg: "from-purple-100 to-purple-200",
    },
    {
      title: "Profile",
      icon: <FaUser size={28} />,
      value: "View & Edit",
      bg: "from-blue-100 to-blue-200",
    },
    {
      title: "Returns",
      icon: <FaCheck size={28} />,
      value: "2 Pending",
      bg: "from-green-100 to-green-200",
    },
    {
      title: "Rental History",
      icon: <FaHistory size={28} />,
      value: "18 Completed",
      bg: "from-yellow-100 to-yellow-200",
    },
    {
      title: "Try-On Wishlist",
      icon: <FaTshirt size={28} />,
      value: "3 Scheduled",
      bg: "from-rose-100 to-rose-200",
    },
  ];

  return (
    <DashboardLayout>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-pink-600">Dashboard</h1>
        <p className="text-gray-500 mt-2">Track your fashion rentals, wishlist & history</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.bg} rounded-xl p-6 shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-pink-600 bg-white p-2 rounded-full shadow">
                {card.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{card.title}</h2>
                <p className="text-sm text-gray-600">{card.value}</p>
              </div>
            </div>
            <div className="text-right text-xs text-gray-400">Last updated: just now</div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
