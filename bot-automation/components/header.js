"use client";

import { usePathname } from "next/navigation";
import { useDarkMode } from "@/context/context";
import { ChevronDown, Bell, Search, Sun, Moon, User, Key } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./logo";

export function Header() {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderTitle = () => {
    if (pathname === "/") return "Home";
    return pathname.replace("/", "").replace(/-/g, " ");
  };

  const toggleProfileMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle the state
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-2 sm:px-6 py-4 flex items-center justify-between shadow-sm transition-colors duration-300">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 capitalize hidden md:block">
        {renderTitle()}
      </h1>
      <Logo hide={true} />

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          title="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Toggle Theme */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          title="Toggle Theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={toggleProfileMenu}
            className="relative flex items-center space-x-2 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm transition hover:opacity-90">
              JD
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-600 dark:text-gray-300 transform transition-transform duration-200 ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.2 }}
                className="absolute right-0 sm:-right-4 mt-2 px-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50 border border-gray-100 dark:border-gray-700"
              >
                <div className="px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-colors">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </div>
                <div className="px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-colors">
                  <Key className="w-4 h-4" />
                  <span>Change Password</span>
                </div>
                <div className="px-4 py-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-colors">
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
