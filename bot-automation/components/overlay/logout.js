"use client";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useCallback } from "react";

const LogoutRelay = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const logRef = useRef();

  const handleSkip = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("model");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logRef.current && event.target === logRef.current) {
        handleSkip();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleSkip, logRef]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") handleSkip();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleSkip]);

  return (
    <AnimatePresence>
      <div
        ref={logRef}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          key="logout-modal"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.2,
          }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md"
        >
          <div className="text-center">
            {/* Icon with animation */}
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mx-auto mb-4"
            >
              <svg
                className="w-12 h-12 text-red-500 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </motion.div>

            {/* Text content with staggered animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Are you sure you want to log out?
              </h3>
              <p className="text-gray-500 dark:text-gray-300 mb-6">
                {`You'll need to sign in again to access your account.`}
              </p>
            </motion.div>

            {/* Buttons with hover effects */}
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSkip}
                className="px-6 py-2.5 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut()}
                className="px-6 py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm hover:shadow-red-200"
              >
                <span>Sign Out</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LogoutRelay;
