import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState("whatsapp");

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const platformFaqs = {
    whatsapp: [
      {
        question: "Is this compliant with WhatsApp's policies?",
        answer:
          "Yes, we're an official WhatsApp Business Solution Provider. All our automations comply with WhatsApp's Business Policy and Terms of Service.",
        badge: "Compliance",
        icon: (
          <FaWhatsapp className="text-green-500 dark:text-green-400 mr-2" />
        ),
      },
      {
        question: "How quickly can I get started with WhatsApp?",
        answer:
          "You can sign up and start your free trial immediately. For WhatsApp Business API accounts, approval typically takes 1-3 business days.",
        badge: "Onboarding",
        icon: (
          <FaWhatsapp className="text-green-500 dark:text-green-400 mr-2" />
        ),
      },
      {
        question: "What happens if I exceed my WhatsApp message limit?",
        answer:
          "We'll notify you before you reach your limit. Additional messages are charged at $0.01 per message.",
        badge: "Billing",
        icon: (
          <FaWhatsapp className="text-green-500 dark:text-green-400 mr-2" />
        ),
      },
    ],
    facebook: [
      {
        question: "Does this work with Facebook Messenger?",
        answer:
          "Yes, our platform fully integrates with Facebook Messenger, allowing you to automate conversations and manage customer interactions seamlessly.",
        badge: "Integration",
        icon: <FaFacebook className="text-blue-600 dark:text-blue-400 mr-2" />,
      },
      {
        question: "Can I connect my Facebook Page to this service?",
        answer:
          "Absolutely. You can connect multiple Facebook Pages and manage all conversations from a single dashboard with our unified inbox feature.",
        badge: "Setup",
        icon: <FaFacebook className="text-blue-600 dark:text-blue-400 mr-2" />,
      },
    ],
    instagram: [
      {
        question: "Can I automate Instagram DM responses?",
        answer:
          "Yes, our platform supports Instagram Direct Message automation while complying with Instagram's messaging policies.",
        badge: "Automation",
        icon: <FaInstagram className="text-pink-600 dark:text-pink-400 mr-2" />,
      },
      {
        question: "How does Instagram chatbot integration work?",
        answer:
          "Once you connect your Instagram Business account, our AI can handle common queries, qualify leads, and route complex issues to your team.",
        badge: "Functionality",
        icon: <FaInstagram className="text-pink-600 dark:text-pink-400 mr-2" />,
      },
    ],
  };

  const commonFaqs = [
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide 24/5 email support for all plans, with phone support available for Enterprise customers. Response times are under 2 hours for priority issues.",
      badge: "Support",
    },
    {
      question: "Can I use the same chatbot across all platforms?",
      answer:
        "Yes! Our unified chatbot builder lets you create once and deploy across WhatsApp, Facebook Messenger, and Instagram with platform-specific optimizations.",
      badge: "Cross-Platform",
    },
  ];

  const currentFaqs = [...platformFaqs[selectedPlatform], ...commonFaqs];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-center w-full">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about our social media automation
              platform
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center space-x-4">
          {Object.keys(platformFaqs).map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-6 py-3 rounded-lg font-medium flex items-center transition-colors ${
                selectedPlatform === platform
                  ? "bg-green-600 text-white dark:bg-green-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {platform === "whatsapp" && <FaWhatsapp className="mr-2" />}
              {platform === "facebook" && <FaFacebook className="mr-2" />}
              {platform === "instagram" && <FaInstagram className="mr-2" />}
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <dl className="space-y-4">
            {currentFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-${index}`}
                >
                  <div className="flex items-start">
                    {faq.badge && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mr-4">
                        {faq.badge}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      {faq.icon && faq.icon}
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 flex-shrink-0 h-6 w-6 text-gray-500 dark:text-gray-400"
                  >
                    <FaChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      id={`faq-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                        {index === 0 && selectedPlatform === "whatsapp" && (
                          <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                            <FaWhatsapp className="mr-2" />
                            <span>Verified WhatsApp Business API Partner</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </dl>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 transition-colors">
              {selectedPlatform === "whatsapp" && (
                <FaWhatsapp className="mr-2" />
              )}
              {selectedPlatform === "facebook" && (
                <FaFacebook className="mr-2" />
              )}
              {selectedPlatform === "instagram" && (
                <FaInstagram className="mr-2" />
              )}
              Still have questions? Chat with our {selectedPlatform} team
            </button>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Typically replies in under 5 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
