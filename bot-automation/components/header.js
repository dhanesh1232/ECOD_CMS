"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDarkMode } from "@/context/context";
import { Sun, Moon, User, Lock, X } from "lucide-react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./logo";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NotificationButton from "./notification";

export default function Header({ mobileMenuOpen, setMobileMenuOpen }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const router = useRouter();
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

  // Escape key handler
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const renderTitle = () => {
    if (pathname === "/") return "Dashboard";
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    // Remove all special characters
    const cleaned = lastPart.replace(/[^a-zA-Z0-9]/g, " ");
    return cleaned || "Dashboard";
  };

  const toggleProfileMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle the state
  };
  const handleSignOut = () => {
    if (menuOpen) setMenuOpen(false);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("model", "confirm_logout");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-2 sm:px-6 py-4 flex items-center justify-between shadow-sm transition-colors duration-300">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>
      <Logo hide={true} />

      <div className="flex items-center space-x-4">
        {/*Notification */}
        <NotificationButton
          size="sm"
          iconSize={18}
          position="top-14 right-0"
          className="hidden md:flex"
        />
        {/* Toggle Theme */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all"
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
            <div className="sm:w-10 w-8 h-8 sm:h-10 rounded-full bg-indigo-600 dark:bg-indigo-700 flex items-center justify-center flex-shrink-0">
              <span className="font-medium text-xs sm:text-sm text-indigo-100 dark:text-indigo-200">
                {session?.user?.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>
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
                <Link
                  href={`/${workspaceId}/settings/account/profile`}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">{session?.user?.name}</span>
                </Link>
                <Link
                  href={`/${workspaceId}/settings/account/security`}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  <span>Security</span>
                </Link>
                <div
                  onClick={handleSignOut}
                  className="px-4 py-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-colors"
                >
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
