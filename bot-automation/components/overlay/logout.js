"use client";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useCallback, useState } from "react";
import { Button } from "../ui/button";

const LogoutRelay = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const logRef = useRef();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSkip = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("model");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

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
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <motion.div
          key="logout-modal"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-8 w-full max-w-md border border-gray-200/80 dark:border-gray-700/50 relative overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-modal-title"
          aria-describedby="logout-modal-description"
        >
          {/* Animated background effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-red-50/20 to-transparent dark:from-red-900/10 dark:to-transparent opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1 }}
          />

          <div className="relative z-10 text-center space-y-6">
            {/* Icon with animation */}
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 500,
                damping: 15,
              }}
              className="mx-auto"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800/50 shadow-inner">
                <svg
                  className="h-7 w-7 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Text content */}
            <div className="space-y-3">
              <motion.h3
                id="logout-modal-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                Ready to leave?
              </motion.h3>
              <motion.p
                id="logout-modal-description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
              >
                {`You'll need to sign in again to access your account. Are you
                sure you want to sign out?`}
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4 pt-2"
            >
              <Button
                variant="outline"
                onClick={handleSkip}
                disabled={isSigningOut}
                className="px-6 py-3 min-w-[120px] rounded-md transition-all hover:scale-[1.02] active:scale-[0.98] border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="px-6 py-3 min-w-[120px] rounded-md transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-red-300/40 dark:hover:shadow-red-800/30 font-medium relative overflow-hidden"
              >
                {isSigningOut ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Signing out...
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Sign Out
                  </motion.span>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LogoutRelay;
