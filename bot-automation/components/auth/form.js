"use client";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";
import { signIn } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Logo from "../logo";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiLock,
  FiUser,
  FiArrowRight,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";
import { decryptData } from "@/utils/encryption";
import { useToast } from "../ui/toast-provider";
import { FaWhatsapp } from "react-icons/fa";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
const AIFormWrapper = dynamic(() => import("./wrapper"));
// Enhanced data-driven configuration
const FORM_CONFIG = {
  tabs: [
    {
      id: "EMAIL",
      label: "Email",
      icon: <FiMail className="mr-2" />,
      fields: ["email", "password"],
    },
    {
      id: "PHONE",
      label: "Phone",
      icon: <FiPhone className="mr-2" />,
      fields: ["phone", "password"],
    },
  ],
  pages: {
    login: {
      title: "Welcome Back",
      subtitle: "Sign in to continue to your account",
      fields: ["tabs", "remember", "forgotPassword"],
      successMessage: "You have successfully logged in",
    },
    register: {
      title: "Create Account",
      subtitle: "Get started with your free account",
      fields: ["name", "email", "phone", "password", "terms"],
      successMessage:
        "We have sent a confirmation email, please verify your email address",
    },
    "forgot-password": {
      title: "Reset Password",
      subtitle: "Enter your email to reset your password",
      fields: ["email"],
      successMessage: "Password reset link has been sent to your email",
    },
    "reset-password": {
      title: "Set New Password",
      subtitle: "Create a new password for your account",
      fields: ["password", "confirmPassword"],
    },
  },
  fieldConfig: {
    name: {
      type: "text",
      label: "Full Name*",
      placeholder: "John Doe",
      icon: <FiUser />,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s'-]+$/,
      },
      errorMessages: {
        required: "Name is required",
        minLength: "Name must be at least 2 characters",
        maxLength: "Name must be less than 50 characters",
        pattern: "Name contains invalid characters",
      },
    },
    email: {
      type: "email",
      label: "Email Address*",
      placeholder: "you@example.com",
      icon: <FiMail />,
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      errorMessages: {
        required: "Email is required",
        pattern: "Please enter a valid email address",
      },
    },
    phone: {
      type: "phone",
      label: "Phone Number*",
      placeholder: "+91 12345 67890",
      icon: <FiPhone />,
      validation: {
        required: true,
      },
      errorMessages: {
        required: "Phone number is required",
      },
    },
    password: {
      type: "password",
      label: "Password*",
      placeholder: "••••••••",
      icon: <FiLock />,
      validation: {
        required: true,
        minLength: 8,
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      },
      helpText:
        "Must be at least 8 characters with uppercase, lowercase, number and special character",
      errorMessages: {
        required: "Password is required",
        minLength: "Password must be at least 8 characters",
        pattern:
          "Password must contain uppercase, lowercase, number and special character",
      },
    },
    confirmPassword: {
      type: "password",
      label: "Confirm Password*",
      placeholder: "••••••••",
      icon: <FiLock />,
      validation: {
        required: true,
        match: "password",
      },
      errorMessages: {
        required: "Please confirm your password",
        match: "Passwords do not match",
      },
    },
    remember: {
      type: "checkbox",
      label: "Remember me",
    },
    terms: {
      type: "checkbox",
      label: (
        <>
          I agree to the{" "}
          <button
            type="button"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.open("/terms", "_blank");
            }}
          >
            Terms
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.open("/privacy", "_blank");
            }}
          >
            Privacy
          </button>
        </>
      ),
      validation: {
        required: true,
      },
      errorMessages: {
        required: "You must accept the terms and privacy policy",
      },
    },
    forgotPassword: {
      type: "link",
      label: "Forgot password?",
      action: "/auth/forgot-password",
    },
  },
  socialProviders: [
    {
      id: "google",
      name: "Google",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
      ),
    },
  ],
};

const inputVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const successVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FormComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageKey = pathname.split("/").pop() || "login";
  const pageConfig = FORM_CONFIG.pages[pageKey] || FORM_CONFIG.pages.login;
  const errorParam = searchParams.get("error");
  const [touchedFields, setTouchedFields] = useState({});
  const showToast = useToast();
  const toastRef = useRef(false);
  const [activeTab, setActiveTab] = useState(FORM_CONFIG.tabs[0].id);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    remember: true,
    terms: false,
    showPassword: false,
    showConfirmPassword: false,
    registered: false,
    isSendForgot: false,
    isPasswordReset: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [count, setCount] = useState(5);
  const [verify, setVerify] = useState({
    token: "",
    email: "",
  });
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  });
  useEffect(() => {
    if (formState.isPasswordReset) {
      setCount(5);
      const timer = setInterval(() => {
        setCount((prev) => Math.max(prev - 1, 0));
      });
      return () => clearInterval(timer);
    }
  }, [formState.isPasswordReset]);

  useEffect(() => {
    if (formState.isPasswordReset) {
      if (count === 0) {
        setFormState((prev) => ({ ...prev, isPasswordReset: false }));
        router.push("/auth/login");
      }
    }
  }, [router, count, formState.isPasswordReset]);

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    if (token && email) {
      const enCode = decryptData(decodeURIComponent(token));
      const enMail = decryptData(decodeURIComponent(email));
      if ((enCode, enMail)) {
        setVerify({
          token: enCode,
          email: enMail,
        });
      }
    }
  }, [searchParams]);

  // Handle error from query params
  useEffect(() => {
    if (errorParam) {
      if (!toastRef.current) {
        showToast({
          variant: "destructive",
          description:
            errorParam === "CredentialsSignin"
              ? "Invalid email or password"
              : errorParam,
        });
        toastRef.current = true;
      }
    }
  }, [errorParam, showToast]);

  const handleClickOpenGmail = () => {
    console.log(navigator);
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

    const fallbackToWebGmail = () => {
      window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
    };

    try {
      if (isMobile || isAndroid || isIOS) {
        const timeout = setTimeout(() => {
          fallbackToWebGmail();
        }, 8000); // If app doesn't open within 800ms, fallback
        // Try opening Gmail app
        const now = new Date().getTime();
        window.location.href = "googlegmail://";
        // Optional: prevent fallback if user leaves the page (app opened)
        window.onblur = () => clearTimeout(timeout);
      } else {
        // Desktop
        fallbackToWebGmail();
      }
    } catch (error) {
      console.error("Error opening Gmail app:", error);
      fallbackToWebGmail();
    }
  };

  const validateField = useCallback(
    (name, value, formValues = formState) => {
      // Only validate register fields strictly
      if (pageKey !== "register") {
        const fieldConfig = FORM_CONFIG.fieldConfig[name];
        if (!fieldConfig?.validation) return "";

        // For login, only validate required fields
        if (fieldConfig.validation.required && !value) {
          return (
            fieldConfig.errorMessages?.required || "This field is required"
          );
        }
        return "";
      }

      // Strict validation for register fields
      const fieldConfig = FORM_CONFIG.fieldConfig[name];
      if (!fieldConfig?.validation) return "";

      const { required, minLength, maxLength, pattern, match } =
        fieldConfig.validation;

      if (required && !value) {
        return fieldConfig.errorMessages?.required || "This field is required";
      }
      if (minLength && value.length < minLength) {
        return (
          fieldConfig.errorMessages?.minLength ||
          `Must be at least ${minLength} characters`
        );
      }
      if (maxLength && value.length > maxLength) {
        return (
          fieldConfig.errorMessages?.maxLength ||
          `Must be less than ${maxLength} characters`
        );
      }
      if (pattern && !pattern.test(value)) {
        return fieldConfig.errorMessages?.pattern || "Invalid format";
      }
      if (match && value !== formValues[match]) {
        return fieldConfig.errorMessages?.match || "Values do not match";
      }

      return "";
    },
    [formState, pageKey]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormState((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    // Validate on change
    if (FORM_CONFIG.fieldConfig[name]?.validation) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: validateField(name, newValue),
      }));
    }
  };

  const validateForm = useCallback(() => {
    const errors = {};
    let isValid = true;

    // Validate all fields based on current page
    pageConfig.fields.forEach((field) => {
      if (field === "tabs") {
        FORM_CONFIG.tabs.forEach((tab) => {
          tab.fields.forEach((tabField) => {
            if (activeTab === tab.id || tabField === "password") {
              const error = validateField(tabField, formState[tabField]);
              if (error) {
                errors[tabField] = error;
                isValid = false;
              }
            }
          });
        });
      } else {
        const error = validateField(field, formState[field]);
        if (error) {
          errors[field] = error;
          isValid = false;
        }
      }
    });

    setFormErrors(errors);
    return isValid;
  }, [pageConfig.fields, activeTab, formState, validateField]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (pageKey === "login") {
        try {
          // Prepare credentials
          const credentials = {
            password: formState.password,
            remember: formState.remember,
            redirect: false,
            callbackUrl: `/`,
          };
          // Add email or phone based on active tab
          if (activeTab === "EMAIL") {
            credentials.email = formState.email;
          } else {
            credentials.phone = formState.phone;
          }
          // Perform the sign-in attempt
          const result = await signIn("credentials", credentials);
          if (result?.error) {
            // Handle errors returned from signIn
            let errorMessage = "Invalid credentials. Please try again.";
            if (result.error === "CredentialsSignin") {
              errorMessage =
                "Invalid email/phone or password. Please check your input's, register please you don't have account";
            } else if (result.error === "TooManyRequests") {
              errorMessage = "Too many login attempts. Please try again later.";
            }
            if (!toastRef.current) {
              showToast({
                description: errorMessage,
                variant: "warning",
              });
              toastRef.current = true;
            }
          } else {
            router.push(`/`);
          }
        } catch (error) {
          // Log any unexpected errors and display a generic error message
          console.error("Login Error:", error);
          if (!toastRef.current) {
            showToast({
              description: "An unexpected error occurred. Please try again.",
              variant: "warning",
            });
            toastRef.current = true;
          }
        }
      } else if (pageKey === "register") {
        const { phone, email, name, password, terms } = formState;

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, email, name, password, terms }),
        });
        const data = await res.json();
        if (!res.ok) {
          if (!toastRef.current) {
            showToast({
              description: data.message || data.errors || "Please try again",
              variant: "warning",
            });
            toastRef.current = true;
          }
        } else {
          if (!toastRef.current) {
            showToast({
              title: "Registration successful",
              description:
                "We have sent a confirmation email, please verify your email address",
              variant: "success",
            });
            toastRef.current = true;
          }
          setFormState((prev) => ({
            ...prev,
            registered: true,
          }));
        }
      } else if (pageKey === "forgot-password") {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formState.email }),
        });

        const data = await res.json();
        if (res.status && !res.ok) {
          if (!toastRef.current) {
            showToast({
              description: data.message || "Failed to send reset link",
              variant: "destructive",
            });
            toastRef.current = true;
          }
        } else {
          setFormState((prev) => ({
            ...prev,
            isSendForgot: true,
          }));
        }
      } else if (pageKey === "reset-password") {
        const { token, email } = verify;
        if (!token || !email) {
          if (!toastRef.current) {
            showToast({
              title: "Invalid",
              description: "Invalid password reset link",
              variant: "destructive",
            });
            toastRef.current = true;
          }

          return;
        }

        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            email,
            password: formState.password,
          }),
        });

        const data = await res.json();
        if (res.status && !res.ok) {
          if (!toastRef.current) {
            showToast({
              description: data.message || "Failed to reset password",
              variant: "destructive",
            });
            toastRef.current = true;
          }
        } else {
          setFormState((prev) => ({
            ...prev,
            isPasswordReset: true,
          }));
        }
      }
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          description: err.message,
          variant: "warning",
        });
        toastRef.current = true;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (field) => {
    const fieldConfig = FORM_CONFIG.fieldConfig[field];
    if (!fieldConfig) return null;

    const { type, label, placeholder, icon, helpText } = fieldConfig;
    const value = formState[field];
    const error = formErrors[field];
    const touched = touchedFields[field];

    const showError = pageKey === "register" ? error : touched && error;

    if (type === "checkbox") {
      return (
        <div key={label}>
          <div className="flex items-start pt-1">
            <div className="flex items-center h-3 w-3 sm:h-4 sm:w-4">
              <input
                id={field}
                name={field}
                type="checkbox"
                checked={value}
                required={fieldConfig.validation?.required}
                onChange={handleChange}
                className="h-3 w-3 sm:h-4 sm:w-4 rounded dark:border-gray-600 border-gray-300 dark:bg-gray-700 bg-gray-100 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900"
              />
            </div>
            <div className="ml-2 text-xs sm:text-sm">
              <Label
                htmlFor={field}
                className="dark:text-gray-300 text-gray-700"
              >
                {label}
              </Label>
            </div>
          </div>
          {showError && (
            <p className="text-xs text-red-500 dark:text-red-400 mt-1">
              {error}
            </p>
          )}
        </div>
      );
    }

    if (type === "link") {
      return (
        <button
          type="button"
          onClick={() => router.push(fieldConfig.action)}
          className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
        >
          {label}
        </button>
      );
    }

    if (type === "phone") {
      return (
        <div className="space-y-1" key={label}>
          <Label
            htmlFor={field}
            className="text-sm font-medium dark:text-gray-300 text-gray-700"
          >
            {label}
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 pointer-events-none">
              {React.cloneElement(icon, {
                className:
                  "text-gray-400 group-focus-within:text-blue-500 transition-colors",
              })}
            </div>
            <PhoneInput
              id={field}
              name={field}
              international
              required
              defaultCountry="IN"
              placeholder={placeholder}
              value={value}
              onChange={(value) => {
                setFormState((prev) => ({ ...prev, [field]: value }));
                setFormErrors((prev) => ({
                  ...prev,
                  [field]: validateField(field, value),
                }));
              }}
              className="custom-phone-input flex items-center sm:pl-10 pl-5"
            />
          </div>
          {pageKey === "register" && (
            <span className="text-xs flex items-center gap-1 text-gray-800 dark:text-gray-200">
              <FaWhatsapp size={12} color="green" className="mb-1" />
              Please use whatsapp number for feature updates
            </span>
          )}
          {error && (
            <p className="text-xs text-red-500 dark:text-red-400 mt-1">
              {error}
            </p>
          )}
        </div>
      );
    }

    const isPassword = field === "password" || field === "confirmPassword";
    const showPassword =
      field === "password"
        ? formState.showPassword
        : formState.showConfirmPassword;

    return (
      <div className="space-y-1" key={label}>
        <Label
          htmlFor={field}
          className="text-sm font-medium dark:text-gray-300 text-gray-700"
        >
          {label}
        </Label>
        <div className="relative group">
          {icon && (
            <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {React.cloneElement(icon, {
                className:
                  "text-gray-400 group-focus-within:text-blue-500 transition-colors",
              })}
            </div>
          )}
          <Input
            type={isPassword && !showPassword ? "password" : "text"}
            id={field}
            name={field}
            value={value}
            onChange={handleChange}
            required={fieldConfig.validation?.required}
            placeholder={placeholder}
            className={`w-full ${
              icon ? "pl-10" : "pl-4"
            } pr-4 py-2.5 text-sm dark:bg-gray-900 bg-white dark:text-white text-gray-900 border ${
              showError
                ? "border-red-500 dark:border-red-500"
                : "dark:border-gray-700 border-gray-200"
            } rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all`}
          />
          {isPassword && value && (
            <Button
              variant="ghost"
              type="button"
              className="absolute inset-y-0 outline-none focus:outline-none right-0 focus:text-blue-600 flex items-center pr-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-200 transition-colors"
              onClick={() =>
                setFormState((prev) => ({
                  ...prev,
                  [field === "password"
                    ? "showPassword"
                    : "showConfirmPassword"]:
                    !prev[
                      field === "password"
                        ? "showPassword"
                        : "showConfirmPassword"
                    ],
                }))
              }
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </Button>
          )}
        </div>
        {helpText && !showError && pageKey === "register" && (
          <p className="text-[10px] sm:text-xs dark:text-gray-400 text-gray-500 mt-1">
            {helpText}
          </p>
        )}
        {showError && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-1">{error}</p>
        )}
      </div>
    );
  };

  const renderInputFields = () => {
    return (
      <div className="space-y-2">
        {pageConfig.fields.includes("tabs") && (
          <>
            <div className="flex relative items-center justify-center gap-2 w-full mt-3 p-1 dark:bg-gray-800 bg-gray-100 rounded-xl">
              <AnimatePresence initial={false}>
                <motion.div
                  layout
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    left: `${
                      (FORM_CONFIG.tabs.findIndex((t) => t.id === activeTab) *
                        100) /
                      FORM_CONFIG.tabs.length
                    }%`,
                    width: `${100 / FORM_CONFIG.tabs.length}%`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute inset-1 dark:bg-gray-900 bg-white rounded-lg shadow-sm" />
                </motion.div>
              </AnimatePresence>

              {FORM_CONFIG.tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  type="button"
                  className={`relative flex items-center justify-center flex-1 py-2 px-4 rounded-lg z-10 ${
                    activeTab === tab.id
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.span
                    className="flex items-center justify-center gap-1.5"
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {tab.icon}
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tab.label}
                    </motion.span>
                  </motion.span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={inputVariants}
                transition={{ duration: 0.2 }}
                className="space-y-4 mt-4"
              >
                {FORM_CONFIG.tabs
                  .find((tab) => tab.id === activeTab)
                  ?.fields.map((field) => renderField(field))}

                {pageConfig.fields.includes("remember") && (
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center">
                      {renderField("remember")}
                    </div>
                    {pageConfig.fields.includes("forgotPassword") &&
                      renderField("forgotPassword")}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {!pageConfig.fields.includes("tabs") &&
          pageConfig.fields.map((field) => renderField(field))}
      </div>
    );
  };

  if (!isMounted) {
    return (
      <AIFormWrapper>
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 sm:px-0">
          <div className="w-full h-12 dark:bg-gray-800 bg-gray-200 rounded-lg mb-4 animate-pulse" />
          <div className="w-full space-y-4">
            <div className="h-16 dark:bg-gray-800 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-16 dark:bg-gray-800 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-12 dark:bg-gray-800 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </AIFormWrapper>
    );
  }

  const getButtonText = () => {
    switch (pageKey) {
      case "login":
        return "Sign In";
      case "register":
        return "Create Account";
      case "forgot-password":
        return "Send Reset Link";
      case "reset-password":
        return "Reset Password";
      default:
        return "Continue";
    }
  };

  // Render success states
  if (
    (pageKey === "register" && formState.registered) ||
    (pageKey === "forgot-password" && formState.isSendForgot) ||
    (pageKey === "reset-password" && formState.isPasswordReset)
  ) {
    return (
      <AIFormWrapper>
        <div className="flex flex-col  items-center justify-center w-full max-w-md mx-auto px-2 sm:px-0">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="my-1 flex items-center gap-1"
          >
            <Logo />
          </motion.div>

          {/* Success Message */}
          <motion.div
            className="w-full text-center p-6 rounded-lg dark:bg-gray-800/50 bg-gray-50 border dark:border-gray-700 border-gray-200"
            initial="hidden"
            animate="visible"
            variants={successVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center justify-center">
              <FiCheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h2 className="text-xl font-bold dark:text-white text-gray-800 mb-2">
                {pageKey === "register"
                  ? "Registration Successful!"
                  : pageKey === "forgot-password"
                  ? "Reset Link Sent!"
                  : "Password Reset Successful!"}
              </h2>
              <p className="dark:text-gray-300 text-gray-600 mb-6">
                {pageConfig.successMessage}
              </p>
              {pageKey === "register" && (
                <p className="text-sm dark:text-gray-400 text-gray-500">
                  {`Didn't receive the email?`}{" "}
                  <button
                    type="button"
                    onClick={async () => {
                      const res = await fetch("/api/auth/register", {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email: formState.email,
                        }),
                      });
                      console.log(res);
                      if (res.ok) {
                        if (!toastRef.current) {
                          showToast({
                            title: "Confirmation email sent",
                            description:
                              "Please check your inbox and spam folder.",
                            variant: "success",
                          });
                          toastRef.current = true;
                        }
                      } else {
                        if (!toastRef.current) {
                          showToast({
                            title: "Error",
                            description: "Failed to resend confirmation email.",
                            variant: "warning",
                          });
                          toastRef.current = true;
                        }
                      }
                    }}
                    className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                  >
                    Resend confirmation
                  </button>
                </p>
              )}
              {((pageKey === "register" && formState.registered) ||
                (pageKey === "forgot-password" && formState.isSendForgot)) && (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClickOpenGmail}
                  className="flex items-center w-full mt-4 justify-center py-1.5 px-4 gap-2 dark:bg-gray-800 bg-gray-100 dark:text-gray-300 text-gray-700 rounded-lg transition-all hover:shadow-md dark:hover:bg-gray-700 hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#4caf50"
                      d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
                    ></path>
                    <path
                      fill="#1e88e5"
                      d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
                    ></path>
                    <polygon
                      fill="#e53935"
                      points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
                    ></polygon>
                    <path
                      fill="#c62828"
                      d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
                    ></path>
                    <path
                      fill="#fbc02d"
                      d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
                    ></path>
                  </svg>
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Footer Navigation */}
          <motion.div
            className="text-center text-sm dark:text-gray-400 text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {pageKey === "register" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/auth/login")}
                  className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  Sign in
                </button>
              </>
            ) : (
              pageKey === "forgot-password" && (
                <>
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/auth/login")}
                    className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                  >
                    Sign in
                  </button>
                </>
              )
            )}
          </motion.div>
        </div>
      </AIFormWrapper>
    );
  }

  return (
    <AIFormWrapper>
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-2 sm:px-0">
        {/* Back button for forgot password */}
        {pageKey === "forgot-password" && (
          <button
            onClick={() => router.push("/auth/login")}
            className="flex items-center my-3 self-start text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FiArrowLeft className="mr-1" />
            <span className="hover:underline underline-offset-1 capitalize">
              Back to login
            </span>
          </button>
        )}

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="my-1"
        >
          <Logo />
        </motion.div>

        {/* Title and Subtitle */}
        <div className="text-center mb-1">
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {pageConfig.title}
          </motion.h2>
          <motion.p
            className="dark:text-gray-400 text-gray-500 text-xs sm:text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {pageConfig.subtitle}
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {renderInputFields()}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 group"
              variant="premium"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                </>
              ) : (
                <>
                  {getButtonText()}
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>

        {/* Alternative Auth Options */}
        {(pageKey === "login" || pageKey === "register") && (
          <>
            <motion.div
              className="w-full relative my-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t dark:border-gray-600/50 border-gray-300/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 dark:bg-gray-900 bg-white dark:text-gray-400 text-gray-500">
                  Or continue with
                </span>
              </div>
            </motion.div>

            <motion.div
              className="w-full grid grid-cols-1 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {FORM_CONFIG.socialProviders.map((provider) => (
                <motion.button
                  key={provider.id}
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: `/`,
                      redirect: false,
                    })
                  }
                  className="flex items-center justify-center py-2.5 px-4 gap-2 dark:bg-gray-800 bg-gray-100 dark:text-gray-300 text-gray-700 rounded-lg transition-all hover:shadow-md dark:hover:bg-gray-700 hover:bg-gray-200"
                  aria-label={`Sign in with ${provider.name}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {provider.icon}
                  <span className="text-sm">{provider.name}</span>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
        {pageKey === "forgot-password" && (
          <span className="flex mt-2 text-sm items-center gap-1 text-gray-950 dark:text-gray-50">
            Remember password{" "}
            <Link
              href="/auth/login"
              className="hover:underline underline-offset-1 text-blue-400 hover:text-blue-600"
            >
              Login
            </Link>
          </span>
        )}
        {/* Footer Navigation */}
        {pageKey !== "forgot-password" && (
          <motion.div
            className="text-center text-sm dark:text-gray-400 text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {pageKey === "login" ? (
              <>
                {`Don't have an account?`}{" "}
                <button
                  type="button"
                  onClick={() => router.push("/auth/register")}
                  className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/auth/login")}
                  className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </AIFormWrapper>
  );
}
