"use client";
import { useEffect, useRef, useState } from "react";
import { FiBell } from "react-icons/fi";

// Fake notifications data
const initialNotifications = [
  {
    id: 1,
    title: "New message",
    content: "You have a new message from John Doe",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "System update",
    content: "System maintenance scheduled for tomorrow",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 3,
    title: "Payment received",
    content: "Your invoice #12345 has been paid",
    time: "3 hours ago",
    read: false,
  },
];

const NotificationButton = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showHighlight, setShowHighlight] = useState(true);
  const [showPop, setShowPop] = useState(false);
  const popRef = useRef(null);
  const buttonRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popRef.current &&
        !popRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setShowPop(!showPop);
    if (unreadCount > 0) {
      setShowHighlight(false);
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
    setShowHighlight(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        ref={buttonRef}
        className="relative flex items-center justify-center p-2 bg-gray-800 dark:bg-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
      >
        <FiBell className="text-white dark:text-gray-200 text-lg" />
        {showHighlight && unreadCount > 0 && (
          <span className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        )}
      </button>

      {showPop && (
        <div
          ref={popRef}
          className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-10 border border-gray-200 dark:border-gray-700"
        >
          <div className="p-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h3 className="font-medium text-gray-800 dark:text-gray-100">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-500 text-white rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-3 border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600 cursor-pointer ${
                    !notification.read ? "bg-blue-50 dark:bg-blue-900" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800 dark:text-gray-100">
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {notification.content}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {notification.time}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No new notifications
              </div>
            )}
          </div>

          {unreadCount > 0 && (
            <div className="p-2 bg-gray-50 dark:bg-gray-700 text-center border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={markAllAsRead}
                className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-600"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
