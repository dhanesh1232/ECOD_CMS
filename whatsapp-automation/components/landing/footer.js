"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";

const FooterSection = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [router, status]);

  if (status === "authenticated") {
    return null;
  }
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-gray-300 dark:text-gray-200 transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <FaWhatsapp className="h-8 w-8 text-green-400" />
              <span className="ml-3 text-2xl font-bold text-white dark:text-gray-100">
                WhatsAuto
              </span>
            </div>
            <p className="text-gray-400 dark:text-gray-300 leading-relaxed">
              The most trusted WhatsApp automation platform helping businesses
              streamline customer communication with AI-powered solutions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start">
                <FaPhoneAlt className="flex-shrink-0 mt-1 text-green-400" />
                <span className="ml-3">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="flex-shrink-0 mt-1 text-green-400" />
                <span className="ml-3">support@whatsauto.com</span>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="flex-shrink-0 mt-1 text-green-400" />
                <span className="ml-3">
                  123 Business Ave, San Francisco, CA
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "Features",
                "Pricing",
                "Case Studies",
                "Testimonials",
                "API Docs",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-6">
              Resources
            </h3>
            <ul className="space-y-3">
              {["Blog", "Help Center", "Community", "Webinars", "Status"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 dark:text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-6">
              Stay Updated
            </h3>
            <p className="text-gray-400 dark:text-gray-300 mb-4">
              Subscribe to our newsletter for product updates and automation
              tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 flex-grow"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 dark:text-gray-200 mb-3">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {[
                  { icon: <FiFacebook />, name: "Facebook" },
                  { icon: <FiTwitter />, name: "Twitter" },
                  { icon: <FiLinkedin />, name: "LinkedIn" },
                  { icon: <FiInstagram />, name: "Instagram" },
                  { icon: <FiYoutube />, name: "YouTube" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="text-gray-400 dark:text-gray-300 hover:text-green-400 text-xl transition-colors duration-200"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 dark:border-gray-700 my-10"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <a
              href="#"
              className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 text-sm"
            >
              Cookie Policy
            </a>
          </div>

          <div className="flex items-center">
            <span className="text-gray-500 dark:text-gray-400 text-sm mr-2">
              Certified:
            </span>
            <div className="flex space-x-3">
              <div className="bg-gray-800 dark:bg-gray-700 px-3 py-1 rounded text-xs font-medium text-gray-300 dark:text-gray-200">
                GDPR Compliant
              </div>
              <div className="bg-gray-800 dark:bg-gray-700 px-3 py-1 rounded text-xs font-medium text-gray-300 dark:text-gray-200">
                ISO 27001
              </div>
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} WhatsAuto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
