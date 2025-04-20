"use client";

import ChangePassword from "@/components/dashboard/change-password";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiSettings,
  FiSave,
  FiUser,
  FiLock,
  FiGlobe,
  FiEdit,
  FiCreditCard,
  FiDatabase,
  FiShield,
  FiBell,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEye,
} from "react-icons/fi";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const searchParams = useSearchParams();

  // Get tab from URL or fallback to "general"
  const tabParam = searchParams.get("tab") || "general";
  const [activeTab, setActiveTab] = useState(tabParam);

  const [formData, setFormData] = useState({
    companyName: "Acme Inc",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    defaultLanguage: "English",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Update tab state if URL changes
  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  useEffect(() => {
    const renderUserData = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setProfile(data);
    };
    renderUserData();
  }, [setProfile]);

  const handleTabChange = (tabName) => {
    router.push(`?tab=${tabName}`);
    setActiveTab(tabName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (status === "unauthenticated") return null;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
          <FiSettings className="mr-3 text-blue-600 dark:text-blue-400" />{" "}
          Account Settings
        </h1>
        {profile?.subscription && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow">
            {profile.subscription.plan === "free"
              ? "Free Plan"
              : `${
                  profile.subscription.plan.charAt(0).toUpperCase() +
                  profile.subscription.plan.slice(1)
                } Plan`}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Fixed Position */}
        <div className="w-full lg:w-64 flex-shrink-0 lg:h-full lg:sticky lg:top-0 lg:overflow-y-auto lg:pt-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                Settings
              </h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {[
                { key: "general", label: "General", icon: FiSettings },
                { key: "profile", label: "Profile", icon: FiUser },
                { key: "security", label: "Security", icon: FiLock },
                { key: "notifications", label: "Notifications", icon: FiBell },
                { key: "billing", label: "Billing", icon: FiCreditCard },
                {
                  key: "integrations",
                  label: "Integrations",
                  icon: FiDatabase,
                },
                { key: "regional", label: "Regional", icon: FiGlobe },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`w-full text-left p-4 flex items-center transition-colors ${
                    activeTab === tab.key
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleTabChange(tab.key)}
                >
                  <tab.icon className="mr-3 text-lg" />
                  <span>{tab.label}</span>
                  {activeTab === tab.key && (
                    <div className="ml-auto w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Scrollable Area */}
        <div className="flex-1 min-w-0 lg:pt-6">
          {/* Render active tab */}
          {activeTab === "general" && (
            <GeneralTab formData={formData} handleChange={handleChange} />
          )}
          {activeTab === "profile" && (
            <ProfileTab
              isEdit={isEdit}
              togglEdit={setIsEdit}
              profileData={profile}
            />
          )}
          {activeTab === "security" && <SecurityTab profile={profile} />}
          {activeTab === "notifications" && <NotificationTab />}
          {activeTab === "billing" && <BillingTab profile={profile} />}
          {activeTab === "integrations" && (
            <IntegrationsTab profile={profile} />
          )}
          {activeTab === "regional" && <RegionalTab />}
        </div>
      </div>
    </div>
  );
}

// ----------------------
// 🔽 Tab Components
// ----------------------

function GeneralTab({ formData, handleChange }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          General Settings
        </h2>
        <button
          type="submit"
          className="flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiSave className="mr-2" /> Save
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Company Name
          </label>
          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Timezone
          </label>
          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option>America/New_York</option>
            <option>Europe/London</option>
            <option>Asia/Kolkata</option>
            <option>Asia/Tokyo</option>
            <option>Australia/Sydney</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date Format
          </label>
          <select
            name="dateFormat"
            value={formData.dateFormat}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Default Language
          </label>
          <select
            name="defaultLanguage"
            value={formData.defaultLanguage}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ profileData, isEdit, togglEdit }) {
  const [formData, setFormData] = useState({
    name: profileData?.name || "",
    email: profileData?.email || "",
    company: profileData?.company || "",
    phoneNumber: profileData?.phoneNumber || "",
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        company: profileData.company || "",
        phoneNumber: profileData.phoneNumber || "",
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Triggered");
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
      togglEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Profile Information
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {`Update your account's profile information`}
          </p>
        </div>
        <button
          onClick={() => togglEdit(!isEdit)}
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <FiEdit className="mr-1" /> {isEdit ? "Cancel" : "Edit"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 md:p-6">
        <div className="space-y-1 sm:space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              {isEdit ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="p-3 sm:text-base text-sm  text-gray-800 dark:text-gray-200 bg-blue-100 dark:bg-gray-500 rounded-md">
                  {formData.name}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              {isEdit ? (
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <div className="flex items-center justify-between p-3 bg-blue-100 dark:bg-gray-500 rounded-md">
                  <p className="text-gray-800 sm:text-base text-sm dark:text-gray-200">
                    {formData.email}
                  </p>
                  {profileData?.isVerified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <FiCheckCircle className="mr-1" />{" "}
                      <span className="hidden sm:block">Verified</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="inline items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800"
                    >
                      <FiXCircle className="mr-1" />{" "}
                      <span className="hidden: sm:block">Verify</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company
              </label>
              {isEdit ? (
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="p-3 text-gray-800 dark:text-gray-200 bg-blue-100 dark:bg-gray-500 rounded-md">
                  {formData.company || "Not specified"}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              {isEdit ? (
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="+1234567890"
                />
              ) : (
                <p className="p-3 text-gray-800 dark:text-gray-200 bg-blue-100 dark:bg-gray-500 rounded-md">
                  {formData.phoneNumber || "Not specified"}
                </p>
              )}
            </div>
          </div>
        </div>

        {isEdit && (
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg transition-colors"
            >
              <FiSave className="mr-2" /> Save Profile
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

function SecurityTab({ profile }) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Password & Authentication
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your account password and authentication methods
          </p>
        </div>
        <div className="p-4">
          <ChangePassword />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Sessions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your active sessions
          </p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <FiShield className="text-gray-500 dark:text-gray-300 mr-3" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  Current Session
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active now
                </p>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Details
            </button>
          </div>
        </div>
      </div>

      {profile?.isOAuthUser && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Connected Accounts
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your third-party account connections
            </p>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-gray-500 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                  <FiUser className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium dark:text-gray-200">
                    {profile.oauthProvider
                      ? `${
                          profile.oauthProvider.charAt(0).toUpperCase() +
                          profile.oauthProvider.slice(1)
                        }`
                      : "Unknown"}{" "}
                    Account
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connected
                  </p>
                </div>
              </div>
              <button className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationTab() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
  });

  const handleToggle = (field) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Notification Preferences
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Customize how you receive notifications
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            Communication
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium dark:text-gray-200">Email Alerts</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Important account notifications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailAlerts}
                  onChange={() => handleToggle("emailAlerts")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium dark:text-gray-200">SMS Alerts</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Critical security notifications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.smsAlerts}
                  onChange={() => handleToggle("smsAlerts")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium dark:text-gray-200">
                  Push Notifications
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  App notifications on your device
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.pushNotifications}
                  onChange={() => handleToggle("pushNotifications")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            Marketing & Updates
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium dark:text-gray-200">
                  Marketing Emails
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Product updates and promotions
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.marketingEmails}
                  onChange={() => handleToggle("marketingEmails")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium dark:text-gray-200">Weekly Digest</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Summary of your weekly activity
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.weeklyDigest}
                  onChange={() => handleToggle("weeklyDigest")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg transition-colors">
            <FiSave className="mr-2" /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

function BillingTab({ profile }) {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "visa", last4: "4242", expiry: "12/24", isDefault: true },
    {
      id: 2,
      type: "mastercard",
      last4: "5555",
      expiry: "05/25",
      isDefault: false,
    },
  ]);

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic features for getting started",
      features: ["500 messages/month", "1 integration", "Basic support"],
      current: profile?.subscription?.plan === "free",
    },
    {
      name: "Standard",
      price: "$29",
      description: "For growing businesses",
      features: [
        "1,000 messages/month",
        "5 integrations",
        "Priority support",
        "API access",
      ],
      current: profile?.subscription?.plan === "standard",
    },
    {
      name: "Growth",
      price: "$99",
      description: "For scaling operations",
      features: [
        "10,000 messages/month",
        "10 integrations",
        "24/7 support",
        "Advanced analytics",
      ],
      current: profile?.subscription?.plan === "growth",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "100,000+ messages/month",
        "20+ integrations",
        "Dedicated account manager",
        "Custom solutions",
      ],
      current: profile?.subscription?.plan === "enterprise",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Subscription Plan
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your current subscription
          </p>
        </div>

        <div className="p-6">
          {profile?.subscription?.status === "trial" && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-start">
              <FiClock className="text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-200">
                  Free Trial Active
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Your trial ends on{" "}
                  {new Date(
                    profile.subscription.trialEndDate
                  ).toLocaleDateString()}
                  . Upgrade to a paid plan to continue uninterrupted service.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`border rounded-lg p-5 ${
                  plan.current
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              >
                <h3 className="font-semibold text-lg mb-1 dark:text-gray-200">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold mb-2 dark:text-gray-200">
                  {plan.price}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm dark:text-gray-300"
                    >
                      <FiCheckCircle className="text-green-500 mr-2" />{" "}
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.current ? (
                  <button
                    className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md cursor-default"
                    disabled
                  >
                    Current Plan
                  </button>
                ) : (
                  <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-md transition-colors">
                    {plan.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Payment Methods
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your saved payment methods
          </p>
        </div>

        <div className="p-6 space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-10 h-6 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mr-3">
                  {method.type === "visa" ? (
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">
                      VISA
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 font-bold text-xs">
                      MC
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium dark:text-gray-200">
                    •••• •••• •••• {method.last4}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Expires {method.expiry}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {method.isDefault && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Default
                  </span>
                )}
                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                  Edit
                </button>
                {!method.isDefault && (
                  <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm">
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            <span className="mr-1">+</span> Add Payment Method
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Billing History
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and download past invoices
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Jan 15, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                    Standard Plan - Monthly
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    $29.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">
                    <a href="#" className="hover:underline">
                      Download
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Dec 15, 2022
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                    Standard Plan - Monthly
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    $29.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">
                    <a href="#" className="hover:underline">
                      Download
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationsTab({ profile }) {
  const availableIntegrations = [
    {
      platform: "whatsapp",
      name: "WhatsApp",
      icon: "📱",
      description: "Connect your WhatsApp business account",
    },
    {
      platform: "instagram",
      name: "Instagram",
      icon: "📷",
      description: "Connect your Instagram business profile",
    },
    {
      platform: "facebook",
      name: "Facebook",
      icon: "👍",
      description: "Connect your Facebook page",
    },
    {
      platform: "telegram",
      name: "Telegram",
      icon: "✈️",
      description: "Connect your Telegram bot",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            API Configuration
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your API preferences and keys
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              API Preference
            </label>
            <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white">
              <option>Platform API</option>
              <option>Custom API Key</option>
            </select>
          </div>

          {profile?.apiPreference === "custom_key" && (
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                OpenAI API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={profile?.openaiApiKey || ""}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white pr-10"
                  placeholder="sk-...your-api-key"
                />
                <button className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  <FiEye className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                We securely encrypt your API key
              </p>
            </div>
          )}

          <div className="pt-2">
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors">
              <FiSave className="mr-2" /> Save API Settings
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Platform Integrations
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {`You've used ${profile?.integrations?.length || 0} of ${
              profile?.usage?.integrations?.allocated || 1
            } available integrations`}
          </p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableIntegrations.map((integration) => {
            const isConnected = profile?.integrations?.some(
              (i) => i.platform === integration.platform
            );
            const isActive = profile?.integrations?.find(
              (i) => i.platform === integration.platform
            )?.isActive;

            return (
              <div
                key={integration.platform}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{integration.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-medium dark:text-gray-200">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {integration.description}
                    </p>

                    {isConnected ? (
                      <div className="mt-3 flex items-center justify-between">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                        <div className="space-x-2">
                          <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            Configure
                          </button>
                          <button className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                            Disconnect
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Connect {integration.name}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RegionalTab() {
  const [formData, setFormData] = useState({
    country: "United States",
    language: "English",
    currency: "USD",
    timeFormat: "12-hour",
    temperatureUnit: "Fahrenheit",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Regional Settings
        </h2>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors">
          <FiSave className="mr-2" /> Save
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>India</option>
            <option>Germany</option>
            <option>Japan</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Language
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
            <option>Hindi</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Currency
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
            <option>JPY (¥)</option>
            <option>INR (₹)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Time Format
          </label>
          <select
            name="timeFormat"
            value={formData.timeFormat}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option>12-hour (AM/PM)</option>
            <option>24-hour</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Temperature Unit
          </label>
          <select
            name="temperatureUnit"
            value={formData.temperatureUnit}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option>Fahrenheit (°F)</option>
            <option>Celsius (°C)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
