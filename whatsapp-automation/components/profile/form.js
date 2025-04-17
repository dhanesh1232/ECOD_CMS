"use client";

import { usePathname, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import Logo from "../logo";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MoveLeft, Eye, EyeOff, Loader2, Check } from "lucide-react";
// Custom hook for password validation
import { usePasswordValidator } from "@/hooks/validator";

// Enhanced reusable components
const ErrorText = ({ message, action }) => (
  <div className="flex flex-col">
    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{message}</p>
    {action && (
      <button
        onClick={action.handler}
        className="mt-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        {action.label}
      </button>
    )}
  </div>
);

const SuccessText = ({ message }) => (
  <p className="text-green-600 dark:text-green-400 text-sm mt-1">{message}</p>
);

const PasswordInput = ({
  value,
  onChange,
  showPassword,
  toggleVisibility,
  placeholder,
  id,
  error,
}) => (
  <div className="relative">
    <input
      id={id}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      className={`w-full p-2 pr-10 border rounded-md outline-none ring-0 focus:outline-none focus:ring-2 ease-in-out transition duration-150 ${
        error
          ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-400"
          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      }`}
      placeholder={placeholder}
    />
    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
      onClick={toggleVisibility}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
);

const OTPInput = ({
  otp,
  handleOptChange,
  handleOtpKeyDown,
  inputRefs,
  error,
}) => (
  <div className="space-y-2">
    <div className="flex justify-between gap-2">
      {otp.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength="1"
          ref={(el) => (inputRefs.current[idx] = el)}
          value={digit}
          onChange={(e) => handleOptChange("emailOtp", e.target.value, idx)}
          onKeyDown={(e) => handleOtpKeyDown("emailOtp", e, idx)}
          className={`w-10 h-12 text-center text-lg border rounded-md outline-none ring-0 focus:ring-2 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-white ${
            error
              ? "border-red-500"
              : "dark:border-gray-600 focus:ring-blue-500"
          }`}
          aria-label={`OTP digit ${idx + 1}`}
        />
      ))}
    </div>
    {error && <ErrorText message={error} />}
  </div>
);

const PasswordRequirements = ({ getRequirementStatus }) => (
  <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
    {[
      { label: "minLength", text: "8+ characters" },
      { label: "uppercase", text: "Uppercase letter" },
      { label: "lowercase", text: "Lowercase letter" },
      { label: "number", text: "Number" },
      { label: "specialChar", text: "Special character" },
    ].map((req) => (
      <div key={req.label} className="flex items-center">
        <span
          className={`inline-block w-2 h-2 rounded-full mr-1 ${
            getRequirementStatus(req.label)
              ? "bg-green-500"
              : "bg-gray-300 dark:bg-gray-600"
          }`}
        />
        <span
          className={
            getRequirementStatus(req.label)
              ? "text-gray-600 dark:text-gray-300"
              : "text-gray-400 dark:text-gray-500"
          }
        >
          {req.text}
        </span>
      </div>
    ))}
  </div>
);

const PasswordStrengthMeter = ({ strength, percentage }) => (
  <div className="mt-2">
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
      <div
        className={`h-1.5 rounded-full transition-all duration-300 ${
          strength === "Empty"
            ? "bg-transparent"
            : strength === "Very Weak"
            ? "bg-red-500"
            : strength === "Weak"
            ? "bg-yellow-500"
            : strength === "Good"
            ? "bg-blue-500"
            : "bg-green-500"
        }`}
        style={{ width: `${percentage}%` }}
      />
    </div>
    <div className="flex justify-between items-center mt-1">
      <span className="text-xs text-gray-500 dark:text-gray-400">
        Strength: <span className="font-medium">{strength}</span>
      </span>
    </div>
  </div>
);

const SuccessScreen = ({ message, countdown, onManualRedirect }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-md bg-white dark:bg-gray-800 text-center"
  >
    <div className="mb-6 flex justify-center">
      <div className="relative">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
          <Check className="h-12 w-12 text-green-500 dark:text-green-400" />
        </div>
        <svg
          className="absolute inset-0 w-20 h-20 transform -rotate-90 ease-in-out"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-green-500 dark:text-green-400"
            strokeDasharray="62.8"
            strokeDashoffset={62.8 - (62.8 * (5 - countdown)) / 5}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
      Success!
    </h1>
    <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
    <div className="text-sm text-gray-500 dark:text-gray-400">
      Redirecting in{" "}
      <span className="font-medium text-green-600 dark:text-green-400">
        {countdown}s
      </span>
    </div>
    <button
      onClick={onManualRedirect}
      className="mt-6 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors text-sm font-medium"
    >
      Go Now
    </button>
  </motion.div>
);

const FormPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: status, session } = useSession();
  const [isMount, setIsMount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState({ text: "", type: "" });
  const [countdown, setCountdown] = useState(0);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    emailOtp: Array(6).fill(""),
    emailCode: "",
    emailVerified: false,
    showPassword: false,
    showNewPassword: false,
    showConfirmNewPassword: false,
    rememberMe: false,
    forgotStep: 1,
    registerStep: 1,
    countdown: 5,
    success_message: "",
  });

  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    emailOtp: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const inputRefs = useRef([]);

  // Use the password validator hook
  const { passwordStrength, getRequirementStatus, updatePassword } =
    usePasswordValidator({
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumber: true,
      requireSpecialChar: true,
    });

  const startCountdown = () => {
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  // Check session status and redirect if authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    setIsMount(true);
    inputRefs.current = Array(6)
      .fill()
      .map((_, i) => inputRefs.current[i] || null);
  }, []);

  // Replace the useEffect for countdown with this:
  useEffect(() => {
    let timer;
    if (
      (pathname === "/auth/forgot-password" && state.forgotStep === 4) ||
      (pathname === "/auth/register" && state.success_message)
    ) {
      timer = setInterval(() => {
        setState((prev) => {
          if (prev.countdown < 1) {
            clearInterval(timer);
            return { ...prev, countdown: 5 };
          }
          return { ...prev, countdown: prev.countdown - 1 };
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [state.forgotStep, state.success_message, pathname]);

  // Add another useEffect to handle the actual navigation
  useEffect(() => {
    if (
      state.countdown === 0 &&
      ((pathname === "/auth/forgot-password" && state.forgotStep === 4) ||
        (pathname === "/auth/register" && state.success_message))
    ) {
      router.push("/auth/login");
    }
  }, [
    state.countdown,
    state.forgotStep,
    state.success_message,
    pathname,
    router,
  ]);

  // ================= Validation functions ====================
  const validateName = useCallback((name) => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
    return "";
  }, []);

  const validateEmail = useCallback((email) => {
    if (!email) return "Email is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return "Invalid email address";
    }
    return "";
  }, []);

  const validatePassword = useCallback((password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Include at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Include at least one number";
    if (!/[^A-Za-z0-9]/.test(password))
      return "Include at least one special character";
    return "";
  }, []);

  const validateConfirmPassword = useCallback((password, confirmPassword) => {
    if (!confirmPassword) return "Please confirm your password";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  }, []);

  const validateOTP = useCallback(
    (otp) => {
      if (otp.some((digit) => !digit)) return "Please complete the OTP";
      const enteredOtp = otp.join("");
      if (enteredOtp !== state.emailCode) return "Invalid verification code";
      return "";
    },
    [state.emailCode]
  );

  // ================= Handlers ==========================
  const handleOptChange = useCallback(
    (field, value, index) => {
      if (!/^\d?$/.test(value)) return;
      const newOtp = [...state[field]];
      newOtp[index] = value;
      setState((prev) => ({ ...prev, [field]: newOtp }));
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [state]
  );

  const handleOtpKeyDown = useCallback(
    (field, e, index) => {
      if (e.key === "Backspace" && !state[field][index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [state]
  );

  const handlePasswordChange = useCallback(
    (e) => {
      const value = e.target.value;
      setState((prev) => ({ ...prev, newPassword: value }));
      updatePassword(value);
    },
    [updatePassword]
  );

  const handlePreviousStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      forgotStep: Math.max(1, prev.forgotStep - 1),
    }));
  }, []);

  // ==================== Google SignIn ====================
  // Enhanced Google Sign-In handler
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        setAuthMessage({
          text:
            result.error === "OAuthAccountNotLinked"
              ? "This email is already registered with a different method. Please login with your email and password."
              : "Failed to sign in with Google",
          type: "error",
        });
      }
    } catch (error) {
      setAuthMessage({
        text: "Failed to sign in with Google",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced login handler
  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          rememberMe: state.rememberMe,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.isOAuthUser) {
          return setAuthMessage({
            text: data.message,
            type: "error",
            action: {
              label: "Sign in with Google",
              handler: handleGoogleLogin,
            },
          });
        }
        throw new Error(data.message || "Login failed");
      }

      // Sign in with credentials through NextAuth
      const result = await signIn("credentials", {
        redirect: false,
        email: state.email,
        password: state.password,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // If no error and URL is provided, redirect
      if (result?.url) {
        router.push(result.url);
      } else {
        // Fallback redirect
        router.push("/dashboard");
      }
    } catch (error) {
      setAuthMessage({
        text: error.message || "Login failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [state.email, state.password, state.rememberMe, router]);

  const handleRegister = useCallback(async () => {
    setIsLoading(true);
    try {
      let errors = {};
      let shouldReturn = false;

      if (state.registerStep === 1) {
        // Step 1: Validate form fields and send OTP
        const nameError = validateName(state.name);
        const emailError = validateEmail(state.email);
        const passwordError = validatePassword(state.password);

        if (nameError || emailError || passwordError) {
          errors = {
            name: nameError,
            email: emailError,
            password: passwordError,
          };
          shouldReturn = true;
        } else {
          // Send OTP to email
          const res = await fetch("/api/auth/verification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: state.email,
              name: state.name,
            }),
          });
          startCountdown();
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Failed to send OTP");

          setState((prev) => ({
            ...prev,
            emailCode: data.otp,
            registerStep: 2,
          }));
          setAuthMessage({
            text: "Verification code sent to your email",
            type: "success",
          });
        }
      } else if (state.registerStep === 2) {
        // Step 2: Verify OTP and complete registration
        const otpError = validateOTP(state.emailOtp);
        if (otpError) {
          errors.emailOtp = otpError;
          shouldReturn = true;
        } else {
          // Complete registration with all data
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: state.name,
              email: state.email,
              password: state.password,
              otp: state.emailOtp.join(""),
            }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Registration failed");

          setState((prev) => ({
            ...prev,
            success_message: data.message || "Registration successful!",
            countdown: 5,
          }));
          setAuthMessage({ text: "", type: "" });
        }
      }

      if (shouldReturn) {
        setErrorState(errors);
        return;
      }
    } catch (error) {
      setAuthMessage({
        text: error.message || "Registration failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    state.name,
    state.email,
    state.password,
    state.registerStep,
    state.emailOtp,
    validateName,
    validateEmail,
    validatePassword,
    validateOTP,
  ]);

  const handleResendOTP = useCallback(async () => {
    setIsLoading(true);
    if (countdown > 0) return;
    try {
      const res = await fetch("/api/auth/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email, name: state.name }),
      });
      startCountdown();
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to resend OTP");

      setState((prev) => ({
        ...prev,
        emailOtp: Array(6).fill(""),
        emailCode: data.otp,
      }));
      setAuthMessage({
        text: "New verification code sent successfully",
        type: "success",
      });
    } catch (error) {
      setErrorState((prev) => ({
        ...prev,
        emailOtp: error.message || "Failed to resend code. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  }, [state.email, state.name, countdown]);
  const handleResendReset = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email, name: state.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setAuthMessage({
        text: "Verification code re-sent to your email",
        type: "success",
      });
    } catch (error) {
      setErrorState((prev) => ({
        ...prev,
        emailOtp: error.message || "Failed to resend code. Please try again.",
      }));
    }
  }, [state]);
  const handlePasswordReset = useCallback(async () => {
    setIsLoading(true);
    try {
      let errors = {};
      let shouldReturn = false;

      // Step 1: Validate email
      if (state.forgotStep === 1) {
        const emailError = validateEmail(state.email);
        if (emailError) {
          errors.email = emailError;
          shouldReturn = true;
        } else {
          const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: state.email }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Failed to send OTP");

          setState((prev) => ({
            ...prev,
            forgotStep: 2,
          }));
          setAuthMessage({
            text: "Verification code sent to your email",
            type: "success",
          });
        }
      }
      // Step 2: Validate OTP
      if (state.forgotStep === 2) {
        console.log(state.emailOtp);
        const otp = state.emailOtp.join("");
        console.log(otp);
        const res = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: state.email, otp: otp }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to send OTP");

        setState((prev) => ({
          ...prev,
          forgotStep: 3,
        }));
        setAuthMessage({
          text: "Verification code sent to your email",
          type: "success",
        });
      }

      // Step 3: Validate new password
      if (state.forgotStep === 3) {
        const passwordError = validatePassword(state.newPassword);
        const confirmError = validateConfirmPassword(
          state.newPassword,
          state.confirmNewPassword
        );

        if (passwordError || confirmError) {
          errors.newPassword = passwordError;
          errors.confirmNewPassword = confirmError;
          shouldReturn = true;
        } else {
          const res = await fetch("/api/auth/change-password", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: state.email,
              password: state.newPassword,
            }),
          });

          const data = await res.json();
          if (!res.ok)
            throw new Error(data.message || "Failed to change password");

          setState((prev) => ({
            ...prev,
            success_message: data.message || "Password changed successfully!",
            forgotStep: 4,
          }));
          setAuthMessage({ text: "", type: "" });
        }
      }

      if (shouldReturn) {
        setErrorState(errors);
        return;
      }
    } catch (error) {
      setAuthMessage({ text: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, [
    state.forgotStep,
    state.email,
    state.emailOtp,
    state.newPassword,
    state.confirmNewPassword,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
  ]);

  const handleOnSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setAuthMessage({ text: "", type: "" });

      if (pathname === "/auth/login") {
        const emailError = validateEmail(state.email);
        const passwordError = validatePassword(state.password);
        if (emailError || passwordError) {
          setErrorState({
            email: emailError,
            password: passwordError,
          });
          return;
        }
        await handleLogin();
      } else if (pathname === "/auth/register") {
        const nameError = validateName(state.name);
        const emailError = validateEmail(state.email);
        const passwordError = validatePassword(state.password);
        if (nameError || emailError || passwordError) {
          setErrorState({
            name: nameError,
            email: emailError,
            password: passwordError,
          });
          return;
        }
        await handleRegister();
      } else if (pathname === "/auth/forgot-password") {
        await handlePasswordReset();
      }
    },
    [
      pathname,
      state.email,
      state.password,
      state.name,
      validateEmail,
      validatePassword,
      validateName,
      handleLogin,
      handleRegister,
      handlePasswordReset,
    ]
  );

  // =================== View rendering functions ====================
  const renderTitle = useCallback(() => {
    switch (pathname) {
      case "/auth/login":
        return "Sign in to your account";
      case "/auth/register":
        return "Create a new account";
      case "/auth/forgot-password":
        return isMount
          ? state.forgotStep === 1
            ? "Reset your password"
            : state.forgotStep === 2
            ? "Verify your email"
            : state.forgotStep === 3
            ? "Set new password"
            : "Password reset successful"
          : "Reset Password";
      default:
        return null;
    }
  }, [pathname, isMount, state.forgotStep]);

  const renderButtonText = useCallback(() => {
    switch (pathname) {
      case "/auth/login":
        return isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2" /> Signing in...
          </>
        ) : (
          "Login"
        );
      case "/auth/register":
        return isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2" /> Processing...
          </>
        ) : state.registerStep === 1 ? (
          "Register"
        ) : (
          state.registerStep === 2 && "Verify"
        );
      case "/auth/forgot-password":
        return isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2" /> Processing...
          </>
        ) : state.forgotStep === 1 ? (
          "Send OTP"
        ) : state.forgotStep === 2 ? (
          "Verify"
        ) : (
          "Reset Password"
        );
      default:
        return "Submit";
    }
  }, [pathname, isLoading, state.registerStep, state.forgotStep]);

  const renderFormFields = useCallback(() => {
    if (pathname === "/auth/forgot-password") {
      switch (state.forgotStep) {
        case 1:
          return (
            <div className="w-full flex flex-col my-2 space-y-4">
              <div className="space-y-1">
                <label
                  className="text-base text-gray-800 dark:text-gray-200"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full p-2 border rounded-md outline-none ring-0 focus:outline-none focus:ring-2 ease-in-out transition duration-150 ${
                    errorState.email
                      ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  }`}
                  required
                  value={state.email}
                  onFocus={() =>
                    setErrorState((prev) => ({ ...prev, email: "" }))
                  }
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                {errorState.email && <ErrorText message={errorState.email} />}
              </div>
            </div>
          );
        case 2:
          return (
            <div className="w-full flex flex-col my-2 space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                {`We've sent a 6-digit code to`} {state.email}
              </p>
              <OTPInput
                otp={state.emailOtp}
                handleOptChange={handleOptChange}
                handleOtpKeyDown={handleOtpKeyDown}
                inputRefs={inputRefs}
                error={errorState.emailOtp}
              />
              <button
                type="button"
                className={`text-sm focus:outline-none mt-2 ${
                  isLoading || countdown > 0
                    ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "text-blue-600 dark:text-blue-400 hover:underline focus:underline"
                } transition-colors`}
                onClick={handleResendReset}
                disabled={isLoading || countdown > 0}
              >
                {isLoading
                  ? "Sending..."
                  : countdown > 0
                  ? `Resend available in ${countdown}s`
                  : "Didn't receive code? Resend"}
              </button>
              {authMessage.type === "success" && (
                <SuccessText message={authMessage.text} />
              )}
            </div>
          );
        case 3:
          return (
            <div className="w-full flex flex-col my-2 space-y-4">
              <div className="space-y-1">
                <label
                  className="text-base text-gray-800 dark:text-gray-200"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <PasswordInput
                  id="newPassword"
                  value={state.newPassword}
                  onChange={handlePasswordChange}
                  showPassword={state.showNewPassword}
                  toggleVisibility={() =>
                    setState((prev) => ({
                      ...prev,
                      showNewPassword: !prev.showNewPassword,
                    }))
                  }
                  placeholder="Enter new password"
                  error={errorState.newPassword}
                />
                <PasswordStrengthMeter
                  strength={passwordStrength.strength}
                  percentage={passwordStrength.percentage}
                />
                <PasswordRequirements
                  getRequirementStatus={getRequirementStatus}
                />
                {errorState.newPassword && (
                  <ErrorText message={errorState.newPassword} />
                )}
              </div>
              <div className="space-y-1">
                <label
                  className="text-base text-gray-800 dark:text-gray-200"
                  htmlFor="confirmNewPassword"
                >
                  Confirm New Password
                </label>
                <PasswordInput
                  id="confirmNewPassword"
                  value={state.confirmNewPassword}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      confirmNewPassword: e.target.value,
                    }))
                  }
                  showPassword={state.showConfirmNewPassword}
                  toggleVisibility={() =>
                    setState((prev) => ({
                      ...prev,
                      showConfirmNewPassword: !prev.showConfirmNewPassword,
                    }))
                  }
                  placeholder="Confirm new password"
                  error={errorState.confirmNewPassword}
                />
                {errorState.confirmNewPassword && (
                  <ErrorText message={errorState.confirmNewPassword} />
                )}
              </div>
            </div>
          );
        case 4:
          return (
            <SuccessScreen
              message={state.success_message}
              countdown={state.countdown}
              onManualRedirect={() => {
                setState((prev) => ({ ...prev, countdown: 5 }));
                router.push("/auth/login");
              }}
            />
          );
        default:
          return null;
      }
    } else if (pathname === "/auth/login") {
      return (
        <div className="w-full flex flex-col my-2 space-y-4">
          <div className="space-y-1">
            <label
              className="text-base text-gray-800 dark:text-gray-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full p-2 border rounded-md outline-none ring-0 focus:outline-none focus:ring-2 ease-in-out transition duration-150 ${
                errorState.email
                  ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              }`}
              required
              value={state.email}
              onFocus={() => setErrorState((prev) => ({ ...prev, email: "" }))}
              onChange={(e) =>
                setState((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="your@email.com"
              autoComplete="email"
            />
            {errorState.email && <ErrorText message={errorState.email} />}
          </div>
          <div className="space-y-1">
            <label
              className="text-base text-gray-800 dark:text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <PasswordInput
              id="password"
              value={state.password}
              onChange={(e) =>
                setState((prev) => ({ ...prev, password: e.target.value }))
              }
              showPassword={state.showPassword}
              toggleVisibility={() =>
                setState((prev) => ({
                  ...prev,
                  showPassword: !prev.showPassword,
                }))
              }
              placeholder="Enter your password"
              error={errorState.password}
            />
            {errorState.password && <ErrorText message={errorState.password} />}
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="rememberMe"
                className="sm:h-4 h-3 w-3 sm:w-4 dark:text-gray-50 dark:bg-gray-700 dark:border-gray-600"
                checked={state.rememberMe}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    rememberMe: e.target.checked,
                  }))
                }
              />
              <label
                htmlFor="rememberMe"
                className="text-sm sm:text-base dark:text-gray-200"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-sm sm:text-base hover:underline dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Forgot Password?
            </Link>
          </div>
          {authMessage.text && (
            <div
              className={`p-2 rounded-md text-sm ${
                authMessage.type === "error"
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                  : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
              }`}
            >
              {authMessage.text}
            </div>
          )}
        </div>
      );
    } else if (pathname === "/auth/register") {
      if (state.success_message) {
        return (
          <SuccessScreen
            message={state.success_message}
            countdown={state.countdown}
            onManualRedirect={() => {
              setState((prev) => ({ ...prev, countdown: 5 }));
              router.push("/auth/login");
            }}
          />
        );
      }
      switch (state.registerStep) {
        case 1:
          return (
            <div className="w-full flex flex-col my-2 space-y-4">
              <div className="space-y-1">
                <label
                  className="text-base text-gray-800 dark:text-gray-200"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`w-full p-2 border rounded-md outline-none ring-0 focus:outline-none focus:ring-2 ease-in-out transition duration-150 ${
                    errorState.name
                      ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  }`}
                  required
                  value={state.name}
                  onFocus={() =>
                    setErrorState((prev) => ({ ...prev, name: "" }))
                  }
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {errorState.name && <ErrorText message={errorState.name} />}
              </div>
              <div className="space-y-1">
                <label
                  className="text-base text-gray-800 dark:text-gray-200"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full p-2 border rounded-md outline-none ring-0 focus:outline-none focus:ring-2 ease-in-out transition duration-150 ${
                    errorState.email
                      ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  }`}
                  required
                  value={state.email}
                  onFocus={() =>
                    setErrorState((prev) => ({ ...prev, email: "" }))
                  }
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                {errorState.email && <ErrorText message={errorState.email} />}
              </div>
              <div className="space-y-1">
                <label
                  className="text-base text-gray-800 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <PasswordInput
                  id="password"
                  value={state.password}
                  onChange={(e) => {
                    setState((prev) => ({ ...prev, password: e.target.value }));
                    updatePassword(e.target.value);
                  }}
                  showPassword={state.showPassword}
                  toggleVisibility={() =>
                    setState((prev) => ({
                      ...prev,
                      showPassword: !prev.showPassword,
                    }))
                  }
                  placeholder="Create a password"
                  error={errorState.password}
                />
                <PasswordStrengthMeter
                  strength={passwordStrength.strength}
                  percentage={passwordStrength.percentage}
                />
                <PasswordRequirements
                  getRequirementStatus={getRequirementStatus}
                />
                {errorState.password && (
                  <ErrorText message={errorState.password} />
                )}
              </div>
              {authMessage.text && (
                <div
                  className={`p-2 rounded-md text-sm ${
                    authMessage.type === "error"
                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                      : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {authMessage.text}
                </div>
              )}
            </div>
          );
        case 2:
          return (
            <div className="w-full flex flex-col my-2 space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                {`We've sent a 6-digit code to`} {state.email}
              </p>
              <OTPInput
                otp={state.emailOtp}
                handleOptChange={handleOptChange}
                handleOtpKeyDown={handleOtpKeyDown}
                inputRefs={inputRefs}
                error={errorState.emailOtp}
              />
              <button
                type="button"
                className="text-sm text-blue-600 focus:outline-none focus:underline dark:text-blue-400 hover:underline mt-2 disabled:opacity-50"
                onClick={handleResendOTP}
                disabled={isLoading}
              >
                {`Didn't receive code? Resend`}
              </button>
              {authMessage.type === "success" && (
                <SuccessText message={authMessage.text} />
              )}
            </div>
          );
        default:
          return null;
      }
    }
    return null;
  }, [
    pathname,
    state,
    errorState,
    isLoading,
    passwordStrength,
    getRequirementStatus,
    authMessage,
    handlePasswordChange,
    handleOptChange,
    handleOtpKeyDown,
    handleResendOTP,
    countdown,
    router,
    handleResendReset,
    updatePassword,
  ]);

  if (!isMount) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4 sm:p-6">
        <div className="relative z-10 w-full max-w-[28rem] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
          <div className="text-center flex items-center flex-col mb-6 sm:mb-8 gap-2">
            <Logo />
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Loading...
            </p>
          </div>
          <div className="animate-pulse space-y-3 sm:space-y-4">
            <div className="h-10 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-10 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-10 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-500 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-900 animate-gradient-xy"></div>
      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-white bg-opacity-20 dark:bg-opacity-10 animate-float1"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-white bg-opacity-15 dark:bg-opacity-10 animate-float2"></div>
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-white bg-opacity-10 dark:bg-opacity-5 animate-float3"></div>
      <div className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full bg-white bg-opacity-20 dark:bg-opacity-10 animate-float4"></div>

      {/* Main form container */}
      <AnimatePresence>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10 bg-white dark:bg-gray-800 shadow-lg flex items-center flex-col justify-center p-6 w-full mx-2 sm:w-[28rem] rounded-md"
        >
          {((pathname === "/auth/forgot-password" && state.forgotStep < 4) ||
            pathname === "/auth/login" ||
            (pathname === "/auth/register" && !state.success_message)) && (
            <>
              <Logo />
              <h2 className="mt-2 text-gray-800 dark:text-gray-200 text-xl font-semibold">
                {renderTitle()}
              </h2>
            </>
          )}

          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col items-center w-full mt-4"
          >
            {renderFormFields()}

            <div
              className={`w-full flex items-center ${
                pathname === "/auth/forgot-password" && state.forgotStep > 1
                  ? "justify-between"
                  : "justify-end"
              }`}
            >
              {/* Show "Previous" button only for forgot-password step > 1 */}
              {pathname === "/auth/forgot-password" && state.forgotStep > 1 && (
                <button
                  type="button"
                  className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 rounded-md py-2 px-6 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-200 transition-colors"
                  onClick={handlePreviousStep}
                  disabled={isLoading}
                >
                  Previous
                </button>
              )}

              {/* Show Submit button for all pages except forgot-password when finished */}
              {!(
                pathname === "/auth/forgot-password" && state.forgotStep >= 4
              ) &&
                !(pathname === "/auth/register" && state.success_message) && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`${
                      pathname !== "/auth/forgot-password"
                        ? "w-full py-2.5"
                        : "py-2.5 sm:py-2 px-8"
                    } rounded-lg font-medium text-sm sm:text-base text-white ${
                      isLoading
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                    } transition-all duration-200 flex items-center justify-center active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400`}
                  >
                    {renderButtonText()}
                  </button>
                )}
            </div>

            {pathname !== "/auth/forgot-password" &&
              !state.success_message &&
              state.forgotStep < 4 && (
                <>
                  <div className="relative w-full my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleGoogleLogin}
                    className="w-full inline-flex justify-center py-2 px-3 sm:px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      <FcGoogle className="text-base sm:text-lg" />
                    )}
                    <span className="ml-1 sm:ml-2">
                      {isLoading ? "Processing..." : "Google"}
                    </span>
                  </button>
                </>
              )}

            {pathname !== "/auth/forgot-password" &&
              !state.success_message &&
              state.forgotStep < 4 && (
                <div className="mt-4 text-center">
                  <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                    {pathname === "/auth/login" ? (
                      <span className="inline">
                        {`Don't have an account?`}{" "}
                        <Link
                          href="/auth/register"
                          className="hover:underline dark:text-green-400 text-green-600 dark:hover:text-green-300"
                        >
                          Sign Up
                        </Link>
                      </span>
                    ) : (
                      <span className="inline">
                        Already have an account?{" "}
                        <Link
                          href="/auth/login"
                          className="hover:underline text-green-600 dark:text-green-400 dark:hover:text-green-300"
                        >
                          Sign In
                        </Link>
                      </span>
                    )}
                  </p>
                </div>
              )}

            {pathname === "/auth/forgot-password" &&
              state.forgotStep < 4 &&
              !state.success_message && (
                <>
                  <hr className="w-full border-t border-gray-300 dark:border-gray-600 mt-4" />
                  <Link
                    href="/auth/login"
                    className="mt-4 relative flex items-center group text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    <MoveLeft className="group-hover:-translate-x-1 transition-all ease-in-out duration-150" />
                    <span className="ml-1">Back to Login</span>
                  </Link>
                </>
              )}
          </form>
        </motion.div>
      </AnimatePresence>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes gradient-xy {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }
        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(50px, 50px) rotate(180deg);
          }
        }
        .animate-float1 {
          animation: float1 20s linear infinite;
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-60px, 60px) rotate(-180deg);
          }
        }
        .animate-float2 {
          animation: float2 25s linear infinite;
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, -40px);
          }
        }
        .animate-float3 {
          animation: float3 18s linear infinite;
        }
        @keyframes float4 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, -30px) scale(1.2);
          }
        }
        .animate-float4 {
          animation: float4 22s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FormPage;
