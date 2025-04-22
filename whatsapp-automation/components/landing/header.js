"use client";

import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaUser,
  FaSearch,
  FaRobot,
  FaChartLine,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaTools,
  FaBook,
  FaVideo,
  FaUsers,
} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../logo";
import { useSession } from "next-auth/react";
import { useDarkMode } from "@/context/context";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY > 50;
      if (scroll) {
        setMobileMenuOpen(false);
        setIsScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      if (
        searchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const platformItems = [
    {
      name: "WhatsApp API",
      icon: <FaWhatsapp className="text-green-500 dark:text-green-400" />,
      href: "/en/product/whatsapp-api",
    },
    {
      name: "Facebook Messenger",
      icon: <FaFacebook className="text-blue-600 dark:text-blue-400" />,
      href: "/en/product/facebook-messenger",
    },
    {
      name: "Instagram Direct",
      icon: <FaInstagram className="text-pink-600 dark:text-pink-400" />,
      href: "/en/product/instagram-direct",
    },
  ];

  const menuItems = [
    {
      name: "Platforms",
      submenu: platformItems.map((platform) => ({
        ...platform,
        icon: platform.icon,
      })),
    },
    {
      name: "Pricing",
      href: "/en/pricing",
      highlight: true,
    },
    {
      name: "Tools",
      submenu: [
        {
          name: "Chatbot Builder",
          href: "/en/tools/chatbot-builder",
          icon: <FaRobot className="text-purple-500" />,
        },
        {
          name: "Workflow Automation",
          href: "/en/tools/workflows",
          icon: <FaTools className="text-purple-500" />,
        },
        {
          name: "Analytics Dashboard",
          href: "/en/tools/analytics",
          icon: <FaChartLine className="text-purple-500" />,
        },
        {
          name: "API & Integrations",
          href: "/en/tools/api",
          icon: <FaEnvelope className="text-purple-500" />,
        },
      ],
    },
    {
      name: "Resources",
      submenu: [
        {
          name: "Documentation",
          href: "/en/resources/docs",
          icon: <FaBook className="text-blue-500" />,
        },
        {
          name: "Video Tutorials",
          href: "/en/resources/tutorials",
          icon: <FaVideo className="text-blue-500" />,
        },
        {
          name: "Blog & News",
          href: "/en/resources/blog",
          icon: <FaEnvelope className="text-blue-500" />,
        },
        {
          name: "Community Forum",
          href: "/en/resources/community",
          icon: <FaUsers className="text-blue-500" />,
        },
      ],
    },
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const getAuthUrl = (type) => {
    // Don't set callback for auth pages to prevent loops
    if (pathname.startsWith("/auth")) {
      return `/auth/${type}`;
    }
    return `/auth/${type}?callbackUrl=${encodeURIComponent(pathname)}`;
  };
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 25 }}
      className={`sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm transition-all ${
        isScrolled ? "py-2" : "py-3"
      }`}
      ref={navRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Mobile menu button (left side) */}
          <div className="flex items-center md:hidden">
            <button
              aria-label="Toggle menu"
              className="p-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Logo (centered on mobile) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none flex items-center">
            <Link href="/" aria-label="Home">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <>
                    <button
                      aria-expanded={activeDropdown === item.name}
                      aria-haspopup="true"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name
                        )
                      }
                      className={`flex items-center px-2 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeDropdown === item.name
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {item.name}
                      <FaChevronDown
                        className={`ml-1 h-3 w-3 transition-transform ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <span className="mr-3">{subItem.icon}</span>
                              <span className="text-gray-800 dark:text-gray-200">
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.highlight
                        ? "text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side elements */}
          <div className="flex items-center space-x-1 md:relative absolute right-1">
            <div ref={searchRef} className="relative">
              <button
                aria-label="Search"
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (!searchOpen) {
                    setTimeout(
                      () => searchRef.current?.querySelector("input")?.focus(),
                      100
                    );
                  }
                }}
                className={`p-2 rounded-full transition-colors ${
                  searchOpen
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <FaSearch />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 200 }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearch}
                      className="w-full px-3 py-2 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              aria-label="Toggle dark mode"
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full transition-colors"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <Link
              href={getAuthUrl("login")}
              className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-50 hover:dark:text-gray-300 hover:text-gray-500 transition-all"
            >
              <FaUser className="mr-2" />
              Login
            </Link>
            <Link
              href={getAuthUrl("register")}
              className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg shadow-sm transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.name ? null : item.name
                          )
                        }
                        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        {item.name}
                        <FaChevronDown
                          className={`ml-1 h-3 w-3 transition-transform ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-6 space-y-1"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                              <span className="mr-3">{subItem.icon}</span>
                              <span className="text-gray-700 dark:text-gray-300">
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        item.highlight
                          ? "text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <Link
                  href={getAuthUrl("login")}
                  className="block w-full px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href={getAuthUrl("register")}
                  className="block w-full px-4 py-3 mt-1 text-center text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
