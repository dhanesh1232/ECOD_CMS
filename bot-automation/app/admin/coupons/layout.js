"use client";

import { Button } from "@/components/ui/button";
import { SUPER_ADMIN_COUPON_NAVS } from "@/data/bot-links";
import { MenuCouponIcon } from "@/public/Images/svg_ecod";
import { X, Menu, BadgePercent } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function Layout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoize the current path segments
  const currentPathSegments = useMemo(
    () => pathname.split("/").slice(2).join(" / "),
    [pathname]
  );

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Toggle mobile menu with useCallback for stable reference
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Memoize nav items to avoid unnecessary recalculations
  const navItems = useMemo(
    () =>
      SUPER_ADMIN_COUPON_NAVS.map(({ id, title, icon, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={id}
            href={href}
            className={`flex truncate flex-nowrap items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-indigo-400"
                : "text-gray-600 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            <span className="text-lg">{icon}</span>
            <span>{title}</span>
          </Link>
        );
      }),
    [pathname]
  );

  return (
    <div className="flex h-full relative">
      {/* Sidebar */}
      <aside
        className={`absolute lg:sticky top-0 left-0 z-20 w-64 h-full border-r bg-white dark:bg-gray-800 dark:border-gray-700 p-4 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0 shadow-xl"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Coupon Panel
          </h1>
          {isMobileMenuOpen && (
            <Button
              size="sm"
              className="lg:hidden"
              variant="ghost"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        <nav className="space-y-1">{navItems}</nav>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-2 sm:p-4 overflow-y-auto scrollbar-transparent">
        <div className="flex items-center justify-start gap-4 mb-2">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="lg:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
            title="Coupon Menu"
          >
            <MenuCouponIcon className="w-5 h-5" />
          </Button>

          <h3 className="capitalize text-lg font-semibold text-gray-700 dark:text-gray-300">
            {currentPathSegments}
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {children}
        </div>
      </main>
    </div>
  );
}
