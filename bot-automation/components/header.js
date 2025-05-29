"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDarkMode } from "@/context/context";
import { Sun, Moon, User, Lock, X, Bell } from "lucide-react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./logo";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NotificationButton from "./notification";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300 opacity-0" />
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
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent side="bottom" arrow>
            {"Toggle Theme"}
          </TooltipContent>
        </Tooltip>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={toggleProfileMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center focus:outline-none group"
                aria-label="User profile menu"
              >
                <div className="relative">
                  {/* Glass effect container with border gradient */}
                  <div className="sm:w-10 w-8 h-8 sm:h-10 rounded-full p-[2px] backdrop-blur-lg bg-white/20 dark:bg-black/20 border border-white/30 dark:border-gray-700/50 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 dark:from-indigo-600/30 dark:to-purple-600/30">
                    {/* Animated inner circle */}
                    <motion.div
                      initial={false}
                      animate={{
                        boxShadow: [
                          "inset 0 0 0 0 rgba(99, 102, 241, 0)",
                          "inset 0 0 10px 2px rgba(99, 102, 241, 0.3)",
                          "inset 0 0 0 0 rgba(99, 102, 241, 0)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="w-full h-full rounded-full bg-indigo-600 dark:bg-indigo-700 flex items-center justify-center overflow-hidden"
                    >
                      {/* User initials with subtle animation */}
                      <motion.span
                        className="font-medium text-xs sm:text-sm text-indigo-100 dark:text-indigo-200"
                        whileHover={{ scale: 1.1 }}
                      >
                        {session?.user?.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </motion.span>

                      {/* Active indicator (pulse animation when menu is open) */}
                      {menuOpen && (
                        <motion.span
                          className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white dark:border-gray-900"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Subtle hover effect */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-white/10 dark:bg-black/10 rounded-full" />
                    <div className="absolute inset-0 border-2 border-white/20 dark:border-gray-600/20 rounded-full" />
                  </div>
                </div>
              </motion.button>
            </TooltipTrigger>
            {!menuOpen && (
              <TooltipContent side="bottom" animation="slide" arrow>
                My Profile
              </TooltipContent>
            )}
          </Tooltip>
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
                  <User className="mr-3 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm">{session?.user?.name}</span>
                </Link>
                <Link
                  href={`/${workspaceId}/settings/account/security`}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-colors"
                >
                  <Lock className="mr-3 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Security</span>
                </Link>
                <Link
                  onClick={() => {
                    mobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen);
                  }}
                  href={`/${workspaceId}/settings/account/notifications`}
                >
                  <motion.span
                    whileHover={{
                      backgroundColor: "rgba(243, 244, 246, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200"
                  >
                    <Bell
                      size={16}
                      className="mr-3 h-4 w-4 text-indigo-600 dark:text-indigo-400"
                    />
                    Notifications
                  </motion.span>
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
