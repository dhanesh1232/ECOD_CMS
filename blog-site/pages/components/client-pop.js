import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ClientPop = ({ closePop }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });
  const [errors, setErrors] = useState({});
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    rating: false,
    feedback: false,
  });

  useEffect(() => {
    document.getElementById("name")?.focus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleFocus = (e) =>
    setIsFocused({ ...isFocused, [e.target.name]: true });
  const handleBlur = (e) =>
    setIsFocused({ ...isFocused, [e.target.name]: false });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.rating) newErrors.rating = "Please rate our service";
    if (formData.rating && !formData.feedback.trim())
      newErrors.feedback = "Feedback is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Thank you for your feedback!");
      closePop();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-[99] flex justify-center items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white relative p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute right-3 top-2 text-lg hover:scale-110 transition-transform duration-200"
          type="button"
          onClick={closePop}
        >
          <X className="h-5 w-5 text-gray-600 hover:text-gray-900" />
        </button>
        <h2 className="text-gray-900 text-2xl font-semibold mb-4">
          We Value Your Feedback!
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {["name", "email"].map((field) => (
            <div key={field} className="flex flex-col items-start">
              <label
                htmlFor={field}
                className={`block text-sm font-medium mb-1 ${
                  errors[field] ? "text-red-500" : "text-gray-700"
                }`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                id={field}
                name={field}
                placeholder={`Your ${
                  field.charAt(0).toUpperCase() + field.slice(1)
                }`}
                value={formData[field]}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`w-full p-3 border ${
                  errors[field]
                    ? "border-red-500"
                    : isFocused[field]
                    ? "border-blue-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200`}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
          <div className="flex flex-col items-start">
            <label
              htmlFor="rating"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            >
              <option value="" disabled>
                Rate Our Service
              </option>
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {`⭐`.repeat(num)} - {num}
                </option>
              ))}
            </select>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
            )}
          </div>
          {formData.rating && (
            <div className="flex flex-col items-start">
              <label
                htmlFor="feedback"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                placeholder="Your Feedback"
                rows="4"
                value={formData.feedback}
                onChange={handleInputChange}
                className={`w-full p-3 border ${
                  errors.feedback
                    ? "border-red-500"
                    : isFocused.feedback
                    ? "border-blue-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200`}
              ></textarea>
              {errors.feedback && (
                <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>
              )}
            </div>
          )}
          <p className="text-sm text-gray-600 text-left">
            <strong>Note:</strong> Please fill required fields *
          </p>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105"
          >
            Submit Feedback
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ClientPop;
