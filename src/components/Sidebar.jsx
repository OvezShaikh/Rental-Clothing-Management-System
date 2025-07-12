import { Link, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";

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

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r shadow-sm transition-transform duration-300 transform
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
    </aside>
  );
}
