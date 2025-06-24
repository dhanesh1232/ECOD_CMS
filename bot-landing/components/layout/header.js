// components/marketing/Header.jsx
"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, ChevronDown, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../logo";
import { useMediaQuery } from "@/hooks/mediaQuery";
import ThemeSwitcher from "../themeSwicther";

const domain = process.env.REDIRECT_DOMAIN;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const isMatch = useMediaQuery("(min-width:500px)");
  const submenuTimeoutRef = useRef(null);
  const lastClickedRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenSubmenu(null);
      }
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    {
      name: "Features",
      href: "/features",
      submenu: [
        {
          name: "Chatbot",
          href: "/features/chatbot",
          icon: "💬",
          description: "AI-powered conversational interfaces",
        },
        {
          name: "Ads Automation",
          href: "/features/ads",
          icon: "📢",
          description: "Smart ad campaign management",
        },
        {
          name: "AI Tools",
          href: "/features/ai",
          icon: "🧠",
          description: "Cutting-edge artificial intelligence",
        },
      ],
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "Use Cases",
      href: "/use-cases",
      submenu: [
        {
          name: "SaaS Companies",
          href: "/use-cases/saas",
          icon: "🖥️",
          description: "Solutions for software businesses",
        },
        {
          name: "E-commerce",
          href: "/use-cases/ecommerce",
          icon: "🛒",
          description: "Boost your online sales",
        },
        {
          name: "Agencies",
          href: "/use-cases/agencies",
          icon: "🏢",
          description: "Tools for digital agencies",
        },
      ],
    },
    {
      name: "Resources",
      href: "/resources",
      submenu: [
        {
          name: "Documentation",
          href: "/docs",
          icon: "📚",
          description: "Developer guides and API references",
        },
        {
          name: "Blog",
          href: "/blog",
          icon: "✍️",
          description: "Latest news and insights",
        },
        {
          name: "Webinars",
          href: "/webinars",
          icon: "🎤",
          description: "Live sessions with our experts",
        },
      ],
    },
  ];

  const handleSubmenuHover = (itemName) => {
    clearTimeout(submenuTimeoutRef.current);
    setOpenSubmenu(itemName);
  };

  const handleSubmenuLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 300);
  };

  const toggleMobileSubmenu = (itemName) => {
    // If the same button was clicked again, close it
    if (openSubmenu === itemName) {
      lastClickedRef.current = itemName;
      setOpenSubmenu(null);
    } else {
      // Prevent immediate reopen if it's the same button
      if (lastClickedRef.current === itemName) {
        lastClickedRef.current = null; // Reset for next toggle
        return;
      }
      setOpenSubmenu(itemName);
      lastClickedRef.current = itemName;
    }
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 flex items-center justify-center",
          scrolled
            ? "bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm dark:bg-gray-900/95 dark:border-gray-800"
            : "bg-white/90 backdrop-blur-md dark:bg-gray-900/90"
        )}
      >
        <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Mobile menu button - left aligned */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden rounded-lg mr-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Logo - centered on mobile */}
          <Link
            href="/"
            className="flex items-center gap-2 group md:mx-0 mx-auto"
            aria-label="Home"
          >
            <Logo className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() =>
                  item.submenu && handleSubmenuHover(item.name)
                }
                onMouseLeave={handleSubmenuLeave}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium rounded-lg px-3 py-2 transition-colors",
                    "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50",
                    "dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50",
                    openSubmenu === item.name && "text-gray-900 dark:text-white"
                  )}
                  onClick={() =>
                    item.submenu &&
                    setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                  }
                  aria-expanded={item.submenu && openSubmenu === item.name}
                  aria-haspopup={!!item.submenu}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openSubmenu === item.name ? "rotate-180" : ""
                      )}
                    />
                  )}
                </Button>

                {item.submenu && (
                  <AnimatePresence>
                    {openSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-1 w-64 origin-top rounded-xl bg-white shadow-xl ring-1 ring-gray-900/5 p-2 dark:bg-gray-800 dark:ring-gray-700"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="group flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            onClick={() => setOpenSubmenu(null)}
                          >
                            <span className="text-lg mt-0.5">
                              {subItem.icon}
                            </span>
                            <div>
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                {subItem.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {subItem.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:block"
              asChild
            >
              <Link
                href={`https://${domain}/auth/login`}
                target="_blank"
                rel="noopener noreferrer"
                className="md:flex items-center md:text-sm lg:text-base hidden justify-center"
              >
                Login
              </Link>
            </Button>
            <Button variant="premium" className="md:block hidden" size="sm">
              <Link
                href={`https://${domain}/auth/register`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center md:text-sm lg:text-base justify-center"
              >
                Get Started <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed h-full inset-0 bg-black/30 z-40 backdrop-blur-sm"
              onClick={closeAllMenus}
            />

            <motion.div
              ref={mobileMenuRef}
              initial={{ width: 0 }}
              animate={{ width: isMatch ? "45%" : "85%" }}
              exit={{ width: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 h-full z-50 shadow-2xl dark:shadow-gray-900/50 overflow-hidden"
            >
              <div className="h-full flex flex-col bg-white dark:bg-gray-900 w-full">
                <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={closeAllMenus}
                  >
                    <Logo className="h-7 w-auto" />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    onClick={closeAllMenus}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-4">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <div key={item.name} className="space-y-1">
                        {item.submenu ? (
                          <>
                            <Button
                              variant="ghost"
                              className="w-full justify-between px-3 py-3 text-base font-medium rounded-lg truncate"
                              onClick={() => toggleMobileSubmenu(item.name)}
                            >
                              <span className="text-gray-900 dark:text-white">
                                {item.name}
                              </span>
                              <ChevronDown
                                className={cn(
                                  "h-5 w-5 transition-transform text-gray-400",
                                  openSubmenu === item.name ? "rotate-180" : ""
                                )}
                              />
                            </Button>

                            <AnimatePresence>
                              {openSubmenu === item.name && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="pl-4 space-y-1 overflow-hidden"
                                >
                                  {item.submenu.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      className="flex items-center truncate gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                                      onClick={closeAllMenus}
                                    >
                                      <span className="text-lg">
                                        {subItem.icon}
                                      </span>
                                      <div>
                                        <div className="font-medium text-gray-900 dark:text-white">
                                          {subItem.name}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                          {subItem.description}
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className="block px-3 py-3 text-base truncate font-medium text-gray-900 rounded-lg hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                            onClick={closeAllMenus}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 px-2 space-y-3">
                    <Button variant="outline" fullWidth={true}>
                      <Link
                        href={`https://${domain}/auth/login`}
                        target="_blank"
                        rel="noopener noreferrer truncate"
                        onClick={closeAllMenus}
                      >
                        Login
                      </Link>
                    </Button>
                    <Button variant="premium" fullWidth={true}>
                      <Link
                        href={`https://${domain}/auth/register`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeAllMenus}
                        className="flex items-center justify-center gap-1 truncate"
                      >
                        Get Started <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
