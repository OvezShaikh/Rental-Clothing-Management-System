import { Link, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaHeart, FaTruck, FaCheck } from "react-icons/fa";

export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Catalog", path: "/catalog" },
    { name: "My Rentals", path: "/myrentals" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Profile", path: "/profile" },
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
      className={`relative top-0 left-0 z-40 h-auto w-64 bg-white border-r shadow-sm transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block`}
    >
      {/* Mobile Close Button */}
      <div className="md:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="text-2xl text-gray-600 hover:text-pink-600"
        >
          <IoClose />
        </button>
      </div>

      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-pink-600">RentalFashion</div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3 px-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onClose} // auto-close sidebar on link click (mobile)
            className={`py-2 px-3 rounded-md text-gray-700 hover:bg-pink-100 ${
              pathname === item.path ? "bg-pink-100 font-semibold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
       <hr className="my-6 border-gray-200" />

      {/* Visual Stats Section */}
      <div className="px-6 pb-6 space-y-4">
        <h4 className="text-sm font-medium text-gray-500 uppercase">Quick Stats</h4>
        {quickStats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md shadow-sm">
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
