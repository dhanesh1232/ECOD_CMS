import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const StarRating = dynamic(() => import("./Sections/star"), {
  loading: () => <div className="h-8 bg-gray-200 rounded animate-pulse" />,
});

const ClientPop = ({ closePop }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    feedback: "",
  });
  const [errors, setErrors] = useState({});
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    feedback: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    document.getElementById("name")?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFocus = (name) =>
    setIsFocused((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) =>
    setIsFocused((prev) => ({ ...prev, [name]: false }));

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.rating) newErrors.rating = "Please rate our service";
    if (formData.rating && !formData.feedback.trim())
      newErrors.feedback = "Please share your feedback";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Replace with your actual submission logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setTimeout(() => {
        closePop();
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to submit. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 top-0 bg-black/50 backdrop-blur-sm z-[9999999] flex justify-center items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && closePop()}
      >
        <motion.div
          className="relative bg-white/90 z-50 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700/30 max-w-md w-full mx-4 overflow-hidden"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-heading"
        >
          {/* Inner shadow */}
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.2)] pointer-events-none"></div>

          {/* Close Button */}
          <button
            className="absolute right-4 top-4 p-2 rounded-full bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600/50 transition-colors backdrop-blur-sm z-10"
            type="button"
            onClick={closePop}
            aria-label="Close feedback form"
          >
            <X className="h-5 w-5 text-gray-800 dark:text-gray-200" />
          </button>

          {submitSuccess ? (
            <div className="text-center py-12 px-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-green-100/80 dark:bg-green-900/50 rounded-full mb-6 backdrop-blur-sm border border-green-200/30 dark:border-green-700/30 mx-auto"
              >
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h2
                id="feedback-heading"
                className="text-2xl font-bold text-gray-900 dark:text-white/90 mb-3"
              >
                Thank You!
              </h2>
              <p className="text-gray-600/90 dark:text-gray-300/90">
                Your feedback has been submitted successfully.
              </p>
            </div>
          ) : (
            <>
              <div className="p-6 sm:p-8">
                <h2
                  id="feedback-heading"
                  className="text-2xl font-bold text-gray-900 dark:text-white/90 mb-6 text-center"
                >
                  We Value Your Feedback!
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {["name", "email"].map((field) => (
                    <div key={field} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor={field}
                          className={`block text-sm font-medium ${
                            errors[field]
                              ? "text-red-600"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                          <span className="text-red-500">*</span>
                        </label>
                        {errors[field] && (
                          <span className="text-red-500 text-xs">
                            {errors[field]}
                          </span>
                        )}
                      </div>
                      <input
                        type={field === "email" ? "email" : "text"}
                        id={field}
                        name={field}
                        placeholder={`Enter your ${
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }`}
                        value={formData[field]}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus(field)}
                        onBlur={() => handleBlur(field)}
                        className={`w-full px-4 py-3 border ${
                          errors[field]
                            ? "border-red-500 focus:ring-red-200"
                            : isFocused[field]
                              ? "border-blue-500 focus:ring-blue-200"
                              : "border-gray-300 dark:border-gray-600 focus:ring-blue-200"
                        } rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm`}
                        aria-invalid={!!errors[field]}
                        aria-describedby={
                          errors[field] ? `${field}-error` : undefined
                        }
                      />
                    </div>
                  ))}

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="rating"
                        className={`block text-sm font-medium ${
                          errors.rating
                            ? "text-red-600"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        Rating<span className="text-red-500">*</span>
                      </label>
                      {errors.rating && (
                        <span className="text-red-500 text-xs">
                          {errors.rating}
                        </span>
                      )}
                    </div>
                    <div className="bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <StarRating
                        rating={formData.rating}
                        setRating={(rating) => {
                          setFormData((prev) => ({ ...prev, rating }));
                          if (errors.rating)
                            setErrors((prev) => ({ ...prev, rating: "" }));
                        }}
                        activeColor="#F59E0B"
                        inactiveColor="#E5E7EB dark:#4B5563"
                        size={28}
                      />
                    </div>
                  </div>

                  {formData.rating > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="feedback"
                          className={`block text-sm font-medium ${
                            errors.feedback
                              ? "text-red-600"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          Feedback<span className="text-red-500">*</span>
                        </label>
                        {errors.feedback && (
                          <span className="text-red-500 text-xs">
                            {errors.feedback}
                          </span>
                        )}
                      </div>
                      <textarea
                        id="feedback"
                        name="feedback"
                        placeholder="Share your experience..."
                        rows={4}
                        value={formData.feedback}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("feedback")}
                        onBlur={() => handleBlur("feedback")}
                        className={`w-full px-4 py-3 border ${
                          errors.feedback
                            ? "border-red-500 focus:ring-red-200"
                            : isFocused.feedback
                              ? "border-blue-500 focus:ring-blue-200"
                              : "border-gray-300 dark:border-gray-600 focus:ring-blue-200"
                        } rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm`}
                        aria-invalid={!!errors.feedback}
                        aria-describedby={
                          errors.feedback ? "feedback-error" : undefined
                        }
                      />
                    </div>
                  )}

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 ${
                        isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:from-blue-500 hover:to-blue-600 hover:shadow-md"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 backdrop-blur-sm`}
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          Submitting...
                        </span>
                      ) : (
                        "Submit Feedback"
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClientPop;
