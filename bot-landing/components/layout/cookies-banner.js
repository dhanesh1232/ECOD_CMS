"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === null) {
      setTimeout(() => setVisible(true), 1000); // Delay appearance
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setVisible(false), 300); // Match animation duration
  };

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    handleClose();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    handleClose();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: isClosing ? 100 : 0,
            opacity: isClosing ? 0 : 1,
            transition: { type: "spring", damping: 25, stiffness: 120 },
          }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 inset-x-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6 shadow-xl"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <motion.h3
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="font-medium text-gray-900 dark:text-gray-100 mb-1"
                  >
                    We value your privacy
                  </motion.h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDecline}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 sm:hidden"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
                <motion.p
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Our SaaS platform uses essential cookies to ensure secure and
                  reliable service. Optional analytics cookies help us improve
                  your experience. You can manage preferences at any time.
                </motion.p>
                <motion.div
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 text-sm"
                >
                  <a
                    href="/privacy-policy"
                    className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mr-4"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/cookie-policy"
                    className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    Cookie Policy
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDecline}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
                >
                  Decline
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 2px 8px rgba(79, 70, 229, 0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAccept}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-500 text-sm font-medium transition-colors shadow-sm"
                >
                  Accept All
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
