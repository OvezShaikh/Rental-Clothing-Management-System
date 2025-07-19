import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { images } from "../constants/images";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={images.logo} className="h-14 w-22" alt="Logo" />
        </Link>

        {/* Profile + Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:order-2">
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="user"
              />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-700 z-50">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                </div>
                <ul className="py-2">
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
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
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <span className="sr-only">Open main menu</span>
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

        {/* Nav Links */}
        <div
          className={`${mobileMenuOpen ? "block" : "hidden"
            } w-full md:flex md:items-center md:w-auto md:order-1`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium mt-4 md:mt-0 bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 p-4 md:p-0 rounded-lg md:rounded-none">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 font-bold text-lg text-blue-700 md:p-0 dark:text-white"
                    : "block py-2 px-3 text-gray-700 hover:text-blue-700 md:p-0 dark:text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 font-bold text-lg text-blue-700 md:p-0 dark:text-white"
                    : "block py-2 px-3 text-gray-700 hover:text-blue-700 md:p-0 dark:text-white"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 font-bold text-lg text-blue-700 md:p-0 dark:text-white"
                    : "block py-2 px-3 text-gray-700 hover:text-blue-700 md:p-0 dark:text-white"
                }
              >
                Catalog
              </NavLink>
            </li>
            {/* <li>
              <Link
                to="/pricing"
                className="block py-2 px-3 text-gray-700 hover:text-blue-700 md:p-0 dark:text-white"
              >
                Pricing
              </Link>
            </li> */}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 font-bold text-lg text-blue-700 md:p-0 dark:text-white"
                    : "block py-2 px-3 text-gray-700 hover:text-blue-700 md:p-0 dark:text-white"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
