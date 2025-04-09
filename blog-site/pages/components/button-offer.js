"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  X,
  Sparkles,
  Check,
  Send,
  Loader2,
  Clipboard,
} from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-number-input";
import Cookies from "js-cookie";
import { generateCouponCode, getRandomOffer } from "@/data/web_data";

const TEMP_EMAIL_DOMAINS = [
  "temp-mail.org",
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "yopmail.com",
  "throwawaymail.com",
  "fakeinbox.com",
  "tempmailaddress.com",
];

const OfferButton = () => {
  const recaptchaRef = useRef(null);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE;
  const formRef = useRef(null);

  const [state, setState] = useState({
    showPopup: false,
    showButton: false,
    currentOffer: null,
    isClosing: false,
    showForm: false,
    isSubmitting: false,
    isSuccess: false,
    recaptchaToken: null,
    isHumanVerified: false,
    coupon: null,
    formData: {
      name: "",
      email: "",
      phone: "",
    },
    touchedFields: {
      name: false,
      email: false,
      phone: false,
    },
    errors: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const {
    showPopup,
    showButton,
    currentOffer,
    isClosing,
    showForm,
    isSubmitting,
    isSuccess,
    recaptchaToken,
    isHumanVerified,
    coupon,
    formData,
    touchedFields,
    errors,
  } = state;

  const updateState = (newState) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  useEffect(() => {
    const hasInteracted = Cookies.get("ecodWidthShown");
    const offerLastShown = Cookies.get("ecodLastShown");

    if (
      !hasInteracted &&
      (!offerLastShown || new Date() > new Date(offerLastShown))
    ) {
      const timer = setTimeout(() => {
        const offer = getRandomOffer();
        updateState({
          currentOffer: offer,
          showButton: true,
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const openPopup = () => {
    updateState({ showPopup: true });
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  };

  const closePopup = () => {
    updateState({ isClosing: true });
    setTimeout(() => {
      updateState({
        showPopup: false,
        showButton: false,
        showForm: false,
        isClosing: false,
        isSuccess: false,
        formData: { name: "", email: "", phone: "" },
        touchedFields: { name: false, email: false, phone: false },
        errors: { name: "", email: "", phone: "" },
        coupon: null,
      });
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      // Set cookies with 7-day expiration
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      Cookies.set("ecodLastShown", new Date().toISOString(), {
        expires: expirationDate,
        sameSite: "strict",
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      });

      Cookies.set("ecodWidthShown", "true", {
        expires: expirationDate,
        sameSite: "strict",
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      });
    }, 300);
  };

  const handleClaimOffer = () => {
    updateState({ showForm: true });
  };

  const handleInputChange = (field, value) => {
    updateState({
      formData: { ...formData, [field]: value },
      touchedFields: { ...touchedFields, [field]: true },
    });
    validateField(field, value);
  };

  const handleBlur = (field) => {
    if (!touchedFields[field]) {
      updateState({
        touchedFields: { ...touchedFields, [field]: true },
      });
    }
    validateField(field, formData[field]);
  };

  const isSuspiciousEmail = useCallback((email) => {
    if (!email) return false;
    const domain = email.split("@")[1]?.toLowerCase();
    return domain && TEMP_EMAIL_DOMAINS.some((d) => domain.includes(d));
  }, []);

  const validateField = useCallback(
    (field, value) => {
      let error = "";

      if (field === "name") {
        const trimmed = value.trim();
        if (!trimmed) {
          error = "Name is required";
        } else if (
          trimmed.split(/\s+/).filter((p) => p.length > 0).length < 2
        ) {
          error = "Please enter first and last name";
        } else if (trimmed.length < 4) {
          error = "Name is too short";
        }
      } else if (field === "email") {
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format";
        } else if (isSuspiciousEmail(value)) {
          error = "Please use a permanent email";
        }
      } else if (field === "phone") {
        if (value && value.replace(/\D/g, "").length < 10) {
          error = "Invalid phone number";
        }
      }

      updateState({
        errors: { ...errors, [field]: error },
      });

      return !error;
    },
    [errors, isSuspiciousEmail]
  );

  const validateForm = () => {
    const validName = validateField("name", formData.name);
    const validEmail = validateField("email", formData.email);
    const validPhone = validateField("phone", formData.phone);

    return validName && validEmail && validPhone;
  };

  const handleRecaptchaChange = useCallback((token) => {
    updateState({
      recaptchaToken: token,
      isHumanVerified: !!token,
    });
  }, []);

  const copyToClipboard = () => {
    if (coupon) {
      navigator.clipboard.writeText(coupon).then(() => {
        alert("Coupon code copied to clipboard!");
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!isHumanVerified) {
      alert("Please complete the human verification");
      return;
    }

    updateState({ isSubmitting: true });

    try {
      // Verify reCAPTCHA first
      const verifyRes = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        throw new Error("reCAPTCHA verification failed");
      }

      const cpn = generateCouponCode(currentOffer);
      updateState({
        coupon: cpn,
      });

      // Submit form data
      const submitRes = await fetch("/api/submit-offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-recaptcha-response": recaptchaToken,
        },
        body: JSON.stringify({
          ...formData,
          offer: currentOffer,
          coupon: cpn,
          timestamp: new Date().toISOString(),
          recaptchaToken,
        }),
      });

      if (!submitRes.ok) {
        throw new Error("Form submission failed");
      }

      updateState({ isSuccess: true });
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      updateState({ isSubmitting: false });
    }
  };

  return (
    <>
      <AnimatePresence>
        {showButton && !showPopup && !isClosing && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              bounce: 0.5,
            }}
            onClick={openPopup}
            className="fixed bottom-6 left-6 z-20 h-14 w-14 rounded-full shadow-xl flex items-center justify-center text-white bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all group backdrop-blur-sm border border-amber-400/30 hover:shadow-amber-500/20 hover:scale-105"
            aria-label="View special offers"
          >
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
              <Sparkles className="absolute top-1 left-1 w-2 h-2 text-yellow-300 animate-pulse" />
              <Sparkles className="absolute bottom-2 right-2 w-1 h-1 text-yellow-200 animate-pulse delay-300" />
            </div>

            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Gift className="w-6 h-6" />
            </motion.div>
            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm backdrop-blur-sm border border-red-400/30 animate-bounce">
              !
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPopup && currentOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                bounce: 0.25,
              }}
              className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl ${currentOffer.bgColor} text-white backdrop-blur-lg border ${currentOffer.borderColor}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAyIj48L3JlY3Q+Cjwvc3ZnPg==')] opacity-10"></div>

              <div className="p-6 text-center relative z-10">
                <motion.button
                  onClick={closePopup}
                  className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10"
                  aria-label="Close offer"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {!showForm && !isSuccess ? (
                  <>
                    <motion.div
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mb-4 backdrop-blur-sm border border-white/10"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Gift className="w-6 h-6" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-2">
                      {currentOffer.title}
                    </h3>
                    <p className="text-white/90 mb-6">
                      {currentOffer.description}
                    </p>

                    <div className="flex gap-3 justify-center">
                      <motion.button
                        onClick={closePopup}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Maybe Later
                      </motion.button>
                      <motion.button
                        onClick={handleClaimOffer}
                        className="px-4 py-2 rounded-lg bg-white text-gray-900 font-medium hover:bg-white/90 transition-colors backdrop-blur-sm border border-white/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {currentOffer.cta}
                      </motion.button>
                    </div>
                  </>
                ) : isSuccess ? (
                  <div className="py-8">
                    <motion.div
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 mb-6 backdrop-blur-sm border border-green-400/30"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Check className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Success!</h3>
                    <p className="text-white/90 mb-4">
                      Your {currentOffer.title.toLowerCase()} request has been
                      received.
                    </p>

                    {coupon && (
                      <motion.div
                        className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20 relative"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <div className="absolute -top-3 -left-3 z-10">
                          <div className="relative">
                            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 font-extrabold px-3 py-1 rounded-md shadow-lg text-xs transform rotate-[-4deg] animate-pulse border border-amber-300">
                              {currentOffer.discount}% OFF
                            </div>
                            <div className="absolute -bottom-1 left-1 w-3 h-3 bg-amber-600 transform rotate-45 z-[-1]"></div>
                          </div>
                        </div>

                        <p className="text-sm text-white/80 mb-2">
                          Your exclusive coupon code:
                        </p>
                        <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                          <code className="font-mono text-sm sm:text-lg font-bold tracking-wider text-white">
                            {coupon}
                          </code>
                          <motion.button
                            onClick={copyToClipboard}
                            className="p-2 rounded hover:bg-white/10 transition-colors"
                            aria-label="Copy coupon"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Clipboard className="w-5 h-5 text-white/80" />
                          </motion.button>
                        </div>
                        <p className="text-xs text-white/60 mt-2">
                          Valid until{" "}
                          {new Date(
                            Date.now() +
                              currentOffer.validityDays * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </p>
                      </motion.div>
                    )}

                    <p className="text-white/80 mb-6">
                      {`Our team will contact you shortly to activate your offer,
                      we'll send you the coupon code and details via email.`}
                    </p>

                    <motion.button
                      onClick={closePopup}
                      className="px-4 py-2 rounded-lg bg-white text-gray-900 font-medium hover:bg-white/90 transition-colors backdrop-blur-sm border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                ) : !isHumanVerified ? (
                  <div className="mb-4 flex flex-col items-center justify-center gap-4">
                    <p className="text-white/80">{`Please verify you're human`}</p>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={recaptchaSiteKey}
                      onChange={handleRecaptchaChange}
                    />
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="py-4">
                    <h3 className="text-xl font-bold mb-4">
                      Claim Your {currentOffer.discount}% Offer
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          onBlur={() => handleBlur("name")}
                          placeholder="Your Full Name"
                          required
                          className={`w-full px-4 py-2 rounded-lg bg-white/10 placeholder-white/50 border ${
                            errors.name
                              ? "border-red-400 focus:ring-red-400/30"
                              : "border-white/20 focus:ring-white/30"
                          } focus:outline-none focus:ring-2 transition-colors`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-300 text-left animate-fadeIn">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          onBlur={() => handleBlur("email")}
                          placeholder="Email Address"
                          required
                          className={`w-full px-4 py-2 rounded-lg bg-white/10 placeholder-white/50 border ${
                            errors.email
                              ? "border-red-400 focus:ring-red-400/30"
                              : "border-white/20 focus:ring-white/30"
                          } focus:outline-none focus:ring-2 transition-colors`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-300 text-left animate-fadeIn">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <PhoneInput
                          international
                          defaultCountry="IN"
                          value={formData.phone}
                          onChange={(value) =>
                            handleInputChange("phone", value)
                          }
                          onBlur={() => handleBlur("phone")}
                          placeholder="Phone Number (Optional)"
                          className={`w-full [&>input]:bg-white/10 [&>input]:text-white [&>input]:placeholder-white/50 [&>input]:border ${
                            errors.phone
                              ? "[&>input]:border-red-400 [&>input]:focus:ring-red-400/30"
                              : "[&>input]:border-white/20 [&>input]:focus:ring-white/30"
                          } [&>input]:focus:outline-none [&>input]:focus:ring-2 [&>input]:px-4 [&>input]:py-2 [&>input]:rounded-lg [&>input]:transition-colors`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-300 text-left animate-fadeIn">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                      <motion.button
                        type="button"
                        onClick={() => updateState({ showForm: false })}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg bg-white text-gray-900 font-medium hover:bg-white/90 transition-colors backdrop-blur-sm border border-white/20 flex items-center gap-2 disabled:opacity-70"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OfferButton;
