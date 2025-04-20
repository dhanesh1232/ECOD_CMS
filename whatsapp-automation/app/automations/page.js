"use client";
import {
  FiZap,
  FiPlus,
  FiPlay,
  FiPause,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiFilter,
  FiSearch,
  FiClock,
  FiUser,
  FiShoppingCart,
  FiMail,
  FiAlertCircle,
} from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Sample data structure matching a real API response
const sampleAutomations = {
  data: [
    {
      id: "auto_001",
      name: "Welcome Sequence",
      description: "Sends welcome messages to new users",
      trigger: {
        type: "user_signup",
        name: "New User Signup",
      },
      status: "active",
      last_run: "2023-06-15T10:30:00Z",
      created_at: "2023-05-10T08:30:00Z",
      updated_at: "2023-06-12T14:25:00Z",
      steps: 3,
      runs_count: 1245,
    },
    {
      id: "auto_002",
      name: "Abandoned Cart Recovery",
      description: "Reminds users about items left in cart",
      trigger: {
        type: "cart_abandoned",
        name: "Cart Abandoned",
      },
      status: "active",
      last_run: "2023-06-14T09:15:00Z",
      created_at: "2023-05-12T10:15:00Z",
      updated_at: "2023-06-10T09:45:00Z",
      steps: 4,
      runs_count: 876,
    },
    {
      id: "auto_003",
      name: "Customer Feedback",
      description: "Requests feedback after order completion",
      trigger: {
        type: "order_completed",
        name: "Order Completed",
      },
      status: "paused",
      last_run: "2023-06-08T15:45:00Z",
      created_at: "2023-05-15T11:20:00Z",
      updated_at: "2023-06-15T16:30:00Z",
      steps: 2,
      runs_count: 543,
    },
    {
      id: "auto_004",
      name: "Re-engagement Campaign",
      description: "Targets inactive users after 30 days",
      trigger: {
        type: "user_inactive",
        name: "Inactive for 30 days",
      },
      status: "draft",
      last_run: null,
      created_at: "2023-05-18T13:40:00Z",
      updated_at: "2023-06-14T11:10:00Z",
      steps: 5,
      runs_count: 0,
    },
  ],
  meta: {
    total: 12,
    active: 8,
    paused: 3,
    draft: 1,
  },
};

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "draft", label: "Drafts" },
];

const triggerIcons = {
  user_signup: <FiUser className="text-blue-500" />,
  cart_abandoned: <FiShoppingCart className="text-purple-500" />,
  order_completed: <FiMail className="text-green-500" />,
  user_inactive: <FiAlertCircle className="text-yellow-500" />,
};

export default function AutomationsPage() {
  const router = useRouter();
  const [automations, setAutomations] = useState(sampleAutomations.data);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Format time to relative (e.g., "2 hours ago")
  const formatRelativeTime = (dateString) => {
    if (!dateString) return "Never run";

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

  // Filter automations based on status and search
  const filteredAutomations = automations.filter((auto) => {
    const matchesStatus = filter === "all" || auto.status === filter;
    const matchesSearch =
      auto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auto.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Toggle automation status
  const toggleStatus = (id) => {
    setAutomations(
      automations.map((auto) =>
        auto.id === id
          ? { ...auto, status: auto.status === "active" ? "paused" : "active" }
          : auto
      )
    );
  };

  // Delete automation
  const deleteAutomation = (id) => {
    if (confirm("Are you sure you want to delete this automation?")) {
      setAutomations(automations.filter((auto) => auto.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <FiZap className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Automations
            </h1>
          </div>
          <button
            onClick={() => router.push("/automations/new")}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors"
          >
            <FiPlus className="mr-2" /> Create Automation
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search automations..."
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiFilter className="mr-2 text-gray-700 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-300">
                  Filters
                </span>
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
                      className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-800 dark:text-white"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {filteredAutomations.length} of {automations.length} shown
              </span>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm font-medium ${
              filter === "all"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            All ({sampleAutomations.meta.total})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 text-sm font-medium ${
              filter === "active"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Active ({sampleAutomations.meta.active})
          </button>
          <button
            onClick={() => setFilter("paused")}
            className={`px-4 py-2 text-sm font-medium ${
              filter === "paused"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Paused ({sampleAutomations.meta.paused})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-4 py-2 text-sm font-medium ${
              filter === "draft"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Drafts ({sampleAutomations.meta.draft})
          </button>
        </div>

        {/* Automation List */}
        {filteredAutomations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAutomations.map((auto) => (
              <div
                key={auto.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md"
              >
                <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg text-gray-800 dark:text-white">
                      {auto.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        auto.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : auto.status === "paused"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {auto.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {auto.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <div className="flex items-center mr-4">
                      {triggerIcons[auto.trigger.type] || (
                        <FiZap className="text-gray-400 mr-1" />
                      )}
                      <span className="ml-1">{auto.trigger.name}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="mr-1" />
                      <span>{auto.steps} steps</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-b border-gray-100 dark:border-gray-700 text-sm">
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Last run:</span>{" "}
                      {formatRelativeTime(auto.last_run)}
                    </div>
                    <div>
                      <span className="font-medium">Runs:</span>{" "}
                      {auto.runs_count.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="p-3 flex justify-between">
                  <div className="flex gap-2">
                    {auto.status === "active" ? (
                      <button
                        onClick={() => toggleStatus(auto.id)}
                        className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 rounded-lg transition-colors"
                        title="Pause automation"
                      >
                        <FiPause />
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleStatus(auto.id)}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                        title="Activate automation"
                      >
                        <FiPlay />
                      </button>
                    )}
                    <button
                      onClick={() =>
                        router.push(`/automations/${auto.id}/edit`)
                      }
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      title="Edit automation"
                    >
                      <FiEdit2 />
                    </button>
                  </div>
                  <button
                    onClick={() => deleteAutomation(auto.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete automation"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
            <FiZap
              size={48}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              No automations found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery
                ? "Try adjusting your search or filters"
                : "Create your first automation to automate customer interactions"}
            </p>
            <button
              onClick={() => router.push("/automations/new")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors"
            >
              Create Automation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
