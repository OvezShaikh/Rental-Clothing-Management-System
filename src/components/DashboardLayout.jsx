import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800 dark:text-white">
      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar and content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <Navbar />

          {/* Optional mobile toggle button (if Navbar doesn't handle it) */}
          <div className="md:hidden px-4 py-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Open Menu
            </button>
          </div>

          <main className="flex-1 px-4 sm:px-6 py-4">{children}</main>
        </div>
      </div>

      {/* Footer (full width, always at bottom) */}
      <Footer />
    </div>
  );
}
