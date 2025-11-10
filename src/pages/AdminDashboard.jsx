import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
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
import { Link } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import useItems from "../hooks/useItems";
import useUsers from "../hooks/useUsers";

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

  const { items, loading: itemsLoading, error: itemsError } = useItems();
  const { users, loading: usersLoading, error: usersError } = useUsers();

  const [filters, setFilters] = useState({
    name: "",
    category: "",
    subcategory: "",
    available: "",
  });

  // Fetch rentals
  useEffect(() => {
    const fetchRentals = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData?.access) return setLoading(false);
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/rentals/orders/`, {
          headers: { Authorization: `Bearer ${userData.access}` },
        });
        setRentals(res.data || []);
      } catch (err) {
        console.error("Rentals fetch error:", err.response?.data || err.message);
        setRentals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  // Filtered inventory items
  const filteredItems = useMemo(() => {
    if (!items) return [];
    return items.filter((item) => {
      return (
        item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.category ? item.category?.name === filters.category : true) &&
        (filters.subcategory ? item.subcategory?.name === filters.subcategory : true) &&
        (filters.available
          ? filters.available === "Available"
            ? item.available
            : !item.available
          : true)
      );
    });
  }, [items, filters]);

  // Analytics Data
  const totalRentals = rentals.length;
  const totalRevenue = rentals
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => sum + (Number(r.total_price) || 0), 0);

  const rentalsByCategory = useMemo(() => {
    const map = {};
    rentals.forEach((r) => {
      const category = r.category || "Other";
      map[category] = (map[category] || 0) + 1;
    });
    return Object.entries(map).map(([category, count]) => ({ category, count }));
  }, [rentals]);

  const revenueData = useMemo(() => {
    const map = {};
    rentals.forEach((r) => {
      if (!r.start_date || !r.total_price) return;
      const date = new Date(r.start_date);
      const key = `${date.getFullYear()}-${date.toLocaleString("default", { month: "short" })}`;
      map[key] = (map[key] || 0) + r.total_price;
    });
    return Object.entries(map)
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));
  }, [rentals]);

  // Render Functions
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard title="Total Rentals" value={totalRentals} />
        <KpiCard title="Revenue" value={`₹${totalRevenue}`} />
        <KpiCard title="Active Customers" value={new Set(rentals.map((r) => r.customer_email)).size} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Trend">
          {revenueData.length === 0 ? (
            <Typography>No revenue data available.</Typography>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Rentals by Category">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rentalsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );


  const renderInventory = () => (
  <Box>
    <Typography variant="h5" fontWeight="bold" mb={2}>
      Inventory Management
    </Typography>

    {itemsLoading && <Typography>Loading items...</Typography>}
    {itemsError && <Typography color="error">{itemsError.message}</Typography>}

    {!itemsLoading && filteredItems.length > 0 ? (
      <TableContainer component={Paper} className="shadow-sm">
        <Table>
          <TableHead>
            <TableRow>
              {["Image", "Name", "Category", "Subcategory", "Sizes", "Rate / Day", "Available"].map((col, i) => (
                <TableCell key={i} sx={{ width: i === 0 ? 80 : 150 }}>
                  {col === "Name" ? (
                    <TextField
                      placeholder="Filter Name"
                      variant="standard"
                      value={filters.name}
                      onChange={(e) => setFilters((prev) => ({ ...prev, name: e.target.value }))}
                      fullWidth
                    />
                  ) : col === "Available" ? (
                    <Select
                      value={filters.available}
                      displayEmpty
                      onChange={(e) => setFilters((prev) => ({ ...prev, available: e.target.value }))}
                      fullWidth
                      variant="standard"
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Available">Available</MenuItem>
                      <MenuItem value="Unavailable">Unavailable</MenuItem>
                    </Select>
                  ) : (
                    col
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>
                  {item.images?.[0]?.image ? (
                    <img
                      src={item.images[0].image}
                      alt={item.name}
                      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No Image
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category?.name || "N/A"}</TableCell>
                <TableCell>{item.subcategory?.name || "N/A"}</TableCell>
                <TableCell>{item.sizes?.join(", ") || "N/A"}</TableCell>
                <TableCell>₹{item.daily_rate}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: item.available ? "green.100" : "red.100",
                      color: item.available ? "green.800" : "red.800",
                      fontWeight: "bold",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      !itemsLoading && <Typography>No items found.</Typography>
    )}
  </Box>
);


  const renderContent = () => {
    if (loading) return <p className="text-center text-gray-500">Loading analytics...</p>;

    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "inventory":
        return renderInventory();
      case "rentals":
        return <RentalsTab rentals={rentals} />;
      case "customers":
        return <CustomersTab users={users} loading={usersLoading} />;
      case "settings":
        return <p>Settings</p>;
      default:
        return <p>Select a menu item</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Header activeTab={activeTab} setSidebarOpen={setSidebarOpen} />
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">{renderContent()}</div>
      </main>
    </div>
  );
}

// --- Helper Components for optimization ---

const KpiCard = ({ title, value }) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-lg transition">
    <h2 className="text-gray-500 font-medium text-sm sm:text-base">{title}</h2>
    <p className="text-2xl sm:text-3xl font-bold mt-2">{value}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => (
  <aside
    className={`fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col transform transition-transform z-30
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
  >
    <div className="p-6 border-b flex justify-between items-center">
      <h1 className="text-xl sm:text-2xl font-bold text-blue-600">Rental Admin</h1>
      <button className="lg:hidden text-gray-600" onClick={() => setSidebarOpen(false)}>
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
          className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
            activeTab === id ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span className="mr-3 text-lg">{icon}</span>
          <span className="text-sm sm:text-base">{name}</span>
        </button>
      ))}
    </nav>
    <div className="p-4 border-t">
      <button className="flex items-center text-gray-600 hover:text-red-600 transition text-sm sm:text-base">
        <FiLogOut className="mr-2" /> Logout
      </button>
    </div>
  </aside>
);

