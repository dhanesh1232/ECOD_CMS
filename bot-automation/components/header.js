"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { User, Lock, X, Bell } from "lucide-react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./logo";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NotificationButton from "./notification";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import CommandStyleSearch from "./search";
import { Button } from "./ui/button";
import ThemeSwitcher from "./themeSwicther";

export default function Header({ mobileMenuOpen, setMobileMenuOpen }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const router = useRouter();
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
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-2 flex items-center justify-between">
      <Button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 rounded-lg"
        variant="ghost"
        size="sm"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300 opacity-0" />
        ) : (
          <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </Button>
      <span className="lg:hidden">
        <Logo hide={true} />
      </span>
      <span className="hidden lg:block">
        <CommandStyleSearch />
      </span>

      <div className="flex items-center space-x-4">
        <span className="lg:hidden">
          <CommandStyleSearch />
        </span>
        {/*Notification */}
        <NotificationButton
          size="sm"
          iconSize={18}
          position="top-14 right-0"
          className="hidden lg:flex"
        />

        {/* Toggle Theme */}
        <Tooltip>
          <TooltipTrigger asChild>
            <ThemeSwitcher />
          </TooltipTrigger>
          <TooltipContent side="bottom" arrow>
            {"Toggle Theme"}
          </TooltipContent>
        </Tooltip>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleProfileMenu}
                variant="ghost"
                size="icon"
                className="relative rounded-full h-9 w-9"
                aria-label="User profile menu"
              >
                <div className="relative h-8 w-8">
                  <motion.div
                    initial={false}
                    animate={{
                      boxShadow: menuOpen
                        ? "0 0 0 3px rgba(99, 102, 241, 0.5)"
                        : "0 0 0 0px rgba(99, 102, 241, 0)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 rounded-full"
                  />

                  <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
                    <span className="font-medium text-sm text-white">
                      {session?.user?.name[0].toUpperCase()}
                    </span>

                    {menuOpen && (
                      <motion.span
                        className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </div>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" arrow>
              My Profile
            </TooltipContent>
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
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-colors"
                  href={`/${workspaceId}/settings/account/notifications`}
                >
                  <Bell
                    size={16}
                    className="mr-3 h-4 w-4 text-indigo-600 dark:text-indigo-400"
                  />
                  <span>Notifications</span>
                </Link>
                <div className="border-b dark:border-gray-200 border-gray-600 my-1" />
                <div
                  onClick={handleSignOut}
                  className="px-4 py-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
