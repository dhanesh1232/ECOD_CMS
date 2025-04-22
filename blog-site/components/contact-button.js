import { MessageCircle, Mail, X, Send } from "lucide-react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ScrollToTopButton from "./Reusable/back-top-top";

const StickyContactButton = ({
  label = "Chat with Us",
  className = "",
  icon = true,
  pulse = true,
  variant = "default",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const controls = useAnimation();
  const chatRef = useRef(null);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pulse animation effect
  useEffect(() => {
    if (pulse && !isMobile && !isChatOpen) {
      controls.start({
        scale: [1, 1.05, 1],
        boxShadow: [
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          "0 10px 15px -3px rgb(79 70 229 / 0.3)",
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        ],
        transition: { duration: 0.3, repeat: Infinity, repeatDelay: 0.1 },
      });
    } else {
      controls.stop();
    }
  }, [pulse, controls, isMobile, isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setSubmitStatus(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Reset form
      setFormData({ name: "", email: "", message: "" });
      setSubmitStatus("success");

      setTimeout(() => {
        setIsChatOpen(false);
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const variantStyles = {
    default: {
      button:
        "bg-gradient-to-br from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg hover:shadow-xl",
      icon: "text-white",
    },
    minimal: {
      button:
        "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700/50 shadow-sm hover:shadow-md",
      icon: "text-indigo-500 dark:text-indigo-400",
    },
  }[variant];

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 right-4 space-y-2 sm:right-6 z-20 ${className}`}
    >
      <ScrollToTopButton />

      {/* Chat Popup */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-10 right-0 mb-4 w-56 sm:w-72 md:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
              <h3 className="font-medium">Contact Us</h3>
              <button
                onClick={toggleChat}
                className="p-1 rounded-full hover:bg-indigo-700 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 h-96 overflow-y-hidden">
              {submitStatus === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {`We'll get back to you soon.`}
                  </p>
                </div>
              ) : submitStatus === "error" ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                    Error Sending Message
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Please try again later.
                  </p>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Button - Only show when chat is closed */}
      {!isChatOpen && (
        <motion.button
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          whileHover={!isMobile ? { y: -3 } : {}}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={pulse ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.1,
            type: "spring",
            ease: "easeInOut",
          }}
          aria-label={label}
          onClick={toggleChat}
          className={`flex items-center justify-center gap-2 font-medium text-sm rounded-full transition-all duration-200 ease-out relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 px-4 sm:px-6 py-2 sm:py-3 min-w-[auto] sm:min-w-[120px] ${variantStyles.button}`}
        >
          {icon && (
            <motion.span
              className={variantStyles.icon}
              animate={
                !isMobile
                  ? {
                      rotate: isHovered ? [0, 10, -10, 0] : 0,
                      scale: isHovered ? [1, 1.1, 1] : 1,
                    }
                  : {}
              }
              transition={{ duration: 0.6 }}
            >
              {isMobile ? (
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </motion.span>
          )}
          {(!isMobile || variant !== "minimal") && (
            <motion.span
              className="hidden xs:inline-block"
              animate={!isMobile ? { x: isHovered ? [0, 2, 0] : 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              {isMobile && variant === "minimal" ? "Chat" : label}
            </motion.span>
          )}
        </motion.button>
      )}
    </div>
  );
};

export default StickyContactButton;
