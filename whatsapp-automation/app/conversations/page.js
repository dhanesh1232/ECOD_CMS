"use client";
import {
  FiMessageSquare,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiClock,
  FiUser,
  FiFacebook,
  FiMessageCircle,
  FiInstagram,
  FiGlobe,
  FiMail,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
} from "react-icons/fi";
import { useState } from "react";

// Sample data structure that matches a real-world API response
const sampleConversations = {
  data: [
    {
      id: "conv_001",
      customer: {
        id: "cust_123",
        name: "John Doe",
        email: "john@example.com",
        avatar: null,
      },
      channel: {
        type: "facebook",
        name: "Facebook Messenger",
        id: "fb_conv_456",
      },
      last_message: {
        text: "How do I reset my password?",
        timestamp: "2023-06-15T10:30:00Z",
        sender: "customer",
      },
      status: "open",
      assigned_to: null,
      tags: ["technical", "urgent"],
      created_at: "2023-06-15T10:28:00Z",
      updated_at: "2023-06-15T10:30:00Z",
    },
    {
      id: "conv_002",
      customer: {
        id: "cust_456",
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      channel: {
        type: "whatsapp",
        name: "WhatsApp Business",
        id: "wa_conv_789",
      },
      last_message: {
        text: "Thanks for your help!",
        timestamp: "2023-06-15T09:15:00Z",
        sender: "customer",
      },
      status: "closed",
      assigned_to: "agent_001",
      tags: ["feedback"],
      created_at: "2023-06-14T14:20:00Z",
      updated_at: "2023-06-15T09:15:00Z",
    },
    {
      id: "conv_003",
      customer: {
        id: "cust_789",
        name: "Acme Corp",
        email: "sales@acme.com",
        avatar: null,
      },
      channel: {
        type: "web",
        name: "Website Chat",
        id: "web_conv_012",
      },
      last_message: {
        text: "We're interested in your enterprise plan",
        timestamp: "2023-06-15T08:45:00Z",
        sender: "customer",
      },
      status: "open",
      assigned_to: "agent_002",
      tags: ["sales", "enterprise"],
      created_at: "2023-06-15T08:40:00Z",
      updated_at: "2023-06-15T08:45:00Z",
    },
    {
      id: "conv_004",
      customer: {
        id: "cust_012",
        name: "Mike Johnson",
        email: "mike@example.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      channel: {
        type: "instagram",
        name: "Instagram DM",
        id: "ig_conv_345",
      },
      last_message: {
        text: "When will my order ship?",
        timestamp: "2023-06-14T16:30:00Z",
        sender: "customer",
      },
      status: "pending",
      assigned_to: null,
      tags: ["order"],
      created_at: "2023-06-14T16:25:00Z",
      updated_at: "2023-06-14T16:30:00Z",
    },
    {
      id: "conv_005",
      customer: {
        id: "cust_345",
        name: "Sarah Williams",
        email: "sarah@example.com",
        avatar: null,
      },
      channel: {
        type: "facebook",
        name: "Facebook Messenger",
        id: "fb_conv_678",
      },
      last_message: {
        text: "I need technical support with my account",
        timestamp: "2023-06-14T12:15:00Z",
        sender: "customer",
      },
      status: "open",
      assigned_to: "agent_001",
      tags: ["technical"],
      created_at: "2023-06-14T12:10:00Z",
      updated_at: "2023-06-14T12:15:00Z",
    },
  ],
  meta: {
    total: 24,
    current_page: 1,
    per_page: 5,
    total_pages: 5,
  },
};

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "open", label: "Open" },
  { value: "pending", label: "Pending" },
  { value: "closed", label: "Closed" },
];

const channelOptions = [
  { value: "all", label: "All Channels" },
  { value: "facebook", label: "Facebook" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
  { value: "web", label: "Web Chat" },
  { value: "email", label: "Email" },
];

export default function ConversationsPage() {
  const [conversations, setConversations] = useState(sampleConversations.data);
  const [pagination, setPagination] = useState(sampleConversations.meta);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Format time to relative (e.g., "2 min ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Get channel icon
  const getChannelIcon = (channelType) => {
    switch (channelType) {
      case "facebook":
        return <FiFacebook className="mr-1" />;
      case "whatsapp":
        return <FiMessageCircle className="mr-1" />;
      case "instagram":
        return <FiInstagram className="mr-1" />;
      case "web":
        return <FiGlobe className="mr-1" />;
      case "email":
        return <FiMail className="mr-1" />;
      default:
        return <FiMessageCircle className="mr-1" />;
    }
  };

  // Get status icon and color
  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return {
          icon: <FiAlertCircle size={14} className="mr-1" />,
          class:
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        };
      case "pending":
        return {
          icon: <FiClock size={14} className="mr-1" />,
          class:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        };
      case "closed":
        return {
          icon: <FiCheckCircle size={14} className="mr-1" />,
          class:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        };
      default:
        return {
          icon: <FiAlertCircle size={14} className="mr-1" />,
          class:
            "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
        };
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <FiMessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Conversations
            </h1>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors">
            <FiPlus className="mr-2" /> New Conversation
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiFilter className="mr-2 text-gray-700 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300">Filters</span>
              <FiChevronDown
                className={`ml-2 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </h3>
                  <select
                    className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-800 dark:text-white mb-4"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Channel
                  </h3>
                  <select
                    className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-800 dark:text-white"
                    value={channelFilter}
                    onChange={(e) => setChannelFilter(e.target.value)}
                  >
                    {channelOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conversation List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-700 p-4 font-medium text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
            <div className="col-span-4">Customer</div>
            <div className="col-span-3">Channel</div>
            <div className="col-span-3">Last Message</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 flex items-center">
              <FiClock className="mr-1" /> Updated
            </div>
          </div>

          {/* Table Rows */}
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="grid grid-cols-12 p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <div className="col-span-4 flex items-center">
                {conv.customer.avatar ? (
                  <img
                    src={conv.customer.avatar}
                    alt={conv.customer.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-3">
                    <FiUser className="text-gray-500 dark:text-gray-400" />
                  </div>
                )}
                <div>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {conv.customer.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {conv.customer.email}
                  </div>
                </div>
              </div>
              <div className="col-span-3 flex items-center text-gray-600 dark:text-gray-300">
                {getChannelIcon(conv.channel.type)}
                {conv.channel.name}
              </div>
              <div className="col-span-3 text-gray-600 dark:text-gray-300 truncate">
                {conv.last_message.text}
              </div>
              <div className="col-span-1">
                <div
                  className={`flex items-center px-2 py-1 rounded-full text-xs ${
                    getStatusBadge(conv.status).class
                  }`}
                >
                  {getStatusBadge(conv.status).icon}
                  {conv.status}
                </div>
              </div>
              <div className="col-span-1 text-sm text-gray-500 dark:text-gray-400">
                {formatRelativeTime(conv.updated_at)}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
            Showing {pagination.per_page} of {pagination.total} conversations
          </div>
          <div className="flex gap-1">
            <button
              className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              disabled={pagination.current_page === 1}
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>

            {Array.from(
              { length: Math.min(5, pagination.total_pages) },
              (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    className={`px-3 py-1 border rounded-lg ${
                      page === pagination.current_page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
            )}

            {pagination.total_pages > 5 && (
              <span className="px-3 py-1">...</span>
            )}

            <button
              className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              disabled={pagination.current_page === pagination.total_pages}
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
