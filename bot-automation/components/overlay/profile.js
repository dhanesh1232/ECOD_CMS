"use client";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import React, { useState, useEffect, useCallback } from "react";
import {
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiCheck,
  FiAlertCircle,
  FiClock,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import PasswordStrengthBar from "react-password-strength-bar";
import { validatePhoneNumber } from "@/hooks/validator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProfileCompletion = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [profileState, setProfileState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [country, setCountry] = useState("IN");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({});
  const [passwordScore, setPasswordScore] = useState(0);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [redirectCounter, setRedirectCounter] = useState(10);

  const { name, email, phone, password, confirmPassword } = profileState;

  useEffect(() => {
    if (session?.user) {
      const { name, email } = session.user;
      setProfileState((prev) => ({
        ...prev,
        name: name || "",
        email: email || "",
      }));
    }
  }, [session]);

  useEffect(() => {
    if (success) {
      setRedirectCounter(10);
      const timer = setInterval(() => {
        setRedirectCounter((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [success]);
  useEffect(() => {
    if (redirectCounter === 0) {
      const params = new URLSearchParams(searchParams);
      params.delete("model");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [redirectCounter, searchParams, pathname, router]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    const { valid, message } = validatePhoneNumber(phone, country);

    if (!valid) {
      newErrors.phone = message;
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (!/[A-Z]/.test(password)) {
        newErrors.password = newErrors.password
          ? `${newErrors.password}, include uppercase letter`
          : "Include at least one uppercase letter";
      }
      if (!/[0-9]/.test(password)) {
        newErrors.password = newErrors.password
          ? `${newErrors.password}, include number`
          : "Include at least one number";
      }
      if (!/[^A-Za-z0-9]/.test(password)) {
        newErrors.password = newErrors.password
          ? `${newErrors.password}, include special character`
          : "Include at least one special character";
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [confirmPassword, email, country, password, name, phone]);

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [profileState, validateForm, touched]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileState((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateForm();
    }
  };

  const handlePhoneChange = (value) => {
    setProfileState((prev) => ({ ...prev, phone: value }));
    if (touched.phone) {
      validateForm();
    }
  };

  const handleProfile = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });
    setShowAllErrors(true);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/profile/user-info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 400 && data.message.includes("Phone number")) {
          setErrors((prev) => ({ ...prev, phone: data.message }));
        } else {
          throw new Error(data.message || "Failed to update profile");
        }
        return;
      }
      setSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors((prev) => ({
        ...prev,
        form: error.message || "Failed to update profile. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (field) => {
    const baseClass =
      "w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 outline-none";
    const errorClass =
      touched[field] && errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-500"
        : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500";

    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 px-6 py-8 rounded-xl shadow-lg dark:shadow-gray-900/50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Complete Your Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Fill in your details to get started
          </p>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative bg-green-50 dark:bg-emerald-950/40 border-2 border-green-100 dark:border-emerald-900/80 p-4 rounded-xl mb-6 flex items-start gap-3 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#48bb7860_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,#05966940_0%,transparent_70%)]" />

            <div className="relative z-10 flex items-start gap-3 w-full">
              <div className="flex-shrink-0 p-2 bg-green-100 dark:bg-emerald-900/80 rounded-lg">
                <FiCheck className="text-2xl text-green-600 dark:text-emerald-400" />
              </div>

              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-emerald-100">
                    Profile Updated!
                  </h3>
                  <div className="text-xs text-green-600 dark:text-emerald-300 bg-green-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                    {session.user.name}
                  </div>
                </div>

                <p className="mt-1 text-sm text-green-700/90 dark:text-emerald-200/80">
                  {session.user.email}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  {/* Circular Progress Indicator */}
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        className="fill-none stroke-green-100 dark:stroke-emerald-900/50"
                        strokeWidth="4"
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="20"
                        className="fill-none stroke-green-500 dark:stroke-emerald-400"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{
                          strokeDasharray: 125.6,
                          strokeDashoffset: 125.6,
                        }}
                        animate={{
                          strokeDashoffset:
                            125.6 * (1 - (10 - redirectCounter) / 10),
                        }}
                        transition={{ duration: 1, ease: "linear" }}
                      />
                    </svg>

                    {/* Center Counter */}
                    <motion.span
                      key={redirectCounter}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 -left-2 flex items-center justify-center text-sm font-semibold text-green-700 dark:text-emerald-300"
                    >
                      {redirectCounter}
                    </motion.span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-sm text-green-700 dark:text-emerald-300">
                      <FiClock className="flex-shrink-0" />
                      <span>Redirecting in</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-emerald-300/80">
                      {`You'll be automatically redirected to the homepage`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleProfile} className="space-y-2">
            {errors.form && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg flex items-start gap-2"
              >
                <FiAlertCircle className="flex-shrink-0 mt-0.5" />
                <span>{errors.form}</span>
              </motion.div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FiUser />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  readOnly
                  disabled={true}
                  className={getInputClass("name")}
                />
              </div>
              {touched.name && errors.name && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                  <FiAlertCircle size={14} />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FiMail />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  readOnly
                  disabled={true}
                  className={getInputClass("email")}
                />
              </div>
              {touched.email && errors.email && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                  <FiAlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FiPhone />
                </div>
                <PhoneInput
                  id="phone"
                  name="phone"
                  international
                  required
                  defaultCountry="IN"
                  placeholder="+91 12345 67890"
                  countryCallingCodeEditable={false}
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={() => handleBlur("phone")}
                  className="w-full pl-5 sm:pl-10 custom-phone-input"
                />
              </div>
              {touched.phone && errors.phone && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                  <FiAlertCircle size={14} />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FiLock />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChange}
                  onBlur={() => handleBlur("password")}
                  placeholder="••••••••"
                  className={getInputClass("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex focus:outline-none focus:text-blue-600 items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <PasswordStrengthBar
                password={password}
                onChangeScore={setPasswordScore}
                className="mt-2"
                scoreWords={["Weak", "Weak", "Okay", "Good", "Strong"]}
                shortScoreWord="Too short"
              />

              <div className="mt-0 text-xs text-gray-500 dark:text-gray-400">
                <p className="mb-1">Password requirements:</p>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                  <li
                    className={`flex items-center ${
                      password.length >= 8 ? "text-green-500" : ""
                    }`}
                  >
                    <span className="mr-1">•</span>
                    Min 8 characters
                  </li>
                  <li
                    className={`flex items-center ${
                      /[A-Z]/.test(password) ? "text-green-500" : ""
                    }`}
                  >
                    <span className="mr-1">•</span>
                    Uppercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      /[0-9]/.test(password) ? "text-green-500" : ""
                    }`}
                  >
                    <span className="mr-1">•</span>
                    Number
                  </li>
                  <li
                    className={`flex items-center ${
                      /[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""
                    }`}
                  >
                    <span className="mr-1">•</span>
                    Special character
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FiLock />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder="••••••••"
                  className={getInputClass("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                  <FiAlertCircle size={14} />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={
                isSubmitting ||
                (showAllErrors && Object.keys(errors).length > 0)
              }
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Complete Profile"
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileCompletion;
