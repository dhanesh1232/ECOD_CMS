"use client";
import { useState } from "react";
import { FiBell, FiCheck, FiX, FiSettings } from "react-icons/fi";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "New message from John Doe",
      message: "How do I reset my password?",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Automation completed",
      message: "Welcome sequence sent to 23 new users",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 3,
      title: "New integration connected",
      message: "Facebook Messenger connected successfully",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "Billing receipt",
      message: "Your payment of $49.00 has been processed",
      time: "1 day ago",
      read: true,
    },
    {
      id: 5,
      title: "System update",
      message: "New features available in your dashboard",
      time: "2 days ago",
      read: true,
    },
  ];

  const notificationSettings = [
    {
      id: 1,
      name: "New Messages",
      description: "When you receive new messages",
      email: true,
      inApp: true,
    },
    {
      id: 2,
      name: "Automations",
      description: "When automations are triggered",
      email: true,
      inApp: false,
    },
    {
      id: 3,
      name: "System Updates",
      description: "Important system updates",
      email: true,
      inApp: true,
    },
    {
      id: 4,
      name: "Billing",
      description: "Payment receipts and invoices",
      email: true,
      inApp: false,
    },
  ];

  const [activeTab, setActiveTab] = useState("inbox");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FiBell className="mr-2" /> Notifications
      </h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "inbox"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("inbox")}
        >
          Inbox
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "settings"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {/* Notification Inbox */}
      {activeTab === "inbox" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-medium">Recent Notifications</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Mark all as read
            </button>
          </div>

          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 ${
                  !notification.read ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between">
                  <h3
                    className={`font-medium ${
                      !notification.read ? "text-blue-800" : "text-gray-800"
                    }`}
                  >
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                {!notification.read && (
                  <div className="flex justify-end mt-2">
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      Mark as read
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="font-medium text-lg">Notification Preferences</h2>
            <p className="text-sm text-gray-500">
              Configure how you receive notifications
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="col-span-1">
                <h3 className="font-medium mb-2">Notification Types</h3>
                <p className="text-sm text-gray-500">
                  Select which notifications you want to receive
                </p>
              </div>
              <div className="col-span-2">
                <div className="space-y-6">
                  {notificationSettings.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium">{setting.name}</h4>
                        <p className="text-sm text-gray-500">
                          {setting.description}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={setting.email}
                            onChange={() => {}}
                          />
                          <span className="ml-2 text-sm">Email</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={setting.inApp}
                            onChange={() => {}}
                          />
                          <span className="ml-2 text-sm">In-App</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <h3 className="font-medium mb-2">Email Address</h3>
                <p className="text-sm text-gray-500">
                  Where to send email notifications
                </p>
              </div>
              <div className="col-span-2">
                <div className="flex items-center">
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="flex-1 border rounded-lg px-4 py-2 mr-2"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
