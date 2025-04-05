import { useState, useEffect, useRef, useCallback } from "react";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import {
  customer_budget_range,
  customer_porject_timeline,
  services_ecod,
} from "../../data/service_data";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE;
// Temporary email domains to block
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

const MAX_FORM_SUBMISSIONS = 10; // Max submissions in 24 hours
const VERIFICATION_CODE_EXPIRY = 10 * 60 * 1000; // 10 minutes

const ContactModel = () => {
  const router = useRouter();
  const [openSection, setOpenSection] = useState("personal");
  const [isContactModel, setIsContactModel] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const formRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Track touched fields for validation
  const [touchedFields, setTouchedFields] = useState({
    personalInfo: {
      name: false,
      email: false,
      phone: false,
    },
    serviceDetails: {
      serviceType: false,
      budget: false,
      timeline: false,
    },
    projectBrief: {
      description: false,
      referenceLinks: false,
      budgetDetails: false,
      timelineDetails: false,
    },
  });

  // Form data state
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
    },
    serviceDetails: {
      serviceType: "",
      budget: "",
      timeline: "",
    },
    projectBrief: {
      description: "",
      referenceLinks: "",
      budgetDetails: "",
      timelineDetails: "",
    },
  });

  // Fraud prevention state
  const [formSubmissions, setFormSubmissions] = useState(0);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [userAgent, setUserAgent] = useState(null);
  const [formFingerprint, setFormFingerprint] = useState(null);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const recaptchaRef = useRef(null);
  const timerRef = useRef(null);

  // Form validation state
  const [formValid, setFormValid] = useState({
    stage1: false,
    stage2: false,
    stage3: false,
    stage4: false,
  });

  // Generate form fingerprint on mount
  useEffect(() => {
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

    // Get IP address (in production, this should be done server-side)
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
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
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Check if budget is custom/not sure
  const isCustomBudget = useCallback(
    () => ["custom"].includes(formData.serviceDetails.budget),
    [formData.serviceDetails.budget]
  );

  // Check if timeline is custom/not sure
  const isCustomTimeline = useCallback(
    () => ["custom"].includes(formData.serviceDetails.timeline),
    [formData.serviceDetails.timeline]
  );

  // Validate form stages with fraud checks
  useEffect(() => {
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

    const isStage4Valid =
      isHumanVerified &&
      verificationCode &&
      verificationCode === userEnteredCode;

    setFormValid({
      stage1: isStage1Valid,
      stage2: isStage2Valid,
      stage3: isStage3Valid,
      stage4: isStage4Valid,
    });
  }, [
    formData,
    isHumanVerified,
    verificationCode,
    userEnteredCode,
    isCustomBudget,
    isCustomTimeline,
  ]);

  // Check for suspicious email patterns
  const isSuspiciousEmail = useCallback((email) => {
    if (!email) return false;
    const domain = email.split("@")[1];
    return TEMP_EMAIL_DOMAINS.some((tempDomain) => domain.includes(tempDomain));
  }, []);

  // Check localStorage and initialize modal state
  const checkLocalStorage = useCallback(() => {
    try {
      const storageKey = `contactModelClick`;
      const data = localStorage.getItem(storageKey);
      setIsContactModel(data ? JSON.parse(data)?.modelOpen === true : false);
    } catch (error) {
      console.error("Error checking localStorage:", error);
      setIsContactModel(false);
    }
  }, []);

  // Initialize and handle storage changes
  useEffect(() => {
    if (initialLoad) {
      checkLocalStorage();
      setInitialLoad(false);
    }

    const handleStorageChange = (e) => {
      if (e.key === `contactModelClick`) {
        checkLocalStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [initialLoad, checkLocalStorage]);

  // Handle scroll locking when modal is open
  useEffect(() => {
    if (isContactModel) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        const firstInput = formRef.current?.querySelector(
          "input, textarea, select"
        );
        firstInput?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isContactModel]);

  const handleClose = useCallback(() => {
    try {
      localStorage.removeItem(`contactModelClick`);
      setIsContactModel(false);
      window.dispatchEvent(new Event("contactModelUpdate"));
      setSubmitError(null);
      setSubmitSuccess(false);
    } catch (error) {
      console.error("Error closing modal:", error);
    }
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

  const handleBlur = useCallback((stage, field) => {
    setTouchedFields((prev) => ({
      ...prev,
      [stage]: {
        ...prev[stage],
        [field]: true,
      },
    }));
  }, []);

  // Send verification code via email
  const sendVerificationCodeMail = useCallback(
    async (type) => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(code);
      setVerificationAttempts(0);

      if (type === "email") {
        try {
          setIsSubmitting(true);
          const response = await fetch("/api/send-verification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: formData.personalInfo.email,
              formData,
              code: code,
              ipAddress: ipAddress,
              userAgent: userAgent,
              formFingerprint: formFingerprint,
              recaptchaToken,
            }),
          });

          const result = await response.json();
          if (result.success) {
            setEmailVerificationSent(true);
            setPhoneVerificationSent(false);
          } else {
            throw new Error(
              result.message || "Failed to send verification email"
            );
          }
        } catch (error) {
          console.error("Error sending verification:", error);
          setSubmitError(error.message);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        // SMS implementation would go here
        console.log(`SMS verification code: ${code}`);
        setPhoneVerificationSent(true);
        setEmailVerificationSent(false);
      }

      // Clear any existing timeout
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set new timeout for code expiration
      timerRef.current = setTimeout(() => {
        setVerificationCode("");
        setSubmitError(
          "Verification code has expired. Please request a new one."
        );
      }, VERIFICATION_CODE_EXPIRY);
    },
    [formData.personalInfo.email]
  );

  // Handle reCAPTCHA verification
  const handleRecaptchaChange = useCallback((token) => {
    setRecaptchaToken(token);
    setIsHumanVerified(!!token);
  }, []);

  // Enhanced submission handling
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        // Get current submission count from localStorage
        const currentSubmissions = parseInt(
          localStorage.getItem("formSubmissions") || 0
        );

        // Check rate limit
        if (currentSubmissions >= MAX_FORM_SUBMISSIONS) {
          // Calculate when the limit will reset (24 hours from first submission)
          const firstSubmissionTime = parseInt(
            localStorage.getItem("firstSubmissionTime")
          );
          const resetTime = firstSubmissionTime + 24 * 60 * 60 * 1000;
          const timeLeft = Math.ceil(
            (resetTime - Date.now()) / (60 * 60 * 1000)
          );

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
            verificationMethod: emailVerificationSent ? "email" : "sms",
          },
        };

        // Track first submission time if not set
        if (!localStorage.getItem("firstSubmissionTime")) {
          localStorage.setItem("firstSubmissionTime", Date.now().toString());
        }

        // Increment submission count
        localStorage.setItem(
          "formSubmissions",
          (currentSubmissions + 1).toString()
        );
        setFormSubmissions(currentSubmissions + 1);

        // Submit data
        const response = await fetch("/api/submit-contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        });

        // Handle response
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Submission failed");
        }

        const result = await response.json();

        // Clear submission limits on success
        localStorage.removeItem("formSubmissions");
        localStorage.removeItem("firstSubmissionTime");

        setSubmitSuccess(true);

        // Reset form after delay
        setTimeout(() => {
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

        // Reset reCAPTCHA on error
        recaptchaRef.current?.reset();
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      formData,
      ipAddress,
      userAgent,
      formFingerprint,
      emailVerificationSent,
      handleClose,
    ]
  );

  const nextStage = useCallback(() => {
    if (formValid[`stage${currentStage}`]) {
      setCurrentStage((prev) => prev + 1);
      if (currentStage === 3 && !verificationCode) {
        sendVerificationCodeMail("email");
      }
    }
  }, [currentStage, formValid, verificationCode, sendVerificationCodeMail]);

  const prevStage = useCallback(() => {
    setCurrentStage((prev) => Math.max(1, prev - 1));
    setSubmitError(null);
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
        return !value || value.replace(/\D/g, "").length < 8;
      }

      return value.trim() === "";
    },
    [touchedFields, isSuspiciousEmail]
  );

  if (!isContactModel) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-2">
      <div
        ref={formRef}
        className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close contact modal"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <h1 className="text-2xl text-gray-800/80 font-bold mb-4">
            Contact Our Team
          </h1>

          {/* Progress Steps */}
          <div className="flex justify-between mb-2 relative">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className="flex flex-col items-center z-10"
                style={{ width: `${100 / 4}%` }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center 
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
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-8 right-8 h-1 bg-gray-200 -z-1">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(currentStage - 1) * 33.33}%` }}
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
                onClick={handleClose}
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
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${isFieldInvalid("personalInfo", "name", formData.personalInfo.name) ? "text-red-600" : "text-gray-700"}`}
                    >
                      Full Name*
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.name}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "name",
                          e.target.value
                        )
                      }
                      onBlur={() => handleBlur("personalInfo", "name")}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className={`w-full text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${isFieldInvalid("personalInfo", "name", formData.personalInfo.name) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      required
                    />
                    {isFieldInvalid(
                      "personalInfo",
                      "name",
                      formData.personalInfo.name
                    ) && (
                      <p className="mt-1 text-sm text-red-600">
                        Please enter your full name
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${isFieldInvalid("personalInfo", "email", formData.personalInfo.email) ? "text-red-600" : "text-gray-700"}`}
                    >
                      Email*
                    </label>
                    <input
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
                      className={`w-full px-4 text-black py-2 border rounded-lg focus:ring-2 outline-none transition ${isFieldInvalid("personalInfo", "email", formData.personalInfo.email) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      placeholder={
                        isFieldInvalid(
                          "personalInfo",
                          "email",
                          formData.personalInfo.email
                        )
                          ? isSuspiciousEmail(formData.personalInfo.email)
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
                    <div className={`relative`}>
                      <PhoneInput
                        international
                        defaultCountry="US"
                        value={formData.personalInfo.phone}
                        onChange={(value) =>
                          handleInputChange("personalInfo", "phone", value)
                        }
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
                        id="phone-input"
                        className={`block w-full py-2 pl-3 pr-12 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6
                        ${isFieldInvalid("personalInfo", "phone", formData.personalInfo.phone) ? "ring-1 ring-red-500 rounded-md" : ""}`}
                        required
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
                      className={`w-full px-4 text-black py-2 border rounded-lg focus:ring-2 outline-none transition ${isFieldInvalid("serviceDetails", "serviceType", formData.serviceDetails.serviceType) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      required
                    >
                      <option value="">Select a service</option>
                      {services_ecod.map((service) => (
                        <option key={service.slug} value={service.slug}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                    {isFieldInvalid(
                      "serviceDetails",
                      "serviceType",
                      formData.serviceDetails.serviceType
                    ) && (
                      <p className="mt-1 text-sm text-red-600">
                        Please select a service type
                      </p>
                    )}
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
                      onBlur={() => handleBlur("serviceDetails", "budget")}
                      className={`w-full text-black px-4 py-2 border rounded-lg focus:ring-2 outline-none transition ${isFieldInvalid("serviceDetails", "budget", formData.serviceDetails.budget) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      required
                    >
                      <option value="">Select budget</option>
                      {customer_budget_range.map((budget) => (
                        <option key={budget.value} value={budget.value}>
                          {budget.label}
                        </option>
                      ))}
                    </select>
                    {isFieldInvalid(
                      "serviceDetails",
                      "budget",
                      formData.serviceDetails.budget
                    ) && (
                      <p className="mt-1 text-sm text-red-600">
                        Please select a budget range
                      </p>
                    )}
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
                      onBlur={() => handleBlur("serviceDetails", "timeline")}
                      className={`w-full px-4 py-2 text-black border rounded-lg focus:ring-2 outline-none transition ${isFieldInvalid("serviceDetails", "timeline", formData.serviceDetails.timeline) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      required
                    >
                      <option value="">Select timeline</option>
                      {customer_porject_timeline.map((timeline) => (
                        <option key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </option>
                      ))}
                    </select>
                    {isFieldInvalid(
                      "serviceDetails",
                      "timeline",
                      formData.serviceDetails.timeline
                    ) && (
                      <p className="mt-1 text-sm text-red-600">
                        Please select a project timeline
                      </p>
                    )}
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
                      className={`w-full px-4 py-2 border text-black rounded-lg focus:ring-2 outline-none transition min-h-[120px] ${isFieldInvalid("projectBrief", "description", formData.projectBrief.description) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      placeholder="Describe your project in detail..."
                      required
                    />
                    {isFieldInvalid(
                      "projectBrief",
                      "description",
                      formData.projectBrief.description
                    ) && (
                      <p className="mt-1 text-sm text-red-600">
                        Please provide a project description
                      </p>
                    )}
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
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition min-h-[60px] ${isFieldInvalid("projectBrief", "budgetDetails", formData.projectBrief.budgetDetails) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                        required={isCustomBudget()}
                        placeholder={
                          formData.serviceDetails.budget === "custom"
                            ? "E.g. $12,000 - $15,000"
                            : "E.g. We're flexible but likely between $10k-$20k"
                        }
                      />
                      {isFieldInvalid(
                        "projectBrief",
                        "budgetDetails",
                        formData.projectBrief.budgetDetails
                      ) && (
                        <p className="mt-1 text-sm text-red-600">
                          Please provide budget details
                        </p>
                      )}
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
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition min-h-[60px] ${isFieldInvalid("projectBrief", "timelineDetails", formData.projectBrief.timelineDetails) ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                        required={isCustomTimeline()}
                        placeholder={
                          formData.serviceDetails.timeline === "custom"
                            ? "E.g. 4-5 months with testing phase"
                            : "E.g. We need MVP in 2 months but full product can take longer"
                        }
                      />
                      {isFieldInvalid(
                        "projectBrief",
                        "timelineDetails",
                        formData.projectBrief.timelineDetails
                      ) && (
                        <p className="mt-1 text-sm text-red-600">
                          Please provide timeline details
                        </p>
                      )}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Website URLs, Figma links, etc."
                    />
                  </div>
                </div>
              )}

              {/* Stage 4: Verification */}
              {currentStage === 4 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Verify Your Identity
                  </h3>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-1">
                      {`To prevent spam and ensure you're a real customer, we need
                      to verify your contact information.`}
                    </p>

                    <div className="mb-2">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={recaptchaSiteKey}
                        size="normal"
                        onChange={handleRecaptchaChange}
                      />
                    </div>

                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => sendVerificationCodeMail("email")}
                        disabled={emailVerificationSent || isSubmitting}
                        className={`w-full text-left p-3 rounded-lg border flex items-center ${emailVerificationSent ? "bg-gray-100 text-gray-500 border-gray-300" : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"} ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                      >
                        <svg
                          className="w-5 h-5 mr-3 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <div className="text-left">
                          <p className="font-medium">Email Verification</p>
                          <p className="text-sm">
                            {emailVerificationSent
                              ? `Code sent to ${formData.personalInfo.email}`
                              : "Send verification code to your email"}
                          </p>
                        </div>
                        {isSubmitting && emailVerificationSent && (
                          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => sendVerificationCodeMail("phone")}
                        disabled={phoneVerificationSent || isSubmitting}
                        className={`w-full text-left p-3 rounded-lg border flex items-center ${phoneVerificationSent ? "bg-gray-100 text-gray-500 border-gray-300" : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"} ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                      >
                        <svg
                          className="w-5 h-5 mr-3 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div className="text-left">
                          <p className="font-medium">SMS Verification</p>
                          <p className="text-sm">
                            {phoneVerificationSent
                              ? `Code sent to ${formData.personalInfo.phone}`
                              : "Send verification code via SMS"}
                          </p>
                        </div>
                        {isSubmitting && phoneVerificationSent && (
                          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        )}
                      </button>
                    </div>

                    {(emailVerificationSent || phoneVerificationSent) && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Enter Verification Code*
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={userEnteredCode}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 6);
                              setUserEnteredCode(value);
                            }}
                            placeholder="6-digit code"
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            maxLength="6"
                            disabled={isSubmitting}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              sendVerificationCodeMail(
                                emailVerificationSent ? "email" : "phone"
                              )
                            }
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap disabled:opacity-75 disabled:cursor-not-allowed"
                          >
                            Resend
                          </button>
                        </div>
                        {verificationCode &&
                          userEnteredCode &&
                          verificationCode !== userEnteredCode && (
                            <p className="mt-1 text-sm text-red-600">
                              {`Verification code doesn't match. Please try again.`}
                            </p>
                          )}
                        {verificationAttempts > 2 && (
                          <p className="mt-1 text-sm text-yellow-600">
                            Multiple failed attempts. Consider requesting a new
                            code.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="confirmation-checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                      required
                      checked={
                        isHumanVerified && verificationCode === userEnteredCode
                      }
                      onChange={() => {}}
                    />
                    <label
                      htmlFor="confirmation-checkbox"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {`I verify that all information provided is accurate and I'm
                      a real customer. I understand that ECOD Service will
                      contact me using the provided details.`}
                    </label>
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
                  {currentStage < 4 ? (
                    <button
                      type="button"
                      onClick={nextStage}
                      disabled={
                        !formValid[`stage${currentStage}`] || isSubmitting
                      }
                      className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center min-w-[100px] ${formValid[`stage${currentStage}`] ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"} ${isSubmitting ? "opacity-75" : ""}`}
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : currentStage === 3 ? (
                        "Verify"
                      ) : (
                        "Continue"
                      )}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!formValid.stage4 || isSubmitting}
                      className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center min-w-[120px] ${formValid.stage4 ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"} ${isSubmitting ? "opacity-75" : ""}`}
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
