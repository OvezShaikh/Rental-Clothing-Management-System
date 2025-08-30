import { useState, useEffect } from "react";
import {
    FiHome,
    FiBox,
    FiUsers,
    FiClipboard,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX,
} from "react-icons/fi";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";

const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: <FiHome /> },
    { id: "inventory", name: "Inventory", icon: <FiBox /> },
    { id: "rentals", name: "Rentals", icon: <FiClipboard /> },
    { id: "customers", name: "Customers", icon: <FiUsers /> },
    { id: "settings", name: "Settings", icon: <FiSettings /> },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch rentals (same as MyRentals.jsx logic)
    useEffect(() => {
        const fetchRentals = async () => {
            setLoading(true);
            let userData = null;

            try {
                userData = JSON.parse(localStorage.getItem("user"));
            } catch (e) {
                console.error("❌ Failed to parse user data:", e);
            }

            try {
                let rentalsFetched = [];

                // 1️⃣ Fetch via token if exists
                if (userData?.access) {
                    const resToken = await axios.get(
                        "https://aliasgar.pythonanywhere.com/api/rentals/orders/",
                        { headers: { Authorization: `Bearer ${userData.access}` } }
                    );
                    rentalsFetched = resToken.data || [];
                }

                // 2️⃣ Fetch via email if exists
                if (userData?.email) {
                    const headers = userData?.access
                        ? { Authorization: `Bearer ${userData.access}` }
                        : {};

                    const resEmail = await axios.get(
                        `https://aliasgar.pythonanywhere.com/api/rentals/orders/?email=${encodeURIComponent(
                            userData.email.toLowerCase()
                        )}`,
                        { headers }
                    );

                    rentalsFetched = [...rentalsFetched, ...(resEmail.data || [])];
                }

                // 3️⃣ Remove duplicates
                const merged = rentalsFetched.reduce((acc, current) => {
                    if (!acc.some((r) => r.id === current.id)) {
                        acc.push(current);
                    }
                    return acc;
                }, []);

                setRentals(Array.isArray(merged) ? merged : []);
            } catch (err) {
                console.error("❌ Rentals fetch error:", err.response?.data || err.message);
                setRentals([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, []);

    // Analytics
    const totalRentals = rentals.length;
    const totalRevenue = rentals.reduce(
        (sum, r) => sum + (r.total_price || 0),
        0
    );

    const rentalsByCategory = rentals.reduce((acc, r) => {
        const category = r.category || "Other";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    const rentalsData = Object.entries(rentalsByCategory).map(([category, count]) => ({
        category,
        count,
    }));

    // dummy revenue trend (could be grouped by month)
    const revenueData = [
        { month: "Jan", revenue: 12000 },
        { month: "Feb", revenue: 18000 },
        { month: "Mar", revenue: 15000 },
        { month: "Apr", revenue: 22000 },
        { month: "May", revenue: 20000 },
        { month: "Jun", revenue: 25000 },
    ];

    const renderContent = () => {
        if (loading) {
            return <p className="text-center text-gray-500">Loading analytics...</p>;
        }

        switch (activeTab) {
            case "dashboard":
                return (
                    <div className="space-y-8">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                                <h2 className="text-gray-500 font-medium">Total Rentals</h2>
                                <p className="text-3xl font-bold mt-2">{totalRentals}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                                <h2 className="text-gray-500 font-medium">Revenue</h2>
                                <p className="text-3xl font-bold mt-2">₹{totalRevenue}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                                <h2 className="text-gray-500 font-medium">Active Customers</h2>
                                <p className="text-3xl font-bold mt-2">
                                    {new Set(rentals.map((r) => r.customer_email)).size}
                                </p>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Revenue Trend */}
                            <div className="bg-white p-6 rounded-2xl shadow">
                                <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#2563eb"
                                            strokeWidth={3}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Rentals by Category */}
                            <div className="bg-white p-6 rounded-2xl shadow">
                                <h2 className="text-xl font-semibold mb-4">Rentals by Category</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={rentalsData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="category" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                );

            case "inventory":
                return <p>Inventory Management</p>;

            case "rentals":
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">All Rentals</h2>
                        {rentals.length === 0 ? (
                            <p className="text-gray-500">No rentals found.</p>
                        ) : (
                            <div className="overflow-x-auto bg-white shadow rounded-2xl">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 text-left">
                                            <th className="p-3 border">ID</th>
                                            <th className="p-3 border">User</th>
                                            <th className="p-3 border">Item</th>
                                            <th className="p-3 border">Status</th>
                                            <th className="p-3 border">Start</th>
                                            <th className="p-3 border">End</th>
                                            <th className="p-3 border">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rentals.map((rental) => (
                                            <tr key={rental.id} className="hover:bg-gray-50">
                                                <td className="p-3 border">{rental.id}</td>
                                                <td className="p-3 border">{rental.customer_email || "N/A"}</td>
                                                <td className="p-3 border">{rental.item || "N/A"}</td>
                                                <td className="p-3 border">
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded ${rental.status === "active"
                                                                ? "bg-green-100 text-green-700"
                                                                : rental.status === "completed"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : "bg-gray-100 text-gray-600"
                                                            }`}
                                                    >
                                                        {rental.status}
                                                    </span>
                                                </td>
                                                <td className="p-3 border">{rental.start_date || "-"}</td>
                                                <td className="p-3 border">{rental.end_date || "-"}</td>
                                                <td className="p-3 border">₹{rental.total_price || 0}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );


            case "customers":
                return <p>Customers</p>;

            case "settings":
                return <p>Settings</p>;

            default:
                return <p>Select a menu item</p>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col transform transition-transform z-30
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                <div className="p-6 border-b flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Rental Admin</h1>
                    <button
                        className="lg:hidden text-gray-600"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiX size={22} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map(({ id, name, icon }) => (
                        <button
                            key={id}
                            onClick={() => {
                                setActiveTab(id);
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center w-full px-4 py-2 rounded-lg transition ${activeTab === id
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <span className="mr-3 text-lg">{icon}</span>
                            {name}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t">
                    <button className="flex items-center text-gray-600 hover:text-red-600 transition">
                        <FiLogOut className="mr-2" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="flex items-center justify-between bg-white shadow px-6 py-4">
                    <div className="flex items-center space-x-4">
                        <button
                            className="lg:hidden text-gray-600"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <FiMenu size={24} />
                        </button>
                        <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600 hidden sm:block">Admin User</span>
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="Admin Avatar"
                            className="w-10 h-10 rounded-full border"
                        />
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="p-6 overflow-y-auto flex-1">{renderContent()}</div>
            </main>
        </div>
    );
}
