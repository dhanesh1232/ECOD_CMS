"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  FiEye,
  FiEyeOff,
  FiCheck,
  FiMail,
  FiLoader,
  FiArrowLeft,
  FiLock,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { usePasswordValidator } from "@/hooks/validator";

const PasswordRequirements = ({ getRequirementStatus }) => (
  <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
    {[
      { label: "minLength", text: "8+ characters" },
      { label: "uppercase", text: "Uppercase letter" },
      { label: "lowercase", text: "Lowercase letter" },
      { label: "number", text: "Number" },
      { label: "specialChar", text: "Special character" },
    ].map((req) => (
      <div key={req.label} className="flex items-center">
        <span
          className={`inline-flex items-center justify-center w-4 h-4 rounded-full mr-2 transition-colors ${
            getRequirementStatus(req.label)
              ? "bg-green-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-transparent"
          }`}
        >
          <FiCheck size={10} />
        </span>
        <span
          className={
            getRequirementStatus(req.label)
              ? "text-gray-700 dark:text-gray-300"
              : "text-gray-500 dark:text-gray-500"
          }
        >
          {req.text}
        </span>
      </div>
    ))}
  </div>
);

const PasswordStrengthMeter = ({ strength, percentage }) => {
  const strengthColors = {
    Empty: "bg-transparent",
    "Very Weak": "bg-red-500",
    Weak: "bg-orange-500",
    Good: "bg-blue-500",
    Strong: "bg-green-500",
  };

  return (
    <div className="mt-3">
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-2 rounded-full ${strengthColors[strength]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, type: "spring" }}
        />
      </div>
      <div className="flex justify-between items-center mt-1.5">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Password strength:
        </span>
        <span
          className={`text-xs font-medium ${
            strength === "Very Weak"
              ? "text-red-500"
              : strength === "Weak"
              ? "text-orange-500"
              : strength === "Good"
              ? "text-blue-500"
              : strength === "Strong"
              ? "text-green-500"
              : "text-gray-500"
          }`}
        >
          {strength}
        </span>
      </div>
    </div>
  );
};

const PasswordInputWithToggle = ({
  value,
  onChange,
  showPassword,
  onToggleVisibility,
  placeholder,
  label,
  required = false,
  className = "",
}) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-800 dark:text-white pr-10 transition-all"
        required={required}
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      )}
    </div>
  </div>
);

const OTPInput = ({ value, onChange }) => {
  const inputs = Array(6).fill(0);

  const handleChange = (e, index) => {
    const newValue = e.target.value.replace(/\D/g, "");
    if (newValue.length <= 1) {
      const newOtp = value.split("");
      newOtp[index] = newValue;
      onChange(newOtp.join(""));

      // Auto focus next input
      if (newValue && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 mb-2">
      {inputs.map((_, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-xl border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-800 dark:text-white"
          inputMode="numeric"
          pattern="[0-9]*"
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

const ChangePassword = () => {
  const { data: session } = useSession();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("setPassword");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { passwordStrength, getRequirementStatus, updatePassword } =
    usePasswordValidator({
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumber: true,
      requireSpecialChar: true,
    });

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const validatePassword = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    return true;
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword()) return;

    setLoading(true);
    try {
      await sendOtp();
      setStep("verifyEmail");
      setCountdown(30);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to send OTP");
    }

    setOtpSent(true);
    setSuccessMessage("OTP sent to your email!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const verifyOtpAndSetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length < 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp-and-set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          otp,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setOtpVerified(true);
      setSuccessMessage("Password changed successfully!");
    } catch (err) {
      setError(err.message || "Failed to verify OTP and set password");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (countdown > 0) return;

    setLoading(true);
    setError("");
    try {
      await sendOtp();
      setCountdown(30);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50">
      <AnimatePresence mode="wait">
        {step === "setPassword" ? (
          <motion.div
            key="setPassword"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <FiLock size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Set New Password
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create a strong, unique password
                </p>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start gap-2"
              >
                <span className="mt-0.5">⚠️</span>
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSetPassword}>
              <div className="space-y-4">
                <PasswordInputWithToggle
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    updatePassword(value);
                  }}
                  showPassword={showNewPassword}
                  onToggleVisibility={() =>
                    setShowNewPassword(!showNewPassword)
                  }
                  placeholder="At least 8 characters"
                  label="New Password"
                  required
                />

                <PasswordStrengthMeter
                  strength={passwordStrength.strength}
                  percentage={passwordStrength.percentage}
                />
                <PasswordRequirements
                  getRequirementStatus={getRequirementStatus}
                />

                <PasswordInputWithToggle
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  showPassword={showConfirmPassword}
                  onToggleVisibility={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  placeholder="Re-enter your password"
                  label="Confirm Password"
                  required
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={loading || passwordStrength.strength === "Empty"}
                  className="px-5 py-2.5 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" size={16} />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <FiMail size={16} />
                      Continue
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="verifyEmail"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setStep("setPassword")}
              className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
            >
              <FiArrowLeft size={16} />
              Back to password
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <FiMail size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Verify Your Email
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter the 6-digit code sent to {session?.user?.email}
                </p>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start gap-2"
              >
                <span className="mt-0.5">⚠️</span>
                <span>{error}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-start gap-2"
              >
                <span className="mt-0.5">✓</span>
                <span>{successMessage}</span>
              </motion.div>
            )}

            {otpVerified ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 text-center"
              >
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <FiCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Password Updated!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your password has been successfully changed.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={verifyOtpAndSetPassword}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Verification Code
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <OTPInput value={otp} onChange={setOtp} />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                    {countdown > 0
                      ? `Request new code in ${countdown} seconds`
                      : "Didn't receive a code?"}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={loading || countdown > 0}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Sending..."
                      : countdown > 0
                      ? `Resend in ${countdown}s`
                      : "Resend Code"}
                  </button>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="px-5 py-2.5 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <FiLoader className="animate-spin" size={16} />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <FiCheck size={16} />
                        Confirm
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChangePassword;
