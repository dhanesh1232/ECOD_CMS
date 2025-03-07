"use client";

import { useState } from "react";
import Head from "next/head";
import BackAndForward from "./components/Reusable/back-forw";

const contact = {
  address: "Tirupati, Andhra Pradesh, India",
  phone: "+91 8143963821",
  email: "support@ecod.com",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Head>
        <title>Contact Us | ECOD</title>
        <meta
          name="description"
          content="Get in touch with ECOD for inquiries about web development, digital marketing, and Shopify solutions."
        />
      </Head>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <BackAndForward forward="/about-us" />
        <hr className="my-4" />
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Have a question or need assistance? Fill out the form below or reach
          out to us directly.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Send Us a Message
            </h2>
            {submitted && (
              <p className="text-green-600 mb-4">
                Thank you! Your message has been sent.
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Your {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Contact Information
            </h2>
            {Object.entries(contact).map(([key, value]) => (
              <p key={key} className="text-gray-600 dark:text-gray-300 mb-2">
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                {key !== "address" ? (
                  <a
                    href={`${key === "email" ? "mailto:" : "tel:"}${value}`}
                    className="text-green-500 hover:underline"
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </p>
            ))}
            <div className="mt-6">
              <iframe
                className="w-full h-48 rounded-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1938.40179559011!2d79.57217208847582!3d13.66970380291421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d47c29092de25%3A0xf6fcd6b86cdede17!2sEsukathageli%2C%20Andhra%20Pradesh%20517619!5e0!3m2!1sen!2sin!4v1741186854332!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
