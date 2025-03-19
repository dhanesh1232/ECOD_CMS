"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";
const TeamMemberCard = dynamic(() => import("./components/About/team"));

import { experties_data } from "@/data/shopify";
import Buttons from "./components/Reusable/buttons";
import Intro from "./components/About/intro";
import ServiceSection from "./components/About/about-services";
import HeadSEO from "./components/Reusable/seo_head";

// Dynamic imports for better performance
const BackAndForward = dynamic(() => import("./components/Reusable/back-forw"));

const About = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  return (
    <>
      <HeadSEO
        title="About Us - ECOD"
        description="Learn more about ECOD, our mission, and our team. We are dedicated to helping businesses grow through innovative digital solutions."
        canonicalUrl="https://ecoddigital.com/about"
        ogImage="https://ecoddigital.com/images/about-og-image.jpg"
        twitterImage="https://ecoddigital.com/images/about-twitter-image.jpg"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Us - ECOD",
          description:
            "Learn more about ECOD, our mission, and our team. We are dedicated to helping businesses grow through innovative digital solutions.",
          url: "https://ecoddigital.com/about",
        }}
      />
      <section className="w-full py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Intro />
          {/* Services Section */}
          <ServiceSection />

          {/* Team Section */}
          <div className="mt-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 text-center"
            >
              Our Team
            </motion.h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto text-center">
              Meet the experts behind your Shopify success. Our team is
              passionate about helping businesses grow online.
            </p>

            {/* Team Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experties_data.map((data, i) => (
                <TeamMemberCard key={i} data={data} />
              ))}
            </div>
          </div>

          {/* Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to Grow Your Business?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Let us handle your Shopify store setup and maintenance so you can
              focus on what you do best.
            </p>
            <Buttons
              first_styles="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300"
              first_label={"Get Started"}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
