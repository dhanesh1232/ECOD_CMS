"use client";

import {
  FaWhatsapp,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();

  // Enhanced scroll effect with requestAnimationFrame
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      setIsScrolled(lastScrollY > 50);
      ticking = false;
    };

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
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
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Menu items
  const menuItems = [
    {
      name: "Features",
      submenu: [
        { name: "Auto-Responder", href: "/features/auto-responder" },
        { name: "AI Chatbots", href: "/features/chatbots" },
        { name: "Broadcast Messaging", href: "/features/broadcasts" },
        { name: "Advanced Analytics", href: "/features/analytics" },
      ],
    },
    { name: "Pricing", href: "/pricing" },
    {
      name: "Resources",
      submenu: [
        { name: "Documentation", href: "/docs" },
        { name: "API Reference", href: "/api" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Case Studies", href: "/case-studies" },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  // Smoother animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        mass: 0.5,
      },
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 400,
        mass: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.12,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 80,
        mass: 0.5,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.15,
      },
    },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`w-full bg-white/95 backdrop-blur-sm z-50 sticky top-0 ${
        isScrolled ? "shadow-sm py-2" : "py-3"
      }`}
      style={{
        willChange: "transform, opacity",
        transition: "box-shadow 0.2s ease, padding 0.2s ease",
      }}
      ref={navRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all ${
            isScrolled ? "h-14" : "h-16"
          }`}
        >
          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
              aria-label="Toggle menu"
              transition={{ type: "spring", stiffness: 500 }}
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </motion.button>
          </div>

          {/* Logo - centered on mobile */}
          <div className="flex flex-1 justify-center lg:justify-start">
            <motion.a
              href="/"
              className="flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{
                  rotate: isScrolled ? 0 : [0, 5, -5, 0],
                  scale: isScrolled ? 0.9 : 1,
                }}
                transition={{
                  rotate: { duration: 1.8, repeat: Infinity, repeatDelay: 10 },
                  scale: { type: "spring", stiffness: 400 },
                }}
              >
                <FaWhatsapp className="text-green-500 h-8 w-8" />
              </motion.div>
              <motion.span
                className={`ml-3 font-bold text-gray-800 ${
                  isScrolled ? "text-lg" : "text-xl"
                }`}
                transition={{ type: "spring", stiffness: 300 }}
              >
                WhatsAuto
                <span className="text-xs bg-green-100 text-green-800 ml-2 px-2 py-0.5 rounded-full">
                  PRO
                </span>
              </motion.span>
            </motion.a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            {menuItems.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <>
                    <motion.button
                      suppressHydrationWarning
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name
                        )
                      }
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        pathname.startsWith(`/${item.name.toLowerCase()}`)
                          ? "text-green-600 bg-green-50/50"
                          : "text-gray-700 hover:text-green-600 hover:bg-gray-100/50"
                      }`}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {item.name}
                      <motion.span
                        animate={{
                          rotate: activeDropdown === item.name ? 180 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <FaChevronDown className="ml-1 h-3 w-3" />
                      </motion.span>
                    </motion.button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute left-0 mt-1 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-gray-100 overflow-hidden"
                        >
                          {item.submenu.map((subItem) => (
                            <motion.a
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                pathname === subItem.href
                                  ? "bg-green-50 text-green-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                              }`}
                              whileHover={{
                                x: 3,
                                transition: {
                                  type: "spring",
                                  stiffness: 600,
                                },
                              }}
                            >
                              {subItem.name}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <motion.a
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pathname === item.href
                        ? "text-green-600 bg-green-50/50"
                        : "text-gray-700 hover:text-green-600 hover:bg-gray-100/50"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.name}
                  </motion.a>
                )}
              </div>
            ))}
          </div>

          {/* Right side elements */}
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-700 hover:text-green-600 rounded-full hidden sm:block"
              aria-label="Search"
              transition={{ type: "spring", stiffness: 500 }}
            >
              <FaSearch className="h-5 w-5" />
            </motion.button>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 200 }}
                  exit={{ opacity: 0, width: 0 }}
                  className="origin-right overflow-hidden"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-1.5 border-b border-gray-200 focus:outline-none focus:border-green-500 bg-transparent"
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.a
              href="/login"
              className="hidden md:flex items-center text-gray-700 hover:text-green-600 px-3 py-1.5 text-sm font-medium transition-colors"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FaUser className="mr-1.5 h-4 w-4" />
              Login
            </motion.a>

            <motion.button
              className={`bg-gradient-to-r hidden sm:block from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium ${
                isScrolled ? "px-4 py-1.5 text-sm" : "px-5 py-2 text-sm"
              } shadow-md hover:shadow-lg transition-all`}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === `mobile-${item.name}`
                              ? null
                              : `mobile-${item.name}`
                          )
                        }
                        className="flex w-full items-center justify-between px-4 py-3 text-base font-medium rounded-lg"
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <span
                          className={
                            pathname.startsWith(`/${item.name.toLowerCase()}`)
                              ? "text-green-600"
                              : "text-gray-700 hover:text-green-600"
                          }
                        >
                          {item.name}
                        </span>
                        <motion.span
                          animate={{
                            rotate:
                              activeDropdown === `mobile-${item.name}`
                                ? 180
                                : 0,
                          }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <FaChevronDown className="ml-1 h-4 w-4" />
                        </motion.span>
                      </motion.button>

                      <AnimatePresence>
                        {activeDropdown === `mobile-${item.name}` && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-6 space-y-1 overflow-hidden"
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {item.submenu.map((subItem) => (
                              <motion.a
                                key={subItem.name}
                                href={subItem.href}
                                className={`block px-4 py-2.5 text-base font-medium rounded-lg ${
                                  pathname === subItem.href
                                    ? "bg-green-50 text-green-600"
                                    : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                                }`}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                  delay: 0.1,
                                  type: "spring",
                                  stiffness: 400,
                                }}
                              >
                                {subItem.name}
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.a
                      href={item.href}
                      className={`block px-4 py-3 text-base font-medium rounded-lg ${
                        pathname === item.href
                          ? "bg-green-50 text-green-600"
                          : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                      }`}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {item.name}
                    </motion.a>
                  )}
                </div>
              ))}

              <div className="pt-2 border-t border-gray-100">
                <motion.a
                  href="/login"
                  className="block w-full px-4 py-3 text-center text-base font-medium text-gray-700 hover:text-green-600 rounded-lg"
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Login
                </motion.a>
                <motion.a
                  href="/signup"
                  className="block w-full px-4 py-3 mt-1 text-center text-base font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg shadow-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Get Started
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
