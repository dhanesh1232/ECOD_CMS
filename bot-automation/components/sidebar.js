"use client";

import { FiLogOut, FiPlus, FiChevronsRight, FiMenu, FiX } from "react-icons/fi";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { useSession } from "next-auth/react";
import { createPortal } from "react-dom";
import { navItems } from "@/data/bot-links";
import { Bell } from "lucide-react";
import SelectWorkspace from "./workspace_select";
import NotificationButton from "./notification";

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

export default function SideBar({ mobileMenuOpen, setMobileMenuOpen }) {
  const { data: session } = useSession();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userProfile, setUserProfile] = useState(false);
  const profileRef = useRef(null);
  const tooltipTimeout = useRef(null);
  const [userRole, setUserRole] = useState("Owner");
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const selectElements = [
        ...document.querySelectorAll(
          ".radix-select-content, .radix-select-trigger"
        ),
      ];

      const isAnySelectOpen = selectElements.some(
        (el) =>
          el.classList.contains("radix-select-content") &&
          el.style.display !== "none"
      );
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label*="sidebar"]') &&
        !isAnySelectOpen
      ) {
        setCollapsed(true);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobile, collapsed]);

  const handleTooltip = useCallback(
    (itemId, event) => {
      if (isMobile) return; // Disable tooltips on mobile

      // Clear any existing timeout immediately
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
        tooltipTimeout.current = null;
      }

      if (itemId && event?.currentTarget) {
        const target = event.currentTarget;

        // Show tooltip immediately on click/tap
        if (event.type === "click") {
          const rect = target.getBoundingClientRect();
          setTooltipPosition({
            top: rect.top + window.scrollY + rect.height / 4,
            left: rect.right + 12,
          });
          setHoveredItem(itemId);
          return;
        }

        // For hover, show after a short delay (reduced from 3000ms to 300ms)
        tooltipTimeout.current = setTimeout(() => {
          if (!target) return;

          const rect = target.getBoundingClientRect();
          const viewportWidth = window.innerWidth;

          // Calculate position with boundary checking
          const leftPosition = Math.min(
            rect.right + 12,
            viewportWidth - 150 // Ensure tooltip doesn't go off screen
          );

          setTooltipPosition({
            top: rect.top + window.scrollY + rect.height / 4,
            left: leftPosition,
          });
          setHoveredItem(itemId);

          // Auto-hide after 5 seconds
          tooltipTimeout.current = setTimeout(() => {
            setHoveredItem(null);
          }, 5000);
        }, 300); // Reduced delay for better UX
      } else {
        // Hide tooltip with fade-out animation
        setHoveredItem(null);
      }
    },
    [isMobile]
  );

  useEffect(() => {
    return () => {
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    };
  }, []);

  const handleCreateNew = () => {
    router.push(`${workspaceId}/new`);
    if (isMobile) setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (userProfile) return setUserProfile(false);
    if (mobileMenuOpen) return setMobileMenuOpen(false);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("model", "confirm_logout");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const getIsActive = (href, exact) => {
    const pathSegments = pathname.split("/").filter(Boolean);

    // Extract workspaceId and current path without workspaceId
    const workspaceId = pathSegments[0];
    const currentPath = `/${pathSegments.slice(1).join("/")}`;

    // Clean up href to handle trailing slashes
    const cleanHref = href.replace(/\/$/, "");
    const cleanCurrentPath = currentPath.replace(/\/$/, "");

    if (exact) {
      return cleanCurrentPath === cleanHref;
    }

    return cleanCurrentPath.startsWith(cleanHref);
  };

  const MobileOverlay = () =>
    createPortal(
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 flex justify-center items-center"
              onClick={() => setMobileMenuOpen(false)}
              role="presentation"
            >
              <span className="dark:text-white text-gray-100">Click here</span>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
    );

  const SidebarContent = () => (
    <motion.nav
      initial={isMobile ? { x: -300 } : false}
      animate={isMobile ? { x: mobileMenuOpen ? 0 : -300 } : { x: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`flex flex-col h-full backdrop-blur-lg bg-indigo-800/95 dark:bg-gray-900/95 text-white shadow-xl ${
        collapsed ? "w-20" : "w-64"
      } ${
        isMobile ? "fixed z-30 w-64" : "relative"
      } border-r border-indigo-700/50 dark:border-gray-800`}
      ref={navRef}
      aria-label="Main navigation"
    >
      {/* Header Section */}
      <div className="p-4 py-4 flex items-center justify-between border-b border-indigo-700/50 relative">
        <Link
          href={`/${workspaceId}`}
          className={`flex items-center ${
            collapsed
              ? isMobile
                ? "justify-start space-x-3"
                : "justify-center w-full"
              : "space-x-2"
          }`}
          aria-label="Home"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-2 bg-indigo-600 rounded-lg transition-colors"
          >
            <ChatBotAI />
          </motion.div>
          {(!collapsed || isMobile) && (
            <span className="text-xl ml-1 font-bold text-white tracking-tight">
              ECODrIx
            </span>
          )}
        </Link>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            isMobile
              ? setMobileMenuOpen(!mobileMenuOpen)
              : setCollapsed(!collapsed);
          }}
          className="absolute -right-3 top-6 p-1.5 bg-white dark:bg-gray-700 rounded-full shadow-lg border-none ring-2 ring-blue-700 outline-none"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FiChevronsRight
            className={`transition-transform text-gray-950 dark:text-white ${
              collapsed ? (isMobile ? "rotate-180" : "") : "rotate-180"
            }`}
          />
        </motion.button>
      </div>

      {/* Workspace Selector */}
      <div className="px-4 pb-2 mt-2 relative">
        <SelectWorkspace
          className="[&_button]:text-sm [&_button]:font-medium [&>button]:border-indigo-600/50 [&>button]:bg-indigo-700/40 [&>button]:hover:bg-indigo-700/50"
          isCollapsed={collapsed}
          mobile={isMobile}
        />
      </div>

      {/* Create New Button */}
      <div className="p-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateNew}
          className={`w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white py-2.5 rounded-lg font-medium transition-all ${
            collapsed ? "px-2.5" : "px-4"
          } shadow-lg hover:shadow-indigo-900/30 active:shadow-inner`}
        >
          <FiPlus size={18} className="flex-shrink-0" />
          {(!collapsed || isMobile) && <span>New Chatbot</span>}
        </motion.button>
      </div>

      {/* Navigation Items */}
      <ul className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = getIsActive(item.href, item.exact);
          return (
            <li key={item.id}>
              <motion.div
                whileHover={isActive ? {} : { scale: 1.02 }}
                className={`rounded-lg p-0 ${
                  isActive
                    ? "bg-indigo-700/90 shadow-inner border-l-4 border-indigo-300"
                    : "hover:bg-indigo-700/50 border-l-4 border-transparent"
                }`}
              >
                <Link
                  href={`/${workspaceId}${item.href}`}
                  {...(!isMobile && {
                    onMouseEnter: (e) => handleTooltip(item.id, e),
                    onMouseLeave: () => handleTooltip(null),
                  })}
                  onClick={() => isMobile && setMobileMenuOpen(false)}
                  className={`flex items-center p-3 transition-colors ${
                    collapsed
                      ? isMobile
                        ? "justify-start space-x-2"
                        : "justify-center"
                      : "space-x-3"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {React.cloneElement(item.icon, {
                    className: `flex-shrink-0 ${
                      isActive ? "text-indigo-100" : "text-indigo-300"
                    }`,
                  })}
                  {(!collapsed || isMobile) && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                  {isActive && !collapsed && (
                    <div className="ml-auto w-1 h-6 bg-indigo-300 rounded-full animate-pulse" />
                  )}
                </Link>
              </motion.div>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUserProfile(!userProfile)}
            className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-indigo-500/30 shadow-sm"
            aria-label="User profile"
          >
            <span className="font-medium text-indigo-100">
              {session?.user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          </motion.button>
          {(!collapsed || isMobile) && (
            <>
              <div
                className="flex-1 min-w-0"
                onClick={() => {
                  setUserProfile(!userProfile);
                }}
              >
                <p className="font-medium truncate">{session?.user?.name}</p>
                <p className="text-xs text-indigo-300/90 font-bold truncate">
                  {userRole}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="p-1.5 hover:bg-indigo-700/50 rounded-lg"
                aria-label="Logout"
              >
                <FiLogOut className="text-indigo-200" />
              </motion.button>
            </>
          )}
        </div>
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
          <NotificationButton
            size="default"
            iconSize={20}
            position="bottom-10 right-2"
            className="md:hidden fixed bottom-4 right-8 z-40 bg-indigo-600 text-white shadow-lg rounded-full hover:bg-indigo-700"
          />
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
}
