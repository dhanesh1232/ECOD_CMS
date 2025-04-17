import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Logo from "../logo";
import LetterAvatar from "../profile/user-icon";
import { chatbotMenuItems, userMenuItems } from "@/data/usage";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDarkMode } from "@/context/context";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChatbotMenu, setShowChatbotMenu] = useState(false);
  const userMenuRef = useRef();
  const chatbotMenuRef = useRef();
  const avatarButtonRef = useRef();
  const chatbotButtonRef = useRef();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }

      if (
        chatbotMenuRef.current &&
        !chatbotMenuRef.current.contains(event.target) &&
        chatbotButtonRef.current &&
        !chatbotButtonRef.current.contains(event.target)
      ) {
        setShowChatbotMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center w-full justify-between">
          {/* Menu button for sidebar toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <motion.button
              ref={chatbotButtonRef}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setShowChatbotMenu(!showChatbotMenu)}
              className="flex items-center space-x-2 focus:outline-none px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              aria-label="Chatbot menu"
            >
              <FiMenu className="w-5 h-5" />
            </motion.button>

            {/* Chatbot dropdown menu */}
            <AnimatePresence>
              {showChatbotMenu && (
                <motion.div
                  ref={chatbotMenuRef}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute left-0 top-16 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      Chatbot Features
                    </p>
                  </div>

                  <ul className="py-1 px-1">
                    {chatbotMenuItems.map((item, index) => (
                      <motion.li
                        key={index}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 cursor-pointer flex items-center"
                        onClick={() => router.push(item.action)}
                      >
                        {item.icon}
                        {item.label}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Platform title */}
          {window.innerWidth < 768 ? (
            <Logo hide={true} />
          ) : (
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-xl font-bold text-gray-800 dark:text-gray-100"
            >
              Chatbot Automation
            </motion.h1>
          )}

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle dark mode"
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full transition-colors"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            {/* User controls */}
            <div className="flex items-center relative">
              {/* User avatar with dropdown */}
              <motion.button
                ref={avatarButtonRef}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-label="User menu"
              >
                <LetterAvatar
                  letter={`${session?.user?.name?.charAt(0) || "U"}`}
                  size="md"
                />
              </motion.button>

              {/* User dropdown menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    ref={userMenuRef}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute right-0 top-12 w-56 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {session?.user?.email}
                      </p>
                    </div>

                    <ul className="py-1">
                      {userMenuItems.map((item, index) => (
                        <motion.li
                          key={index}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer flex items-center"
                          onClick={() => {
                            if (item.action === "logout") {
                              signOut({ callbackUrl: "/" });
                            } else {
                              router.push(item.action);
                            }
                          }}
                        >
                          {item.icon}
                          {item.label}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
