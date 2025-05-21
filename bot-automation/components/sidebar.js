"use client";

import { FiLogOut, FiPlus, FiChevronsRight } from "react-icons/fi";
import React, { useState, useRef, useEffect } from "react";
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
import SelectWorkspace from "./workspace_select";
import NotificationButton from "./notification";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userProfile, setUserProfile] = useState(false);
  const profileRef = useRef(null);
  const [userRole, setUserRole] = useState("Owner");
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebarCollapsed");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const MemoizedSelectWorkspace = React.memo(SelectWorkspace);

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
      {!isMobile && collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="px-4 pb-2 mt-2 relative">
              <MemoizedSelectWorkspace
                className="[&_button]:text-sm [&_button]:font-medium [&>button]:border-indigo-600/50 [&>button]:bg-indigo-700/40 [&>button]:hover:bg-indigo-700/50"
                isCollapsed={collapsed}
                mobile={isMobile}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" arrow>
            {"Select Workspace"}
          </TooltipContent>
        </Tooltip>
      ) : (
        <div className="px-4 pb-2 mt-2 relative">
          <MemoizedSelectWorkspace
            className="[&_button]:text-sm [&_button]:font-medium [&>button]:border-indigo-600/50 [&>button]:bg-indigo-700/40 [&>button]:hover:bg-indigo-700/50"
            isCollapsed={collapsed}
            mobile={isMobile}
          />
        </div>
      )}

      {/* Create New Button */}
      {collapsed && !isMobile ? (
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent side="right" arrow>
            {"Create Bot"}
          </TooltipContent>
        </Tooltip>
      ) : (
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
      )}

      {/* Navigation Items */}
      <ul className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = getIsActive(item.href, item.exact);
          const linkContent =
            collapsed && !isMobile ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/${workspaceId}${item.href}`}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                    className={`flex items-center p-3 transition-colors ${
                      collapsed
                        ? isMobile
                          ? "justify-start space-x-2"
                          : "justify-center"
                        : "space-x-3"
                    } rounded-lg p-0 ${
                      isActive
                        ? "bg-indigo-700/90 shadow-inner border-l-4 border-indigo-300"
                        : "hover:bg-indigo-700/50 border-l-4 border-transparent"
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
                </TooltipTrigger>
                <TooltipContent side="right" arrow>
                  {item.label}
                  {isActive && <span className="ml-1">(active)</span>}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                href={`/${workspaceId}${item.href}`}
                onClick={() => isMobile && setMobileMenuOpen(false)}
                className={`flex items-center p-3 transition-colors ${
                  collapsed && isMobile
                    ? "justify-start space-x-2"
                    : "space-x-3"
                } rounded-lg ${
                  isActive
                    ? "bg-indigo-700/90 shadow-inner border-l-4 border-indigo-300"
                    : "hover:bg-indigo-700/50 border-l-4 border-transparent"
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
            );
          return (
            <li key={item.id} className="p-0 m-0 outline-none ring-0">
              {linkContent}
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
          {collapsed && !isMobile ? (
            <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent side="right" arrow>
                {"Profile"}
              </TooltipContent>
            </Tooltip>
          ) : (
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
          )}
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLogout}
                    className="p-1.5 hover:bg-indigo-700/50 rounded-lg"
                    aria-label="Logout"
                  >
                    <FiLogOut className="text-indigo-200" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="right" arrow>
                  {"Sign Out"}
                </TooltipContent>
              </Tooltip>
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
    </>
  );
}
