import { Link, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaHeart, FaTruck, FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { jwtDecode } from "jwt-decode";

export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.access;
      if (!token) return;

      const decoded = jwtDecode(token);

      const res = await axiosInstance.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/list/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const users = res.data;
      const currentUser = users.find((u) => u.id === decoded?.user_id);

      if (currentUser?.is_staff) {
        setIsAdmin(true);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  fetchUser();
}, []);

  const navItems = [
    // { name: "Dashboard", path: "/dashboard" },
    ...(isAdmin ? [{ name: "Admin", path: "/admin" }] : []),
    { name: "Catalog", path: "/catalog" },
    { name: "My Rentals", path: "/myrentals" },
    { name: "Track Order", path: "/track-order" },
    // { name: "Wishlist", path: "/wishlist" },
    // { name: "Profile", path: "/profile" },
    { name: "FAQ", path: "/faq" },
  ];

  const quickStats = [
    {
      icon: <FaTruck className="text-pink-600" />,
      label: "Active Rentals",
      value: 6,
    },
    {
      icon: <FaHeart className="text-rose-500" />,
      label: "Wishlist",
      value: 12,
    },
    {
      icon: <FaCheck className="text-green-600" />,
      label: "Returns Pending",
      value: 2,
    },
  ];

  return (
    <aside
      className={`z-40 w-64 bg-white dark:bg-gray-800 dark:text-white border-r shadow-sm 
  transition-transform duration-300 transform flex-shrink-0
  ${isOpen ? "translate-x-0" : "-translate-x-full"} 
  md:translate-x-0 md:static md:block`}
    >
      {/* Mobile Close Button */}
      <div className="md:hidden flex justify-end p-2">
        <button
          onClick={onClose}
          className="text-2xl text-gray-600 hover:text-pink-600"
        >
          <IoClose />
        </button>
      </div>

      {/* Sidebar content (natural height, not forced full page) */}
      <div className="p-6 text-2xl font-bold text-yellow-500">RentalFashion</div>

      <nav className="flex flex-col space-y-3 px-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={`py-2 px-3 rounded-md text-gray-700 dark:text-white 
        hover:bg-yellow-200 dark:hover:bg-yellow-200 
        ${pathname === item.path ? "bg-yellow-400 font-semibold" : ""}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <hr className="my-6 border-gray-200" />

      <div className="px-6 pb-6 space-y-4">
        <h4 className="text-sm font-medium text-gray-500 uppercase">Quick Stats</h4>
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div className="text-lg">{stat.icon}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
            <div className="text-sm font-bold text-gray-800">{stat.value}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
