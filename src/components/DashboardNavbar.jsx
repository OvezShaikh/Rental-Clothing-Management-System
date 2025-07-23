import { Link } from "react-router-dom";

export default function DashboardNavbar({ toggleSidebar }) {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-4 py-3 flex items-center justify-between">
      {/* Dashboard Text as toggle button */}
      <div
        onClick={toggleSidebar}
        className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-pink-600"
      >
        Dashboard
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link
          to="/dashboard"
          className="text-gray-700 dark:text-gray-200 hover:text-pink-600"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-700 dark:text-gray-200 hover:text-pink-600"
        >
          About Us
        </Link>
      </div>
    </nav>
  );
}
