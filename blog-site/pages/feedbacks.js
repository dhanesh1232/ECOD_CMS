"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageSquare,
  Truck,
  Monitor,
  DollarSign,
  Gift,
  ThumbsUp,
  ChevronLeft,
  Check,
  ChevronRight,
  User,
  Mail,
  Phone,
  Code,
  Search,
  Hash,
  Mailbox,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

export const services_ecod = [
  {
    label: "Web Development",
    slug: "web-development",
    icon: <Code size={18} />,
  },
  {
    label: "Google | Meta Ads",
    slug: "google-meta-ads",
    icon: <TrendingUp size={18} />,
  },
  { label: "SEO", slug: "seo", icon: <Search size={18} /> },
  {
    label: "Social Media Marketing",
    slug: "social-media-marketing",
    icon: <Hash size={18} />,
  },
  {
    label: "Shopify Optimization",
    slug: "shopify-optimization",
    icon: <ShoppingCart size={18} />,
  },
  {
    label: "Content Marketing",
    slug: "content-marketing",
    icon: <Mailbox size={18} />,
  },
  {
    label: "Email Marketing",
    slug: "email-marketing",
    icon: <Mail size={18} />,
  },
];

export default function FeedbackPage({ onClose }) {
  // Form state
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [errors, setErrors] = useState({});

  // Categories with icons
  const categories = [
    { id: 1, name: "Product", icon: <Gift size={20} /> },
    { id: 2, name: "Service", icon: <MessageSquare size={20} /> },
    { id: 3, name: "Delivery", icon: <Truck size={20} /> },
    { id: 4, name: "Website", icon: <Monitor size={20} /> },
    { id: 5, name: "Pricing", icon: <DollarSign size={20} /> },
    { id: 6, name: "Other", icon: <ThumbsUp size={20} /> },
  ];

  // Track window width for responsive design
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) =>
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);

  const validateStep = () => {
    const newErrors = {};

    if (step === 1 && rating === 0)
      newErrors.rating = "Please provide a rating";
    if (step === 2 && !selectedCategory)
      newErrors.category = "Please select a category";
    if (step === 2 && selectedCategory === 2 && !selectedService)
      newErrors.service = "Please select a service";
    if (step === 3 && feedback.length < 20)
      newErrors.feedback = "Please provide at least 20 characters of feedback";
    if (step === 4) {
      if (!name.trim()) newErrors.name = "Name is required";
      if (!email.trim()) newErrors.email = "Email is required";
      else if (!validateEmail(email))
        newErrors.email = "Please enter a valid email";
      if (phone && !validatePhone(phone))
        newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateStep()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log({
        rating,
        feedback,
        category: categories.find((c) => c.id === selectedCategory),
        service: selectedService
          ? services_ecod.find((s) => s.slug === selectedService)
          : null,
        name,
        email,
        phone,
      });
    }, 1500);
  };

  // Handle next button click
  const handleNext = () => {
    if (!validateStep()) return;

    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  // Reset form
  const resetForm = () => {
    setStep(1);
    setRating(0);
    setFeedback("");
    setSelectedCategory(null);
    setSelectedService(null);
    setName("");
    setEmail("");
    setPhone("");
    setIsSubmitted(false);
    setErrors({});
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const starVariants = {
    hover: { scale: 1.2 },
    tap: { scale: 0.9 },
  };

  const itemVariants = {
    hover: { y: -3 },
    selected: {
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      borderColor: "rgba(99, 102, 241, 1)",
      color: "rgba(99, 102, 241, 1)",
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header with progress indicator */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between mb-4">
              {step > 1 && !isSubmitted ? (
                <motion.button
                  onClick={() => setStep(step - 1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Go back"
                >
                  <ChevronLeft size={24} />
                </motion.button>
              ) : (
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close feedback form"
                >
                  <ChevronLeft size={24} />
                </motion.button>
              )}
              <h2 className="text-xl font-bold text-center flex-1">
                {isSubmitted ? "Thank You!" : `Feedback (${step}/4)`}
              </h2>
              <div className="w-8"></div>
            </div>

            {!isSubmitted && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.4 }}
                className="h-1.5 bg-white/30 rounded-full overflow-hidden"
              >
                <div className="h-full bg-white rounded-full"></div>
              </motion.div>
            )}
          </div>

          <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="thank-you"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      },
                    }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check size={40} className="text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Feedback Submitted!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We truly appreciate you taking the time to help us improve.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.button
                      onClick={resetForm}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Submit Another
                    </motion.button>
                    <motion.button
                      onClick={onClose}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <div>
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mb-8"
                      >
                        <label className="block text-gray-700 font-medium mb-4 text-center">
                          How would you rate your experience?
                        </label>
                        <div className="flex justify-center gap-1 sm:gap-2 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              variants={starVariants}
                              whileHover="hover"
                              whileTap="tap"
                              className="focus:outline-none"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                            >
                              <Star
                                size={windowWidth < 640 ? 32 : 40}
                                className={`transition-colors ${
                                  (hoverRating || rating) >= star
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-300"
                                }`}
                              />
                            </motion.button>
                          ))}
                        </div>
                        {errors.rating && (
                          <p className="text-red-500 text-sm text-center mt-2">
                            {errors.rating}
                          </p>
                        )}
                        <div className="flex justify-between mt-3 text-sm text-gray-500 font-medium">
                          <span>Poor</span>
                          <span>Excellent</span>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mb-8"
                      >
                        <label className="block text-gray-700 font-medium mb-3 text-center">
                          What would you like to provide feedback about?
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                          {categories.map((category) => (
                            <motion.button
                              key={category.id}
                              variants={itemVariants}
                              whileHover="hover"
                              animate={
                                selectedCategory === category.id
                                  ? "selected"
                                  : ""
                              }
                              className={`p-3 rounded-lg border transition-colors flex flex-col items-center gap-2 border-gray-200`}
                              onClick={() => {
                                setSelectedCategory(category.id);
                                if (category.id !== 2) setSelectedService(null);
                              }}
                            >
                              <span className="text-indigo-600">
                                {category.icon}
                              </span>
                              <span className="text-sm font-medium">
                                {category.name}
                              </span>
                            </motion.button>
                          ))}
                        </div>

                        {selectedCategory === 2 && (
                          <>
                            <label className="block text-gray-700 font-medium mb-3 text-center">
                              Which service are you providing feedback for?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {services_ecod.map((service) => (
                                <motion.button
                                  key={service.slug}
                                  variants={itemVariants}
                                  whileHover="hover"
                                  animate={
                                    selectedService === service.slug
                                      ? "selected"
                                      : ""
                                  }
                                  className={`p-3 rounded-lg border transition-colors flex flex-col items-center gap-2 border-gray-200 text-sm`}
                                  onClick={() =>
                                    setSelectedService(service.slug)
                                  }
                                >
                                  <span className="text-indigo-600">
                                    {service.icon}
                                  </span>
                                  <span className="font-medium text-center">
                                    {service.label}
                                  </span>
                                </motion.button>
                              ))}
                            </div>
                            {errors.service && (
                              <p className="text-red-500 text-sm text-center mt-2">
                                {errors.service}
                              </p>
                            )}
                          </>
                        )}
                        {errors.category && (
                          <p className="text-red-500 text-sm text-center mt-2">
                            {errors.category}
                          </p>
                        )}
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mb-8"
                      >
                        <label className="block text-gray-700 font-medium mb-3">
                          {selectedCategory === 2 && selectedService
                            ? `Your Feedback About ${services_ecod.find((s) => s.slug === selectedService)?.label}`
                            : "Your Detailed Feedback"}{" "}
                          (minimum 20 characters)
                        </label>
                        <textarea
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
                          placeholder={
                            selectedCategory === 2 && selectedService
                              ? `What did you like or what could we improve about our ${services_ecod.find((s) => s.slug === selectedService)?.label} service?`
                              : "What did you like or what could we improve? Please be specific..."
                          }
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          required
                        />
                        <div className="flex justify-between items-center mt-1">
                          {errors.feedback && (
                            <p className="text-red-500 text-sm">
                              {errors.feedback}
                            </p>
                          )}
                          <span
                            className={`text-xs ${feedback.length < 20 ? "text-red-500" : "text-green-500"}`}
                          >
                            {feedback.length}/20 characters
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mb-8 space-y-4"
                      >
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">
                            Your Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              className="w-full pl-10 pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
                              placeholder="John Doe"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              className="w-full pl-10 pr-4 sm:py-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
                              placeholder="your@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-1">
                            Phone Number (Optional)
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              className="w-full pl-10 pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
                              placeholder="+1 (123) 456-7890"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    layout
                    transition={{ duration: 0.3 }}
                    className="flex justify-between gap-3"
                  >
                    {step > 1 && (
                      <motion.button
                        onClick={() => setStep(step - 1)}
                        whileHover={{ x: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                      >
                        <ChevronLeft size={18} />
                        Back
                      </motion.button>
                    )}
                    <motion.button
                      onClick={handleNext}
                      disabled={
                        isLoading ||
                        (step === 1 && rating === 0) ||
                        (step === 2 &&
                          (!selectedCategory ||
                            (selectedCategory === 2 && !selectedService))) ||
                        (step === 3 && feedback.length < 20) ||
                        (step === 4 &&
                          (!name ||
                            !email ||
                            !validateEmail(email) ||
                            (phone && !validatePhone(phone))))
                      }
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 flex-1 ${
                        isLoading
                          ? "bg-indigo-400 cursor-not-allowed"
                          : (step === 1 && rating === 0) ||
                              (step === 2 &&
                                (!selectedCategory ||
                                  (selectedCategory === 2 &&
                                    !selectedService))) ||
                              (step === 3 && feedback.length < 20) ||
                              (step === 4 &&
                                (!name ||
                                  !email ||
                                  !validateEmail(email) ||
                                  (phone && !validatePhone(phone))))
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
                      }`}
                    >
                      {isLoading ? (
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
                      ) : step === 4 ? (
                        "Submit"
                      ) : (
                        <>
                          Next
                          <ChevronRight size={18} />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
