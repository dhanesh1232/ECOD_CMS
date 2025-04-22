"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  X,
  Sparkles,
  Check,
  Send,
  Loader2,
  Clipboard,
  ArrowLeft,
  ChevronRight,
  Clock,
  AlertCircle,
} from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Cookies from "js-cookie";
import { getRandomOffer } from "@/data/web_data";

// Constants
const OFFER_COOKIE_NAME = "offer_data";
const CLAIMED_COOKIE_NAME = "offer_claimed";
const COOKIE_OPTIONS = {
  expires: 7,
  secure: true,
  sameSite: "strict",
  path: "/",
};

// Type definitions for better type safety
/**
 * @typedef {Object} UserData
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 */

/**
 * @typedef {Object} OfferData
 * @property {string} title
 * @property {string} description
 * @property {string} serviceSlug
 * @property {string|number} discount
 * @property {string} couponCode
 * @property {string} couponPrefix
 * @property {string|Date} expiresAt
 * @property {string|number} validityDays
 * @property {string[]} [features]
 * @property {string[]} [includes]
 * @property {string} [badge]
 * @property {string} [urgency]
 */

/**
 * @typedef {Object} ComponentState
 * @property {boolean} isPop
 * @property {OfferData|null} isAvailOffer
 * @property {boolean} isLoading
 * @property {string|null} error
 * @property {UserData} formData
 * @property {boolean} isCaptchaVerified
 * @property {boolean} isCouponCopied
 * @property {'offer'|'form'|'success'} currentStage
 * @property {boolean} isSubmitted
 * @property {boolean} hasClaimedOffer
 */

