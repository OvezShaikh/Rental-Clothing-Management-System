import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { images } from "../constants/images";
import ThemeToggle from "../layout/ThemeToggle";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Mens", path: "mens", image: "category_images/blazer.jpg" },
    { id: 2, name: "Womens", path: "womens", image: "category_images/heroimg2.jpg" },
    { id: 3, name: "Couple", path: "couple", image: "category_images/ai8.jpg" },
  ];

  const handleNavigate = (path, name, id) => {
    setCategoriesDropdownOpen(false);

    navigate(`/catalog?category=${path}&categoryId=${id}`, {
      state: {
        categoryId: id,
        categoryName: name,
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/20">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={images.logo} className="h-14 w-22" alt="Logo" />
        </Link>

        {/* ✅ Desktop Nav Links (visible md and up) */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-3 font-bold text-blue-700"
                : "py-2 px-3 text-gray-700 hover:text-blue-700"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-3 font-bold text-blue-700"
                : "py-2 px-3 text-gray-700 hover:text-blue-700"
            }
          >
            About
          </NavLink>

          {/* Categories Dropdown (Desktop) */}
          <div className="relative">
            <button
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              className="flex items-center gap-1 py-2 px-3 text-gray-800 hover:text-blue-700 font-bold"
            >
              Categories
              <FaChevronDown
                className={`transition-transform duration-200 ${categoriesDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
              />
            </button>
            {categoriesDropdownOpen && (
              <ul className="absolute mt-2 w-40 bg-white/90 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    onClick={() => {
                      handleNavigate(cat.path, cat.name, cat.id);
                      setCategoriesDropdownOpen(false);
                    }}
                    className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-white/60"
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-3 font-bold text-blue-700"
                : "py-2 px-3 text-gray-700 hover:text-blue-700"
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Profile + Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:order-2">
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setCategoriesDropdownOpen(false);
              }}
              className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300"
            >
              {user ? (
                user.picture ? (
                  <img
                    src={user.picture || user.imageUrl}
                    alt={user.name || "User"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-gray-700 dark:text-gray-200" />
                )
              ) : (
                <a
                  href="/login"
                  className="text-white px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
                >
                  Login
                </a>
              )}
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white/50 backdrop-blur-md border border-white/20 rounded-md shadow-lg z-50 text-left">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900">{user.name}</span>
                  <span className="block text-sm text-gray-600 truncate dark:text-gray-600">{user.email}</span>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Mode</h1>
                    <ThemeToggle />
                  </li>
                  <li>
                    <Link
                      to="/myrentals"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-white/40 dark:hover:bg-gray-700/50"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-white/40 dark:hover:bg-gray-700/50"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-white/40 dark:hover:bg-gray-700/50"
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-white/40 dark:hover:bg-gray-700/50"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 dark:text-gray-200 rounded-lg md:hidden hover:bg-white/40"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Nav Links */}
      <aside
        className={`fixed top-24 bottom-0 right-0 z-50 w-1/2 max-w-[85vw] bg-white/80 backdrop-blur-md
  border-l border-white/20 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden
  ${mobileMenuOpen ? "translate-x-0" : "translate-x-full hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        <ul className="flex flex-col bg-white/80 font-medium p-6 space-y-4 text-left">
          <li>
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-3 font-bold text-lg text-blue-700 dark:text-black"
                  : "block py-2 px-3 text-gray-700 hover:text-blue-700 dark:text-black"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-3 font-bold text-lg text-blue-700 dark:text-black"
                  : "block py-2 px-3 text-gray-700 hover:text-blue-700 dark:text-black"
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <button
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              className="flex items-center gap-1 py-2 px-3 text-black hover:text-blue-700 font-bold text-lg"
            >
              Categories
              <FaChevronDown
                className={`transition-transform duration-200 ${categoriesDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
              />
            </button>
            {categoriesDropdownOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    onClick={() => {
                      handleNavigate(cat.path, cat.name, cat.id);
                      setMobileMenuOpen(false);
                    }}
                    className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-white/40 dark:hover:bg-gray-700/50 rounded"
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-3 font-bold text-lg text-blue-700 dark:text-black"
                  : "block py-2 px-3 text-gray-700 hover:text-blue-700 dark:text-black"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </aside>




    </nav >
  );
}
