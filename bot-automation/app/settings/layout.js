"use client";

import { settingsNavItems } from "@/data/bot-links";
import { ChevronRight, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronRight, FiMenu, FiX } from "react-icons/fi";

const SettingsLayout = ({ children }) => {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState("account");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [headerH, setHeader] = useState(0);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-close mobile nav when navigating
  useEffect(() => {
    if (isMobile) {
      setMobileNavOpen(false);
    }
  }, [pathname, isMobile]);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeader(header.offsetHeight);
      console.log(header.offsetHeight);
    }
  }, []);
  const toggleSection = (sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const isActive = (href) => pathname?.startsWith(href);

  return (
    <div className="flex flex-col sm:flex-row h-full relative">
      <div
        className={`w-3/4 sm:w-56 border-r border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 sm:block ${
          isMobile
            ? `fixed inset-0 z-40 transform ${
                mobileNavOpen ? "translate-x-0" : "-translate-x-full"
              } overflow-y-auto transition-transform duration-300`
            : ""
        }`}
        style={isMobile ? { marginTop: `${headerH}px` } : {}}
      >
        <div className="w-full flex items-center justify-between relative">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Settings
          </h2>
          {isMobile && (
            <button
              className="outline-none absolute top-1 right-0"
              onClick={() => setMobileNavOpen(false)}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <nav className="space-y-1">
          {settingsNavItems.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-3 w-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <div className="flex items-center">
                  <span className="mr-2">{section.icon}</span>
                  {section.category}
                </div>
                <ChevronRight
                  size={14}
                  className={`${
                    expandedSection === section.id ? "rotate-90" : "rotate-0"
                  } transition-all duration-150 ease-in-out transform`}
                />
              </button>
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-6 mt-1 space-y-1"
                  >
                    {section.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive(item.href)
                            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                        }`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div
        className={`flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 ${
          isMobile && mobileNavOpen ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumbs - Mobile header */}
          {isMobile && (
            <div className="sm:hidden mb-4 flex items-center">
              <button
                onClick={() => setMobileNavOpen(true)}
                className="mr-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FiMenu size={20} />
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="hover:text-indigo-600 dark:hover:text-indigo-300 cursor-pointer">
                  Settings
                </span>
                {pathname.split("/").length > 2 && (
                  <>
                    <span className="mx-2">/</span>
                    <span className="capitalize text-gray-800 dark:text-gray-200">
                      {pathname.split("/")[2].replace("-", " ")}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Desktop Breadcrumbs */}
          {!isMobile && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              <span className="hover:text-indigo-600 dark:hover:text-indigo-300 cursor-pointer">
                Settings
              </span>
              {pathname.split("/").length > 2 && (
                <>
                  <span className="mx-2">/</span>
                  <span className="capitalize text-gray-800 dark:text-gray-200">
                    {pathname.split("/")[2].replace("-", " ")}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Content Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            {children}
          </div>

          {/* Save Button (conditionally shown) */}
          {pathname !== "/settings" && (
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