const OfferButton = () => {
  // State management
  const [state, setState] = useState({
    isPop: false,
    isAvailOffer: null,
    isLoading: false,
    error: null,
    formData: {
      name: "",
      email: "",
      phone: "",
    },
    isCaptchaVerified: false,
    isCouponCopied: false,
    currentStage: "offer",
    isSubmitted: false,
    hasClaimedOffer: false,
    couponData: null,
  });

  // Destructure state for easier access
  const {
    isPop,
    isAvailOffer,
    isLoading,
    error,
    formData,
    isCaptchaVerified,
    isCouponCopied,
    currentStage,
    hasClaimedOffer,
    couponData,
  } = state;

  const recaptchaRef = useRef(null);

  // Effects
  useEffect(() => {
    checkForExistingOffer();
  }, []);

  // Memoized functions
  const checkForExistingOffer = useCallback(() => {
    try {
      const storedOffer = Cookies.get(OFFER_COOKIE_NAME);
      const claimedOffer = Cookies.get(CLAIMED_COOKIE_NAME);

      if (storedOffer) {
        setState((prev) => ({
          ...prev,
          isAvailOffer: JSON.parse(storedOffer),
        }));
      }

      if (claimedOffer) {
        setState((prev) => ({
          ...prev,
          hasClaimedOffer: true,
        }));
      }
    } catch (err) {
      console.error("Error parsing offer data:", err);
      setState((prev) => ({
        ...prev,
        error: "Failed to load offer. Please try again.",
      }));
    }
  }, []);

  // Event handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value.trim(),
      },
    }));
  }, []);

  const handlePhoneChange = useCallback((value) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        phone: value,
      },
    }));
  }, []);

  const onCaptchaChange = useCallback(async (token) => {
    try {
      const res = await fetch("/api/verify-captcha/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      setState((prev) => ({
        ...prev,
        isCaptchaVerified: data.success,
        error: data.success ? null : "CAPTCHA verification failed",
      }));
    } catch (error) {
      console.error("CAPTCHA verification failed", error);
      setState((prev) => ({
        ...prev,
        isCaptchaVerified: false,
        error: "CAPTCHA verification failed. Please try again.",
      }));
    }
  }, []);

  const copyCoupon = useCallback(() => {
    if (!couponData?.coupon?.couponCode) return;
    navigator.clipboard
      .writeText(couponData?.coupon?.couponCode)
      .then(() => {
        setState((prev) => ({
          ...prev,
          isCouponCopied: true,
        }));
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            isCouponCopied: false,
          }));
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy coupon:", err);
        setState((prev) => ({
          ...prev,
          error: "Failed to copy coupon. Please try again.",
        }));
      });
  }, [couponData]);

  const getOfferDetails = useCallback(() => {
    if (isAvailOffer) return;

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const offerData = getRandomOffer();
      if (!offerData) {
        throw new Error("No offers available at this time");
      }

      Cookies.set(OFFER_COOKIE_NAME, JSON.stringify(offerData), {
        ...COOKIE_OPTIONS,
        expires: 1, // Offer expires in 1 day
      });

      setState((prev) => ({
        ...prev,
        isAvailOffer: offerData,
        isLoading: false,
      }));
    } catch (err) {
      console.error("Error getting offer:", err);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || "Failed to get offer. Please try again.",
      }));
    }
  }, [isAvailOffer]);

  const goToForm = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStage: "form",
      error: null,
    }));
  }, []);

  const backToOffer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStage: "offer",
      error: null,
    }));
    recaptchaRef.current?.reset();
  }, []);

  const validateForm = useCallback(() => {
    const { name, email, phone } = formData;
    const errors = [];

    if (!name.trim()) errors.push("Name is required");
    if (!email.trim()) {
      errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Please enter a valid email");
    }
    if (!phone) {
      errors.push("Phone number is required");
    } else if (!/^\+[1-9]\d{1,14}$/.test(phone.replace(/\s+/g, ""))) {
      errors.push("Please enter a valid international phone number");
    }

    return errors.length ? errors.join(", ") : null;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const formError = validateForm();
      if (formError) {
        setState((prev) => ({
          ...prev,
          error: formError,
        }));
        return;
      }

      if (!isCaptchaVerified) {
        setState((prev) => ({
          ...prev,
          error: "Please complete the CAPTCHA verification",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const res = await fetch("/api/offer/claim", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            offer: isAvailOffer,
            user: formData,
          }),
        });

        if (!res.ok) {
          throw new Error(await res.text());
        }

        const data = await res.json();
        //if render coupon and existing coupon not same then change
        const existing = JSON.parse(Cookies.get(OFFER_COOKIE_NAME) || "{}");

        // Check if there's an existing coupon and it's different from the new one
        if (existing.couponCode !== data.data.coupon.couponCode) {
          // Remove old cookie
          Cookies.remove(OFFER_COOKIE_NAME);

          // Set new coupon data into the cookie
          Cookies.set(OFFER_COOKIE_NAME, JSON.stringify(data.data.coupon), {
            expires: 7, // expires in 7 days
            secure: true,
            sameSite: "/",
          });
        }

        // Mark offer as claimed
        Cookies.set(CLAIMED_COOKIE_NAME, "true", COOKIE_OPTIONS);

        setState((prev) => ({
          ...prev,
          isLoading: false,
          currentStage: "success",
          isSubmitted: true,
          hasClaimedOffer: true,
          couponData: data.data,
        }));
      } catch (error) {
        console.error("Offer claim error:", error);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message || "Failed to claim offer. Please try again.",
        }));
      }
    },
    [formData, isAvailOffer, isCaptchaVerified, validateForm]
  );

  const closePopup = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isPop: false,
      currentStage: "offer",
    }));
  }, []);

  // Utility functions
  const formatDate = useCallback((date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const getTimeRemaining = useCallback((expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry - now;

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? "s" : ""} remaining`;
    }
    return `${hours}h ${minutes}m remaining`;
  }, []);

  const isExpiringSoon = useCallback((expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry - now;
    return diff > 0 && diff < 24 * 60 * 60 * 1000;
  }, []);

  // Render functions
  const renderOfferButton = () => (
    <motion.button
      onClick={() => {
        getOfferDetails();
        setState((prev) => ({ ...prev, isPop: true }));
      }}
      initial={{ opacity: 0, x: -20, scale: 0.8 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
        boxShadow: "0 0 15px rgba(245, 158, 11, 0.5)",
      }}
      exit={{ opacity: 0, x: -20, scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
        bounce: 0.6,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 25px rgba(245, 158, 11, 0.8)",
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="fixed bottom-6 left-4 z-20 h-10 w-10 md:h-16 md:w-16 rounded-full shadow-xl flex items-center justify-center text-white bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 border-2 border-amber-300/50 hover:border-amber-200/60 transition-all group backdrop-blur-sm"
      aria-label="View special offers"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-7 h-7 animate-spin" />
      ) : (
        <>
          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-yellow-300/80"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 40 - 20,
                  y: Math.random() * 40 - 20,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 0.5, 0],
                  transition: {
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                }}
              />
            ))}
          </div>

          <Sparkles className="absolute top-3 left-3 w-2 h-2 text-yellow-300 animate-pulse" />
          <Sparkles className="absolute bottom-3 right-3 w-2 h-2 text-yellow-200 animate-pulse delay-200" />
          <Sparkles className="absolute top-1 right-4 w-1 h-1 text-amber-100 animate-pulse delay-300" />

          <motion.div
            initial={{ rotate: -10 }}
            animate={{
              rotate: [0, 5, -5, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            whileHover={{
              rotate: [0, 15, -15, 0],
              scale: 1.2,
              transition: { duration: 0.5 },
            }}
            whileTap={{
              scale: 0.8,
              rotate: 0,
            }}
          >
            <Gift className="w-7 h-7" />
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-full border-2 border-amber-200/30 pointer-events-none"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.span
            className="absolute left-full ml-3 px-3 py-1 rounded-md bg-amber-600/90 text-white text-sm font-medium whitespace-nowrap shadow-lg backdrop-blur-sm border border-amber-400/30"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.5 },
            }}
            whileHover={{
              backgroundColor: "rgba(217, 119, 6, 0.95)",
            }}
          >
            Special Offers!
          </motion.span>
        </>
      )}
    </motion.button>
  );

  const renderLoadingState = () => (
    <div className="p-6 text-center">
      <div className="flex justify-center mb-4">
        <Gift className="w-12 h-12 text-amber-500 animate-bounce" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Loading your special offer...
      </h2>
      <p className="text-gray-600 mb-6">
        {`We're preparing something amazing for you!`}
      </p>
      <div className="flex justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    </div>
  );

  const renderOfferStage = () => (
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isAvailOffer.title}
          </h2>
          <p className="text-gray-600 mt-1">{isAvailOffer.description}</p>
        </div>
        {isAvailOffer.badge && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {isAvailOffer.badge}
          </span>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {`What's included:`}
        </h3>
        <ul className="space-y-2">
          {isAvailOffer.features?.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
          {isAvailOffer.includes?.map((item, index) => (
            <li key={`inc-${index}`} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>

        {isAvailOffer.urgency && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
            <p className="text-sm text-red-700 font-medium">
              ⏰ {isAvailOffer.urgency}
            </p>
          </div>
        )}

        {isAvailOffer.expiresAt && (
          <div
            className={`mt-4 p-3 rounded-lg border ${
              isExpiringSoon(isAvailOffer.expiresAt)
                ? "bg-amber-50 border-amber-200"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <div className="flex items-center">
              <Clock
                className={`w-4 h-4 mr-2 ${
                  isExpiringSoon(isAvailOffer.expiresAt)
                    ? "text-amber-600"
                    : "text-blue-600"
                }`}
              />
              <p
                className={`text-sm font-medium ${
                  isExpiringSoon(isAvailOffer.expiresAt)
                    ? "text-amber-700"
                    : "text-blue-700"
                }`}
              >
                {getTimeRemaining(isAvailOffer.expiresAt)} - Expires{" "}
                {formatDate(isAvailOffer.expiresAt)}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={goToForm}
          className="w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white bg-amber-600 hover:bg-amber-700 transition-colors group"
        >
          <span>Claim This Offer</span>
          <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );

  const renderFormStage = () => (
    <div className="p-6">
      <button
        type="button"
        onClick={backToOffer}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to offer
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Claim Your Offer
      </h2>
      <p className="text-gray-600 mb-6">
        Please provide your details to claim your special offer
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <PhoneInput
              international
              defaultCountry="IN"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full px-4 text-base text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="pt-2">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE ||
                "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              }
              onChange={onCaptchaChange}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading || !isCaptchaVerified || validateForm()}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white bg-amber-600 hover:bg-amber-700 group hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit & Get Coupon
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );

  const renderSuccessStage = () => (
    <div className="p-6 text-center">
      <div className="flex justify-center mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
          className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
        >
          <Check className="w-8 h-8 text-green-600" />
        </motion.div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Congratulations!
      </h2>
      <p className="text-gray-600 mb-6">{couponData.message}</p>

      <div className="mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center bg-gradient-to-br from-green-50 to-gray-50 rounded-lg p-6 border border-green-200"
        >
          <p className="text-sm font-medium text-gray-500 mb-2">
            Your exclusive coupon code
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-2 font-mono">
            {couponData?.coupon?.couponCode}
          </p>
          <div className="flex items-center text-xs text-gray-500 mb-4">
            <Clock className="w-3 h-3 mr-1" />
            <span>
              Valid until: {formatDate(couponData?.coupon?.expiresAt)}
            </span>
          </div>
          <button
            onClick={copyCoupon}
            className="flex items-center justify-center px-4 py-2 rounded-lg font-medium text-white bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            {isCouponCopied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4 mr-2" />
                Copy Coupon
              </>
            )}
          </button>
        </motion.div>
      </div>

      <div className="mt-6">
        <button
          onClick={closePopup}
          className="w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  const renderPopupContent = () => {
    if (!isAvailOffer && !hasClaimedOffer) return renderLoadingState();
    if (currentStage === "offer") return renderOfferStage();
    if (currentStage === "form") return renderFormStage();
    return renderSuccessStage();
  };

  return (
    <>
      <AnimatePresence>
        {!isPop && !hasClaimedOffer && renderOfferButton()}
      </AnimatePresence>

      <AnimatePresence>
        {isPop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-gray-900/70 backdrop-blur-sm">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              exit={{ y: 50, opacity: 0 }}
              className="sm:w-4/5 w-full mx-4 md:w-[32rem] max-h-[90vh] overflow-y-auto bg-white rounded-lg relative shadow-xl"
            >
              <button
                type="button"
                onClick={closePopup}
                className="w-10 h-10 items-center absolute right-2 top-2 justify-center flex rounded-full hover:bg-gray-100 transition-colors z-10"
                aria-label="Close offer popup"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {renderPopupContent()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OfferButton;
