import Link from "next/link";
import Logo from "../logo";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import LetterAvatar from "../profile/user-icon";
import { useEffect, useRef, useState } from "react";
import { chatbotMenuItems, userMenuItems } from "@/data/usage";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef();
  const avatarButtonRef = useRef();
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

  return (
    <div className="hidden md:flex md:w-64 flex-col bg-white dark:bg-gray-900 shadow-md border-r border-gray-200 dark:border-gray-800">
      <div className="p-4">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>
      <ul className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
        {chatbotMenuItems.map((item, index) => {
          return (
            <motion.li
              key={index}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 cursor-pointer flex items-center"
              onClick={() => router.push(item.action)}
            >
              {item.icon}
              {item.label}
            </motion.li>
          );
        })}
      </ul>
      <div className="relative bottom-10 w-full justify-center h-10 flex items-center">
        <div className="pl-4 w-full flex gap-2 relative">
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
            <p className="text-gray-700 dark:text-gray-200">
              {session?.user.name}
            </p>
          </motion.button>
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                ref={userMenuRef}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute left-2 bottom-12 w-56 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {session?.user?.email}
                  </p>
                </div>

                <ul className="py-1 px-2">
                  {userMenuItems.map((item, index) => (
                    <motion.li
                      key={index}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md cursor-pointer flex items-center"
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
  );
};

export default Sidebar;
