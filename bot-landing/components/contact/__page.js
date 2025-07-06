"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Calendar,
  MapPin,
  Phone,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
        setTimeout(() => setSubmitSuccess(false), 3000);
      }, 1000);
    }
  };

  const contactCards = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "support@ecodrix.com",
      action: (
        <Button
          variant="link"
          className="mt-4 px-0 text-blue-600 dark:text-blue-400"
        >
          Write to us <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      ),
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Instant support via our chat widget",
      action: (
        <Button
          variant="link"
          className="mt-4 px-0 text-green-600 dark:text-green-400"
        >
          Start chat <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      ),
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Book a Demo",
      description: "See Ecodrix in action",
      action: (
        <Button className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
          Schedule a Call
        </Button>
      ),
    },
  ];

  const addressInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      text: "Yerpadu, Tirupati, India,  517501",
    },
    { icon: <Phone className="h-5 w-5" />, text: "+91 8143963821" },
    { icon: <Clock className="h-5 w-5" />, text: "Mon-Fri, 9AM-6PM IST" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 opacity-20 -z-10"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1 }}
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
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contactCards.map((card, index) => {
            const isLast = index === contactCards.length - 1;

            return (
              <motion.div
                key={index}
                className={`group relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 overflow-hidden
          ${isLast ? "sm:col-span-2 md:col-span-1" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  {card.description}
                </p>
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {card.action}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {`Fill out the form and we'll get back to you within 24 hours`}
            </p>
          </div>

          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {`Thank you for your message! We'll get back to you soon.`}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="email" className="mb-2">
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
              />
              {errors.email && (
                <motion.p
                  className="mt-2 text-sm text-red-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div className="mb-8">
              <Label htmlFor="message" className="mb-2">
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
              />
              {errors.message && (
                <motion.p
                  className="mt-2 text-sm text-red-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.message}
                </motion.p>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                type="submit"
                variant="premium"
                fullWidth={true}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
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
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </section>

      {/* Map/Address Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-center gap-8"
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
            <h3 className="text-2xl font-bold mb-6">Our Headquarters</h3>
            <div className="space-y-4">
              {addressInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {item.icon}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            {/*<Button variant="outline" className="mt-6">
              Get Directions
            </Button>*/}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
