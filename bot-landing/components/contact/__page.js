"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  Loader,
} from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { BsWhatsapp } from "react-icons/bs";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      id: "email-card",
      icon: <Mail className="h-6 w-6" aria-hidden="true" />,
      title: "Email Us",
      description: "support@ecodrix.com",
      action: (
        <Button
          variant="link"
          className="mt-4 px-0 text-blue-600 dark:text-blue-400 group"
          aria-label="Write email to support"
        >
          <span className="group-hover:underline">Write to us</span>
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      ),
    },
    {
      id: "chat-card",
      icon: <MessageSquare className="h-6 w-6" aria-hidden="true" />,
      title: "Live Chat",
      description: "Instant support via our chat widget",
      action: (
        <Button
          variant="link"
          className="mt-4 px-0 text-green-600 dark:text-green-400 group"
          aria-label="Start live chat"
        >
          <span className="group-hover:underline">Start chat</span>
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      ),
    },
    {
      id: "demo-card",
      icon: <Calendar className="h-6 w-6" aria-hidden="true" />,
      title: "Book a Demo",
      description: "See ECODrIx in action",
      note: "We are currently working on Development",
      action: (
        <Button
          variant="ocean"
          disabled
          size="md"
          className="mt-4"
          aria-disabled="true"
        >
          Schedule a Call
        </Button>
      ),
    },
  ];

  const addressInfo = [
    {
      id: "address",
      icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
      text: "Yerpadu, Tirupati, India, 517501",
    },
    {
      id: "phone",
      icon: <BsWhatsapp className="h-5 w-5" aria-hidden="true" />,
      text: "+91 8143963821",
    },
    {
      id: "hours",
      icon: <Clock className="h-5 w-5" aria-hidden="true" />,
      text: "Mon-Fri, 9AM-6PM IST",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 opacity-20 -z-10"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1 }}
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {`Let's Connect`}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {`We'd love to hear from you. Whether you're curious about features, a
            free trial, or anything else—our team is ready to answer all your
            questions.`}
          </p>
        </motion.div>
      </section>

      {/* Contact Options */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        aria-labelledby="contact-options-heading"
      >
        <h2 id="contact-options-heading" className="sr-only">
          Contact Options
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`group relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              aria-labelledby={`${card.id}-title`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {card.icon}
                </div>
              </div>
              <h3
                id={`${card.id}-title`}
                className="text-xl font-semibold text-center mb-2"
              >
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-0">
                {card.description}
              </p>
              {card.note && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">
                  <span className="font-medium">Note:</span> {card.note}
                </p>
              )}
              <div className="flex justify-center mt-4">{card.action}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto"
        aria-labelledby="contact-form-heading"
      >
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-8">
            <h2 id="contact-form-heading" className="text-2xl font-bold mb-2">
              Send us a message
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {`Fill out the form and we'll get back to you within 24 hours`}
            </p>
          </div>

          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg flex items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                role="alert"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {`Thank you for your message! We'll get back to you soon.`}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="mb-2 block">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <motion.p
                    id="name-error"
                    className="mt-2 text-sm text-red-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <motion.p
                    id="email-error"
                    className="mt-2 text-sm text-red-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div>
                <Label htmlFor="message" className="mb-2 block">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="How can we help you?"
                  className={`focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <motion.p
                    id="message-error"
                    className="mt-2 text-sm text-red-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  variant="premium"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Map/Address Section */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        aria-labelledby="location-heading"
      >
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-full md:w-1/2 h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="text-center p-4">
              <MapPin className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                Tirupati, India
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 id="location-heading" className="text-2xl font-bold mb-6">
              Our Headquarters
            </h3>
            <div className="space-y-4">
              {addressInfo.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {item.icon}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
