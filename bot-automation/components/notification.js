"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  BellOff,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility class merger

export default function NotificationButton({
  className,
  position = "top-12 right-4",
  iconSize = 24,
  size = "default",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const popupRef = useRef(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Message",
      message: "You have a new message from John",
      timestamp: "2h ago",
      type: "info",
      read: false,
    },
    {
      id: 2,
      title: "Payment Successful",
      message: "Your subscription payment was processed",
      timestamp: "5h ago",
      type: "success",
      read: false,
    },
    {
      id: 3,
      title: "System Alert",
      message: "Scheduled maintenance tonight at 10 PM",
      timestamp: "1d ago",
      type: "warning",
      read: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const getNotificationIcon = (type) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case "success":
        return <CheckCircle className={cn(iconClass, "text-green-500")} />;
      case "warning":
        return <AlertCircle className={cn(iconClass, "text-yellow-500")} />;
      case "error":
        return <AlertCircle className={cn(iconClass, "text-red-500")} />;
      default:
        return <Info className={cn(iconClass, "text-blue-500")} />;
    }
  };

  const markAsRead = (id) => {
    setNotifications((notifs) =>
      notifs.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sizeClasses = {
    sm: "w-8 h-8",
    default: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("relative", className)} ref={popupRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative group flex items-center justify-center rounded-full transition-colors",
          sizeClasses[size],
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:outline-none focus:ring-2 focus:ring-primary/50"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell
          className="text-gray-300 dark:text-gray-300 hover:text-gray-700 hover:dark:text-gray-300"
          size={iconSize}
        />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs font-medium flex items-center justify-center shadow-sm"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "absolute z-50 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700",
              position
            )}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Bell size={18} /> Notifications
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearAll}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-red-500"
                  disabled={notifications.length === 0}
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-6 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                  />
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-6 flex flex-col items-center justify-center gap-3 text-gray-500">
                  <BellOff size={32} className="opacity-50" />
                  <p className="text-sm">No new notifications</p>
                </div>
              ) : (
                <AnimatePresence>
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer",
                        "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                        !notification.read && "bg-blue-50/50 dark:bg-gray-800"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 pt-1">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {notification.message}
                          </p>
                          <time className="text-xs text-gray-500 mt-1 block">
                            {notification.timestamp}
                          </time>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
