import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links_data = [
  {
    label: "Cookies",
    slug: "cookie-policy",
    checked: false,
  },
  {
    label: "Terms & Services",
    slug: "terms-of-service",
    checked: true,
  },
  {
    label: "Privacy Policy",
    slug: "privacy-policy",
    checked: true,
  },
];

const CookiePopup = () => {
  const [show, setShow] = useState(false);
  const [checkedLinks, setCheckedLinks] = useState(links_data);

  useEffect(() => {
    // Check for existing consent
    if (!Cookies.get("ecod_cookie")) {
      setShow(true);
    }

    // Load saved preferences
    const savedLinks = Cookies.get("ecod_cookie_links");
    if (savedLinks) {
      setCheckedLinks(JSON.parse(savedLinks));
    }

    // Keyboard event listener
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && show) {
        handleDecline();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [show]);

  const handleAccept = () => {
    Cookies.set("ecod_cookie", "accepted", { expires: 30 });
    setShow(false);
  };

  const handleDecline = () => {
    Cookies.set("ecod_cookie", "declined", { expires: 1 });
    setShow(false);
  };

  const handleAcceptAll = () => {
    Cookies.set("ecod_cookie", "accepted_all", { expires: 60 });
    const allAccepted = checkedLinks.map((link) => ({
      ...link,
      checked: true,
    }));
    Cookies.set("ecod_cookie_links", JSON.stringify(allAccepted));
    setShow(false);
  };

  const toggleCheckbox = (slug) => {
    const updatedLinks = checkedLinks.map((link) =>
      link.slug === slug ? { ...link, checked: !link.checked } : link
    );
    setCheckedLinks(updatedLinks);
    Cookies.set("ecod_cookie_links", JSON.stringify(updatedLinks));
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 120,
          }}
          className="fixed inset-x-0 bottom-0 bg-white p-6 shadow-2xl sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-xl border border-gray-200 z-[999]"
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">
                Your Privacy Matters
              </h3>
              <p className="text-gray-600 text-sm">
                We use cookies to enhance your experience on our digital
                services platform. They help us deliver better web solutions and
                analyze site performance.
              </p>
            </div>
          </div>

          <div className="gap-2 flex items-center flex-wrap mb-4">
            {checkedLinks.map((link) => (
              <div key={link.slug} className="flex items-center">
                <input
                  id={`checkbox-${link.slug}`}
                  type="checkbox"
                  checked={link.checked}
                  onChange={() => toggleCheckbox(link.slug)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`checkbox-${link.slug}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  <Link href={`/${link.slug}`} className="hover:underline">
                    {link.label}
                  </Link>
                </label>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-white hover:bg-blue-700 hover:text-white text-blue-600 border border-blue-600 rounded-lg text-sm font-medium transition-colors"
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-gray-500 border rounded-lg border-gray-600 hover:text-gray-700 text-sm font-medium transition-colors"
            >
              Reject
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookiePopup;
