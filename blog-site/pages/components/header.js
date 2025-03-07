import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const theme_id = process.env.NEXT_PUBLIC_THEME_ID;

const nav_list = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blog-posts" },
  {
    label: "Services",
    href: "/services",
    subpages: [
      { label: "All Services", slug: "" },
      { label: "Web Development", slug: "web-development" },
      { label: "Google | Meta Ads", slug: "google-meta-ads" },
      { label: "SEO", slug: "seo" },
      { label: "Social Media Marketing", slug: "social-media-marketing" },
      {
        label: "Shopify Theme Development",
        slug: "shopify-theme-development",
      },
      { label: "Content Marketing", slug: "content-marketing" },
      { label: "Email Marketing", slug: "email-marketing" },
    ],
  },
  { label: "Products", href: "/products" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
];

const HeaderSection = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const [openDropMob, setOpenDropMob] = useState(null);
  const [headerStyle, setHeaderStyle] = useState({});
  const dropdownMobRef = useRef(null);
  const openMenuRef = useRef(null);
  const dropDeskRef = useRef(null);

  //Use Ref Functions Starting
  // Close Menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuRef.current && !openMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownMobRef.current &&
        !dropdownMobRef.current.contains(event.target)
      ) {
        setOpenDropMob(null);
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

  //Use Ref Functions Ending

  // Fetch header data from the API
  useEffect(() => {
    const fetchData = async () => {
      if (!theme_id) {
        console.error("❌ Error: theme_id is not defined. Check .env.local");
        return;
      }

      try {
        const res = await fetch(`/api/gather_data?theme_id=${theme_id}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setHeaderStyle(data?.data?.sections?.header || {});
      } catch (error) {
        console.error("❌ Error fetching JSON data:", error);
      }
    };

    fetchData();
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="w-full bg-white relative top-0 left-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6 sm:px-12 xl:w-[80%]">
        {/* Mobile Menu Button (Left) */}
        <button
          className="md:hidden p-2 absolute left-2 top-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

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
                        className="absolute top-6 px-4 left-0 bg-white shadow-lg rounded-lg py-2 mt-2 space-y-1 w-64 transition-all ease-in-out duration-150"
                      >
                        <AnimatePresence>
                          {item.subpages.map((sub) => (
                            <motion.li
                              key={sub.label}
                              initial={{ opacity: 0, rotateX: -90 }}
                              animate={{ opacity: 1, rotateX: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                              <Link
                                href={`/services/${sub.slug}`}
                                className="block p-2 rounded transition-all transform ease-in-out duration-150 hover:bg-blue-100"
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
                <Link href={item.href} className="hover:text-blue-500">
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
          initial={{ height: 0 }}
          animate={{ height: isMenuOpen ? "auto" : 0 }}
          ref={openMenuRef}
          className="absolute w-full h-full bg-gray-50 left-0 overflow-hidden md:hidden shadow"
        >
          <ul className="py-4 text-center">
            {nav_list.map((item, index) => (
              <li key={index} className="px-6 py-2 text-black">
                {item.subpages ? (
                  <div className="relative">
                    <button
                      className="flex items-center justify-center w-full"
                      onClick={() =>
                        setOpenDropMob(
                          openDropMob === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`ml-2 transition-transform ${
                          openDropMob === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropMob === item.label && (
                      <AnimatePresence>
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                          }}
                          ref={dropdownMobRef}
                          className="px-4 py-2 mt-1 space-y-1 overflow-hidden bg-white bg-opacity-80 rounded shadow-xl"
                        >
                          {item.subpages.map((sub) => (
                            <li
                              key={sub.label}
                              className="text-base py-1 hover:bg-gray-100 hover:text-blue-900 text-gray-900 rounded ease-in-out transform transition-all duration-150"
                            >
                              <Link
                                href={`/services/${sub.slug}`}
                                onClick={() => {
                                  setOpenDropMob(null); // Close dropdown when a link is clicked
                                  setIsMenuOpen(false); // Close mobile menu
                                }}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      </AnimatePresence>
                    )}
                  </div>
                ) : (
                  <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </header>
  );
};

export default HeaderSection;
