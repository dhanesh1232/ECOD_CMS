import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Logo from "../logo";
import LetterAvatar from "../profile/user-icon";
import { chatbotMenuItems, userMenuItems } from "@/data/usage";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDarkMode } from "@/context/context";
import NotificationButton from "./notification";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChatbotMenu, setShowChatbotMenu] = useState(false);
  const [activeRoute, setActiveRoute] = useState(null);
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

  // Set active route based on current path
  useEffect(() => {
    const currentPath = window.location.pathname;
    const activeItem = chatbotMenuItems.find(
      (item) => item.action === currentPath
    );
    if (activeItem) {
      setActiveRoute(chatbotMenuItems.indexOf(activeItem));
    }
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
              className="flex items-center space-x-2 focus:outline-none p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
              aria-label="Chatbot menu"
            >
              <FiMenu className="w-5 h-5" />
              <motion.div
                animate={{ rotate: showChatbotMenu ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="w-4 h-4" />
              </motion.div>
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

                  <ul className="px-1">
                    {chatbotMenuItems.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 my-1 py-2 text-sm cursor-pointer flex items-center rounded-md transition-colors ${
                          activeRoute === index
                            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        }`}
                        onClick={() => {
                          router.push(item.action);
                          setActiveRoute(index);
                          setShowChatbotMenu(false);
                        }}
                      >
                        <span
                          className={`mr-3 ${
                            activeRoute === index
                              ? "text-blue-500"
                              : "text-gray-500"
                          }`}
                        >
                          {item.icon}
                        </span>
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
            <NotificationButton size="md" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
            >
              {darkMode ? (
                <FaSun className="w-4 h-4 text-yellow-400" />
              ) : (
                <FaMoon className="w-4 h-4 text-indigo-600" />
              )}
            </motion.button>

            {/* User controls */}
            <div className="relative">
              <motion.button
                ref={avatarButtonRef}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center focus:outline-none"
                aria-label="User menu"
              >
                <LetterAvatar
                  letter={`${session?.user?.name?.charAt(0) || "U"}`}
                  size="md"
                  className="ring-2 ring-blue-600"
                />
                <motion.div
                  animate={{ rotate: showUserMenu ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-1 hidden sm:block text-gray-500 dark:text-gray-400"
                >
                  <FiChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              {/* User dropdown menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    ref={userMenuRef}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
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
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 cursor-pointer flex items-center transition-colors"
                          onClick={() => {
                            if (item.action === "logout") {
                              signOut({ callbackUrl: "/" });
                            } else {
                              router.push(item.action);
                            }
                            setShowUserMenu(false);
                          }}
                        >
                          <span className="mr-3 text-gray-500">
                            {item.icon}
                          </span>
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
