"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import HeadSEO from "./components/Reusable/seo_head";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
const BackAndForward = dynamic(() => import("./components/Reusable/back-forw"));

const contact = {
  address: "Tirupati, Andhra Pradesh, India",
  phone: "+91 8143963821",
  email: "support@ecod.com",
  hours: "Monday - Friday: 9:00 AM - 6:00 PM",
};

const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeadSEO
        title="Contact Us - ECOD"
        description="Get in touch with ECOD today! We're here to help you with your web development, SEO, and digital marketing needs."
        canonicalUrl="https://ecoddigital.com/contact"
        ogImage="https://ecoddigital.com/images/contact-og-image.jpg"
        twitterImage="https://ecoddigital.com/images/contact-twitter-image.jpg"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Us - ECOD",
          description:
            "Get in touch with ECOD today! We're here to help you with your web development, SEO, and digital marketing needs.",
          url: "https://ecoddigital.com/contact",
        }}
      />
      <section className="w-full min-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <BackAndForward forward="/contact" />
        <hr className="my-4 border-gray-200 dark:border-gray-700" />

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {`We'd love to hear from you! Whether you have a question about our
            services, pricing, or anything else, our team is ready to answer all
            your questions.`}
          </p>
        </div>

        <div className="grid lg:grid-cols-1 xl:grid-cols-2 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl  sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FiSend className="mr-2 text-green-500" />
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="text-center py-8">
                <FiCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {`Your message has been sent successfully. We'll get back to you
                  within 24 hours.`}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 border ${errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-3 px-6 rounded-lg text-white font-medium ${isSubmitting ? "bg-green-400" : "bg-green-500 hover:bg-green-600"} transition-colors`}
                >
                  {isSubmitting ? (
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
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 sm:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h2>

            <div className="space-y-5">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-500">
                  <FiMapPin className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Our Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-500">
                  <FiPhone className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Phone Number
                  </h3>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-green-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-500">
                  <FiMail className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Email Address
                  </h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-green-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-500">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Working Hours
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {contact.hours}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Find Us on Map
              </h3>
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-md">
                <iframe
                  className="w-full h-64"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1938.40179559011!2d79.57217208847582!3d13.66970380291421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d47c29092de25%3A0xf6fcd6b86cdede17!2sEsukathageli%2C%20Andhra%20Pradesh%20517619!5e0!3m2!1sen!2sin!4v1741186854332!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                  title="ECOD Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
