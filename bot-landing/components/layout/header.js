// components/marketing/Header.jsx
"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, ChevronDown, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Features",
      href: "/features",
      submenu: [
        { name: "Chatbot", href: "/features/chatbot" },
        { name: "Ads Automation", href: "/features/ads" },
        { name: "AI Tools", href: "/features/ai" },
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
        { name: "SaaS Companies", href: "/use-cases/saas" },
        { name: "E-commerce", href: "/use-cases/ecommerce" },
        { name: "Agencies", href: "/use-cases/agencies" },
      ],
    },
    {
      name: "Resources",
      href: "/resources",
      submenu: [
        { name: "Documentation", href: "/docs" },
        { name: "Blog", href: "/blog" },
        { name: "Webinars", href: "/webinars" },
      ],
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg group"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 rounded-lg px-3 py-2 transition-colors"
                onClick={() =>
                  item.submenu &&
                  setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                }
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
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-1 w-56 origin-top rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 p-2"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          onClick={() => setOpenSubmenu(null)}
                        >
                          {subItem.name}
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
            variant="ghost"
            className="hidden sm:flex text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
            asChild
          >
            <Link href="https://app.ecodrix.com/auth/login">Login</Link>
          </Button>
          <Button
            className="hidden sm:flex bg-gradient-to-br from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 shadow-sm shadow-blue-500/20"
            asChild
          >
            <Link href="https://app.mysaas.com/auth/signup">Get Started</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 bg-white z-50 md:hidden"
          >
            <div className="container h-full flex flex-col">
              <div className="flex h-16 items-center justify-between">
                <Link href="/" className="font-bold text-lg">
                  ChatAutomate
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className="border-b border-gray-100 pb-4"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-lg font-medium text-gray-900 px-0"
                      onClick={() =>
                        setOpenSubmenu(
                          openSubmenu === item.name ? null : item.name
                        )
                      }
                    >
                      {item.name}
                      {item.submenu && (
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform",
                            openSubmenu === item.name ? "rotate-180" : ""
                          )}
                        />
                      )}
                    </Button>

                    {item.submenu && openSubmenu === item.name && (
                      <div className="mt-2 pl-4 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="py-8 flex flex-col gap-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="https://app.mysaas.com/auth/login">Login</Link>
                </Button>
                <Button
                  className="w-full bg-gradient-to-br from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600"
                  asChild
                >
                  <Link href="https://app.mysaas.com/auth/signup">
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
