"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import SelectWorkspace from "@/components/workspace_select";
import {
  ChevronDown,
  User,
  X,
  Plus,
  Bell,
  HelpCircle,
  LogOut,
  Lock,
  StarsIcon,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";
import { useToast } from "./ui/toast-provider";
import { UserServices } from "@/lib/client/user";
import { Button } from "./ui/button";
import Logo from "./logo";
import { Icons } from "./icons";
import { SpinnerIcon } from "@/public/Images/svg_ecod";

const PremiumSidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceId = params.workspaceId;
  const [expandedItems, setExpandedItems] = useState({});
  const [expandedSubItems, setExpandedSubItems] = useState({});
  const [workspaceDetails, setWorkspaceDetails] = useState(null);
  const [hoverProp, setHoverProp] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const [apiState, setApiState] = useState({
    loading: false,
    success: false,
    failed: false,
  });
  const [profile, setProfile] = useState({
    name: "",
    role: "",
  });
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nav-collapsed");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const navRef = useRef(null);
  const userRef = useRef(null);
  const showToast = useToast();
  const toastRef = useRef(false);
  const { scrollY } = useScroll({ container: navRef });

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  });
  useEffect(() => {
    localStorage.setItem("nav-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  // Handle window resize to disable collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderProfile = useCallback(async () => {
    try {
      setApiState((prev) => ({ ...prev, loading: true }));
      const [data, nav_links] = await Promise.all([
        UserServices.fetchUserProfile(),
        UserServices.fetchDashboard(),
      ]);
      if (data.status && !data.ok) {
        throw new Error("Failed to fetch");
      }
      const validLinks = Array.isArray(nav_links.links.data)
        ? nav_links.links.data
        : [];
      setNavLinks(validLinks);
      setWorkspaceDetails(data.data?.currentWorkspaceDetails);
      setProfile({
        name: data.data?.user?.name,
        role: data.data?.user?.role,
      });
      setApiState((prev) => ({ ...prev, success: true, loading: false }));
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          description: err || "failed ti fetch profile",
          variant: "destructive",
        });
        toastRef.current = true;
      }
      setApiState((prev) => ({ ...prev, failed: true, loading: false }));
    } finally {
      setApiState((prev) => ({ ...prev, loading: false }));
    }
  }, [showToast]);

  useEffect(() => {
    renderProfile();
  }, [renderProfile]);

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
          (subItem) => pathname === `/${workspaceId}${subItem.href}`
        );
        initialExpanded[item.id] =
          pathname.startsWith(`/${workspaceId}${item.href}`) ||
          hasActiveSubpage ||
          item.expandedByDefault;
      } else if (item.isParent) {
        initialExpanded[item.id] = pathname.startsWith(
          `/${workspaceId}${item.href}`
        );
      }
    });

    setExpandedItems(initialExpanded);
  }, [pathname, workspaceId, navLinks]);

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
    setExpandedItems((prev) => {
      // Close all other expanded items
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // Toggle the clicked item
      newState[id] = !prev[id];
      return newState;
    });
  };

  const toggleSubExpand = (id) => {
    setExpandedSubItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isActive = (href) => {
    return pathname === `/${workspaceId}${href}` || pathname.includes(href);
  };

  const isSubpageActive = (subHref) => {
    return pathname === `/${workspaceId}${subHref}`;
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

  const renderNav = () => {
    return (
      <nav
        ref={navRef}
        className="scrollbar-transparent flex-1 overflow-y-auto px-2.5 py-2 space-y-1.5 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {navLinks.map((item) => (
          <div key={item.id} className="space-y-1.5">
            {item.subPages ? (
              <>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    toggleExpand(item.id);
                    isCollapsed && setIsCollapsed(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg relative group",
                    "text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80",
                    "focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
                    (isActive(item.href) ||
                      item.subPages.some((sub) => isSubpageActive(sub.href))) &&
                      "bg-indigo-50/80 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-200",
                    "transition-all duration-150"
                  )}
                >
                  {(isActive(item.href) ||
                    item.subPages.some((sub) => isSubpageActive(sub.href))) && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}

                  <div className="flex items-center space-x-3">
                    <motion.div
                      className={cn(
                        "p-1.5 rounded-lg transition-all shadow-sm",
                        "hover:rotate-6 hover:scale-105 active:scale-95",
                        isActive(item.href) ||
                          item.subPages.some((sub) => isSubpageActive(sub.href))
                          ? "bg-indigo-100 dark:bg-indigo-800/80 text-indigo-600 dark:text-indigo-300"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                      )}
                    >
                      {Icons[item.icon]}
                    </motion.div>
                    {!isCollapsed && (
                      <span className="font-medium text-sm truncate">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && (
                    <motion.div
                      animate={{
                        rotate: expandedItems[item.id] ? 180 : 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
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
                  )}
                </motion.button>

                <AnimatePresence>
                  {expandedItems[item.id] && !isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.15, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.15 },
                          opacity: { duration: 0.1 },
                        },
                      }}
                      className="overflow-hidden ml-5 pl-2.5 pr-1.5 border-l-2 border-gray-200 dark:border-gray-700"
                    >
                      <div className="space-y-1 py-1">
                        {item.subPages.map((subItem, index) => (
                          <div key={index} className="relative">
                            {!expandedSubItems[subItem.id] && (
                              <div className="absolute left-[-22px] top-0 bottom-0 w-px rotate-90 bg-gray-300 dark:bg-gray-700" />
                            )}
                            {subItem.nestedPages &&
                            subItem.nestedPages.length > 0 ? (
                              <>
                                <motion.button
                                  whileHover={{ x: 4 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => toggleSubExpand(subItem.id)}
                                  className={cn(
                                    "w-full flex items-center justify-between px-3 py-2 rounded-lg relative group",
                                    "text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80",
                                    "focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
                                    (isActive(subItem.href) ||
                                      subItem.nestedPages.some((sub) =>
                                        isSubpageActive(sub.href)
                                      )) &&
                                      "bg-indigo-50/80 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-200",
                                    "transition-all duration-150"
                                  )}
                                >
                                  {(isActive(subItem.href) ||
                                    subItem.nestedPages.some((sub) =>
                                      isSubpageActive(sub.href)
                                    )) && (
                                    <motion.div
                                      layoutId="activeNavItem"
                                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full"
                                      transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                      }}
                                    />
                                  )}
                                  <div className="flex items-center space-x-3">
                                    <motion.div
                                      className={cn(
                                        "p-1.5 rounded-lg transition-all shadow-sm",
                                        "hover:rotate-6 hover:scale-105 active:scale-95",
                                        isActive(subItem.href) ||
                                          subItem.nestedPages.some((sub) =>
                                            isSubpageActive(sub.href)
                                          )
                                          ? "bg-indigo-100 dark:bg-indigo-800/80 text-indigo-600 dark:text-indigo-300"
                                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                                      )}
                                    >
                                      {Icons[subItem.icon]}
                                    </motion.div>
                                    <span className="font-medium text-sm">
                                      {subItem.label}
                                    </span>
                                  </div>
                                  <motion.div
                                    animate={{
                                      rotate: expandedSubItems[subItem.id]
                                        ? 180
                                        : 0,
                                      transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                      },
                                    }}
                                    className="mr-1"
                                  >
                                    <ChevronDown
                                      size={16}
                                      className={cn(
                                        "transition-colors",
                                        isActive(subItem.href) ||
                                          subItem.nestedPages.some((sub) =>
                                            isSubpageActive(sub.href)
                                          )
                                          ? "text-indigo-500 dark:text-indigo-400"
                                          : "text-gray-500 dark:text-gray-400"
                                      )}
                                    />
                                  </motion.div>
                                </motion.button>
                                <AnimatePresence>
                                  {expandedSubItems[subItem.id] && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{
                                        height: "auto",
                                        opacity: 1,
                                        transition: {
                                          height: {
                                            duration: 0.2,
                                            ease: [0.22, 1, 0.36, 1],
                                          },
                                          opacity: {
                                            duration: 0.15,
                                            delay: 0.05,
                                          },
                                        },
                                      }}
                                      exit={{
                                        height: 0,
                                        opacity: 0,
                                        transition: {
                                          height: { duration: 0.15 },
                                          opacity: { duration: 0.1 },
                                        },
                                      }}
                                      className="overflow-hidden ml-5 pl-2.5 pr-1.5 border-l-2 border-gray-200 dark:border-gray-700"
                                    >
                                      {subItem.nestedPages.map((each) => (
                                        <div className="relative" key={each.id}>
                                          <div className="absolute left-[-22px] top-0 bottom-0 w-px rotate-90 bg-gray-300 dark:bg-gray-700" />
                                          <Link
                                            onClick={() => {
                                              mobileMenuOpen &&
                                                setMobileMenuOpen(
                                                  !mobileMenuOpen
                                                );
                                            }}
                                            href={`/${workspaceId}${each.href}`}
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
                                                isSubpageActive(each.href) &&
                                                  "text-indigo-700 dark:text-indigo-200 bg-indigo-50/80 dark:bg-indigo-900/20"
                                              )}
                                            >
                                              {isSubpageActive(each.href) && (
                                                <motion.span
                                                  layoutId="activeSubNavItem"
                                                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500 rounded-r-full"
                                                  transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 20,
                                                  }}
                                                />
                                              )}
                                              <motion.span
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className={cn(
                                                  "p-1 rounded-md transition-colors",
                                                  isSubpageActive(each.href)
                                                    ? "bg-indigo-100 dark:bg-indigo-800/80 text-indigo-600 dark:text-indigo-300"
                                                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                                                )}
                                              >
                                                {Icons[each.icon]}
                                              </motion.span>
                                              <span className="truncate font-medium text-sm">
                                                {each.label}
                                              </span>
                                            </motion.span>
                                          </Link>
                                        </div>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </>
                            ) : (
                              <Link
                                href={`/${workspaceId}${subItem.href}`}
                                key={subItem.id}
                                onClick={() => {
                                  mobileMenuOpen &&
                                    setMobileMenuOpen(!mobileMenuOpen);
                                }}
                              >
                                <motion.span
                                  whileHover={{
                                    x: 4,
                                    backgroundColor: "rgba(224, 231, 255, 0.5)",
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
                                        stiffness: 300,
                                        damping: 20,
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
                                    {Icons[subItem.icon]}
                                  </motion.span>
                                  <span className="truncate font-medium text-sm">
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
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={`/${workspaceId}${item.href}`}
                onClick={() => {
                  mobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen);
                }}
              >
                <motion.span
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg relative group",
                    "text-gray-700 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80",
                    isActive(item.href) &&
                      "bg-indigo-50/80 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-200",
                    "transition-all duration-150"
                  )}
                >
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}
                  <motion.span
                    className={cn(
                      "p-1.5 rounded-lg transition-all shadow-sm",
                      "hover:rotate-6 hover:scale-105 active:scale-95",
                      isActive(item.href)
                        ? "bg-indigo-100 dark:bg-indigo-800/80 text-indigo-600 dark:text-indigo-300"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                    )}
                  >
                    {Icons[item.icon]}
                  </motion.span>
                  {!isCollapsed && (
                    <>
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
                    </>
                  )}
                </motion.span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    );
  };

  const renderAPIStatus = () => {
    if (apiState.failed) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h3>Failed to load API data</h3>
          <Button type="button" onClick={() => renderProfile()}>
            <RefreshCcw />
          </Button>
        </div>
      );
    }
    if (apiState.loading) {
      return (
        <div className="w-full flex h-full items-center justify-center">
          <SpinnerIcon />
        </div>
      );
    }
    if (apiState.success) {
      return renderNav();
    }
  };

  return (
    <>
      {/* Sidebar */}
      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950 border-r border-gray-200/50 dark:border-gray-800 shadow-xl transition-all duration-300 transform",
          "lg:translate-x-0 lg:relative lg:flex",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-20" : "w-56 sm:w-64"
        )}
      >
        <div className="flex flex-col w-full h-full">
          {/* Sidebar Header */}
          <div
            className={cn(
              "p-4 py-3.5 border-gray-200/50 dark:border-gray-800 transition-all duration-300 sticky top-0 z-10",
              isScrolled
                ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
                : "bg-transparent",
              "flex items-center justify-between relative"
            )}
          >
            <Link href={`/${workspaceId}`}>
              <div className="flex items-center space-x-3 cursor-pointer group">
                <Logo isShown={true} textShow={!isCollapsed} size="md" />
              </div>
            </Link>

            {/* Collapse Toggle Button - Only visible on desktop */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "hidden absolute -right-2 lg:flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
                "hover:bg-gray-200 dark:hover:bg-gray-700",
                "transition-colors duration-200"
              )}
            >
              {isCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </motion.button>
          </div>

          {/* Search and Create Section */}
          <div
            className={cn(
              "px-5 pt-5 pb-3 space-y-3 sticky top-[72px] z-10 bg-gradient-to-b from-white dark:from-gray-900 to-transparent"
            )}
          >
            <SelectWorkspace collapsed={isCollapsed} />
            {workspaceDetails?.subscription?.plan.toLowerCase() === "free" && (
              <Button
                variant="premium"
                onClick={() => router.push(`/${workspaceId}/plans`)}
                title="Upgrade plan"
                fullWidth
                className={`relative flex items-center justify-center ${
                  isCollapsed ? "p-2" : ""
                }`}
                aria-label="Upgrade plan"
              >
                {!isCollapsed && <span className="mr-2">Upgrade</span>}
                <ArrowUp size={isCollapsed ? 18 : 20} className="text-white" />
                <span className="absolute left-0 top-0">
                  <StarsIcon
                    className={`${
                      isCollapsed ? "h-3 w-3" : "h-5 w-5"
                    } text-yellow-500`}
                  />
                </span>
              </Button>
            )}

            <Button
              variant="primary"
              title="Create"
              fullWidth
              className={`flex items-center justify-center ${
                isCollapsed ? "p-2" : ""
              }`}
            >
              <Plus size={isCollapsed ? 18 : 20} className="text-white" />
              {!isCollapsed && <span className="ml-2">Create</span>}
            </Button>
          </div>

          {/* Navigation Items */}
          {renderAPIStatus()}

          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "p-4 mt-auto border-t border-gray-200/50 dark:border-gray-800 sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
              isCollapsed ? "flex justify-center" : ""
            )}
          >
            <div className="relative" ref={userRef}>
              {apiState.loading ? (
                <div className="flex items-center justify-center w-full">
                  <SpinnerIcon />
                </div>
              ) : (
                <div
                  className={cn(
                    "flex items-center",
                    isCollapsed ? "justify-center" : "space-x-3"
                  )}
                >
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

                  {!isCollapsed && (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                          {profile.name}
                        </p>
                        <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 truncate capitalize font-semibold">
                          {profile.role}
                        </p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                      >
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform",
                            userMenuOpen ? "rotate-180" : "rotate-0"
                          )}
                        />
                      </motion.button>
                    </>
                  )}
                </div>
              )}

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className={cn(
                      "absolute bottom-full left-0 right-0 mb-2 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700",
                      isCollapsed ? "w-56" : "w-full"
                    )}
                  >
                    <div className="py-1">
                      <Link
                        href={`/${workspaceId}/settings/account/profile`}
                        onClick={() => {
                          mobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen);
                        }}
                      >
                        <motion.span
                          whileHover={{
                            backgroundColor: "rgba(243, 244, 246, 0.5)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200"
                        >
                          <User
                            size={16}
                            className="mr-3 text-indigo-600 dark:text-indigo-400"
                          />
                          Profile
                        </motion.span>
                      </Link>
                      <Link
                        href={`/${workspaceId}/settings/account/security`}
                        onClick={() => {
                          mobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen);
                        }}
                      >
                        <motion.span
                          whileHover={{
                            backgroundColor: "rgba(243, 244, 246, 0.5)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200"
                        >
                          <Lock
                            size={16}
                            className="mr-3 text-indigo-600 dark:text-indigo-400"
                          />
                          Security
                        </motion.span>
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
                            className="mr-3 text-indigo-600 dark:text-indigo-400"
                          />
                          Notifications
                        </motion.span>
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <Link
                        href={`/${workspaceId}/help`}
                        onClick={() => {
                          mobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen);
                        }}
                      >
                        <motion.span
                          whileHover={{
                            backgroundColor: "rgba(243, 244, 246, 0.5)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-200"
                        >
                          <HelpCircle
                            size={16}
                            className="mr-3 text-indigo-600 dark:text-indigo-400"
                          />
                          Help & Support
                        </motion.span>
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <motion.button
                        whileHover={{
                          backgroundColor: "rgba(243, 244, 246, 0.5)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSignOut}
                        className="w-full flex items-center px-4 py-2 text-sm rounded-md  text-red-600 dark:text-red-400"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign Out
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>{mobileMenuOpen && renderOverLay()}</AnimatePresence>
    </>
  );
};

export default PremiumSidebar;
