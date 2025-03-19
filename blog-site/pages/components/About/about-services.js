"use client";
import { motion } from "framer-motion";

import ServiceCard from "./service-card";

const about_service = [
  {
    icon: "shopify",
    title: "Store Setup",
    description:
      "We'll set up your Shopify store from scratch, including custom domain, theme selection, and product uploads.",
    color: "text-green-600",
  },
  {
    icon: "react",
    title: "Frontend Development",
    description:
      "We'll build a user-friendly and engaging frontend using React, Tailwind CSS, and other frontend tools.",
    color: "text-blue-600",
  },
  {
    icon: "tools",
    title: "Maintenance",
    description:
      "Regular updates, security checks, and performance optimization to keep your store running smoothly.",
    color: "text-blue-600",
  },
  {
    icon: "headset",
    title: "Zero Knowledge? No Problem!",
    description:
      "No prior experience needed - we'll guide you through the process and help you grow your business",
    color: "text-blue-600",
  },
  {
    icon: "google",
    title: "Google My Business",
    description:
      "Enhance your local presence with optimized Google My Business listings.",
    color: "text-blue-600",
  },
  {
    icon: "search",
    title: "SEO Optimization",
    description:
      "Improve your search rankings and drive organic traffic to your website with expert SEO services.",
    color: "text-blue-600",
  },
  {
    icon: "paintBrush",
    title: "Logo & Graphic Design",
    description:
      "Stand out with professional branding, including logos, banners, and marketing materials.",
    color: "text-purple-600",
  },
  {
    icon: "google",
    title: "Meta & Google Ads",
    description:
      "Maximize your ROI with expertly managed advertising campaigns on Meta and Google.",
    color: "text-yellow-600",
  },
  {
    icon: "chartLine",
    title: "Performance Optimization",
    description:
      "We optimize your store for speed, SEO, and conversions to maximize your sales.",
    color: "text-yellow-600",
  },
  {
    icon: "bullHorn",
    title: "Digital Marketing",
    description:
      "Boost your brand with targeted marketing strategies, including Meta and Google Ads.",
    color: "text-red-600",
  },
  {
    icon: "code",
    title: "Web Development",
    description:
      "We create stunning, high-performance websites and e-commerce platforms tailored to your needs.",
    color: "text-blue-600",
  },
];

const ServiceSection = () => {
  return (
    <div className="mt-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gray-900 text-center"
      >
        🌍 Our Services
      </motion.h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto text-center">
        We offer a wide range of services to help your business thrive in the
        digital world.
      </p>

      {/* Services Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {about_service.map((each, ind) => {
          return <ServiceCard key={ind} service={each} />;
        })}
      </div>
    </div>
  );
};

export default ServiceSection;
