"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiShield,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { useSession } from "next-auth/react";
import PasswordStrengthBar from "react-password-strength-bar";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/toast-provider";
import { UserServices } from "@/lib/client/user";

const PasswordAndSecurity = () => {
  const { data: session } = useSession();
  const showToast = useToast();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [visibility, setVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const toastRef = useRef(false);

  const validateField = useCallback(
    (name, value) => {
      let newErrors;

      switch (name) {
        case "newPassword":
          if (!value) {
            newErrors = "Password is required";
          } else {
            if (value === form.currentPassword) {
              newErrors = "New password must be different from current";
            }
            if (value.length < 8) {
              newErrors = "Minimum 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              newErrors = "Requires uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              newErrors = "Requires number";
            }
            if (!/[^A-Za-z0-9]/.test(value)) {
              newErrors = "Requires special character";
            }
          }
          break;

        case "confirmPassword":
          if (value !== form.newPassword) {
            newErrors = "Passwords don't match";
          }
          break;
      }

      if (newErrors !== "") {
        if (!toastRef.current) {
          showToast({
            description: "",
          });
        }
      }
    },
    [showToast, form.currentPassword, form.newPassword]
  );

  const handleBlur = useCallback(
    (field) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field, form[field]);
    },
    [form, validateField]
  );

  const handleChange = useCallback(
    (field, value) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) validateField(field, value);
    },
    [touched, validateField]
  );
  useEffect(() => {
    if (form.currentPassword.length >= 8) {
      console.log("password length reached");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await UserServices.updateUserPassword({
        email: session?.user?.email,
        ...form,
      });

      if (!res.ok) {
        const data = await res.json();
        showToast({
          title: "Failed",
          description: data.message || "Password change failed",
          variant: "destructive",
        });
      } else {
        showToast({
          title: "Success",
          description: "Password changed successfully!",
          variant: "success",
        });
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      showToast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkIsEmpty = () => {
    return true;
  };
  const securityItems = [
    {
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security",
      buttonText: "Enable",
      icon: <FiShield className="w-4 h-4 mr-2" />,
    },
    {
      title: "Recent Devices",
      description: "Manage connected devices",
      buttonText: "View",
      icon: <FiCheckCircle className="w-4 h-4 mr-2" />,
    },
    {
      title: "Active Sessions",
      description: `Logged in as ${session?.user?.email}`,
      buttonText: "Logout All",
      icon: <FiLock className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <div className="flex-1 p-4 sm:p-6 bg-white select-none dark:bg-gray-900 rounded-xl shadow-lg overflow-auto">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Account Security
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Manage your password and security preferences
          </p>
        </motion.div>

        {/* Password Change Card */}
        <motion.div
          className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <FiLock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Update Password
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={visibility.current ? "text" : "password"}
                  value={form.currentPassword}
                  onChange={(e) =>
                    handleChange("currentPassword", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  onCopy={(e) => e.preventDefault()}
                  required
                />
                {form.currentPassword && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibility((p) => ({ ...p, current: !p.current }))
                    }
                    className="absolute top-3 right-3 text-gray-400 focus:outline-none focus-within:text-blue-600 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="Toggle password visibility"
                  >
                    {visibility.current ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={visibility.new ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  onBlur={() => handleBlur("newPassword")}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 ${
                    form.newPassword &&
                    form.newPassword === form.currentPassword &&
                    "ring-2 ring-red-600"
                  } focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="••••••••"
                  onCopy={(e) => e.preventDefault()}
                  required
                />
                {form.newPassword && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibility((p) => ({ ...p, new: !p.new }))
                    }
                    className={`absolute top-3 right-3 focus:outline-none focus-within:text-blue-600 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
                    aria-label="Toggle password visibility"
                  >
                    {visibility.new ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>

              <div className="mt-3 space-y-2">
                <PasswordStrengthBar
                  password={form.newPassword}
                  className="password-strength"
                  scoreWords={["Weak", "Weak", "Good", "Strong", "Very Strong"]}
                  shortScoreWord="Too Short"
                  barColors={
                    form.newPassword.length === 0
                      ? ["#d1d5db", "#d1d5db", "#d1d5db", "#d1d5db", "#d1d5db"]
                      : ["#dc2626", "#ea580c", "#16a34a", "#15803d", "#065f46"]
                  }
                />

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p className="mb-2 font-medium">Requirements:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {[
                      {
                        text: "8+ characters",
                        valid: form.newPassword.length >= 8,
                      },
                      {
                        text: "Uppercase letter",
                        valid: /[A-Z]/.test(form.newPassword),
                      },
                      { text: "Number", valid: /[0-9]/.test(form.newPassword) },
                      {
                        text: "Special character",
                        valid: /[^A-Za-z0-9]/.test(form.newPassword),
                      },
                    ].map((req, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {req.valid ? (
                          <FiCheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <FiXCircle className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={req.valid ? "text-green-600" : ""}>
                          {req.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={visibility.confirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onCopy={(e) => e.preventDefault()}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  onBlur={() => handleBlur("confirmPassword")}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  required
                />
                {form.confirmPassword && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibility((p) => ({ ...p, confirm: !p.confirm }))
                    }
                    className="absolute top-3 focus:outline-none focus-within:text-blue-600 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="Toggle password visibility"
                  >
                    {visibility.confirm ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || checkIsEmpty()}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </div>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </motion.div>

        {/* Security Section */}
        <motion.div
          className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
              <FiShield className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Security Settings
            </h2>
          </div>

          <div className="space-y-4">
            {securityItems.map((item, i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                </div>
                <button className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-md flex items-center justify-center text-sm font-medium transition-colors">
                  {item.icon}
                  {item.buttonText}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PasswordAndSecurity;
