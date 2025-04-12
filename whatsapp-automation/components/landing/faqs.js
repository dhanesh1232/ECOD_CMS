import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaWhatsapp } from "react-icons/fa";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is this compliant with WhatsApp's policies?",
      answer:
        "Yes, we're an official WhatsApp Business Solution Provider. All our automations comply with WhatsApp's Business Policy and Terms of Service.",
      badge: "Compliance",
    },
    {
      question: "How quickly can I get started?",
      answer:
        "You can sign up and start your free trial immediately. For WhatsApp Business API accounts, approval typically takes 1-3 business days.",
      badge: "Onboarding",
    },
    {
      question: "What happens if I exceed my message limit?",
      answer:
        "We'll notify you before you reach your limit. Additional messages are charged at $0.01 per message.",
      badge: "Billing",
    },
    {
      question: "Can I use my existing WhatsApp number?",
      answer:
        "Yes, you can port your existing WhatsApp Business number to our platform during setup.",
      badge: "Setup",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide 24/5 email support for all plans, with phone support available for Enterprise customers. Response times are under 2 hours for priority issues.",
      badge: "Support",
    },
  ];

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our WhatsApp automation platform
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <dl className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-${index}`}
                >
                  <div className="flex items-start">
                    {faq.badge && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-4">
                        {faq.badge}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 flex-shrink-0 h-6 w-6 text-gray-500"
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
                      <div className="px-6 pb-6 text-gray-600">
                        {faq.answer}
                        {index === 0 && (
                          <div className="mt-4 flex items-center text-sm text-green-600">
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
            <div className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700">
              <FaWhatsapp className="mr-2" />
              Still have questions? Chat with our team
            </div>
            <p className="mt-4 text-gray-500">
              Typically replies in under 5 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