const Header = ({ activeTab, setSidebarOpen }) => (
  <header className="flex items-center justify-between bg-white shadow px-4 sm:px-6 py-3 sm:py-4">
    <div className="flex items-center space-x-4">
      <button className="lg:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
        <FiMenu size={24} />
      </button>
      <h2 className="text-lg sm:text-2xl font-bold capitalize">{activeTab}</h2>
    </div>
    <Link
      to="/"
      className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-800 transition"
    >
      Home
    </Link>
  </header>
);

// Rentals Tab Component
const RentalsTab = ({ rentals }) => {
  if (rentals.length === 0) return <p className="text-gray-500">No rentals found.</p>;

  return (
    <>
      {/* Table for desktop */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-2xl">
        <table className="min-w-[1080px] border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              {["ID", "User", "Item", "Status", "Start", "End", "Total Price"].map((h) => (
                <th key={h} className="p-3 border">{h}</th>
              ))}
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
                    className={`px-2 py-1 text-xs rounded ${
                      rental.status === "active"
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

      {/* Card view for mobile */}
      <div className="md:hidden space-y-4">
        {rentals.map((rental) => (
          <div key={rental.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
            {[
              ["ID", rental.id],
              ["User", rental.customer_email || "N/A"],
              ["Item", rental.item || "N/A"],
              [
                "Status",
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    rental.status === "active"
                      ? "bg-green-100 text-green-700"
                      : rental.status === "completed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {rental.status}
                </span>,
              ],
              ["Start", rental.start_date || "-"],
              ["End", rental.end_date || "-"],
              ["Total Price", `₹${rental.total_price || 0}`],
            ].map(([label, value], i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="font-semibold">{label}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

// Customers Tab Component
const CustomersTab = ({ users, loading }) => {
  if (loading) return <p className="text-gray-500">Loading customers...</p>;
  if (!users || users.length === 0) return <p className="text-gray-500">No customers found.</p>;

  return (
    <div className="overflow-x-auto bg-white shadow rounded-2xl">
      <table className="min-w-[700px] border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100 text-center">
            {["ID", "Name", "Email", "Phone", "Joined"].map((h) => (
              <th key={h} className="p-3 border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 text-left">
              <td className="p-3 border">{user.id}</td>
              <td className="p-3 border">{user.username || "N/A"}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.phone || "-"}</td>
              <td className="p-3 border">{new Date(user.date_joined).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
