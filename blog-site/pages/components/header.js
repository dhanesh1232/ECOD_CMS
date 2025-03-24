import { nav_list } from "@/data/nav_link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MenuIcon,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { searchData } from "@/data/search-data";

const HeaderSection = ({ theme, toggleTheme }) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [instantResults, setInstantResults] = useState([]);
  const [openDropDesk, setOpenDropDesk] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null);

  // Search function
  const searchContent = (query, content) => {
    if (!query) return [];
    const lowerCaseQuery = query.toLowerCase();
    return content
      .filter(
        (item) =>
          item.title.toLowerCase().includes(lowerCaseQuery) ||
          (item.description &&
            item.description.toLowerCase().includes(lowerCaseQuery))
      )
      .slice(0, 5); // Limit to 5 results for instant search
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update instant results when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      const results = searchContent(debouncedQuery, searchData);
      setInstantResults(results);
    } else {
      setInstantResults([]);
    }
  }, [debouncedQuery]);

  // Focus search input when search is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Close all dropdowns when route changes
  useEffect(() => {
    setOpenDropDesk(null);
    setIsMobileMenuOpen(false);
    setShowSearch(false);
    document.body.style.overflow = "";
  }, [router.asPath]);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showSearch) {
          setShowSearch(false);
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSearch, isMobileMenuOpen]);

  // Update header height
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`
        );
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  // Handle body overflow when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSearchToggle = useCallback(() => {
    setShowSearch((prev) => !prev);
    setIsMobileMenuOpen(false);
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setShowSearch(false);
  }, []);

  const handleDropdownToggle = useCallback((label) => {
    setOpenDropDesk((prev) => (prev === label ? null : label));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push({
        pathname: "/search",
        query: { q: query },
      });
      setShowSearch(false);
      setSearchQuery("");
      setInstantResults([]);
    }
  };

  // Enhanced keyboard navigation for search results
  const handleKeyDown = (e) => {
    if (instantResults.length > 0) {
      const currentFocused = document.activeElement;
      const results = Array.from(
        document.querySelectorAll('[id^="search-result-"]')
      );
      const mobileResults = Array.from(
        document.querySelectorAll('[id^="mobile-search-result-"]')
      );
      const allResults = [...results, ...mobileResults];

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentFocused === searchInputRef.current) {
          // Focus first result when coming from input
          allResults[0]?.focus();
        } else if (
          currentFocused.id?.startsWith("search-result-") ||
          currentFocused.id?.startsWith("mobile-search-result-")
        ) {
          // Move to next result
          const currentIndex = allResults.findIndex(
            (el) => el === currentFocused
          );
          if (currentIndex < allResults.length - 1) {
            allResults[currentIndex + 1]?.focus();
          }
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (
          currentFocused.id?.startsWith("search-result-") ||
          currentFocused.id?.startsWith("mobile-search-result-")
        ) {
          const currentIndex = allResults.findIndex(
            (el) => el === currentFocused
          );
          if (currentIndex > 0) {
            // Move to previous result
            allResults[currentIndex - 1]?.focus();
          } else {
            // Return to input
            searchInputRef.current?.focus();
          }
        }
      } else if (e.key === "Enter") {
        if (
          currentFocused.id?.startsWith("search-result-") ||
          currentFocused.id?.startsWith("mobile-search-result-")
        ) {
          // Trigger click on the focused result
          currentFocused.click();
        }
      }
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`w-full top-0 z-40 py-2 px-4 transition-all duration-300 fixed ${
          isScrolled
            ? "bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm shadow-sm"
            : "bg-white/20 dark:bg-gray-900/20"
        }`}
      >
        <div className={`max-w-6xl mx-auto flex items-center justify-between`}>
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>

          {/* Logo and Navigation */}
          <div className="flex items-center justify-start gap-2 md:space-x-4 lg:gap-6 mr-2">
            <h1 className="text-xl font-bold">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                ECOD
              </Link>
            </h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:block" aria-label="Main navigation">
              <ul className="flex items-center space-x-2 md:space-x-2 lg:space-x-4">
                {nav_list.map((item) => (
                  <li key={item.label} className="relative group">
                    {item.subpages ? (
                      <div
                        className="p-1.5 lg:px-4 hover:bg-blue-400 hover:text-white rounded-lg transition-all ease-in-out duration-100"
                        onMouseEnter={() => handleDropdownToggle(item.label)}
                        onMouseLeave={() => setOpenDropDesk(null)}
                      >
                        <button
                          type="button"
                          className="flex items-center justify-center w-full"
                          aria-expanded={openDropDesk === item.label}
                          aria-haspopup="true"
                        >
                          {item.label}
                          <ChevronDown
                            className={`ml-1 transition-transform ${
                              openDropDesk === item.label ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence>
                          {openDropDesk === item.label && (
                            <motion.ul
                              className="absolute left-0 px-1 mt-2 min-w-[280px] bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-10 border border-gray-200 dark:border-gray-700"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.subpages.map((subpage) => (
                                <li key={subpage.label}>
                                  <Link
                                    href={`/services/${subpage.slug}`}
                                    className="block px-3 rounded-md py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    {subpage.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={`${item.href}`}
                        className="p-1.5 lg:px-4 hover:bg-blue-400 hover:text-white rounded-lg transition-all ease-in-out duration-100 block"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Search and Theme Toggle */}
          <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
            {/* Enhanced Desktop Search */}
            <div className="hidden md:flex items-center relative">
              <form
                className="relative flex items-center"
                onSubmit={handleSearchSubmit}
                role="search"
              >
                <Search
                  className="absolute left-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  name="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-48 rounded-full border border-gray-300 dark:border-gray-600 bg-white/20 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Search"
                  required
                  ref={searchInputRef}
                  aria-haspopup="listbox"
                  aria-expanded={instantResults.length > 0}
                />
              </form>

              {/* Instant Results Dropdown */}
              {instantResults.length > 0 && (
                <motion.div
                  className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="listbox"
                  aria-label="Search results"
                >
                  <div className="max-h-60 overflow-y-auto">
                    {instantResults.map((result, index) => (
                      <Link
                        key={index}
                        id={`search-result-${index}`}
                        href={result.url}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm border-b border-gray-100 dark:border-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none"
                        onClick={() => {
                          setSearchQuery("");
                          setInstantResults([]);
                        }}
                        tabIndex={0}
                        role="option"
                        aria-selected="false"
                      >
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {result.description}
                        </div>
                      </Link>
                    ))}
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="block px-4 py-2 text-sm text-center font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-lg focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700"
                      onClick={() => {
                        setSearchQuery("");
                        setInstantResults([]);
                      }}
                      tabIndex={0}
                      role="option"
                    >
                      Show more results
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile Search Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={handleSearchToggle}
              aria-label="Search"
              aria-expanded={showSearch}
            >
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              className="relative w-14 h-7 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none transition-colors duration-300 ease-in-out"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <div
                className={`absolute flex items-center justify-center w-5 h-5 rounded-full shadow-md transition-all duration-300 ease-in-out transform ${
                  theme === "dark"
                    ? "translate-x-8 bg-gray-900"
                    : "translate-x-1 bg-white"
                }`}
              >
                {theme === "dark" ? (
                  <Moon className="h-4 w-4 text-gray-50" />
                ) : (
                  <Sun className="h-4 w-4 text-yellow-500" />
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="fixed inset-0 md:hidden z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative w-full max-w-md"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
            >
              <form
                className="relative flex items-center"
                onSubmit={handleSearchSubmit}
                role="search"
              >
                <Search
                  className="absolute left-4 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  name="search"
                  placeholder="Search..."
                  className="w-full pl-12 pr-12 py-3 rounded-lg border-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 shadow-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Search"
                  required
                  aria-haspopup="listbox"
                  aria-expanded={instantResults.length > 0}
                />
                <button
                  type="button"
                  className="absolute right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={handleSearchToggle}
                  aria-label="Close search"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </form>

              {/* Mobile Instant Results */}
              {instantResults.length > 0 && (
                <motion.div
                  className="mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="listbox"
                  aria-label="Search results"
                >
                  <div className="max-h-60 overflow-y-auto">
                    {instantResults.map((result, index) => (
                      <Link
                        key={index}
                        id={`mobile-search-result-${index}`}
                        href={result.url}
                        className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm border-b border-gray-100 dark:border-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none"
                        onClick={() => {
                          setShowSearch(false);
                          setSearchQuery("");
                          setInstantResults([]);
                        }}
                        tabIndex={0}
                        role="option"
                        aria-selected="false"
                      >
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {result.description}
                        </div>
                      </Link>
                    ))}
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="block px-4 py-3 text-sm text-center font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-lg focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700"
                      onClick={() => {
                        setShowSearch(false);
                        setSearchQuery("");
                        setInstantResults([]);
                      }}
                      tabIndex={0}
                      role="option"
                    >
                      Show all results
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className="fixed inset-0 top-[calc(var(--header-height)+1px)] z-[9999] bg-white dark:bg-gray-900 md:hidden flex flex-col"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.2 }}
          >
            <nav
              className="flex-1 overflow-y-auto p-4"
              aria-label="Mobile navigation"
            >
              <ul className="space-y-2">
                {nav_list.map((item) => (
                  <li key={item.label}>
                    {item.subpages ? (
                      <div className="border-b border-gray-700 dark:border-gray-200 relative rounded-b-lg">
                        <button
                          type="button"
                          className="transition ease-in-out transform duration-300 flex items-center justify-between w-full p-3 text-left hover:bg-blue-300 dark:hover:bg-blue-600 rounded-lg text-gray-800 dark:text-gray-200"
                          onClick={() => handleDropdownToggle(item.label)}
                          aria-expanded={openDropDesk === item.label}
                        >
                          {item.label}
                          <ChevronRight />
                        </button>
                        {openDropDesk === item.label && (
                          <motion.div
                            className="absolute z-50 -top-32 left-0 bg-white dark:bg-gray-900 right-0 flex items-center justify-between"
                            initial={{ opacity: 0, x: -300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -300 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ul className="mt-2 space-y-2 overflow-y-auto">
                              {item.subpages.map((subpage) => (
                                <li key={subpage.label}>
                                  <Link
                                    href={`/services/${subpage.slug}`}
                                    className="block p-2 hover:bg-blue-300 dark:hover:bg-blue-600 dark:border-gray-200 border-gray-700 text-gray-800 dark:text-gray-200 border-b rounded-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {subpage.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <button
                              className="relative right-0 sm:px-2 px-1 py-4 text-sm rounded-l-lg hover:bg-gray-500 hover:text-white bg-gray-400 sm:py-6"
                              type="button"
                              onClick={() => setOpenDropDesk(null)}
                            >
                              <ChevronLeft />
                            </button>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={`${item.href}`}
                        className="transition ease-in-out transform duration-300 block p-3 hover:bg-blue-300 dark:hover:bg-blue-600 rounded-lg border-b border-gray-700 dark:border-gray-200 text-gray-800 dark:text-gray-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

HeaderSection.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default HeaderSection;
