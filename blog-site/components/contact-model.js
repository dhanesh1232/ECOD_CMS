import { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  FileText,
  Settings,
  User,
  Trash2,
} from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import { service_client_data } from "@/data/service_data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE;

// Constants
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
const MAX_FORM_SUBMISSIONS = 10;
const RESEND_COOLDOWN = 60; // seconds

const ContactModel = ({ onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // State management
  const [currentStage, setCurrentStage] = useState(1);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState("IN");
  const [selectedServiceBudget, setSelectedServiceBudget] = useState([]);
  const [selectedServiceTimeline, setSelectedServiceTimeline] = useState([]);

  // Form data and validation
  const [formData, setFormData] = useState({
    personalInfo: { name: "", email: "", phone: "" },
    serviceDetails: { serviceType: "", budget: "", timeline: "" },
    projectBrief: {
      description: "",
      referenceLinks: "",
      budgetDetails: "",
      timelineDetails: "",
    },
  });

  const [touchedFields, setTouchedFields] = useState({
    personalInfo: { name: false, email: false, phone: false },
    serviceDetails: { serviceType: false, budget: false, timeline: false },
    projectBrief: {
      description: false,
      referenceLinks: false,
      budgetDetails: false,
      timelineDetails: false,
    },
  });

  // Verification states
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaExpired, setRecaptchaExpired] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [whatsappOtp, setWhatsappOtp] = useState("");
  const [whatsappVerificationCode, setWhatsappVerificationCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [whatsappVerified, setWhatsappVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [whatsappResendCooldown, setWhatsappResendCooldown] = useState(0);
  const [statusMessage, setStatusMessage] = useState(null);
  const [verificationInProgress, setVerificationInProgress] = useState(false);

  // Fraud prevention state
  const [formSubmissions, setFormSubmissions] = useState(0);
  const [ipAddress, setIpAddress] = useState(null);
  const [userAgent, setUserAgent] = useState(null);
  const [formFingerprint, setFormFingerprint] = useState(null);
  const [isHumanVerified, setIsHumanVerified] = useState(false);

  //Coupon Checkbox
  const [isCoupon, setIsCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [couponError, setCouponError] = useState(null);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState(null);

  // Refs
  const recaptchaRef = useRef(null);
  const timerRef = useRef(null);

  // Enhanced reCAPTCHA handlers
  const handleRecaptchaChange = useCallback(async (token) => {
    try {
      const res = await fetch("/api/verify-captcha/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      setRecaptchaToken(token);
      setIsHumanVerified(data.success);
      setRecaptchaExpired(false);
    } catch (error) {
      console.error("CAPTCHA verification failed", error);
      setIsHumanVerified(false);
    }
  }, []);

  const handleRecaptchaExpired = useCallback(() => {
    setRecaptchaToken(null);
    setIsHumanVerified(false);
    setRecaptchaExpired(true);
  }, []);

  const handleRecaptchaError = useCallback(() => {
    setRecaptchaToken(null);
    setIsHumanVerified(false);
  }, []);

  useEffect(() => {
    const matchedService = service_client_data.find(
      (item) => item.slug === formData.serviceDetails.serviceType
    );
    setSelectedServiceDetails(matchedService);
    setSelectedServiceBudget(matchedService?.budget_range || []);
    setSelectedServiceTimeline(matchedService?.timeline || []);
  }, [formData.serviceDetails.serviceType]);

  // Derived values
  const isCustomBudget = useCallback(
    () => ["custom"].includes(formData.serviceDetails.budget),
    [formData.serviceDetails.budget]
  );

  const isCustomTimeline = useCallback(
    () => ["custom"].includes(formData.serviceDetails.timeline),
    [formData.serviceDetails.timeline]
  );

  // Form validation
  const [formValid, setFormValid] = useState({
    stage1: false,
    stage2: false,
    stage3: false,
    stage4: false,
    stage5: false,
  });

  // Effects
  useEffect(() => {
    // Generate form fingerprint on mount
    const fingerprint = {
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      colorDepth: window.screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      plugins: Array.from(navigator.plugins)
        .map((p) => p.name)
        .join(","),
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack || "unknown",
      hardwareConcurrency: navigator.hardwareConcurrency || "unknown",
      language: navigator.language,
      platform: navigator.platform,
    };
    setFormFingerprint(JSON.stringify(fingerprint));
    setUserAgent(navigator.userAgent);

    // Get IP address
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        console.log(fingerprint);
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
        setIpAddress("unknown");
      }
    };

    fetchIP();

    // Check submission count from localStorage
    const submissions = localStorage.getItem("formSubmissions");
    if (submissions) {
      setFormSubmissions(parseInt(submissions));
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef?.current);
      }
    };
  }, []);

  const validateCoupon = async () => {
    if (!couponCode) {
      setCouponError("Please enter a coupon code");
      return;
    }
    setIsValidatingCoupon(true);
    setCouponError(null);

    try {
      const response = await fetch(
        `/api/submit-offer?coupon=${encodeURIComponent(couponCode)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Clone the response to safely read it
      const responseClone = response.clone();

      if (!response.ok) {
        // Handle 404 and other error responses
        if (response.status === 404) {
          setCouponError("Coupon Invalid or Expired");
        } else {
          try {
            const errorData = await responseClone.json();
            setCouponError(errorData.message || "Invalid coupon code");
          } catch {
            setCouponError("Failed to validate coupon");
          }
        }
        return;
      }

      // Handle successful response
      const data = await response.json();
      if (data.isUsed) {
        setCouponError("Coupon already used");
        return;
      }
      if (data.offer.couponPrefix !== selectedServiceDetails.prefix) {
        setCouponError(`Coupon not valid for ${selectedServiceDetails.prefix}`);
        return;
      }
      setIsCouponValid(true);
    } catch (error) {
      setCouponError("Network error. Please try again.");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setIsCoupon(false);
    setCouponCode("");
    setIsCouponValid(false);
    setCouponError(null);
  };

  // Helper functions
  const isSuspiciousEmail = useCallback((email) => {
    if (!email || typeof email !== "string") return false;
    const parts = email.split("@");
    if (parts.length !== 2 || !parts[1]) return false;
    const domain = parts[1].toLowerCase();
    return TEMP_EMAIL_DOMAINS.some((tempDomain) =>
      domain.includes(tempDomain.toLowerCase())
    );
  }, []);

  const isFieldInvalid = useCallback(
    (stage, field, value) => {
      if (!touchedFields[stage][field]) return false;

      if (field === "email") {
        return (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || isSuspiciousEmail(value)
        );
      }

      if (field === "phone") {
        return !value || value.replace(/\D/g, "").length < 9;
      }

      if (field === "name") {
        const trimmedValue = value.trim();
        if (trimmedValue === "") return true;
        const nameParts = trimmedValue
          .split(/\s+/)
          .filter((part) => part.length > 0);
        if (nameParts.length !== 2) return true;
        return nameParts.some((part) => part.length < 2);
      }

      return value.trim() === "";
    },
    [touchedFields, isSuspiciousEmail]
  );

  useEffect(() => {
    // Validate form stages
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) && !isSuspiciousEmail(email);
    };

    const validatePhone = (phone) => {
      return phone && phone.replace(/\D/g, "").length > 7;
    };

    const isStage1Valid =
      formData.personalInfo.name.trim() !== "" &&
      validateEmail(formData.personalInfo.email) &&
      validatePhone(formData.personalInfo.phone);

    const isStage2Valid =
      formData.serviceDetails.serviceType.trim() !== "" &&
      formData.serviceDetails.budget.trim() !== "" &&
      formData.serviceDetails.timeline.trim() !== "";

    const isStage3Valid =
      formData.projectBrief.description.trim() !== "" &&
      (!isCustomBudget() ||
        formData.projectBrief.budgetDetails.trim() !== "") &&
      (!isCustomTimeline() ||
        formData.projectBrief.timelineDetails.trim() !== "");

    setFormValid({
      stage1: isStage1Valid,
      stage2: isStage2Valid,
      stage3: isStage3Valid,
      stage4: isHumanVerified && emailVerified && whatsappVerified,
      stage5: isCoupon ? isCouponValid : true,
    });
  }, [
    formData,
    isCustomBudget,
    isCustomTimeline,
    isHumanVerified,
    emailVerified,
    whatsappVerified,
    isSuspiciousEmail,
    isCouponValid,
    isCoupon,
  ]);

  // Verification handlers
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...userEnteredCode];
    newOtp[index] = value;
    setUserEnteredCode(newOtp.join(""));

    if (value && index < 5) {
      const nextInput = document.querySelector(
        `input[data-index="${index + 1}"]`
      );
      nextInput?.focus();
    }
  };

  const handleWhatsappOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...whatsappOtp];
    newOtp[index] = value;
    setWhatsappOtp(newOtp.join(""));

    if (value && index < 5) {
      const nextInput = document.querySelector(
        `input[data-whatsapp-index="${index + 1}"]`
      );
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !userEnteredCode[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[data-index="${index - 1}"]`
      );
      prevInput?.focus();
    }
  };

  const handleWhatsappOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !whatsappOtp[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[data-whatsapp-index="${index - 1}"]`
      );
      prevInput?.focus();
    }
  };

  // Verification functions
  const sendVerification = useCallback(
    async (type) => {
      setVerificationInProgress(true);
      setStatusMessage(null);

      try {
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        if (type === "email") {
          setVerificationCode(code);
          setUserEnteredCode("");
        } else {
          setWhatsappVerificationCode(code);
          setWhatsappOtp("");
        }

        const response = await fetch(`/api/send-verification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Client-Info": JSON.stringify({
              fingerprint: formFingerprint,
            }),
          },
          body: JSON.stringify({
            [type === "email" ? "email" : "phone"]:
              type === "email"
                ? formData.personalInfo.email
                : formData.personalInfo.phone,
            code,
            name: formData.personalInfo.name,
            ipAddress,
            userAgent,
            service: formData.serviceDetails.serviceType.replace(/-/g, "-"),
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to send verification");
        }

        if (type === "email") {
          setEmailVerificationSent(true);
        }
        startResendCooldown(type);

        setStatusMessage({
          type: "success",
          text: `Verification code sent to your ${type}`,
        });
      } catch (error) {
        setStatusMessage({
          type: "error",
          text: error.message || "Failed to send verification code",
        });
      } finally {
        setVerificationInProgress(false);
      }
    },
    [
      formData.personalInfo.email,
      formData.personalInfo.phone,
      formData.personalInfo.name,
      formFingerprint,
      formData.serviceDetails.serviceType,
      ipAddress,
      userAgent,
    ]
  );

  const resendVerification = () => sendVerification("email");
  const resendWhatsappVerification = () => sendVerification("whatsapp");

  const startResendCooldown = (type) => {
    if (type === "email") {
      setResendCooldown(RESEND_COOLDOWN);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) clearInterval(timer);
          return prev - 1;
        });
      }, 1000);
    } else {
      setWhatsappResendCooldown(RESEND_COOLDOWN);
      const timer = setInterval(() => {
        setWhatsappResendCooldown((prev) => {
          if (prev <= 1) clearInterval(timer);
          return prev - 1;
        });
      }, 1000);
    }
  };

  const verifyEmailCode = async () => {
    if (userEnteredCode.length !== 6) {
      setStatusMessage({
        type: "error",
        text: "Please enter a 6-digit code",
      });
      return;
    }

    try {
      setVerificationInProgress(true);
      if (userEnteredCode === verificationCode) {
        setEmailVerified(true);
        setStatusMessage({
          type: "success",
          text: "Email verified successfully!",
        });
        sendVerification("whatsapp");
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: error.message || "Verification failed",
      });
    } finally {
      setVerificationInProgress(false);
    }
  };

  const verifyWhatsappCode = async () => {
    if (whatsappOtp.length !== 6) {
      setStatusMessage({
        type: "error",
        text: "Please enter a 6-digit code",
      });
      return;
    }

    try {
      setVerificationInProgress(true);
      if (whatsappOtp === whatsappVerificationCode) {
        setWhatsappVerified(true);
        setStatusMessage({
          type: "success",
          text: "WhatsApp verified successfully!",
        });
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: error.message || "Verification failed",
      });
    } finally {
      setVerificationInProgress(false);
    }
  };

  // Form handlers
  const handleBlur = useCallback((stage, field) => {
    setTouchedFields((prev) => ({
      ...prev,
      [stage]: {
        ...prev[stage],
        [field]: true,
      },
    }));
  }, []);

  const handleInputChange = useCallback((stage, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [stage]: {
        ...prev[stage],
        [field]: value,
      },
    }));
  }, []);

  const nextStage = useCallback(
    (e) => {
      e.preventDefault();
      if (formValid[`stage${currentStage}`]) {
        setCurrentStage((prev) => prev + 1);
        if (currentStage === 3 && !verificationCode) {
          sendVerification("email");
        }
      }
    },
    [currentStage, formValid, verificationCode, sendVerification]
  );

  const prevStage = useCallback(() => {
    setCurrentStage((prev) => Math.max(1, prev - 1));
    setSubmitError(null);
  }, []);

  const handleClose = () => {
    try {
      setSubmitError(null);
      setSubmitSuccess(false);
      setTouchedFields({
        personalInfo: { name: false, email: false, phone: false },
        serviceDetails: { serviceType: false, budget: false, timeline: false },
        projectBrief: {
          description: false,
          referenceLinks: false,
          budgetDetails: false,
          timelineDetails: false,
        },
      });
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Check rate limit
      const currentSubmissions = formSubmissions;
      if (currentSubmissions >= MAX_FORM_SUBMISSIONS) {
        const firstSubmissionTime = Date.now() - 24 * 60 * 60 * 1000;
        const resetTime = firstSubmissionTime + 24 * 60 * 60 * 1000;
        const timeLeft = Math.ceil((resetTime - Date.now()) / (60 * 60 * 1000));
        throw new Error(
          `Too many submissions. Please try again in ${timeLeft} hours.`
        );
      }

      // Prepare submission data
      const submissionData = {
        formData,
        metadata: {
          ipAddress,
          userAgent,
          formFingerprint,
          recaptchaToken,
          submissionTime: new Date().toISOString(),
          submissionCount: currentSubmissions + 1,
          verificationMethod: {
            email: emailVerified,
            whatsapp: whatsappVerified,
          },
        },
      };

      setFormSubmissions(currentSubmissions + 1);

      // Submit data
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Submission failed");
      }

      setSubmitSuccess(true);
      // Reset form after delay
      setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        params.delete("modal");
        router.push(`${pathname}`);
        handleClose();
        setFormData({
          personalInfo: { name: "", email: "", phone: "" },
          serviceDetails: { serviceType: "", budget: "", timeline: "" },
          projectBrief: {
            description: "",
            referenceLinks: "",
            budgetDetails: "",
            timelineDetails: "",
          },
        });
        setCurrentStage(1);
        setVerificationCode("");
        setUserEnteredCode("");
        setIsHumanVerified(false);
        recaptchaRef.current?.reset();
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(error.message || "An error occurred during submission");
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-2">
      <div
        ref={formRef}
        className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close contact modal"
        >
          <X size={24} />
        </button>

        <div className="p-4 sm:p-6">
          <h1 className="text-xl md:text-2xl text-gray-800/80 font-bold mb-4">
            Contact Our Team
          </h1>

          {/* Progress Steps */}
          <div className="flex justify-between mb-2 relative">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className="flex flex-col items-center z-10"
                style={{ width: `${100 / 5}%` }}
              >
                <div
                  className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center 
                    ${currentStage >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"} 
                    ${currentStage === step ? "ring-4 ring-blue-300" : ""}`}
                >
                  {step}
                </div>
                <span className="text-xs mt-2 text-gray-600 text-center">
                  {step === 1 && "Personal Info"}
                  {step === 2 && "Service Details"}
                  {step === 3 && "Project Brief"}
                  {step === 4 && "Verification"}
                  {step === 5 && "Confirmation"}
                </span>
              </div>
            ))}
            <div className="absolute top-3.5 sm:top-5 left-8 right-8 h-1 bg-gray-200 -z-1">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(currentStage - 1) * 25}%` }}
              ></div>
            </div>
          </div>

          {submitSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Thank You!
              </h2>
              <p className="text-gray-600 mb-6">
                Your request has been submitted successfully. Our team will
                contact you shortly.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Error message display */}
              {submitError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Stage 1: Personal Info */}
              {currentStage === 1 && (
                <div className="space-y-2 sm:space-y-4">
                  <div>
                    <label
                      htmlFor="name-input"
                      className={`block text-sm font-medium mb-1 ${isFieldInvalid("personalInfo", "name", formData.personalInfo.name) ? "text-red-600" : "text-gray-700"}`}
                    >
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name-input"
                      value={formData.personalInfo.name}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "name",
                          e.target.value
                        )
                      }
                      onBlur={() => handleBlur("personalInfo", "name")}
                      placeholder={`Enter your full name`}
                      autoComplete="name"
                      className={`w-full text-black px-4 py-1.5 sm:py-2 border rounded-lg focus:ring-2 outline-none transition ${isFieldInvalid("personalInfo", "name", formData.personalInfo.name) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email-input"
                      className={`block text-sm font-medium mb-1 ${isFieldInvalid("personalInfo", "email", formData.personalInfo.email) ? "text-red-600" : "text-gray-700"}`}
                    >
                      Email*
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "email",
                          e.target.value
                        )
                      }
                      onBlur={() => handleBlur("personalInfo", "email")}
                      className={`w-full px-4 text-black py-1.5 sm:py-2 border rounded-lg focus:ring-2 outline-none transition ${isFieldInvalid("personalInfo", "email", formData.personalInfo.email) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      placeholder={
                        isFieldInvalid(
                          "personalInfo",
                          "email",
                          formData.personalInfo.email
                        )
                          ? formData.personalInfo.email &&
                            isSuspiciousEmail(formData.personalInfo.email)
                            ? "Please use a permanent email address"
                            : "Please enter a valid email"
                          : "Enter your email address"
                      }
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="phone-input"
                      className="block text-sm font-medium text-gray-700"
                    >
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <PhoneInput
                        international
                        defaultCountry={defaultCountry}
                        value={formData.personalInfo.phone}
                        onChange={(value) =>
                          handleInputChange("personalInfo", "phone", value)
                        }
                        numberInputProps={{
                          className: `!py-2 text-gray-800 rounded-lg border-gray-600 !text-sm ${
                            isFieldInvalid(
                              "personalInfo",
                              "phone",
                              formData.personalInfo.phone
                            )
                              ? "ring-red-500"
                              : ""
                          }`,
                          disabled: isFieldInvalid(
                            "personalInfo",
                            "phone",
                            formData.personalInfo.phone
                          ),
                        }}
                        onBlur={() => handleBlur("personalInfo", "phone")}
                        placeholder={
                          isFieldInvalid(
                            "personalInfo",
                            "phone",
                            formData.personalInfo.phone
                          )
                            ? "Please enter a valid WhatsApp number"
                            : "e.g. +1 555 123 4567"
                        }
                        countrySelectProps={{
                          className: "!py-2 !text-sm",
                        }}
                        className={`phone-input text-gray-800 ${
                          isFieldInvalid(
                            "personalInfo",
                            "phone",
                            formData.personalInfo.phone
                          )
                            ? "ring-red-500"
                            : ""
                        }`}
                      />
                      {isFieldInvalid(
                        "personalInfo",
                        "phone",
                        formData.personalInfo.phone
                      ) && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {`Include country code. We'll only contact you via WhatsApp.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Stage 2: Service Details */}
              {currentStage === 2 && (
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${isFieldInvalid("serviceDetails", "serviceType", formData.serviceDetails.serviceType) ? "text-red-600" : "text-gray-700"}`}
                    >
                      Service Type*
                    </label>
                    <select
                      value={formData.serviceDetails.serviceType}
                      onChange={(e) =>
                        handleInputChange(
                          "serviceDetails",
                          "serviceType",
                          e.target.value
                        )
                      }
                      onBlur={() => handleBlur("serviceDetails", "serviceType")}
                      className={`w-full px-4 text-black py-1.5 sm:py-2 border rounded-lg focus:ring-2 outline-none transition ${isFieldInvalid("serviceDetails", "serviceType", formData.serviceDetails.serviceType) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      required
                    >
                      <option value="" className="text-gray-400">
                        Select a service
                      </option>
                      {service_client_data.map((service) => (
                        <option key={service.slug} value={service.slug}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${isFieldInvalid("serviceDetails", "budget", formData.serviceDetails.budget) ? "text-red-600" : "text-gray-700"}`}
                    >
                      Budget Range*
                    </label>
                    <select
                      value={formData.serviceDetails.budget}
                      onChange={(e) =>
                        handleInputChange(
                          "serviceDetails",
                          "budget",
                          e.target.value
                        )
                      }
                      disabled={selectedServiceBudget.length === 0}
                      onBlur={() => handleBlur("serviceDetails", "budget")}
                      className={`w-full text-black px-4 py-1.5 sm:py-2 border rounded-lg focus:ring-2 ${selectedServiceBudget.length === 0 && "pointer-events-none"} outline-none transition ${isFieldInvalid("serviceDetails", "budget", formData.serviceDetails.budget) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      required
                    >
                      <option value="" className="text-gray-400">
                        Select budget
                      </option>
                      {selectedServiceBudget &&
                        selectedServiceBudget.map((budget) => (
                          <option key={budget.value} value={budget.value}>
                            {budget.label}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${isFieldInvalid("serviceDetails", "timeline", formData.serviceDetails.timeline) ? "text-red-600" : "text-gray-700"}`}
                    >
                      Project Timeline*
                    </label>
                    <select
                      value={formData.serviceDetails.timeline}
                      onChange={(e) =>
                        handleInputChange(
                          "serviceDetails",
                          "timeline",
                          e.target.value
                        )
                      }
                      disabled={selectedServiceTimeline.length === 0}
                      onBlur={() => handleBlur("serviceDetails", "timeline")}
                      className={`w-full px-4 py-1.5 sm:py-2 text-black border ${selectedServiceTimeline.length === 0 && "pointer-events-none"} rounded-lg focus:ring-2 outline-none transition ${isFieldInvalid("serviceDetails", "timeline", formData.serviceDetails.timeline) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      required
                    >
                      <option value="" className="text-gray-400">
                        Select timeline
                      </option>
                      {selectedServiceTimeline &&
                        selectedServiceTimeline.map((timeline) => (
                          <option key={timeline.value} value={timeline.value}>
                            {timeline.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Stage 3: Project Brief */}
              {currentStage === 3 && (
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${isFieldInvalid("projectBrief", "description", formData.projectBrief.description) ? "text-red-600" : "text-gray-700"}`}
                    >
                      Project Description*
                    </label>
                    <textarea
                      value={formData.projectBrief.description}
                      onChange={(e) =>
                        handleInputChange(
                          "projectBrief",
                          "description",
                          e.target.value
                        )
                      }
                      onBlur={() => handleBlur("projectBrief", "description")}
                      className={`w-full px-4 py-1.5 sm:py-2 border text-black rounded-lg focus:ring-2 outline-none transition min-h-[120px] ${isFieldInvalid("projectBrief", "description", formData.projectBrief.description) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      placeholder="Describe your project in detail..."
                      required
                    />
                  </div>

                  {isCustomBudget() && (
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${isFieldInvalid("projectBrief", "budgetDetails", formData.projectBrief.budgetDetails) ? "text-red-600" : "text-gray-700"}`}
                      >
                        {formData.serviceDetails.budget === "custom"
                          ? "Please specify your custom budget*"
                          : "What budget range are you considering?*"}
                      </label>
                      <textarea
                        value={formData.projectBrief.budgetDetails}
                        onChange={(e) =>
                          handleInputChange(
                            "projectBrief",
                            "budgetDetails",
                            e.target.value
                          )
                        }
                        onBlur={() =>
                          handleBlur("projectBrief", "budgetDetails")
                        }
                        className={`w-full px-4 py-1.5 sm:py-2 border rounded-lg focus:ring-2 outline-none transition min-h-[60px] ${isFieldInvalid("projectBrief", "budgetDetails", formData.projectBrief.budgetDetails) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                        required={isCustomBudget()}
                        placeholder={
                          formData.serviceDetails.budget === "custom"
                            ? "E.g. $12,000 - $15,000"
                            : "E.g. We're flexible but likely between $10k-$20k"
                        }
                      />
                    </div>
                  )}

                  {isCustomTimeline() && (
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${isFieldInvalid("projectBrief", "timelineDetails", formData.projectBrief.timelineDetails) ? "text-red-600" : "text-gray-700"}`}
                      >
                        {formData.serviceDetails.timeline === "custom"
                          ? "Please specify your timeline*"
                          : "What timeline are you considering?*"}
                      </label>
                      <textarea
                        value={formData.projectBrief.timelineDetails}
                        onChange={(e) =>
                          handleInputChange(
                            "projectBrief",
                            "timelineDetails",
                            e.target.value
                          )
                        }
                        onBlur={() =>
                          handleBlur("projectBrief", "timelineDetails")
                        }
                        className={`w-full px-4 py-1.5 sm:py-2 border rounded-lg focus:ring-2 outline-none transition min-h-[60px] ${isFieldInvalid("projectBrief", "timelineDetails", formData.projectBrief.timelineDetails) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                        required={isCustomTimeline()}
                        placeholder={
                          formData.serviceDetails.timeline === "custom"
                            ? "E.g. 4-5 months with testing phase"
                            : "E.g. We need MVP in 2 months but full product can take longer"
                        }
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reference Links (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.projectBrief.referenceLinks}
                      onChange={(e) =>
                        handleInputChange(
                          "projectBrief",
                          "referenceLinks",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Website URLs, Figma links, etc."
                    />
                  </div>
                </div>
              )}

              {currentStage === 4 && (
                <div className="space-y-2">
                  {/* reCAPTCHA */}
                  <div className="mb-4">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={recaptchaSiteKey}
                      onChange={handleRecaptchaChange}
                      onExpired={handleRecaptchaExpired}
                      onErrored={handleRecaptchaError}
                    />
                    {recaptchaExpired && (
                      <p className="text-sm text-red-500 mt-1">
                        reCAPTCHA verification expired. Please verify again.
                      </p>
                    )}
                  </div>
                  {emailVerified && whatsappVerified ? (
                    // Both verifications completed - show success cards
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-green-800">
                            Email Verified
                          </h3>
                          <p className="text-sm text-green-600">
                            {formData.personalInfo.email}
                          </p>
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-green-800">
                            WhatsApp Verified
                          </h3>
                          <p className="text-sm text-green-600">
                            {formData.personalInfo.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      {/* Email Verification Block */}
                      {!emailVerified ? (
                        <div className="space-y-4">
                          <p className="text-sm text-gray-700">
                            {`We'll send a 6-digit code to`}{" "}
                            {formData.personalInfo.email}
                          </p>

                          {emailVerificationSent ? (
                            <>
                              <div className="flex justify-center gap-3 mb-4">
                                {[...Array(6)].map((_, i) => (
                                  <div key={i} className="relative w-12 h-12">
                                    <input
                                      type="text"
                                      inputMode="numeric"
                                      maxLength={1}
                                      value={userEnteredCode[i] || ""}
                                      onChange={(e) => handleOtpChange(e, i)}
                                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                                      data-index={i}
                                      className="w-full h-full text-2xl text-center font-medium text-gray-900 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all"
                                    />
                                    {!userEnteredCode[i] && (
                                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-0.5 h-6 bg-blue-400 animate-pulse" />
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>

                              <div className="flex justify-between items-center">
                                <button
                                  type="button"
                                  onClick={resendVerification}
                                  disabled={resendCooldown > 0}
                                  className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                                >
                                  {resendCooldown > 0
                                    ? `Resend in ${resendCooldown}s`
                                    : "Resend Code"}
                                </button>

                                <button
                                  type="button"
                                  onClick={verifyEmailCode}
                                  disabled={
                                    userEnteredCode.length !== 6 ||
                                    verificationInProgress ||
                                    !isHumanVerified
                                  }
                                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                  {verificationInProgress ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Verify Email"
                                  )}
                                </button>
                              </div>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => sendVerification("email")}
                              disabled={
                                verificationInProgress || !isHumanVerified
                              }
                              className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center disabled:opacity-50"
                            >
                              {verificationInProgress ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              ) : (
                                <Mail className="h-4 w-4 mr-2" />
                              )}
                              Send Email Verification Code
                            </button>
                          )}
                        </div>
                      ) : (
                        /* WhatsApp Verification Block */
                        <div className="space-y-4">
                          <p className="text-sm text-gray-700">
                            {`We've sent a 6-digit code to your WhatsApp`}:{" "}
                            {formData.personalInfo.phone}
                          </p>

                          <div className="flex justify-center gap-3 mb-4">
                            {[...Array(6)].map((_, i) => (
                              <div key={i} className="relative w-12 h-12">
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={1}
                                  value={whatsappOtp[i] || ""}
                                  onChange={(e) =>
                                    handleWhatsappOtpChange(e, i)
                                  }
                                  onKeyDown={(e) =>
                                    handleWhatsappOtpKeyDown(e, i)
                                  }
                                  data-whatsapp-index={i}
                                  className="w-full h-full text-2xl text-center font-medium text-gray-900 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all"
                                />
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center">
                            <button
                              type="button"
                              onClick={resendWhatsappVerification}
                              disabled={whatsappResendCooldown > 0}
                              className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                            >
                              {whatsappResendCooldown > 0
                                ? `Resend in ${whatsappResendCooldown}s`
                                : "Resend Code"}
                            </button>

                            <button
                              type="button"
                              onClick={verifyWhatsappCode}
                              disabled={
                                whatsappOtp.length !== 6 ||
                                verificationInProgress ||
                                !isHumanVerified
                              }
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                              {verificationInProgress ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Verify WhatsApp"
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Verification Status */}
                  {emailVerified && whatsappVerified
                    ? null
                    : statusMessage && (
                        <div
                          className={`p-3 rounded-md ${
                            statusMessage.type === "error"
                              ? "bg-red-50 text-red-600"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          <div className="flex items-center">
                            {statusMessage.type === "error" ? (
                              <AlertCircle className="h-5 w-5 mr-2" />
                            ) : (
                              <CheckCircle className="h-5 w-5 mr-2" />
                            )}
                            <span>
                              {statusMessage.text.includes("Too many requests")
                                ? "You've tried too many times. Please wait 5 minutes and try again."
                                : statusMessage.text}
                            </span>
                          </div>
                        </div>
                      )}
                </div>
              )}

              {currentStage === 5 && (
                <div className="space-y-2 max-h-[50vh] overflow-y-auto scroll-smooth">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Ready to Submit
                    </h3>
                    <p className="text-sm text-gray-600">
                      Please review your information below before submitting.
                      Our team will contact you within 24 hours.
                    </p>
                  </div>

                  {/* Personal Info Card */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                      <h4 className="font-medium text-gray-800 flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-500" />
                        Personal Information
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStage(1)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Full Name</span>
                        <span className="text-sm font-medium">
                          {formData.personalInfo.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Email</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-1">
                            {formData.personalInfo.email}
                          </span>
                          {emailVerified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">WhatsApp</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-1">
                            {formData.personalInfo.phone}
                          </span>
                          {whatsappVerified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Details Card */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                      <h4 className="font-medium text-gray-800 flex items-center">
                        <Settings className="w-4 h-4 mr-2 text-gray-500" />
                        Service Details
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStage(2)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Service Type
                        </span>
                        <span className="text-sm font-medium">
                          {
                            service_client_data.find(
                              (s) =>
                                s.slug === formData.serviceDetails.serviceType
                            )?.label
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Budget Range
                        </span>
                        <span className="text-sm font-medium">
                          {formData.serviceDetails.budget === "custom"
                            ? "Custom"
                            : selectedServiceBudget.find(
                                (b) =>
                                  b.value === formData.serviceDetails.budget
                              )?.label}
                        </span>
                      </div>
                      {isCustomBudget() && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Budget Details
                          </span>
                          <span className="text-sm font-medium">
                            {formData.projectBrief.budgetDetails}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Project Timeline
                        </span>
                        <span className="text-sm font-medium">
                          {formData.serviceDetails.timeline === "custom"
                            ? "Custom"
                            : selectedServiceTimeline.find(
                                (t) =>
                                  t.value === formData.serviceDetails.timeline
                              )?.label}
                        </span>
                      </div>
                      {isCustomTimeline() && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Timeline Details
                          </span>
                          <span className="text-sm font-medium">
                            {formData.projectBrief.timelineDetails}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Brief Card */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                      <h4 className="font-medium text-gray-800 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-gray-500" />
                        Project Brief
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStage(3)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-1">
                          Description
                        </h5>
                        <p className="text-sm text-gray-800 whitespace-pre-line">
                          {formData.projectBrief.description}
                        </p>
                      </div>
                      {formData.projectBrief.referenceLinks && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">
                            Reference Links
                          </h5>
                          <p className="text-sm text-blue-600 break-all">
                            {formData.projectBrief.referenceLinks}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/*<div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800">Coupon Code</h3>
                      {!isCoupon ? (
                        <button
                          type="button"
                          onClick={() => setIsCoupon(true)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          + Add Coupon
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={removeCoupon}
                          className="text-sm text-red-600 hover:text-red-800 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </button>
                      )}
                    </div>

                    {isCoupon && (
                      <div className="mt-3">
                        {isCouponValid ? (
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-green-700">
                              Coupon applied successfully! ({couponCode})
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="sm:flex gap-2 space-y-2 sm:space-y-0">
                              <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                                className={`flex-1 w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500`}
                                disabled={isValidatingCoupon}
                              />
                              <button
                                type="button"
                                onClick={validateCoupon}
                                disabled={!couponCode || isValidatingCoupon}
                                className={`px-4 w-full sm:w-auto py-2 rounded-md text-white ${
                                  !couponCode || isValidatingCoupon
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                              >
                                {isValidatingCoupon ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  "Validate"
                                )}
                              </button>
                            </div>
                            {couponError && (
                              <p className="text-sm text-red-600 mt-1">
                                {couponError}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>*/}
                  {/* Final Verification */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="final-confirmation"
                        checked={isHumanVerified}
                        disabled={true}
                        onChange={() => setIsHumanVerified(!isHumanVerified)}
                        className="mt-1 mr-2"
                      />
                      <label
                        htmlFor="final-confirmation"
                        className="text-sm text-gray-700"
                      >
                        I confirm that all the information provided is accurate
                        and I agree to be contacted by the team regarding my
                        project inquiry.
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-3">
                <div>
                  {currentStage > 1 && (
                    <button
                      type="button"
                      onClick={prevStage}
                      disabled={isSubmitting}
                      className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      Back
                    </button>
                  )}
                </div>
                <div>
                  {currentStage < 5 ? (
                    <button
                      type="button"
                      onClick={(e) => nextStage(e)}
                      disabled={
                        !formValid[`stage${currentStage}`] || isSubmitting
                      }
                      className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center min-w-[100px] ${
                        formValid[`stage${currentStage}`]
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      } ${isSubmitting ? "opacity-75" : ""}`}
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : currentStage === 4 ? (
                        "Review"
                      ) : (
                        "Continue"
                      )}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!formValid.stage5 || isSubmitting}
                      className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center min-w-[120px] ${
                        formValid.stage5
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      } ${isSubmitting ? "opacity-75" : ""}`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModel;
