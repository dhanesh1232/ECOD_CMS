"use client";
import { useState, useRef, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Reusable PasswordInput Component
const PasswordInput = ({
  label,
  value,
  onChange,
  onBlur,
  visible,
  setVisible,
  placeholder,
  name,
  className = "",
}) => (
  <div className={className}>
    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </Label>
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600
         rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
        placeholder={placeholder}
        onCopy={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        name={name}
        id={name}
        required
      />
      <Button
        variant="ghost"
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute top-0.5 right-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        aria-label={`Toggle ${label.toLowerCase()} visibility`}
      >
        {visible ? (
          <FiEyeOff className="w-5 h-5" />
        ) : (
          <FiEye className="w-5 h-5" />
        )}
      </Button>
    </div>
  </div>
);

const PasswordAndSecurity = () => {
  const { data: session, update } = useSession();
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
  const [loading, setLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState([
    { text: "8+ characters", valid: false },
    { text: "Uppercase letter", valid: false },
    { text: "Number", valid: false },
    { text: "Special character", valid: false },
    { text: "Different from current", valid: false },
  ]);

  // Validate password requirements in real-time
  useEffect(() => {
    setPasswordRequirements([
      { text: "8+ characters", valid: form.newPassword.length >= 8 },
      { text: "Uppercase letter", valid: /[A-Z]/.test(form.newPassword) },
      { text: "Number", valid: /[0-9]/.test(form.newPassword) },
      {
        text: "Special character",
        valid: /[^A-Za-z0-9]/.test(form.newPassword),
      },
      {
        text: "Different from current",
        valid: form.newPassword && form.newPassword !== form.currentPassword,
      },
    ]);
  }, [form.newPassword, form.currentPassword]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "currentPassword":
        if (!value) error = "Current password is required";
        break;
      case "newPassword":
        if (!value) {
          error = "Password is required";
        } else if (value === form.currentPassword) {
          error = "New password must be different";
        } else if (value.length < 8) {
          error = "Minimum 8 characters";
        } else if (!/[A-Z]/.test(value)) {
          error = "Requires uppercase letter";
        } else if (!/[0-9]/.test(value)) {
          error = "Requires number";
        } else if (!/[^A-Za-z0-9]/.test(value)) {
          error = "Requires special character";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== form.newPassword) {
          error = "Passwords don't match";
        }
        break;
    }

    if (error) {
      showToast({
        title: name,
        description: error,
        variant: "warning",
      });
    }
    return !error;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    validateField(field, form[field]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate all fields
    const isCurrentValid = validateField(
      "currentPassword",
      form.currentPassword
    );
    const isNewValid = validateField("newPassword", form.newPassword);
    const isConfirmValid = validateField(
      "confirmPassword",
      form.confirmPassword
    );

    if (!isCurrentValid || !isNewValid || !isConfirmValid) {
      setLoading(false);
      return;
    }

    try {
      const res = await UserServices.updateUserPassword({
        email: session?.user?.email,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      if (res.status && !res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Password change failed");
      }

      await update();

      showToast({
        title: "Success",
        description: "Password changed successfully!",
        variant: "success",
      });
    } catch (err) {
      showToast({
        title: "Error",
        description: err.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const securityItems = [
    {
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security",
      buttonText: session?.user?.mfa?.enabled ? "Configure" : "Enable",
      icon: <FiShield className="w-4 h-4 mr-2" />,
      onClick: () => console.log("2FA clicked"),
    },
    {
      title: "Recent Devices",
      description: "Manage connected devices",
      buttonText: "View",
      icon: <FiCheckCircle className="w-4 h-4 mr-2" />,
      onClick: () => console.log("Recent devices clicked"),
    },
    {
      title: "Active Sessions",
      description: `Logged in as ${session?.user?.email}`,
      buttonText: "Logout All",
      icon: <FiLock className="w-4 h-4 mr-2" />,
      onClick: () => console.log("Logout all clicked"),
    },
  ];

  return (
    <div className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
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
          transition={{ duration: 0.3 }}
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
            <PasswordInput
              label="Current Password"
              value={form.currentPassword}
              onChange={(val) => handleChange("currentPassword", val)}
              onBlur={() => handleBlur("currentPassword")}
              visible={visibility.current}
              setVisible={() =>
                setVisibility((prev) => ({
                  ...prev,
                  current: !prev.current,
                }))
              }
              placeholder="••••••••"
              name="currentPassword"
            />

            {/* New Password */}
            <div>
              <PasswordInput
                label="New Password"
                value={form.newPassword}
                onChange={(val) => handleChange("newPassword", val)}
                onBlur={() => handleBlur("newPassword")}
                visible={visibility.new}
                setVisible={() =>
                  setVisibility((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
                placeholder="••••••••"
                name="newPassword"
              />

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
                    {passwordRequirements.map((req, i) => (
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
            <PasswordInput
              label="Confirm Password"
              value={form.confirmPassword}
              onChange={(val) => handleChange("confirmPassword", val)}
              onBlur={() => handleBlur("confirmPassword")}
              visible={visibility.confirm}
              setVisible={() =>
                setVisibility((prev) => ({
                  ...prev,
                  confirm: !prev.confirm,
                }))
              }
              placeholder="••••••••"
              name="confirmPassword"
            />

            {/* Submit Button */}
            <Button
              variant="premium"
              type="submit"
              disabled={loading}
              rounded="lg"
              className="w-full font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </div>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </motion.div>
        {process.env.NODE_ENV === "development" && (
          <motion.div
            className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
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
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <Button
                    variant="subtle"
                    onClick={item.onClick}
                    className="w-full md:w-auto"
                  >
                    {item.icon}
                    {item.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PasswordAndSecurity;
