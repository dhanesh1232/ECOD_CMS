import {
  Menu,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav_list } from "@/data/nav_link";
import { useRouter } from "next/router";

const HeaderSection = () => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSubPage, setMobileSubPage] = useState(null);
  const [openDrop, setOpenDrop] = useState(null);
  const openMenuRef = useRef(null);
  const dropDeskRef = useRef(null);

  // Close Menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuRef.current && !openMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setMobileSubPage(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDeskRef.current && !dropDeskRef.current.contains(event.target)) {
        setOpenDrop(null);
      }
    };

    const handleScroll = () => {
      setOpenDrop(null); // Close dropdown on scroll
    };

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll);

    // Cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setMobileSubPage(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        if (isMenuOpen) {
          setIsMenuOpen(false);
          setMobileSubPage(null);
        }
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);
  return (
    <>
      <header
        className={`w-full bg-white ${isMenuOpen && "z-50"} ${
          isSticky ? "fixed top-0 left-0 z-50 shadow-xl" : "relative"
        } `}
      >
        <div
          className={`container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6 sm:px-12 xl:w-[80%]`}
        >
          {/* Mobile Menu Button (Left) */}
          {!isMenuOpen && (
            <button
              className="md:hidden p-2 absolute left-2 top-2 outline-none"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          )}

          {/* Logo (Centered) */}
          <Link
            href="/"
            className="text-lg md:text-2xl font-semibold text-center md:text-left"
          >
            ECOD
          </Link>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center space-x-6">
            {nav_list.map((item, index) => (
              <div key={index} className="relative">
                {item.subpages ? (
                  <div className="flex items-center cursor-pointer">
                    <button
                      type="button"
                      className="flex items-center justify-center w-full"
                      onClick={() =>
                        setOpenDrop(openDrop === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`ml-1 transition-transform ${
                          openDrop === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDrop === item.label && (
                      <AnimatePresence>
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          ref={dropDeskRef}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className={`absolute top-6 px-4 left-0 bg-white shadow-lg rounded-lg py-2 mt-2 space-y-1 w-64 transition-all ease-in-out duration-150 z-50`}
                        >
                          <AnimatePresence>
                            {item.subpages.map((sub, ind) => (
                              <motion.li
                                key={sub.label}
                                initial={{
                                  opacity: 0,
                                  rotateY: -90,
                                  scale: 0.5,
                                }}
                                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                  delay: 0.1 + ind * 0.05,
                                }}
                              >
                                <Link
                                  href={`/services/${sub.slug}`}
                                  className={` text-gray-900  rounded-md p-2  block transition-all transform ease-in-out duration-150 ${
                                    router.pathname === `/services/${sub.slug}`
                                      ? "bg-gradient-to-r text-white to-purple-500 from-blue-500"
                                      : "hover:bg-gradient-to-r hover:text-white hover:from-blue-500 hover:to-purple-500"
                                  }`}
                                  onClick={() => setOpenDrop(null)}
                                >
                                  {sub.label}
                                </Link>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </motion.ul>
                      </AnimatePresence>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`${
                      router.pathname === item.href
                        ? "text-blue-500"
                        : " hover:text-white hover:bg-blue-500"
                    } p-2 px-3 rounded transition transform ease-in-out duration-150`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation (Centered Above Logo) */}
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isMenuOpen ? "auto" : 0, opacity: 1 }}
            ref={openMenuRef}
            className="absolute w-full flex flex-col h-full bg-gray-200 left-0 overflow-hidden md:hidden shadow"
          >
            <motion.ul className="flex flex-col px-4 space-y-1 py-4 transition-all ease-in-out duration-300 overflow-auto">
              {nav_list.map((nav, ind) =>
                nav.subpages ? (
                  <motion.li
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: -90 }}
                    transition={{ duration: 0.4 }}
                    key={ind}
                    className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-gray-900 hover:text-white rounded-md p-2 transition-all ease-in-out duration-150"
                  >
                    <button
                      type="button"
                      className="flex items-center justify-start"
                      onClick={() => {
                        console.log(nav.label);
                        setMobileSubPage(
                          mobileSubPage === nav.label ? null : nav.label
                        );
                      }}
                    >
                      <motion.span>{nav.label}</motion.span>
                      <ChevronRight className="h-5 w-5 ml-6" />
                    </button>
                    {mobileSubPage === nav.label && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute w-full right-0 flex justify-between left-0 bottom-0 top-0 h-full bg-white shadow-xl"
                      >
                        {/* Scrollable Subpages List */}
                        <motion.ul
                          className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 overflow-y-auto flex flex-col px-4 space-y-1 py-4 transition-all ease-in-out duration-300 bg-gray-100"
                          style={{ maxHeight: "100%" }} // Ensure the list doesn't exceed the parent height
                        >
                          {nav.subpages.map((sub, index) => (
                            <motion.li
                              key={index}
                              className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-gray-900 hover:text-white rounded-md p-2 transition-all ease-in-out duration-150"
                            >
                              <Link href={`/services/${sub.slug}`}>
                                {sub.label}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>

                        {/* Back Button */}
                        <motion.button
                          type="button"
                          className="px-2 rounded-l-xl py-6 border border-r-0 self-center hover:text-gray-900 text-gray-900 bg-gray-200"
                          onClick={() => setMobileSubPage(null)}
                        >
                          <ChevronLeft />
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.li>
                ) : (
                  <motion.li
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    key={ind}
                    className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-gray-900 hover:text-white rounded-md p-2 transition-all ease-in-out duration-150"
                  >
                    <Link href={nav.href}>{nav.label}</Link>
                  </motion.li>
                )
              )}
            </motion.ul>
            <motion.button
              type="button"
              className="py-1 px-6 self-center bg-white inset-10 rounded-t-lg border border-b-0 border-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <ChevronUp />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </header>
      {/* Mobile Menu opned then show overlay entire page */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default HeaderSection;
