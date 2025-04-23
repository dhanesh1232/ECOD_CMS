"use client";

import {
  FiMessageSquare,
  FiSettings,
  FiUsers,
  FiPieChart,
  FiLogOut,
  FiPlus,
  FiChevronsLeft,
  FiChevronsRight,
  FiHelpCircle,
  FiHome,
  FiFileText,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { AiOutlineRobot } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Check for mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true); // Collapse by default on mobile
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
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

  // Sample user data
  const user = {
    name: "John Doe",
    role: "Admin",
    initials: "JD",
    avatar: null,
    unreadNotifications: 3,
  };

  const navItems = [
    { id: "home", icon: <FiHome size={20} />, label: "Home", href: "/" },
    {
      id: "dashboard",
      icon: <FiPieChart size={20} />,
      label: "Dashboard",
      href: "/dashboard",
      badge: 5,
    },
    {
      id: "chatbots",
      icon: <AiOutlineRobot size={20} />,
      label: "My Chatbots",
      href: "/chatbots",
    },
    {
      id: "conversations",
      icon: <FiMessageSquare size={20} />,
      label: "Conversations",
      href: "/conversations",
      badge: 12,
    },
    {
      id: "templates",
      icon: <FiFileText size={20} />,
      label: "Templates",
      href: "/templates",
    },
    {
      id: "contacts",
      icon: <FiUsers size={20} />,
      label: "Contacts",
      href: "/contacts",
    },
    {
      id: "settings",
      icon: <FiSettings size={20} />,
      label: "Settings",
      href: "/settings",
    },
    {
      id: "help",
      icon: <FiHelpCircle size={20} />,
      label: "Help Center",
      href: "/help",
    },
  ];

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
    console.log("Logging out...");
    router.push("/login");
  };

  const handleNavItemClick = () => {
    if (isMobile) setMobileMenuOpen(false);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setHoveredItem(null); // Clear any hover states when toggling
  };

  // Mobile menu toggle button (shown only on mobile)
  const MobileMenuButton = () => (
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="fixed bottom-4 right-4 z-40 p-3 bg-indigo-600 text-white rounded-full shadow-lg md:hidden transition-transform hover:scale-105"
      aria-label="Toggle menu"
    >
      {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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
        duration: 0.3,
        ease: "easeInOut",
      }}
      exit={isMobile ? { x: -300 } : {}}
      className={`flex flex-col h-screen backdrop-blur-md bg-indigo-900/80 dark:bg-gray-900/90 text-white shadow-xl ${
        collapsed ? "w-20" : "w-64"
      } ${isMobile ? "fixed z-30" : "relative"}`}
      ref={navRef}
    >
      {/* Logo Section */}
      <div className="p-4 py-5 flex items-center justify-between border-b border-indigo-700 relative">
        {!collapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <AiOutlineRobot size={24} className="text-indigo-300" />
            <span className="text-xl font-bold whitespace-nowrap text-white dark:text-gray-100">
              ChatBot Studio
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <AiOutlineRobot size={24} className="text-indigo-300" />
          </div>
        )}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-6 p-1.5 bg-white dark:bg-gray-700 text-indigo-900 dark:text-gray-50 rounded-full shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-transform hover:scale-110"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <FiChevronsRight
                className="text-indigo-900 dark:text-gray-50"
                size={16}
              />
            ) : (
              <FiChevronsLeft
                className="text-indigo-900 dark:text-gray-50"
                size={16}
              />
            )}
          </button>
        )}
      </div>

      {/* Create New Button */}
      <div className="p-4">
        <button
          onClick={handleCreateNew}
          className={`w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white py-2.5 rounded-lg font-medium transition-all ${
            collapsed ? "px-2.5" : "px-4"
          } hover:shadow-md active:scale-95`}
        >
          <FiPlus size={18} />
          {!collapsed && <span>New Chatbot</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-indigo-900/50">
        <ul className="space-y-1 p-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onMouseEnter={(e) => handleMouseEnter(item.id, e)}
                onMouseLeave={handleMouseLeave}
                onClick={handleNavItemClick}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-indigo-700 dark:bg-indigo-800 text-white"
                    : "hover:bg-indigo-800/70 dark:hover:bg-gray-800 text-indigo-100 dark:text-gray-300"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <span className="flex-shrink-0 relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </span>
                {!collapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
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
            className="fixed z-50 px-3 py-2 bg-gray-800 dark:bg-gray-900 text-white text-sm rounded shadow-lg whitespace-nowrap pointer-events-none"
            style={{
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
            }}
          >
            {navItems.find((item) => item.id === hoveredItem)?.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile */}
      <div className="p-4 border-t border-indigo-700">
        <div className="flex items-center space-x-3 relative">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-600 dark:bg-indigo-700 flex items-center justify-center flex-shrink-0">
              <span className="font-medium">{user.initials}</span>
            </div>
          )}
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-xs text-indigo-300 truncate">{user.role}</p>
              </div>
              <div className="relative">
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg hover:bg-indigo-800 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Logout"
                >
                  <FiLogOut size={18} />
                </button>
                {user.unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {user.unreadNotifications}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:block">
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
                className="fixed inset-0 bg-black bg-opacity-50 z-20"
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
