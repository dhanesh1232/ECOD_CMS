import { nav_list } from "@/data/nav_link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { searchData } from "@/data/search_data";

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
  const searchContainerRef = useRef(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search function
  const searchContent = useCallback((query) => {
    if (!query.trim()) return [];
    const lowerCaseQuery = query.toLowerCase();

    const filterData = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description?.toLowerCase().includes(lowerCaseQuery)
    );
    return filterData.slice(0, 5);
  }, []);

  // In your useEffect for search results
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setInstantResults(searchContent(debouncedQuery));
    } else {
      setInstantResults([]);
    }
  }, [debouncedQuery, searchContent]);

  // Close dropdowns on route change
  useEffect(() => {
    setOpenDropDesk(null);
    setIsMobileMenuOpen(false);
    setShowSearch(false);
    document.body.style.overflow = "";
  }, [router.asPath]);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update header height CSS variable
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${headerRef.current.offsetHeight}px`
        );
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  // Handle body overflow
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSearchToggle = useCallback(() => {
    setShowSearch((prev) => !prev);
    setIsMobileMenuOpen(false);
    if (!showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showSearch]);

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
      router.push({ pathname: "/search", query: { q: query } });
      setShowSearch(false);
      setSearchQuery("");
      setInstantResults([]);
    }
  };

  // Keyboard navigation for search results
  const handleKeyDown = (e) => {
    if (!instantResults.length) return;

    const results = Array.from(
      document.querySelectorAll('[id^="search-result-"]')
    );
    const current = document.activeElement;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (current === searchInputRef.current) {
        results[0]?.focus();
      } else if (current.id?.startsWith("search-result-")) {
        const index = results.findIndex((el) => el === current);
        if (index < results.length - 1) results[index + 1]?.focus();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (current.id?.startsWith("search-result-")) {
        const index = results.findIndex((el) => el === current);
        index > 0
          ? results[index - 1]?.focus()
          : searchInputRef.current?.focus();
      }
    } else if (e.key === "Enter" && current.id?.startsWith("search-result-")) {
      current.click();
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 py-3 px-4 transition-all duration-300 ${
          isScrolled
            ? "bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg border-b border-white/10 dark:border-gray-800"
            : "bg-white/5 dark:bg-gray-900/5 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-white dark:text-gray-200" />
            ) : (
              <Menu size={24} className="text-white dark:text-gray-200" />
            )}
          </button>

          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-6 md:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <motion.span
                className="text-2xl font-bold bg-clip-text text-transparent 
                bg-gradient-to-r from-blue-200 to-purple-200 dark:from-green-400 dark:to-yellow-400"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                ECOD
              </motion.span>
            </Link>

            <nav className="hidden md:block">
              <ul className="flex items-center gap-1">
                {nav_list.map((item) => (
                  <motion.li
                    key={item.label}
                    className="relative"
                    whileHover="hover"
                    initial="initial"
                    animate="animate"
                  >
                    {item.subpages ? (
                      <div
                        onMouseEnter={() => handleDropdownToggle(item.label)}
                        onMouseLeave={() => setOpenDropDesk(null)}
                        className="px-3 py-2 rounded-lg"
                      >
                        <button
                          type="button"
                          className={`flex items-center gap-1 font-medium text-white/90 dark:text-gray-200 hover:text-blue-200 dark:hover:text-blue-400 transition-colors`}
                          aria-expanded={openDropDesk === item.label}
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openDropDesk === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {openDropDesk === item.label && (
                            <motion.ul
                              className="absolute left-0 mt-2 w-64 overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl rounded-lg py-2 z-20 border border-white/20 dark:border-gray-700"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {item.subpages.map((subpage) => (
                                <motion.li
                                  key={subpage.label}
                                  whileHover={{ x: 5 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  <Link
                                    href={subpage.slug}
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/50 rounded transition-colors"
                                  >
                                    {subpage.label}
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="px-3 py-2 font-medium text-white/90 dark:text-gray-200 hover:text-blue-200 dark:hover:text-blue-400 transition-colors rounded-lg block"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Search and Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 dark:text-gray-400"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-48 lg:w-56 rounded-full border border-white/30 dark:border-gray-600 bg-white/10 dark:bg-gray-800/50 text-white dark:text-gray-200 placeholder-white/60 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Search"
                />
              </form>

              {/* Search Results */}
              {instantResults.length > 0 && (
                <motion.div
                  className="absolute top-full mt-1 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg rounded-lg z-50 border border-white/20 dark:border-gray-700 overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {instantResults.map((result, index) => (
                    <Link
                      key={index}
                      id={`search-result-${index}`}
                      href={result.url}
                      className="block px-4 py-3 hover:bg-white/30 dark:hover:bg-gray-700/50 border-b border-white/20 dark:border-gray-700 focus:outline-none focus:bg-white/30 dark:focus:bg-gray-700/50"
                      onClick={() => {
                        setSearchQuery("");
                        setInstantResults([]);
                      }}
                      tabIndex={0}
                    >
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {result.title}
                      </div>
                      <div className="text-sm text-gray-600/90 dark:text-gray-400 truncate">
                        {result.description}
                      </div>
                    </Link>
                  ))}
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="block px-4 py-3 text-center font-medium text-blue-600 dark:text-blue-400 hover:bg-white/20 dark:hover:bg-gray-700/50"
                    onClick={() => {
                      setSearchQuery("");
                      setInstantResults([]);
                    }}
                  >
                    View all results
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={handleSearchToggle}
              aria-label="Search"
              className="md:hidden p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors"
            >
              <Search className="w-5 h-5 text-white dark:text-gray-200" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-white/90" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-lg pt-20 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              ref={searchContainerRef}
              className="max-w-xl mx-auto"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg border border-white/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Search"
                />
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  aria-label="Close search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </form>

              {instantResults.length > 0 && (
                <motion.div
                  className="mt-2 bg-white/10 backdrop-blur-xl shadow-lg rounded-lg overflow-hidden border border-white/20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {instantResults.map((result, index) => (
                    <Link
                      key={index}
                      id={`mobile-search-result-${index}`}
                      href={result.url}
                      className="block px-4 py-3 hover:bg-white/20 border-b border-white/10"
                      onClick={() => {
                        setShowSearch(false);
                        setSearchQuery("");
                        setInstantResults([]);
                      }}
                    >
                      <div className="font-medium text-white">
                        {result.title}
                      </div>
                      <div className="text-sm text-white/70">
                        {result.description}
                      </div>
                    </Link>
                  ))}
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="block px-4 py-3 text-center font-medium text-blue-400 hover:bg-white/20"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery("");
                      setInstantResults([]);
                    }}
                  >
                    View all results
                  </Link>
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
            className="fixed inset-0 top-[var(--header-height)] z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl md:hidden overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4">
              <ul className="space-y-2">
                {nav_list.map((item) => (
                  <motion.li
                    key={item.label}
                    className="border-b border-white/20 dark:border-gray-700 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.subpages ? (
                      <>
                        <button
                          onClick={() => handleDropdownToggle(item.label)}
                          className="w-full flex items-center justify-between p-3 text-gray-800 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/50 rounded-lg"
                          aria-expanded={openDropDesk === item.label}
                        >
                          <span className="font-medium">{item.label}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              openDropDesk === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {openDropDesk === item.label && (
                            <motion.ul
                              className="pl-4 py-2 space-y-1 px-2"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {item.subpages.map((subpage) => (
                                <motion.li
                                  key={subpage.label}
                                  whileHover={{ x: 5 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  <Link
                                    href={subpage.slug}
                                    className="block p-2 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/50 rounded-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {subpage.label}
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block p-3 text-gray-800 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/50 rounded-lg font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderSection;
