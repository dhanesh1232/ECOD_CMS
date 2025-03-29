import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Feedback categories
  const categories = [
    { id: 1, name: "Product Quality", icon: "🛍️" },
    { id: 2, name: "Customer Service", icon: "💬" },
    { id: 3, name: "Delivery Experience", icon: "🚚" },
    { id: 4, name: "Website Experience", icon: "🖥️" },
    { id: 5, name: "Pricing", icon: "💰" },
    { id: 6, name: "Other", icon: "✨" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log({ rating, feedback, category: categories[selectedCategory] });
    }, 1500);
  };

  const resetForm = () => {
    setRating(0);
    setFeedback("");
    setSelectedCategory(null);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full">
        {" "}
        {/* Increased max-width */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Share Your Feedback
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-lg mx-auto">
            We value your opinion! Please let us know about your experience to
            help us improve.
          </p>
        </motion.div>
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="thank-you"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full p-4 sm:p-8 rounded-2xl shadow-xl text-center"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Thank You for Your Feedback!
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                We truly appreciate you taking the time to help us improve our
                services.
              </p>
              <div
                className={`flex justify-center ${window.innerWidth < 500 ? "flex-col space-y-4" : "flex-row space-x-4"}`}
              >
                <button
                  onClick={resetForm}
                  className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 text-sm font-medium"
                >
                  Submit Another Feedback
                </button>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition duration-200 text-sm font-medium"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <form onSubmit={handleSubmit}>
                {/* Rating Section */}
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-4 text-center text-lg">
                    How would you rate your overall experience?
                  </label>
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none transform hover:scale-110 transition duration-150"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <svg
                          className={`sm:w-14 w-10 h-10 sm:h-14 transition duration-200 ${
                            (hoverRating || rating) >= star
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300 fill-gray-200"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 px-2 text-sm text-gray-500 font-medium">
                    <span>Not Satisfied</span>
                    <span>Very Satisfied</span>
                  </div>
                </div>

                {/* Category Selection */}
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-3 text-center text-lg">
                    What would you like to provide feedback about?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 rounded-lg border transition duration-200 flex flex-col items-center ${
                          selectedCategory === category.id
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                        }`}
                      >
                        <span className="text-2xl mb-1">{category.icon}</span>
                        <span className="text-xs sm:text-sm font-bold">
                          {category.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Textarea */}
                <div className="mb-8">
                  <label
                    htmlFor="feedback"
                    className="block text-gray-700 font-medium mb-3 text-lg text-center"
                  >
                    Your Detailed Feedback
                  </label>
                  <textarea
                    id="feedback"
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
                    placeholder="What did you like or what could we improve? Please be as specific as possible..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Your honest feedback helps us serve you better.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || rating === 0}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center ${
                    isLoading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : rating === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Submitting Your Feedback...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Submit Feedback
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>
            We read all feedback carefully and use it to improve our services
          </p>
        </motion.div>
      </div>
    </div>
  );
}
