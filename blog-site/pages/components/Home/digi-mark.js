"use client";

import Link from "next/link";

const DigitalMarketing = () => {
  return (
    <section className="w-full py-20 px-8 bg-gradient-to-r from-blue-50 to-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          🚀 Digital Marketing & Branding
        </h2>
        <p className="mt-4 text-base md:text-lg text-gray-700">
          Amplify your online presence with{" "}
          <span className="font-semibold text-blue-600">SEO</span>,
          high-converting{" "}
          <span className="font-semibold text-blue-600">PPC campaigns</span>,
          and strategic{" "}
          <span className="font-semibold text-blue-600">
            social media marketing
          </span>
          .
        </p>
        <p className="mt-2 text-gray-600">
          Let’s take your brand to the next level with data-driven strategies.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 w-full flex justify-center space-x-4">
          <Link
            href="/services/digital-marketing"
            className="px-8 py-2 bg-blue-600 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 hover:scale-105 transition-transform duration-300 flex items-center justify-center"
          >
            Get Started
          </Link>
          <Link
            href="/contact"
            className="px-8 py-2 border border-blue-600 text-blue-600 text-base sm:text-lg font-semibold rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transition-transform duration-300 flex items-center justify-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DigitalMarketing;
