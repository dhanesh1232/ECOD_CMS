// components/marketing/Header.jsx
"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, ChevronDown, X, ArrowRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../logo";
import { useMediaQuery } from "@/hooks/mediaQuery";
import ThemeSwitcher from "../themeSwicther";
import { navItems } from "@/data/web_links";

const domain = process.env.REDIRECT_DOMAIN || "https://app.ecodrix.com";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const isMobile = useMediaQuery("(min-width:500px)");
  const isTab = useMediaQuery("(min-width:768px)");
  const submenuTimeoutRef = useRef(null);
  const lastClickedRef = useRef(null);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

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

  const handleSubmenuHover = (itemName) => {
    clearTimeout(submenuTimeoutRef.current);
    setOpenSubmenu(itemName);
  };

  const handleSubmenuLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 200);
  };

  const toggleMobileSubmenu = (itemName) => {
    if (openSubmenu === itemName) {
      lastClickedRef.current = itemName;
      setOpenSubmenu(null);
    } else {
      if (lastClickedRef.current === itemName) {
        lastClickedRef.current = null;
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
        <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button - left aligned */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-lg mr-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo - centered on mobile */}
          <Link
            href="/"
            className="flex items-center gap-2 group lg:mx-0 mx-auto"
            aria-label="Home"
          >
            <Logo className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
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
                    "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70",
                    "dark:text-neutral-300 dark:hover:text-white dark:hover:bg-gray-800/50",
                    openSubmenu === item.name &&
                      "text-gray-900 bg-gray-50 dark:text-white dark:bg-gray-800/50"
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
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={`absolute left-0 top-full mt-1 ${
                          item.submenu.length > 3
                            ? "min-w-[600px]"
                            : "min-w-[400px]"
                        } w-full  origin-top rounded-xl bg-white shadow-xl ring-1 ring-gray-900/5 p-2 dark:bg-gray-800 dark:ring-gray-700`}
                        onMouseEnter={() => handleSubmenuHover(item.name)}
                        onMouseLeave={handleSubmenuLeave}
                      >
                        <div
                          className={cn(
                            "grid gap-1",
                            isLargeScreen && item.submenu.length > 3
                              ? "grid-cols-3"
                              : "grid-cols-1"
                          )}
                        >
                          {item.submenu.map((subItem) =>
                            subItem.upcoming ? (
                              <div
                                key={subItem.name}
                                className="group flex items-start gap-3 rounded-lg px-3 py-3 cursor-not-allowed opacity-60 relative"
                                title="Coming soon"
                              >
                                <subItem.icon className="w-5 h-5 mt-0.5 text-gray-400" />
                                <div>
                                  <div className="font-medium text-gray-500 dark:text-gray-400">
                                    {subItem.name}
                                    <span className="ml-1 text-xs bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded-md">
                                      Upcoming
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-400 dark:text-gray-500">
                                    {subItem.description.slice(0, 50) + `...`}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="group flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                onClick={() => setOpenSubmenu(null)}
                              >
                                <subItem.icon className="w-5 h-5 mt-0.5 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                                <div>
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                    {subItem.name}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {subItem.description.slice(0, 50) + `...`}
                                  </div>
                                </div>
                              </Link>
                            )
                          )}
                        </div>
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
              className="hidden lg:flex items-center gap-1"
              asChild
            >
              <Link
                href={`${domain}/auth/login`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Login
              </Link>
            </Button>
            <Button
              variant="premium"
              size="sm"
              className="hidden lg:flex items-center gap-1"
            >
              <Link
                href={`${domain}/auth/register`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                Get Started <ArrowRight className="h-4 w-4 ml-1" />
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
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: isMobile ? "45%" : isTab ? "35%" : "65%",
                opacity: 1,
              }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "fixed top-0 left-0 h-full z-50 shadow-2xl dark:shadow-gray-900/50",
                isMobile ? "w-80" : "w-[85%]"
              )}
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

                <div className="flex-1 overflow-y-auto scrollbar-transparent py-4 px-4">
                  <div className="space-y-1">
                    {navItems.map((item, ind) => (
                      <div key={item.name} className="space-y-1">
                        {item.submenu ? (
                          <React.Fragment key={item.name + ind}>
                            <Button
                              variant="ghost"
                              className="w-full justify-between px-3 py-3 text-base font-medium rounded-lg"
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
                                    <React.Fragment key={subItem.name}>
                                      {subItem.upcoming ? (
                                        <div
                                          key={subItem.name}
                                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-not-allowed opacity-60"
                                          title="Coming soon"
                                        >
                                          <subItem.icon className="w-5 h-5 text-gray-400" />
                                          <div>
                                            <div className="font-medium text-gray-500">
                                              {subItem.name}
                                              <span className="ml-1 text-xs bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded-md">
                                                Upcoming
                                              </span>
                                            </div>
                                            <div className="text-xs text-gray-400">
                                              {subItem.description.slice(
                                                0,
                                                50
                                              ) + `....`}
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <Link
                                          key={subItem.name}
                                          href={subItem.href}
                                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                                          onClick={closeAllMenus}
                                        >
                                          <subItem.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                          <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                              {subItem.name}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                              {subItem.description.slice(
                                                0,
                                                50
                                              ) + `....`}
                                            </div>
                                          </div>
                                        </Link>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </React.Fragment>
                        ) : (
                          <Link
                            href={item.href}
                            className="block px-3 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                            onClick={closeAllMenus}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 px-2 space-y-3">
                    <Button variant="outline" className="w-full">
                      <Link
                        href={`${domain}/auth/login`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeAllMenus}
                        className="w-full block"
                      >
                        Login
                      </Link>
                    </Button>
                    <Button variant="premium" className="w-full">
                      <Link
                        href={`${domain}/auth/register`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeAllMenus}
                        className="flex items-center justify-center gap-1 w-full"
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
