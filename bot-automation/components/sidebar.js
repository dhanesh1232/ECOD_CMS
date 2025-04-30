"use client";

import { FiLogOut, FiPlus, FiChevronsRight, FiMenu, FiX } from "react-icons/fi";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User } from "lucide-react";
import { navItems } from "@/data/bot-links";
import { useSession } from "next-auth/react";
import { createPortal } from "react-dom";

const ChatBotAI = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M9 2h6v2h3a2 2 0 0 1 2 2v9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V6a2 2 0 0 1 2-2h3V2z" />
    <circle cx="9" cy="10" r="1" />
    <circle cx="15" cy="10" r="1" />
    <path d="M8 16h8" strokeLinecap="round" />
  </svg>
);

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
  const profileRef = useRef(null);
  const tooltipTimeout = useRef(null);

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

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    const handleResize = () => {
      const mobile = checkMobile();
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
      else
        setCollapsed(
          JSON.parse(localStorage.getItem("sidebarCollapsed") || "false")
        );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTooltip = (itemId, event) => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);

    if (itemId && event?.currentTarget) {
      const target = event.currentTarget;

      tooltipTimeout.current = setTimeout(() => {
        if (!target) return; // just in case

        const rect = target.getBoundingClientRect();
        setTooltipPosition({
          top: rect.top + window.scrollY + rect.height / 2,
          left: rect.right + 12,
        });
        setHoveredItem(itemId);
      }, 150);
    } else {
      setHoveredItem(null);
    }
  };

  useEffect(() => {
    return () => {
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    };
  }, []);

  const handleCreateNew = () => {
    router.push("/new");
    if (isMobile) setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setUserProfile(false);
    const params = new URLSearchParams(searchParams);
    params.set("model", "confirm_logout");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const activeNavItem = useMemo(
    () =>
      navItems.find(
        (item) =>
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(`${item.href}/`))
      ),
    [pathname]
  );

  const MobileOverlay = () =>
    createPortal(
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
            onClick={() => setMobileMenuOpen(false)}
            role="presentation"
          />
        )}
      </AnimatePresence>,
      document.body
    );

  const SidebarContent = () => (
    <motion.nav
      initial={isMobile ? { x: -300 } : false}
      animate={isMobile ? { x: mobileMenuOpen ? 0 : -300 } : {}}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      className={`flex flex-col h-full backdrop-blur-lg bg-indigo-800/90 dark:bg-gray-900/95 text-white shadow-xl ${
        collapsed ? "w-20" : "w-64"
      } ${
        isMobile ? "fixed z-30" : "relative"
      } border-r border-indigo-700/50 dark:border-gray-800`}
      ref={navRef}
      aria-label="Main navigation"
    >
      {/* Header Section */}
      <div className="p-4 py-4 flex items-center justify-between border-b border-indigo-700/50 relative">
        <Link
          href="/"
          className={`flex items-center ${
            collapsed ? "justify-center w-full" : "space-x-2"
          }`}
          aria-label="Home"
        >
          <div className="p-2 bg-indigo-600 rounded-lg transition-colors">
            <ChatBotAI />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-white">ECODrIx</span>
          )}
        </Link>
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 p-1.5 bg-white dark:bg-gray-700 rounded-full shadow-md border hover:scale-110"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <FiChevronsRight
              className={`transition-transform text-gray-950 dark:text-white ${
                collapsed ? "" : "rotate-180"
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

      {/* Navigation Items */}
      <ul className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === activeNavItem?.href;
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onMouseEnter={(e) => handleTooltip(item.id, e)}
                onMouseLeave={() => handleTooltip(null)}
                onClick={() => isMobile && setMobileMenuOpen(false)}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  collapsed ? "justify-center" : "space-x-3"
                } ${
                  isActive
                    ? "bg-indigo-700/90 shadow-inner"
                    : "hover:bg-indigo-700/50"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {React.cloneElement(item.icon, {
                  className: `flex-shrink-0 ${
                    isActive ? "text-indigo-100" : "text-indigo-300"
                  }`,
                })}
                {!collapsed && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1 h-6 bg-indigo-300 rounded-full" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* User Profile Section */}
      <div
        className="p-4 border-t border-indigo-700/50 relative"
        ref={profileRef}
      >
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setUserProfile(!userProfile)}
            className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-indigo-500/30"
            aria-label="User profile"
          >
            <span className="font-medium text-indigo-100">
              {session?.user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          </button>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{session?.user?.name}</p>
                <p className="text-xs text-indigo-300/90 truncate">
                  {session?.user?.role}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 hover:bg-indigo-700/50 rounded-lg"
                aria-label="Logout"
              >
                <FiLogOut className="text-indigo-200" />
              </button>
            </>
          )}
        </div>

        {/* Profile Dropdown */}
        <AnimatePresence>
          {userProfile &&
            createPortal(
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 z-50 border dark:border-gray-700"
                style={{
                  top: `${profileRef.current?.getBoundingClientRect().top}px`,
                  left: `${
                    (profileRef.current?.getBoundingClientRect().left || 0) + 60
                  }px`,
                }}
              >
                <Link
                  href="/settings/account/profile"
                  className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/settings/account/security"
                  className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>Security</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 w-full text-left flex items-center gap-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </motion.div>,
              document.body
            )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );

  return (
    <>
      <div className="hidden md:block">
        <SidebarContent />
      </div>

      {isMobile && (
        <>
          <MobileOverlay />
          <SidebarContent />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden fixed bottom-4 right-8 z-40 p-3 bg-indigo-600 text-white rounded-full shadow-lg"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </>
      )}

      {/* Floating Tooltip */}
      {!isMobile && hoveredItem && collapsed && (
        <div
          className="fixed z-50 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg pointer-events-none"
          style={{ ...tooltipPosition }}
        >
          {navItems.find((i) => i.id === hoveredItem)?.label}
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
        </div>
      )}
    </>
  );
};
