import DashboardLayout from "../components/DashboardLayout";
import {
  FaTshirt,
  FaHeart,
  FaUser,
  FaTruck,
  FaCheck,
  FaHistory,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

  const rentalData = [
    { month: "Jan", rentals: 5 },
    { month: "Feb", rentals: 8 },
    { month: "Mar", rentals: 6 },
    { month: "Apr", rentals: 12 },
    { month: "May", rentals: 10 },
  ];

  const categoryData = [
    { name: "Gowns", value: 10 },
    { name: "Sherwani", value: 7 },
    { name: "Sarees", value: 4 },
    { name: "Tuxedos", value: 5 },
  ];

  const COLORS = ["#DB2777", "#9333EA", "#2563EB", "#10B981"];

  const recentRentals = [
    { id: "#RNT123", item: "Silk Gown", date: "Jul 10", status: "Active" },
    { id: "#RNT122", item: "Sherwani", date: "Jul 05", status: "Returned" },
    { id: "#RNT121", item: "Tuxedo", date: "Jul 01", status: "Pending Return" },
  ];

  return (
    <DashboardLayout>
      <div className="text-center mb-10 ">
        <h1 className="text-4xl font-bold text-pink-600 dark:text-blue-600">Dashboard</h1>
        <p className="text-gray-500 mt-2 dark:text-white">
          Track your fashion rentals, wishlist & history
        </p>
      </div>

      {/* Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="text-right text-xs text-gray-400">
              Last updated: just now
            </div>
          </div>
        ))}
      </div> */}

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {/* Rentals Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-black">Monthly Rentals</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={rentalData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rentals" stroke="#DB2777" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-black">Top Rented Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80} label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Rentals Table */}
      <div className="bg-white mt-12 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 dark:text-black">Recent Rentals</h3>
        <table className="w-full table-auto text-left text-sm">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="py-2">Rental ID</th>
              <th className="py-2">Item</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentRentals.map((rental) => (
              <tr key={rental.id} className="border-b">
                <td className="py-2 dark:text-black">{rental.id}</td>
                <td className="py-2 dark:text-black">{rental.item}</td>
                <td className="py-2 dark:text-black">{rental.date}</td>
                <td className="py-2 dark:text-black">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      rental.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : rental.status === "Returned"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {rental.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
