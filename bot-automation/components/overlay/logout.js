"use client";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useCallback } from "react";
import { Button } from "../ui/button";

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
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          key="logout-modal"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-modal-title"
          aria-describedby="logout-modal-description"
        >
          <div className="text-center space-y-6">
            {/* Icon with animation */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="mx-auto"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <svg
                  className="h-6 w-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Text content */}
            <div className="space-y-2">
              <motion.h3
                id="logout-modal-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                Ready to leave?
              </motion.h3>
              <motion.p
                id="logout-modal-description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 dark:text-gray-400"
              >
                Please confirm you want to sign out of your account.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Button
                variant="outline"
                onClick={handleSkip}
                className="px-5 py-2.5 min-w-[100px] rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => signOut()}
                className="px-5 py-2.5 min-w-[100px] rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-red-200/50"
              >
                <span>Sign Out</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LogoutRelay;
