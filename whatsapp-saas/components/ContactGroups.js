"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// Simulating real-time updates with mock data
const mockGroups = [
  {
    id: "1",
    name: "All Contacts",
    count: 124,
    icon: "👥",
    color: "bg-blue-100",
  },
  { id: "2", name: "Customers", count: 89, icon: "💰", color: "bg-green-100" },
  { id: "3", name: "Leads", count: 25, icon: "🔍", color: "bg-yellow-100" },
  { id: "4", name: "VIP", count: 12, icon: "⭐", color: "bg-purple-100" },
  { id: "5", name: "Inactive", count: 10, icon: "💤", color: "bg-gray-100" },
];

export default function ContactGroups() {
  const router = useRouter();
  const [groups, setGroups] = useState(mockGroups);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  // Simulate real-time updates
  useEffect(() => {
    setIsLoading(true);

    // Initial load
    const timer = setTimeout(() => {
      setGroups(mockGroups);
      setIsLoading(false);
    }, 800);

    // Simulate periodic updates (like from WebSocket or polling)
    const updateInterval = setInterval(() => {
      setGroups((prevGroups) => {
        return prevGroups.map((group) => ({
          ...group,
          count: Math.max(0, group.count + Math.floor(Math.random() * 3) - 1), // Random small change
        }));
      });
    }, 10000); // Update every 10 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(updateInterval);
    };
  }, []);

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast.error("Group name cannot be empty");
      return;
    }

    const newGroup = {
      id: Date.now().toString(),
      name: newGroupName,
      count: 0,
      icon: "🆕",
      color: "bg-pink-100",
    };

    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setShowCreateForm(false);
    toast.success(`Group "${newGroupName}" created`);
  };

  const handleGroupClick = (groupId) => {
    router.push(`/contacts?group=${groupId}`);
  };

  return (
    <div className="border rounded-lg p-2 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4 py-1 px-2">
        <h3 className="font-medium text-base">Contact Groups</h3>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
        >
          <Plus className="h-4 w-4 mr-1" /> New
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Enter group name"
            className="w-full p-2 border rounded mb-2"
            autoFocus
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateGroup}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between p-2">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => handleGroupClick(group.id)}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
            >
              <div className="flex items-center">
                <span
                  className={`${group.color} rounded-full w-8 h-8 flex items-center justify-center mr-3`}
                >
                  {group.icon}
                </span>
                <div>
                  <div className="font-medium">{group.name}</div>
                  <div className="text-xs text-gray-500">
                    {group.count} {group.count === 1 ? "contact" : "contacts"}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs bg-gray-100 rounded-full px-2 py-1 mr-2">
                  {group.count}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
