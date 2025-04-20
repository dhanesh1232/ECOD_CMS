"use client";

import {
  FiGlobe,
  FiCheck,
  FiX,
  FiArrowRight,
  FiMessageCircle,
  FiMoreHorizontal,
  FiExternalLink,
} from "react-icons/fi";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaDiscord,
  FaTelegram,
} from "react-icons/fa";
import { useState } from "react";

export default function ChannelsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const channels = [
    {
      id: 1,
      name: "Facebook Messenger",
      connected: true,
      icon: "facebook",
      description: "Connect with your Facebook Page to message customers",
      category: "social",
    },
    {
      id: 2,
      name: "WhatsApp Business",
      connected: true,
      icon: "whatsapp",
      description: "Official WhatsApp Business API integration",
      category: "messaging",
    },
    {
      id: 3,
      name: "Instagram Direct",
      connected: true,
      icon: "instagram",
      description: "Connect your Instagram business account",
      category: "social",
    },
    {
      id: 4,
      name: "Web Chat",
      connected: false,
      icon: "globe",
      description: "Add a customizable chat widget to your website",
      category: "website",
    },
    {
      id: 5,
      name: "Twitter DM",
      connected: false,
      icon: "twitter",
      description: "Connect your Twitter account for direct messages",
      category: "social",
    },
    {
      id: 6,
      name: "SMS",
      connected: false,
      icon: "message-circle",
      description: "Send and receive text messages with customers",
      category: "messaging",
    },
    {
      id: 7,
      name: "Discord",
      connected: true,
      icon: "discord",
      description: "Connect your Discord server for community support",
      category: "community",
    },
    {
      id: 8,
      name: "Telegram",
      connected: false,
      icon: "telegram",
      description: "Connect Telegram for instant messaging",
      category: "messaging",
    },
  ];

  const connectionLogs = [
    {
      id: 1,
      event: "Facebook Messenger connected successfully",
      time: "2 hours ago",
      status: "success",
      details: "Connected to page: My Business Page",
    },
    {
      id: 2,
      event: "Instagram connection failed - requires reauthorization",
      time: "1 day ago",
      status: "error",
      details: "Token expired, please reconnect",
    },
    {
      id: 3,
      event: "WhatsApp Business API approval pending",
      time: "3 days ago",
      status: "warning",
      details: "Waiting for Meta approval (3-5 business days)",
    },
    {
      id: 4,
      event: "Web chat widget configuration saved",
      time: "1 week ago",
      status: "success",
      details: "Widget color: #3B82F6, Position: Bottom right",
    },
  ];

  const tabs = [
    { id: "all", name: "All Channels" },
    { id: "connected", name: "Connected" },
    { id: "social", name: "Social Media" },
    { id: "messaging", name: "Messaging" },
    { id: "website", name: "Website" },
  ];

  const getIconComponent = (iconName, size = 24) => {
    const icons = {
      facebook: <FaFacebook size={size} />,
      whatsapp: <FaWhatsapp size={size} />,
      instagram: <FaInstagram size={size} />,
      twitter: <FaTwitter size={size} />,
      globe: <FiGlobe size={size} />,
      "message-circle": <FiMessageCircle size={size} />,
      discord: <FaDiscord size={size} />,
      telegram: <FaTelegram size={size} />,
    };
    return icons[iconName] || <FiGlobe size={size} />;
  };

  const getIconColorClass = (iconName) => {
    const colors = {
      facebook: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
      whatsapp:
        "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
      instagram:
        "bg-gradient-to-br from-purple-100 to-pink-100 text-pink-600 dark:from-purple-900 dark:to-pink-900 dark:text-pink-300",
      twitter: "bg-blue-100 text-blue-400 dark:bg-blue-900 dark:text-blue-200",
      discord:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
      telegram: "bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300",
      default: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
    };
    return colors[iconName] || colors.default;
  };

  const filteredChannels = channels.filter((channel) => {
    const matchesSearch =
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "connected" && channel.connected) ||
      channel.category === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <FiGlobe className="mr-3 text-blue-600 dark:text-blue-400" />
              Communication Channels
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Connect your business with customers across multiple platforms
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search channels..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex overflow-x-auto mt-6 pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 mr-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white dark:bg-blue-700"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </header>

      {filteredChannels.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FiGlobe className="text-gray-400 dark:text-gray-500 text-3xl" />
          </div>
          <h3 className="text-lg font-medium mb-2">No channels found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery
              ? "Try a different search term"
              : activeTab === "connected"
              ? "You haven't connected any channels yet"
              : "No channels match your filters"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredChannels.map((channel) => (
            <div
              key={channel.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div
                    className={`p-3 rounded-lg mr-4 ${getIconColorClass(
                      channel.icon
                    )}`}
                  >
                    {getIconComponent(channel.icon)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                      {channel.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {channel.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span
                    className={`flex items-center text-sm font-medium ${
                      channel.connected
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {channel.connected ? (
                      <>
                        <FiCheck className="mr-2" /> Connected
                      </>
                    ) : (
                      <>
                        <FiX className="mr-2" /> Not connected
                      </>
                    )}
                  </span>
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      channel.connected
                        ? "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {channel.connected ? "Manage" : "Connect"}
                    {!channel.connected && <FiArrowRight className="ml-2" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Connection Logs */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                Connection Activity
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Recent connection attempts and status updates
              </p>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center">
              View all <FiExternalLink className="ml-1" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {connectionLogs.map((log) => (
            <div
              key={log.id}
              className="p-5 flex items-start hover:bg-gray-50 dark:hover:bg-gray-700/50 group"
            >
              <div
                className={`flex-shrink-0 w-3 h-3 rounded-full mt-1.5 mr-4 ${
                  log.status === "success"
                    ? "bg-green-500"
                    : log.status === "error"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {log.event}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {log.details}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  {log.time}
                </p>
              </div>
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <FiMoreHorizontal />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
