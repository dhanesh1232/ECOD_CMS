"use client";

import { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loginStages, setLoginStages] = useState(1);
  const [signUpStages, setSignUpStages] = useState(1);
  const [isLogin, setIsLogin] = useState(pathname === "/auth/login");
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [signUpState, setSignUpState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [forgotPasswordState, setForgotPasswordState] = useState({
    email: "",
    resetCode: "",
    newPassword: "",
    confirmNewPassword: "",
    resetCodeSent: false,
    resetCodeVerified: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsLogin(pathname === "/auth/login");
  }, [pathname]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleAuthMode = () => {
    const newPath = isLogin ? "/auth/signup" : "/auth/login";
    router.replace(newPath);
    setIsLogin(!isLogin);
  };

  const handleForgotPasswordClick = () => {
    router.replace("/auth/forgot-password");
  };

  const handleBackToLogin = () => {
    router.replace("/auth/login");
  };

  const validateData = (data) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pathname === "/auth/login") {
      console.log("Login:", loginState);
    }
    if (pathname === "/auth/signup") {
      if (validateData(signUpState)) {
        console.log("Sign Up:", signUpState);
      }
    }
    if (pathname === "/auth/forgot-password") {
      console.log("Forgot Password:", forgotPasswordState);
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (pathname === "/auth/forgot-password") {
        setForgotPasswordState({
          ...forgotPasswordState,
          resetCodeSent: true,
        });
      }
    }, 2000);
  };

  const formVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
        <div className="relative z-10 w-full max-w-[28rem] bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <FaWhatsapp className="mx-auto text-4xl sm:text-5xl text-green-500 mb-3 sm:mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
              WhatsApp Automation
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {pathname === "/auth/forgot-password"
                ? "Reset your password"
                : isLogin
                ? "Sign in to your account"
                : "Create a new account"}
            </p>
          </div>
          <div className="animate-pulse space-y-3 sm:space-y-4">
            <div className="h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
            <div className="h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
            <div className="h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
      {isMounted && !shouldReduceMotion && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-green-100 opacity-20"
              initial={{
                x: Math.random() * 1000,
                y: Math.random() * 1000,
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-[28rem]">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? {}
                : {
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }
            }
            className="flex justify-center mb-3 sm:mb-4"
          >
            <FaWhatsapp className="text-4xl md:text-5xl text-green-500" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            WhatsApp Automation
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {pathname === "/auth/forgot-password"
              ? "Reset your password"
              : isLogin
              ? "Sign in to your account"
              : "Create a new account"}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 backdrop-blur-sm bg-opacity-90"
          >
            {pathname === "/auth/forgot-password" && (
              <button
                onClick={handleBackToLogin}
                className="flex items-center text-sm text-gray-600 mb-4 hover:text-gray-800 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Back to Sign In
              </button>
            )}

            <form onSubmit={handleSubmit}>
              {pathname === "/auth/forgot-password" ? (
                <div>
                  {!forgotPasswordState.resetCodeSent ? (
                    <div className="mb-3 sm:mb-4">
                      <label
                        htmlFor="forgot-email"
                        className="block text-gray-700 text-sm sm:text-base mb-1 sm:mb-2"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400 text-sm sm:text-base" />
                        </div>
                        <input
                          type="email"
                          id="forgot-email"
                          value={forgotPasswordState.email}
                          onChange={(e) => {
                            setForgotPasswordState({
                              ...forgotPasswordState,
                              email: e.target.value,
                            });
                          }}
                          className="w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="you@example.com"
                          required
                          autoComplete="email"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        {`We'll send you a link to reset your password`}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                        {`We've sent a password reset link to your email. Please
                        check your inbox.`}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotPasswordState({
                            ...forgotPasswordState,
                            resetCodeSent: false,
                            email: "",
                          });
                        }}
                        className="w-full text-sm text-green-600 hover:text-green-500 transition-colors"
                      >
                        {`Didn't receive the email? Resend`}
                      </button>
                    </div>
                  )}
                </div>
              ) : !isLogin ? (
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm sm:text-base mb-1 sm:mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400 text-sm sm:text-base" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={signUpState.name}
                      onChange={(e) => {
                        setSignUpState({
                          ...signUpState,
                          name: e.target.value,
                        });
                      }}
                      className="w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>
              ) : null}

              {pathname !== "/auth/forgot-password" && (
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm sm:text-base mb-1 sm:mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400 text-sm sm:text-base" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={isLogin ? loginState.email : signUpState.email}
                      onChange={(e) => {
                        if (isLogin) {
                          setLoginState({
                            ...loginState,
                            email: e.target.value,
                          });
                        } else {
                          setSignUpState({
                            ...signUpState,
                            email: e.target.value,
                          });
                        }
                      }}
                      className="w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>
              )}

              {pathname !== "/auth/forgot-password" && (
                <div className="mb-4 sm:mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm sm:text-base mb-1 sm:mb-2"
                  >
                    {isLogin ? "Password" : "Create Password"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400 text-sm sm:text-base" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={
                        isLogin ? loginState.password : signUpState.password
                      }
                      onChange={(e) => {
                        if (isLogin) {
                          setLoginState({
                            ...loginState,
                            password: e.target.value,
                          });
                        } else {
                          setSignUpState({
                            ...signUpState,
                            password: e.target.value,
                          });
                        }
                      }}
                      className="w-full pl-10 pr-10 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                      autoComplete={
                        isLogin ? "current-password" : "new-password"
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400 hover:text-gray-600 transition-colors text-sm sm:text-base" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-gray-600 transition-colors text-sm sm:text-base" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {!isLogin && pathname !== "/auth/forgot-password" && (
                <div className="mb-4 sm:mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm sm:text-base mb-1 sm:mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400 text-sm sm:text-base" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={signUpState.confirmPassword}
                      onChange={(e) => {
                        setSignUpState({
                          ...signUpState,
                          confirmPassword: e.target.value,
                        });
                      }}
                      className="w-full pl-10 pr-10 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400 hover:text-gray-600 transition-colors text-sm sm:text-base" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-gray-600 transition-colors text-sm sm:text-base" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {isLogin && pathname !== "/auth/forgot-password" && (
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={loginState.remember}
                      onChange={(e) => {
                        setLoginState({
                          ...loginState,
                          remember: e.target.checked,
                        });
                      }}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-xs sm:text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={handleForgotPasswordClick}
                    className="text-xs sm:text-sm text-green-600 hover:text-green-500 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {pathname !== "/auth/forgot-password" ||
              !forgotPasswordState.resetCodeSent ? (
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium text-sm sm:text-base text-white ${
                    isLoading
                      ? "bg-green-500"
                      : "bg-green-600 hover:bg-green-700"
                  } transition-all duration-200 flex items-center justify-center`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
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
                  ) : pathname === "/auth/forgot-password" ? (
                    "Send Reset Link"
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </button>
              ) : null}

              {pathname !== "/auth/forgot-password" && (
                <div className="mt-4 sm:mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-3 sm:px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      <FcGoogle className="text-base sm:text-lg" />
                      <span className="ml-1 sm:ml-2">Google</span>
                    </button>
                  </div>
                </div>
              )}

              {pathname !== "/auth/forgot-password" && (
                <div className="mt-4 sm:mt-6 text-center">
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="text-gray-700 hover:text-gray-900 text-xs sm:text-sm font-medium transition-colors"
                    aria-label={
                      isLogin
                        ? "Switch to sign up form"
                        : "Switch to sign in form"
                    }
                  >
                    {isLogin ? (
                      <p className="inline">
                        {`Don't have an account? `}
                        <span className="hover:underline text-green-600">
                          Sign Up
                        </span>
                      </p>
                    ) : (
                      <p className="inline">
                        Already have an account?{" "}
                        <span className="hover:underline text-green-600">
                          Sign In
                        </span>
                      </p>
                    )}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
