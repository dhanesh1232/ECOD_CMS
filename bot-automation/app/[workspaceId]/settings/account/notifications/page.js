"use client";
import { useState, useEffect, useRef } from "react";
import { UserServices } from "@/lib/client/user";
import { useToast } from "@/components/ui/toast-provider";

const NotificationPage = () => {
  const [preferences, setPreferences] = useState({
    email: {},
    push: {},
    inApp: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const showToast = useToast();
  const toastRef = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await UserServices.fetchUserProfile();
        if (response.status && !response.ok) {
          if (!toastRef.current) {
            showToast({
              description: "Failed to fetch Notification Preferences",
              variant: "warning",
            });
            toastRef.current = true;
          }
        }
        const notifications = response.data.user.notificationPreferences;
        setPreferences(notifications);
        setLoading(false);
      } catch (err) {
        if (!toastRef.current) {
          showToast({
            title: "Retry",
            variant: "warning",
            description: "Failed to load preferences",
          });
          toastRef.current = true;
        }
        setError(err.response?.data?.message || "Failed to load preferences");
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [showToast]);

  const handleToggle = async (channel, type, value) => {
    try {
      const updatedPreferences = {
        ...preferences,
        [channel]: {
          ...preferences[channel],
          [type]: value,
        },
      };

      const response = await UserServices.updateUserNotifications({
        channel,
        type,
        value,
      });
      if (response.status && !response.ok) {
        console.log("Error");
      }

      setPreferences(updatedPreferences);
      showToast({
        description: "Notification preferences updated successfully",
        variant: "success",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update preferences");
      showToast({
        description: "Failed to update preferences",
        variant: "error",
      });
    }
  };

  const toggleAllForChannel = async (channel) => {
    try {
      const currentChannelPrefs = preferences[channel];
      const allEnabled = Object.values(currentChannelPrefs).every(Boolean);
      const newValue = !allEnabled;

      const updatedPreferences = {
        ...preferences,
        [channel]: Object.fromEntries(
          Object.keys(currentChannelPrefs).map((key) => [key, newValue])
        ),
      };

      // Update all preferences at once
      const response = await UserServices.updateUserNotifications({
        channel,
        type: "all",
        value: newValue,
      });

      if (response.status && !response.ok) {
        throw new Error("Failed to update preferences");
      }

      setPreferences(updatedPreferences);
      showToast({
        description: `All ${channel} notifications ${
          newValue ? "enabled" : "disabled"
        }`,
        variant: "success",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update preferences");
      showToast({
        description: "Failed to update preferences",
        variant: "error",
      });
    }
  };

  if (loading)
    return (
      <div className="text-center py-8 text-gray-600 dark:text-gray-300">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p>Loading preferences...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-8 text-red-500 dark:text-red-400">
        {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Notification Settings
      </h1>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center text-gray-800 dark:text-gray-200">
              <span className="mr-2">📧</span> Email Notifications
            </h2>
            <MainToggleSwitch
              channel="email"
              preferences={preferences}
              onToggle={toggleAllForChannel}
            />
          </div>
          <div className="space-y-4">
            {Object.entries(preferences.email).map(([type, value]) => (
              <NotificationItem
                key={`email-${type}`}
                type={type}
                value={value}
                channel="email"
                handleToggle={handleToggle}
                disabled={Object.values(preferences.email).every((v) => !v)}
              />
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center text-gray-800 dark:text-gray-200">
              <span className="mr-2">📱</span> Push Notifications
            </h2>
            <MainToggleSwitch
              channel="push"
              preferences={preferences}
              onToggle={toggleAllForChannel}
            />
          </div>
          <div className="space-y-4">
            {Object.entries(preferences.push).map(([type, value]) => (
              <NotificationItem
                key={`push-${type}`}
                type={type}
                value={value}
                channel="push"
                handleToggle={handleToggle}
                disabled={Object.values(preferences.push).every((v) => !v)}
              />
            ))}
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center text-gray-800 dark:text-gray-200">
              <span className="mr-2">🔔</span> In-App Notifications
            </h2>
            <MainToggleSwitch
              channel="inApp"
              preferences={preferences}
              onToggle={toggleAllForChannel}
            />
          </div>
          <div className="space-y-4">
            {Object.entries(preferences.inApp).map(([type, value]) => (
              <NotificationItem
                key={`inApp-${type}`}
                type={type}
                value={value}
                channel="inApp"
                handleToggle={handleToggle}
                disabled={Object.values(preferences.inApp).every((v) => !v)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationItem = ({ type, value, channel, handleToggle, disabled }) => {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg ${
        disabled
          ? "bg-gray-100 dark:bg-gray-700 opacity-70"
          : "bg-gray-50 dark:bg-gray-700"
      }`}
    >
      <div>
        <h3
          className={`font-medium capitalize ${
            disabled
              ? "text-gray-500 dark:text-gray-400"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {type.replace(/_/g, " ")}
        </h3>
        <p
          className={`text-sm ${
            disabled
              ? "text-gray-400 dark:text-gray-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {getNotificationDescription(type)}
        </p>
      </div>
      <ToggleSwitch
        checked={value}
        onChange={(checked) => handleToggle(channel, type, checked)}
        disabled={disabled}
      />
    </div>
  );
};

const ToggleSwitch = ({ checked, onChange, disabled = false }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        checked
          ? "bg-indigo-600 dark:bg-indigo-500"
          : "bg-gray-200 dark:bg-gray-600"
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

const MainToggleSwitch = ({ channel, preferences, onToggle }) => {
  const allEnabled = Object.values(preferences[channel]).every(Boolean);
  const someEnabled = Object.values(preferences[channel]).some(Boolean);

  return (
    <button
      onClick={() => onToggle(channel)}
      className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
    >
      <span>
        {allEnabled
          ? "Disable all"
          : someEnabled
          ? "Disable all"
          : "Enable all"}
      </span>
      <div
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          allEnabled
            ? "bg-indigo-600 dark:bg-indigo-500"
            : "bg-gray-200 dark:bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
            allEnabled ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </div>
    </button>
  );
};

const getNotificationDescription = (type) => {
  const descriptions = {
    workspace_invitation: "When you receive a workspace invitation",
    invitation_accepted: "When someone accepts your invitation",
    invitation_expired: "When your invitation expires",
    trial_ending: "When your trial is about to end",
    payment_failed: "When a payment fails",
    subscription_activated: "When your subscription is activated",
    subscription_renewed: "When your subscription renews",
    direct_message: "When you receive a direct message",
    mentioned: "When you are mentioned in a conversation",
    all: "All in-app notifications",
  };
  return descriptions[type] || "";
};

export default NotificationPage;
