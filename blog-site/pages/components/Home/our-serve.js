"use client";

import Link from "next/link";

const services = [
  { label: "Web Development", href: "/services/web-development" },

  { label: "Google Ads", href: "/services/google-ads" },

  { label: "SEO", href: "/services/seo" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },

  {
    label: "Shopify Theme Development",
    href: "/services/shopify-theme-development",
  },
  {
    label: "Custom Shopify Solutions",
    href: "/services/custom-shopify-solutions",
  },
  { label: "Content Marketing", href: "/services/content-marketing" },
  { label: "Email Marketing", href: "/services/email-marketing" },
  { label: "E-Commerce", href: "/services/e-commerce" },
  { label: "Digital Transformation", href: "/services/digital-transformation" },
  { label: "Logo Design", href: "/services/logo-design" },
];

const OurServices = () => {
  const displayedServices = services.slice(0, 6); // Show only the first 6 services

  return (
    <section className="w-full py-20 px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
          🚀 Our Premium Services
        </h2>
        <p className="mt-4 text-base md:text-lg text-gray-700">
          Empowering businesses with cutting-edge digital solutions tailored for
          success.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {displayedServices.map((service, index) => (
          <a
            key={index}
            href={service.href}
            className="p-6 bg-white shadow-lg rounded-xl text-center border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-indigo-700">
              {service.label}
            </h3>
          </a>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="inline-block px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-500 hover:scale-105 transition-transform duration-300"
        >
          Explore More Services →
        </Link>
      </div>
    </section>
  );
};

export default OurServices;
