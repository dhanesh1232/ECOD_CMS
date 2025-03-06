"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What technologies do you use?",
    answer:
      "We primarily use Next.js, Tailwind CSS, and modern JavaScript frameworks for web development. Our stack ensures speed, security, and scalability.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Project timelines vary based on complexity. A basic website takes 2-4 weeks, while larger projects may take 6-12 weeks. We ensure timely delivery without compromising quality.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes! We provide dedicated support, website maintenance, and regular updates to keep your site running smoothly.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely! We can revamp your website to improve its performance, user experience, and SEO rankings.",
  },
  {
    question: "Do you provide e-commerce solutions?",
    answer:
      "Yes, we specialize in Shopify, WooCommerce, and custom e-commerce solutions tailored to your business needs.",
  },
  {
    question: "Will my website be SEO-friendly?",
    answer:
      "Yes! We follow SEO best practices, ensuring your website ranks well on search engines and attracts organic traffic.",
  },
  {
    question: "Can you integrate third-party tools or APIs?",
    answer:
      "Yes, we can integrate third-party services, payment gateways, CRM, and other APIs to enhance your website's functionality.",
  },
];

const ECODFaqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 px-8 bg-gradient-to-b from-gray-50 to-white text-center">
      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
        💡 FAQs About ECOD Web Services
      </h2>
      <p className="mt-4 text-base md:text-lg text-gray-700">
        Find answers to common questions about our web development and digital
        solutions.
      </p>

      <div className="mt-12 max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200 transition hover:shadow-lg cursor-pointer"
            onClick={() => toggleFaq(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {faq.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp size={24} className="text-gray-600" />
              ) : (
                <ChevronDown size={24} className="text-gray-600" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-700 text-left">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ECODFaqs;
