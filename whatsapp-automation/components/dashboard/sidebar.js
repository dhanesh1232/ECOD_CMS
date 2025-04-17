import Link from "next/link";
import Logo from "../logo";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import LetterAvatar from "../profile/user-icon";
import { useEffect, useRef, useState } from "react";
import { chatbotMenuItems, userMenuItems } from "@/data/usage";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const userMenuRef = useRef();
  const avatarButtonRef = useRef();

  // Initialize all sections as expanded by default
  useEffect(() => {
    const initialExpandedState = {};
    chatbotMenuItems.forEach((section, index) => {
      initialExpandedState[index] = true;
    });
    setExpandedSections(initialExpandedState);
  }, []);

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="hidden md:flex md:w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* Logo Section */}
      <div className="p-6 pb-4">
        <Link href="/dashboard">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center"
          >
            <Logo />
          </motion.div>
        </Link>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {chatbotMenuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            {/* Section Header */}
            {section.section && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSection(sectionIndex)}
              >
                <span>{section.section}</span>
                <motion.div
                  animate={{ rotate: expandedSections[sectionIndex] ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronRight size={14} />
                </motion.div>
              </motion.div>
            )}

            {/* Section Items */}
            <AnimatePresence>
              {expandedSections[sectionIndex] && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
                >
                  {section.items.map((item, itemIndex) => {
                    const isActive =
                      activeMenuItem === `${sectionIndex}-${itemIndex}`;
                    return (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.03 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-3 py-2.5 text-sm rounded-lg cursor-pointer flex items-center transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-200 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => {
                          router.push(item.action);
                          setActiveMenuItem(`${sectionIndex}-${itemIndex}`);
                        }}
                        title={item.description}
                      >
                        <span
                          className={`mr-3 ${
                            isActive
                              ? "text-blue-500"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="relative">
          <motion.button
            ref={avatarButtonRef}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="User menu"
            aria-expanded={showUserMenu}
          >
            <div className="flex items-center space-x-3">
              <LetterAvatar
                letter={`${session?.user?.name?.charAt(0) || "U"}`}
                size="md"
                className="ring-2 ring-blue-400 dark:ring-blue-600"
              />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate max-w-[120px]">
                  {session?.user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                  {session?.user.email}
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: showUserMenu ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown className="text-gray-500 dark:text-gray-400" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                ref={userMenuRef}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 bottom-14 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
              >
                <ul className="py-1">
                  {userMenuItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer flex items-center"
                      onClick={() => {
                        if (item.action === "logout") {
                          signOut({ callbackUrl: "/" });
                        } else {
                          router.push(item.action);
                        }
                        setShowUserMenu(false);
                      }}
                      title={item.description}
                    >
                      <span className="mr-3 text-gray-500 dark:text-gray-400">
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
  );
};

export default Sidebar;
