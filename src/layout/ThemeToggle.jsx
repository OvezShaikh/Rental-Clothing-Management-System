import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";  // default dark
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // force dark as default on first load
    if (!localStorage.getItem("theme")) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <button
      onClick={toggleTheme}
      className="w-14 h-8 flex items-center px-1 rounded-full bg-gray-300 dark:bg-gray-700 transition relative"
    >
      <div
        className={`w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md transition-transform duration-300 transform ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <Moon className="w-4 h-4 text-gray-700" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-400" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
