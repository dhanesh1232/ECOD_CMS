"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  CheckCircle,
  Trash2,
  BellOff,
  Mail,
  AlertTriangle,
  Zap,
  CreditCard,
  Calendar,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

const priorityLevels = {
  critical: { color: "bg-red-500", label: "Critical", icon: AlertTriangle },
  high: { color: "bg-orange-500", label: "High", icon: Zap },
  medium: { color: "bg-yellow-500", label: "Medium", icon: Mail },
  low: { color: "bg-blue-500", label: "Low", icon: Calendar },
};

export default function NotificationButton({
  className,
  position = "top-12 right-4",
  iconSize = 20,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Server Down",
      message:
        "Production server is not responding - immediate attention required",
      timestamp: "2 min ago",
      icon: AlertTriangle,
      priority: "critical",
      read: false,
    },
    {
      id: 2,
      title: "Payment Failed",
      message: "Subscription renewal failed - update payment method",
      timestamp: "30 min ago",
      icon: CreditCard,
      priority: "high",
      read: false,
    },
    {
      id: 3,
      title: "New Message",
      message: "You have 3 unread messages from your team",
      timestamp: "1 hour ago",
      icon: Mail,
      priority: "medium",
      read: true,
    },
    {
      id: 4,
      title: "Meeting Reminder",
      message: "Quarterly review meeting starts in 15 minutes",
      timestamp: "10:45 AM",
      icon: Calendar,
      priority: "low",
      read: false,
    },
    {
      id: 5,
      title: "System Update",
      message: "New version 2.3.1 available for installation",
      timestamp: "Yesterday",
      icon: Zap,
      priority: "medium",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((notifs) =>
      notifs.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((notifs) => notifs.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
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

  return (
    <div className={cn("relative", className)} ref={popupRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative flex items-center justify-center",
          "w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800",
          "border border-gray-200 dark:border-gray-700",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell className="text-gray-700 dark:text-gray-300" size={iconSize} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "absolute z-50 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700",
              position
            )}
          >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Bell size={16} /> Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="px-1.5 py-0 text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={markAllAsRead}
                  className="p-1 text-gray-500 hover:text-blue-500 disabled:opacity-50"
                  disabled={unreadCount === 0}
                >
                  <CheckCircle size={16} />
                </button>
                <button
                  onClick={clearAll}
                  className="p-1 text-gray-500 hover:text-red-500 disabled:opacity-50"
                  disabled={notifications.length === 0}
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto scrollbar-transparent">
              {notifications.length === 0 ? (
                <div className="p-4 flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                  <BellOff size={24} />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const PriorityIcon =
                    priorityLevels[notification.priority].icon;
                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-3 border-b border-gray-100 dark:border-gray-800 cursor-pointer",
                        "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                        !notification.read &&
                          "bg-blue-50/50 dark:bg-blue-900/20"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div
                          className={cn(
                            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                            priorityLevels[notification.priority].color,
                            "text-white"
                          )}
                        >
                          <PriorityIcon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-medium truncate">
                              {notification.title}
                            </p>
                            <Badge
                              variant={
                                notification.priority === "critical"
                                  ? "destructive"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {priorityLevels[notification.priority].label}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {notification.message}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {notification.timestamp}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
