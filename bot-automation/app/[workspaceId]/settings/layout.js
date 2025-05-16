"use client";

import { settingsNavItems } from "@/data/bot-links";
import { ChevronRight, Menu, X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import SettingsBreadcrumb from "@/components/breadcrumb";

const SettingsLayout = ({ children }) => {
  const pathname = usePathname();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [expandedSection, setExpandedSection] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [headerH, setHeader] = useState(0);
  const navRef = useRef();

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    // Find the section that contains the current path
    const activeSection = settingsNavItems.find((section) =>
      section.items?.some((item) =>
        pathname.startsWith(`/${workspaceId}${item.href}`)
      )
    );
    if (activeSection?.id) {
      setExpandedSection(activeSection.id);
    } else {
      setExpandedSection("");
    }
  }, [pathname, workspaceId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileNavOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
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
    }
  }, []);
  const toggleSection = (sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const isActive = (href) => pathname?.startsWith(href);

  return (
    <div className="flex flex-col sm:flex-row h-full relative">
      <div
        ref={navRef}
        className={`w-3/4 sm:w-64 border-r border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 sm:block ${
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

        <nav className="space-y-2">
          {settingsNavItems.map((section) => (
            <div key={section.id || section.category} className="group">
              {section.items ? (
                <>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full p-3 text-sm font-medium transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                    aria-expanded={expandedSection === section.id}
                    aria-controls={`${section.id}-menu`}
                  >
                    <div className="flex items-center">
                      {section.icon && (
                        <span className="mr-3 opacity-70">{section.icon}</span>
                      )}
                      <span>{section.category}</span>
                    </div>
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-200 ${
                        expandedSection === section.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedSection === section.id && (
                      <motion.div
                        id={`${section.id}-menu`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="pl-8 mt-1 space-y-1"
                      >
                        {section.items.map((item) => (
                          <Link
                            key={item.name}
                            href={`/${workspaceId}${item.href}`}
                            prefetch={true}
                            className={`flex items-center px-3 py-2 text-sm transition-colors rounded-md ${
                              pathname === `/${workspaceId}${item.href}`
                                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200 font-medium"
                                : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50"
                            }`}
                            target={item.external ? "_blank" : undefined}
                            rel={
                              item.external ? "noopener noreferrer" : undefined
                            }
                          >
                            {item.icon && (
                              <span className="mr-2 opacity-70">
                                {item.icon}
                              </span>
                            )}
                            {item.name}
                            {item.external && (
                              <FiExternalLink className="w-3 h-3 ml-1 opacity-60" />
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={`/${workspaceId}/${section.href}`}
                  className={`flex items-center p-3 text-sm font-medium rounded-md ${
                    pathname === section.href
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {section.icon && (
                    <span className="mr-3 opacity-70">{section.icon}</span>
                  )}
                  {section.category}
                </Link>
              )}
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
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs - Mobile header */}
          <div className="sm:hidden mb-4 flex items-center">
            {isMobile && (
              <button
                onClick={() => setMobileNavOpen(true)}
                className="mr-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Menu size={20} />
              </button>
            )}
            <SettingsBreadcrumb pathname={pathname} />
          </div>
          {/* Content Card */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
