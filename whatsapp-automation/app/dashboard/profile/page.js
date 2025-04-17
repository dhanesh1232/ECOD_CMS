"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCreditCard,
  FiZap,
  FiBarChart2,
  FiLogOut,
  FiEdit,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    company: "",
    avatar: "",
  });

  // Fetch user data
  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        if (session) {
          const res = await fetch("/api/user");
          if (!res.ok) throw new Error("Failed to fetch user data");
          const data = await res.json();
          setUser(data);
          setFormData({
            email: data.email,
            name: data.name,
            phoneNumber: data.phoneNumber || "",
            company: data.company || "",
            avatar: data.image || "",
          });
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [session]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Update failed");
      }

      const data = await res.json();
      setUser(data);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle avatar update
  const handleAvatarUpdate = async (newAvatar) => {
    try {
      const res = await fetch("/api/user/avatar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: newAvatar }),
      });

      if (!res.ok) throw new Error("Failed to update avatar");

      const data = await res.json();
      setUser(data);
      setFormData((prev) => ({ ...prev, avatar: data.image }));
      setAvatarModalOpen(false);
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Subscription actions
  const handleSubscriptionAction = async (action, payload = null) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/subscription/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Action failed");
      }

      const data = await res.json();
      setUser(data);
      toast.success(`Subscription ${action.replace("-", " ")} successful!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Usage progress calculation
  const calculateUsage = (used, allocated) => {
    return Math.min(Math.round((used / allocated) * 100), 100);
  };

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="w-full mx-auto px-2 sm:px-2 lg:px-4 py-4 dark:bg-gray-900">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account information and preferences
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
              editMode
                ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                : "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
            }`}
          >
            <FiEdit size={16} />
            {editMode ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
          >
            <FiLogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative group">
                  <Image
                    width={100}
                    height={100}
                    src={formData.avatar || "/default-avatar.jpg"}
                    alt="User avatar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => setAvatarModalOpen(true)}
                      className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    >
                      <FiEdit size={20} />
                    </button>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 dark:text-white"
                      required
                    />
                  ) : (
                    <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 rounded-md">
                      {user.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md dark:text-gray-200">
                    <FiMail className="text-gray-500 dark:text-gray-400 mr-2" />
                    <span>{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 dark:text-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  ) : (
                    <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md dark:text-gray-200">
                      <FiPhone className="text-gray-500 dark:text-gray-400 mr-2" />
                      <span>{user.phoneNumber || "Not provided"}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 dark:text-white"
                      placeholder="Your company name"
                    />
                  ) : (
                    <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md dark:text-gray-200">
                      <FiBriefcase className="text-gray-500 dark:text-gray-400 mr-2" />
                      <span>{user.company || "Not provided"}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {editMode && (
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end gap-3 transition-colors duration-200">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center gap-2"
                >
                  <FiCheck size={16} />
                  Save Changes
                </button>
              </div>
            )}
          </form>

          {/* Subscription Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                <FiCreditCard className="text-blue-500 dark:text-blue-400" />
                Subscription Plan
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-lg font-medium dark:text-gray-200">
                    Current Plan:{" "}
                    <span className="capitalize text-blue-600 dark:text-blue-400">
                      {user.subscription?.plan || "Free"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Status:{" "}
                    <span
                      className={`capitalize ${
                        user.subscription?.status === "active"
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {user.subscription?.status}
                    </span>
                    {user.inTrialPeriod && (
                      <span className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                        Trial
                      </span>
                    )}
                  </p>
                </div>

                {user.inTrialPeriod && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                    <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                      <span className="font-semibold">Trial ends:</span>{" "}
                      {new Date(
                        user.subscription.trialEndDate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {user.isFreeTier && (
                  <button
                    onClick={() => handleSubscriptionAction("start-trial")}
                    disabled={loading}
                    className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white rounded-md hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <LoadingSpinner size="small" />
                    ) : (
                      <>
                        <FiZap size={16} />
                        Start 14-Day Free Trial
                      </>
                    )}
                  </button>
                )}

                {user.hasActiveSubscription ? (
                  <button
                    onClick={() => handleSubscriptionAction("cancel")}
                    disabled={loading}
                    className="w-full md:w-auto px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <LoadingSpinner size="small" />
                    ) : (
                      <>
                        <FiX size={16} />
                        Cancel Subscription
                      </>
                    )}
                  </button>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() =>
                        handleSubscriptionAction("upgrade", {
                          plan: "standard",
                          billingCycle: "monthly",
                        })
                      }
                      disabled={loading}
                      className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left"
                    >
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                        Standard
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        $29/month
                      </p>
                      <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• 10,000 messages/month</li>
                        <li>• 5 integrations</li>
                        <li>• Priority support</li>
                      </ul>
                      <div className="mt-3">
                        <span className="inline-block px-3 py-1 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-full">
                          Upgrade
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        handleSubscriptionAction("upgrade", {
                          plan: "growth",
                          billingCycle: "annual",
                        })
                      }
                      disabled={loading}
                      className="px-4 py-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-purple-800 dark:text-purple-300">
                            Growth
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            $299/year
                          </p>
                        </div>
                        <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded">
                          Save 15%
                        </span>
                      </div>
                      <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• 50,000 messages/month</li>
                        <li>• 20 integrations</li>
                        <li>• 24/7 priority support</li>
                        <li>• Advanced analytics</li>
                      </ul>
                      <div className="mt-3">
                        <span className="inline-block px-3 py-1 bg-purple-600 dark:bg-purple-700 text-white text-sm rounded-full">
                          Upgrade
                        </span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Usage Stats */}
        <div className="space-y-6">
          {/* Usage Stats Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium flex items-center gap-2 dark:text-white">
                <FiZap className="text-blue-500 dark:text-blue-400" />
                Usage Statistics
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Messages
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.usage?.monthlyMessages?.used || 0} /{" "}
                    {user.usage?.monthlyMessages?.allocated || 0}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
                    style={{
                      width: `${calculateUsage(
                        user.usage?.monthlyMessages?.used || 0,
                        user.usage?.monthlyMessages?.allocated || 1
                      )}%`,
                    }}
                  ></div>
                </div>
                {calculateUsage(
                  user.usage?.monthlyMessages?.used || 0,
                  user.usage?.monthlyMessages?.allocated || 1
                ) >= 80 && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                    {`You've used`}{" "}
                    {calculateUsage(
                      user.usage?.monthlyMessages?.used || 0,
                      user.usage?.monthlyMessages?.allocated || 1
                    )}
                    % of your monthly message quota
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Integrations
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.usage?.integrations?.used || 0} /{" "}
                    {user.usage?.integrations?.allocated || 0}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full"
                    style={{
                      width: `${calculateUsage(
                        user.usage?.integrations?.used || 0,
                        user.usage?.integrations?.allocated || 1
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Usage resets on{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* API Status Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium flex items-center gap-2 dark:text-white">
                <FiBarChart2 className="text-blue-500 dark:text-blue-400" />
                API Configuration
              </h3>
            </div>
            <div className="p-6">
              {user.apiPreference === "custom_key" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    OpenAI API Key
                  </label>
                  <div className="flex items-center">
                    <input
                      type={apiKeyVisible ? "text" : "password"}
                      value={user.openaiApiKey || "Not configured"}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={() => setApiKeyVisible(!apiKeyVisible)}
                      className="px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      {apiKeyVisible ? (
                        <FiEyeOff
                          size={18}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      ) : (
                        <FiEye
                          size={18}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Your API key is stored securely and never exposed to third
                    parties.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
