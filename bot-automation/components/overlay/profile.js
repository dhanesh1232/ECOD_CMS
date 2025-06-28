"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import PasswordStrengthBar from "react-password-strength-bar";
import Confetti from "react-confetti";
import {
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiCheck,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { validatePhoneNumber } from "@/hooks/validator";
import { UserServices } from "@/lib/client/user";
import { useToast } from "../ui/toast-provider";
import "react-phone-number-input/style.css";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { SpinnerIcon } from "@/public/Images/svg_ecod";
import { cn } from "@/lib/utils";
import { StyledPhoneInput } from "../ui/phone_input";

const ConfettiEffect = ({ active }) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (active && !showConfetti) {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [active, showConfetti]);

  if (!showConfetti) return null;

  return (
    <Confetti
      {...dimensions}
      recycle={false}
      numberOfPieces={200}
      gravity={0.2}
      colors={["#10B981", "#059669", "#ECFDF5", "#A7F3D0"]}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}
    />
  );
};

const SuccessState = ({ session, redirectCounter, router }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
      className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-emerald-950/60 dark:to-emerald-900/40 border border-green-200/80 dark:border-emerald-800/70 p-6 rounded-2xl mb-6 flex flex-col items-start gap-0 backdrop-blur-sm shadow-lg shadow-green-100/50 dark:shadow-emerald-900/20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#48bb7860_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,#05966940_0%,transparent_70%)]" />

      <motion.div
        className="absolute -top-20 -left-10 w-40 h-40 rounded-full bg-green-200/30 dark:bg-emerald-800/30 blur-[20px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 10, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-green-300/20 dark:bg-emerald-700/30 blur-[20px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex items-start gap-4 w-full">
        <motion.div
          className="flex-shrink-0 p-3 bg-green-100 dark:bg-emerald-900/80 rounded-xl shadow-inner"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
            boxShadow: [
              "inset 0 2px 4px rgba(0,0,0,0.05)",
              "inset 0 2px 8px rgba(0,0,0,0.1)",
              "inset 0 2px 4px rgba(0,0,0,0.05)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 1.5,
              ease: "backOut",
            }}
          >
            <FiCheck className="text-2xl text-green-600 dark:text-emerald-400" />
          </motion.div>
        </motion.div>

        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col sm:items-baseline justify-between gap-2">
            <div>
              <motion.h3
                className="text-2xl font-bold text-green-900 dark:text-emerald-50"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Profile Updated Successfully!
              </motion.h3>
              <motion.p
                className="mt-1 text-sm text-green-700/90 dark:text-emerald-200/80"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {session.user.email}
              </motion.p>
            </div>

            <motion.div
              className="mt-2 text-sm font-bold text-green-600 dark:text-emerald-300 bg-green-100/50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full inline-block"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(74, 222, 128, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              @{session.user.name.replace(/\s+/g, "").toLowerCase()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Countdown section */}
      <div className="w-full mt-6">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-full group">
            <div className="relative flex w-full justify-center h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  className="fill-none stroke-green-100 dark:stroke-emerald-900/50"
                  strokeWidth="8%"
                  strokeLinecap="round"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  className="fill-none stroke-green-500 dark:stroke-emerald-400"
                  strokeWidth="8%"
                  strokeLinecap="round"
                  initial={{
                    strokeDasharray: 150.72, // 2 * π * 24 (radius)
                    strokeDashoffset: 150.72,
                  }}
                  animate={{
                    strokeDashoffset: 150.72 * (1 - (5 - redirectCounter) / 5),
                  }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </svg>

              <motion.span
                key={redirectCounter}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  color: redirectCounter <= 2 ? "#ef4444" : "",
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="absolute inset-0 flex items-center justify-center text-xl font-bold text-green-700 dark:text-emerald-300"
              >
                {redirectCounter}s
              </motion.span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2 w-full max-w-xs">
            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FiClock className="flex-shrink-0 text-green-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-green-700 dark:text-emerald-300">
                Redirecting in {redirectCounter} seconds
              </span>
            </motion.div>

            <motion.p
              className="text-sm text-green-600/90 dark:text-emerald-300/80 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {`You'll be automatically taken to your dashboard. Or you can...`}
            </motion.p>
          </div>

          <motion.div
            className="mt-2 flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              type="button"
              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md transition-colors relative overflow-hidden"
              onClick={() => router.push("/")}
              whileHover={{
                y: -2,
                boxShadow: "0 4px 16px rgba(74, 222, 128, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Go to Dashboard</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0"
                animate={{
                  opacity: [0, 0.3, 0],
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <ConfettiEffect active={redirectCounter === 5} />
    </motion.div>
  );
};

const ProfileForm = ({
  profileState,
  errors,
  touched,
  showPassword,
  showConfirmPassword,
  passwordScore,
  isSubmitting,
  showAllErrors,
  handleChange,
  handlePhoneChange,
  handleBlur,
  setShowPassword,
  setShowConfirmPassword,
  handleProfile,
}) => {
  const getInputClass = useCallback(
    (field) => {
      const baseClass =
        "w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 outline-none";
      const errorClass =
        touched[field] && errors[field]
          ? "border-red-500 focus:ring-2 focus:ring-red-500"
          : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500";

      return `${baseClass} ${errorClass}`;
    },
    [touched, errors]
  );

  return (
    <div className="w-full max-w-xs sm:max-w-md bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 sm:py-8 rounded-xl shadow-lg dark:shadow-gray-900/50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="text-center mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Complete Your Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Fill in your details to get started
          </p>
        </div>

        <form onSubmit={handleProfile} className="space-y-2">
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Full Name
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
                <FiUser />
              </div>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                value={profileState.name}
                className={`${getInputClass("name")} z-0`}
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
                <FiMail />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileState.email}
                readOnly
                disabled={true}
                className={`${getInputClass("email")} z-0`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
                <FiPhone />
              </div>
              <StyledPhoneInput
                id="phone"
                name="phone"
                required
                placeholder="+91 12345 67890"
                countryCallingCodeEditable={false}
                value={profileState.phone}
                onChange={handlePhoneChange}
                onBlur={() => handleBlur("phone")}
                className="w-full pl-5 sm:pl-10 custom-phone-input"
              />
            </div>

            <span className="text-xs flex items-center gap-1 text-gray-800 dark:text-gray-200">
              <FaWhatsapp size={12} color="green" className="mb-1" />
              Please use whatsapp number for feature updates
            </span>
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
                <FiLock />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={profileState.password}
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                placeholder="••••••••"
                className={`${getInputClass("password")} z-0`}
              />
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0.5 top-0.5 flex focus:outline-none focus:text-blue-600 items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </Button>
            </div>

            <PasswordStrengthBar
              password={profileState.password}
              onChangeScore={(score) => {}}
              className="mt-2"
              scoreWords={["Weak", "Weak", "Okay", "Good", "Strong"]}
              shortScoreWord="Too short"
            />
          </div>

          <div>
            <Label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
                <FiLock />
              </div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={profileState.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="••••••••"
                className={`${getInputClass("confirmPassword")} z-0`}
              />
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0.5 top-0.5 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={profileState.terms}
              required
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <div>
              <Label
                htmlFor="terms"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/terms", "_blank");
                  }}
                >
                  Terms <FiExternalLink className="ml-0.5" size={12} />
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/privacy", "_blank");
                  }}
                >
                  Privacy <FiExternalLink className="ml-0.5" size={12} />
                </button>
              </Label>
            </div>
          </div>

          <Button
            variant="premium"
            type="submit"
            disabled={
              isSubmitting || (showAllErrors && Object.keys(errors).length > 0)
            }
            className="relative w-full disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none"
          >
            {/* Spinner that appears on top during loading */}
            {isSubmitting ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <SpinnerIcon className="h-5 w-5" color="white" />
              </div>
            ) : (
              <span
                className={cn(
                  "block transition-opacity",
                  isSubmitting && "opacity-0"
                )}
              >
                Complete Profile
              </span>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

const ProfileCompletion = () => {
  const showToast = useToast();
  const toastRef = useRef(false);
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
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [redirectCounter, setRedirectCounter] = useState(5);

  useEffect(() => {
    if (session?.user) {
      const fecthProfile = async () => {
        const userData = await UserServices.fetchUserProfile();
        if (userData.status && !userData.ok) {
          const data = await userData.json();
          if (!toastRef.current) {
            showToast({
              description: data.message,
              variant: "warning",
            });
            toastRef.current = true;
          }
        }
        setProfileState((prev) => ({
          ...prev,
          name: userData.data.user.name,
          email: userData.data.user.email,
        }));
      };
      fecthProfile();
    }
  }, [session, showToast]);

  useEffect(() => {
    if (success) {
      setRedirectCounter(5);
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
    const { name, email, phone, password, confirmPassword } = profileState;

    if (!name.trim()) newErrors.name = "Name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    const { valid, message } = validatePhoneNumber(phone, "IN");

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
  }, [profileState]);

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [profileState, validateForm, touched]);

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setProfileState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handlePhoneChange = useCallback((value) => {
    setProfileState((prev) => ({ ...prev, phone: value }));
  }, []);

  const handleProfile = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });
    setShowAllErrors(true);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log(isSubmitting);
      const data = await UserServices.updateUserPendingProfile({
        name: profileState.name,
        email: profileState.email,
        password: profileState.password,
        phone: profileState.phone,
        terms: profileState.terms,
      });

      if (data.status && !data.ok) {
        const value = await data.json();
        if (data.status === 400 && value.message.includes("Phone number")) {
          showToast({
            description: "Phone number already exist",
            variant: "warning",
            title: "Already exist",
          });
        } else {
          showToast({
            description: value.message || "Phone number already exist",
            variant: "warning",
          });
        }
        return;
      }

      setSuccess(true);
    } catch (error) {
      showToast({ description: error.message, variant: "warning" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return success ? (
    <SuccessState
      session={session}
      redirectCounter={redirectCounter}
      router={router}
    />
  ) : (
    <ProfileForm
      profileState={profileState}
      errors={errors}
      touched={touched}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      isSubmitting={isSubmitting}
      showAllErrors={showAllErrors}
      handleChange={handleChange}
      handlePhoneChange={handlePhoneChange}
      handleBlur={handleBlur}
      setShowPassword={setShowPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      handleProfile={handleProfile}
    />
  );
};

export default ProfileCompletion;
