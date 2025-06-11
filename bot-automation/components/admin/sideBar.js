"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { ChevronDown, User, X, LogOutIcon } from "lucide-react";
import { navLinks, SUPER_ADMIN_NAV } from "@/data/bot-links";
import { ChatBotAI } from "@/public/Images/svg_ecod";
import { cn } from "@/lib/utils";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";
import { useSession } from "next-auth/react";

const AdminSidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceId = params.workspaceId;
  const [expandedItems, setExpandedItems] = useState({});
  const [hoverProp, setHoverProp] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    role: "",
  });
  const navRef = useRef(null);
  const userRef = useRef(null);
  const { scrollY } = useScroll({ container: navRef });

  useEffect(() => {
    const renderProfile = async () => {
      setProfile({
        name: session?.user?.name,
        role: session?.user?.role,
      });
    };
    renderProfile();
  }, [session.user]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Initialize expanded state based on current path
  useEffect(() => {
    const initialExpanded = {};

    navLinks.forEach((item) => {
      if (item.subPages) {
        // Check if current path matches any subpage
        const hasActiveSubpage = item.subPages.some(
          (subItem) => pathname === `${subItem.href}`
        );
        initialExpanded[item.id] =
          pathname.startsWith(`${item.href}`) ||
          hasActiveSubpage ||
          item.expandedByDefault;
      } else if (item.isParent) {
        initialExpanded[item.id] = pathname.startsWith(`${item.href}`);
      }
    });

    setExpandedItems(initialExpanded);
  }, [pathname, workspaceId]);

  useEffect(() => {
    if (navRef.current) {
      const activeItem = navRef.current.querySelector(".bg-indigo-100");
      if (activeItem) {
        setTimeout(() => {
          activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 300);
      }
    }
  }, [pathname]);

  const handleSignOut = () => {
    if (userMenuOpen) setUserMenuOpen(false);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("model", "confirm_logout");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isActive = (href) => {
    // Exact match for root path
    if (href === "/admin") {
      return pathname === "/admin";
    }
    // For other paths, check exact match or starts with (for nested routes)
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isSubpageActive = (subHref) => {
    return pathname === subHref;
  };

  const renderOverLay = () => {
    const handleMouseMove = (e) => {
      setHoverProp({
        x: e.clientX,
        y: e.clientY,
      });
    };

    return (
      <div
        className="w-full h-full fixed inset-0 cursor-pointer z-20 bg-gray-900/70 backdrop-blur-sm"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverProp(null)}
      >
        {hoverProp && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 300,
              delay: 0.1,
            }}
            className="h-12 w-12 shadow-xl bg-white dark:bg-gray-800 rounded-full flex items-center justify-center"
            type="button"
            style={{
              position: "absolute",
              top: hoverProp.y,
              left: hoverProp.x,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            <X size={20} className="text-gray-900 dark:text-gray-100" />
          </motion.button>
        )}
        <div className="relative h-full w-full flex items-center justify-end">
          <div className="w-1/2 h-full flex items-center justify-center">
            <span className="-rotate-90">Click Here</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Sidebar */}
      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-56 sm:w-72 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950 border-r border-gray-200/50 dark:border-gray-800 shadow-xl transition-all duration-300 transform",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:relative lg:flex"
        )}
      >
        <div className="flex flex-col w-full h-full">
          {/* Sidebar Header */}
          <div
            className={cn(
              "p-4 py-3.5 border-gray-200/50 dark:border-gray-800 transition-all duration-300 sticky top-0 z-10",
              isScrolled
                ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
                : "bg-transparent"
            )}
          >
            <Link href={`/admin`}>
              <div className="flex items-center space-x-3 cursor-pointer group">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-shadow"
                >
                  <ChatBotAI size={20} className="text-white" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    ECODrIx
                  </h1>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    Admin Dashboard
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav
            ref={navRef}
            className="scrollbar-transparent flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
          >
            {SUPER_ADMIN_NAV.map((item) => (
              <div key={item.id} className="space-y-1">
                {item.subPages ? (
                  <>
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleExpand(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all relative group",
                        "text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800",
                        "focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
                        (isActive(item.href) ||
                          item.subPages.some((sub) =>
                            isSubpageActive(sub.href)
                          )) &&
                          "bg-indigo-50/80 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-200",
                        "transition-colors duration-200"
                      )}
                    >
                      {(isActive(item.href) ||
                        item.subPages.some((sub) =>
                          isSubpageActive(sub.href)
                        )) && (
                        <motion.div
                          layoutId="activeNavItem"
                          className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                      <div className="flex items-center space-x-3">
                        <motion.div
                          whileHover={{ rotate: 8, scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "p-1.5 rounded-lg transition-colors shadow-sm",
                            isActive(item.href) ||
                              item.subPages.some((sub) =>
                                isSubpageActive(sub.href)
                              )
                              ? "bg-indigo-100 dark:bg-indigo-800/80 text-indigo-600 dark:text-indigo-300"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                          )}
                        >
                          {item.icon}
                        </motion.div>
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>
                      </div>
                      <motion.div
                        animate={{
                          rotate: expandedItems[item.id] ? 180 : 0,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          },
                        }}
                        className="mr-1"
                      >
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-colors",
                            isActive(item.href) ||
                              item.subPages.some((sub) =>
                                isSubpageActive(sub.href)
                              )
                              ? "text-indigo-500 dark:text-indigo-400"
                              : "text-gray-500 dark:text-gray-400"
                          )}
                        />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {expandedItems[item.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                              height: {
                                duration: 0.25,
                                ease: [0.22, 1, 0.36, 1],
                              },
                              opacity: { duration: 0.15, delay: 0.1 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.2 },
                              opacity: { duration: 0.1 },
                            },
                          }}
                          className="overflow-hidden ml-4 pl-2 pr-2 border-l-2 border-gray-300 dark:border-gray-800"
                        >
                          <div className="space-y-1 py-1">
                            {item.subPages.map((subItem, index) => (
                              <div key={index} className="relative">
                                {/* Vertical connector line */}
                                <div className="absolute left-[-22px] top-0 bottom-0 w-px rotate-90 bg-gray-300 dark:bg-gray-700"></div>
                                <Link
                                  href={`${subItem.href}`}
                                  key={subItem.id}
                                  onClick={() => {
                                    mobileMenuOpen &&
                                      setMobileMenuOpen(!mobileMenuOpen);
                                  }}
                                >
                                  <motion.span
                                    whileHover={{
                                      x: 4,
                                      backgroundColor:
                                        "rgba(224, 231, 255, 0.5)",
                                    }}
                                    className={cn(
                                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all relative",
                                      "text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
                                      "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                                      isSubpageActive(subItem.href) &&
                                        "text-indigo-700 dark:text-indigo-200 bg-indigo-50/80 dark:bg-indigo-900/20"
                                    )}
                                  >
                                    {isSubpageActive(subItem.href) && (
                                      <motion.span
                                        layoutId="activeSubNavItem"
                                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500 rounded-r-full"
                                        transition={{
                                          type: "spring",
                                          stiffness: 500,
                                          damping: 30,
                                        }}
                                      />
                                    )}
                                    <motion.span
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      className={cn(
                                        "p-1 rounded-md transition-colors",
                                        isSubpageActive(subItem.href)
                                          ? "bg-indigo-100 dark:bg-indigo-800/80 text-indigo-600 dark:text-indigo-300"
                                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                                      )}
                                    >
                                      {subItem.icon}
                                    </motion.span>
                                    <span className="truncate font-medium sm:text-sm text-xs">
                                      {subItem.label}
                                    </span>
                                    {subItem.beta && (
                                      <motion.span
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 ml-auto"
                                      >
                                        Beta
                                      </motion.span>
                                    )}
                                  </motion.span>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={`${item.href}`}
                    onClick={() => {
                      mobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen);
                    }}
                  >
                    <motion.span
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all relative group",
                        "text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800",
                        isActive(item.href) &&
                          "bg-indigo-50/80 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-200",
                        "group"
                      )}
                    >
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeNavItem"
                          className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                      <motion.span
                        whileHover={{ rotate: 8, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "p-1.5 rounded-lg transition-colors shadow-sm",
                          isActive(item.href)
                            ? "bg-indigo-100 dark:bg-indigo-800/80 text-indigo-600 dark:text-indigo-300"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                        )}
                      >
                        {item.icon}
                      </motion.span>
                      <span className="font-medium text-sm truncate">
                        {item.label}
                      </span>
                      {item.new && (
                        <motion.span
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-[10px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white ml-auto"
                        >
                          New
                        </motion.span>
                      )}
                    </motion.span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="p-4 mt-auto border-t border-gray-200/50 dark:border-gray-800 sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
          >
            <div className="relative" ref={userRef}>
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></div>
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {profile.name}
                  </p>
                  <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 truncate capitalize font-semibold">
                    {profile.role.replace("_", " ")}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800"
                  onClick={() => handleSignOut()}
                >
                  <LogOutIcon size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>{mobileMenuOpen && renderOverLay()}</AnimatePresence>
    </>
  );
};

export default AdminSidebar;
