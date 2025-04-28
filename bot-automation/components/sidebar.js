"use client";

import { FiLogOut, FiPlus, FiChevronsRight, FiMenu, FiX } from "react-icons/fi";
import { AiOutlineRobot } from "react-icons/ai";
import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User } from "lucide-react";
import { navItems } from "@/data/bot-links";
import { useSession } from "next-auth/react";

export const SideBar = () => {
  const { data: session } = useSession();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userProfile, setUserProfile] = useState(false);
  const profileRef = useRef();
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebarCollapsed");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  // 3. Mobile handling (separate from localStorage logic)
  useEffect(() => {
    const checkIfMobile = () => window.innerWidth < 768;
    const mobile = checkIfMobile();
    setIsMobile(mobile);

    // On mobile, always collapse (override localStorage)
    if (mobile) {
      setCollapsed(true);
    }

    const handleResize = () => {
      const newMobile = checkIfMobile();
      setIsMobile(newMobile);
      if (newMobile) {
        setCollapsed(true);
      } else {
        // When switching back to desktop, restore localStorage value
        const saved = localStorage.getItem("sidebarCollapsed");
        if (saved !== null) setCollapsed(JSON.parse(saved));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setUserProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        mobileMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, mobileMenuOpen]);

  const handleMouseEnter = (itemId, event) => {
    if (!collapsed || isMobile) return;

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY,
      left: rect.right + 8,
    });
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleCreateNew = () => {
    router.push("/chatbots/new");
    if (isMobile) setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (userProfile) setUserProfile(false);
    const params = new URLSearchParams(searchParams);
    params.set("model", `confirm_logout`);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleNavItemClick = () => {
    if (isMobile) setMobileMenuOpen(false);
  };

  const toggleSidebar = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    setHoveredItem(null);
    if (newCollapsed) {
      setUserProfile(false);
    }
  };

  // Escape key handler
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setUserProfile(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Mobile menu toggle button (shown only on mobile)
  const MobileMenuButton = () => (
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="fixed bottom-4 right-8 z-40 p-3 bg-indigo-600 dark:bg-indigo-700 text-white rounded-full shadow-lg md:hidden transition-all hover:scale-105 active:scale-95 ring-2 ring-white/10 hover:ring-white/20"
      aria-label="Toggle menu"
    >
      {mobileMenuOpen ? (
        <FiX
          size={24}
          className="transform transition-transform duration-200"
        />
      ) : (
        <FiMenu
          size={24}
          className="transform transition-transform duration-200"
        />
      )}
    </button>
  );

  // Main sidebar content
  const SidebarContent = () => (
    <motion.div
      initial={isMobile ? { x: -300 } : { opacity: 1 }}
      animate={isMobile ? { x: mobileMenuOpen ? 0 : -300 } : { opacity: 1 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.5,
        ease: "easeInOut",
      }}
      exit={isMobile ? { x: -300 } : {}}
      className={`flex flex-col h-full backdrop-blur-lg bg-indigo-800/90 dark:bg-gray-900/95 text-white shadow-xl ${
        collapsed ? "w-20" : "w-64"
      } ${
        isMobile ? "fixed z-30" : "relative"
      } border-r border-indigo-700/50 dark:border-gray-800`}
      ref={navRef}
    >
      {/* Logo Section */}
      <div className="p-4 py-4 flex items-center justify-between border-b border-indigo-700/50 dark:border-gray-800 relative">
        {!collapsed && (
          <Link
            href="/"
            prefetch={true}
            className="flex items-center space-x-2 group"
          >
            <div className="p-2 bg-indigo-600 dark:bg-indigo-700 rounded-lg group-hover:bg-indigo-500 dark:group-hover:bg-indigo-600 transition-colors">
              <AiOutlineRobot
                size={24}
                className="text-indigo-100 dark:text-indigo-200"
              />
            </div>
            <span className="text-xl font-bold whitespace-nowrap text-white dark:text-gray-100">
              ChatBot Studio
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="p-2 bg-indigo-600 dark:bg-indigo-700 rounded-lg">
              <AiOutlineRobot
                size={24}
                className="text-indigo-100 dark:text-indigo-200"
              />
            </div>
          </div>
        )}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-6 p-1.5 bg-white dark:bg-gray-700 text-indigo-800 dark:text-gray-50 rounded-full shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all hover:scale-110 active:scale-95"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <FiChevronsRight
              size={16}
              className={`text-indigo-800 dark:text-gray-50 transition-transform duration-300 ${
                collapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        )}
      </div>

      {/* Create New Button */}
      <div className="p-4">
        <button
          onClick={handleCreateNew}
          className={`w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white py-2.5 rounded-lg font-medium transition-all ${
            collapsed ? "px-2.5" : "px-4"
          } hover:shadow-md active:scale-[0.98] shadow-sm shadow-indigo-900/30 dark:shadow-indigo-900/50`}
        >
          <FiPlus size={18} className="flex-shrink-0" />
          {!collapsed && <span>New Chatbot</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600/50 scrollbar-track-transparent">
        <ul className="space-y-1 p-2">
          {navItems.map((item) => {
            // Check if current path matches exactly or is a subroute
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            return (
              <li key={item.id}>
                <Link
                  prefetch={true}
                  href={item.href}
                  onMouseEnter={(e) => {
                    handleMouseEnter(item.id, e);
                  }}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleNavItemClick}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-700/90 dark:bg-indigo-800/90 text-white shadow-inner shadow-indigo-900/30"
                      : "hover:bg-indigo-700/50 dark:hover:bg-gray-800/80 text-indigo-100 dark:text-gray-300"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <span className="flex-shrink-0 relative">
                    {React.cloneElement(item.icon, {
                      className: `${
                        isActive
                          ? "text-indigo-100 dark:text-indigo-200"
                          : "text-indigo-300 dark:text-gray-400"
                      } ${item.icon.props.className || ""}`,
                    })}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-indigo-800/90 dark:ring-gray-900/90">
                        {item.badge > 9 ? "9+" : item.badge}
                      </span>
                    )}
                  </span>
                  {!collapsed && (
                    <span className="truncate flex-1 font-medium">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {hoveredItem && collapsed && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="fixed z-10 px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded shadow-lg whitespace-nowrap pointer-events-none border border-gray-700 dark:border-gray-600"
            style={{
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
            }}
          >
            {navItems.find((item) => item.id === hoveredItem)?.label}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 dark:bg-gray-700 transform rotate-45 border-l border-t border-gray-700 dark:border-gray-600" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile */}
      <div
        className="p-4 border-t border-indigo-700/50 dark:border-gray-800 relative"
        ref={profileRef}
      >
        <div className="flex items-center space-x-3 relative">
          <div
            onClick={() => setUserProfile(!userProfile)}
            className="w-10 h-10 rounded-full bg-indigo-600 cursor-pointer dark:bg-indigo-700 flex items-center justify-center flex-shrink-0 border-2 border-indigo-500/30 dark:border-gray-700"
          >
            <span className="font-medium text-indigo-100 dark:text-indigo-200">
              {session?.user?.name
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>

          {!collapsed && (
            <>
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => setUserProfile(!userProfile)}
              >
                <p className="font-medium truncate text-white dark:text-gray-100">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-indigo-300/90 capitalize font-bold dark:text-indigo-400/90 truncate">
                  {session?.user?.role}
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg hover:bg-indigo-700/50 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Logout"
                >
                  <FiLogOut
                    size={18}
                    className="text-indigo-200 dark:text-gray-300"
                  />
                </button>
              </div>
            </>
          )}
        </div>
        <AnimatePresence>
          {userProfile && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="absolute left-4 bottom-[74px] mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50 border border-gray-200 dark:border-gray-700"
            >
              <Link
                prefetch={true}
                href="/settings/account/profile"
                className="px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/80 cursor-pointer rounded-md transition-colors"
              >
                <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm">{session?.user?.name}</span>
              </Link>
              <Link
                prefetch={true}
                href="/settings/account/security"
                className="px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/80 cursor-pointer rounded-md transition-colors"
              >
                <Lock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span>Security</span>
              </Link>
              <div
                onClick={handleLogout}
                className="px-4 py-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700/80 cursor-pointer rounded-md transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:block z-50">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar (conditionally shown) */}
      {isMobile && (
        <>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
          </AnimatePresence>
          <SidebarContent />
        </>
      )}

      {/* Mobile Menu Toggle Button */}
      <MobileMenuButton />
    </>
  );
};
