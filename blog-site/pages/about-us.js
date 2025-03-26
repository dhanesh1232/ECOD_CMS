"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiAward,
  FiUsers,
  FiGlobe,
  FiClock,
} from "react-icons/fi";
import {
  FaShopify,
  FaChartLine,
  FaMobileAlt,
  FaPalette,
  FaHandshake,
  FaLightbulb,
} from "react-icons/fa";
import { experties_data } from "@/data/shopify";

// Dynamic imports with loading states
const TeamMemberCard = dynamic(() => import("./components/About/team"), {
  loading: () => (
    <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
  ),
});
const BackAndForward = dynamic(
  () => import("./components/Reusable/back-forw"),
  {
    loading: () => (
      <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
    ),
  }
);
const CompanyIntro = dynamic(() => import("./components/About/intro"), {
  loading: () => (
    <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
  ),
});
const ServiceSection = dynamic(
  () => import("./components/About/about-services"),
  {
    loading: () => (
      <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
    ),
  }
);
const Buttons = dynamic(() => import("./components/Reusable/buttons"));
const HeadSEO = dynamic(() => import("./components/Reusable/seo_head"));

const About = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  const features = [
    {
      icon: (
        <FaShopify className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      ),
      title: "Shopify Expertise",
      description:
        "Certified Shopify Plus developers with 5+ years experience building high-converting stores",
      delay: 0.1,
    },
    {
      icon: (
        <FaChartLine className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      ),
      title: "Data-Driven",
      description: "We optimize based on real analytics to maximize your ROI",
      delay: 0.2,
    },
    {
      icon: (
        <FaMobileAlt className="w-8 h-8 text-green-600 dark:text-green-400" />
      ),
      title: "Mobile-First",
      description: "60% of traffic comes from mobile - we design accordingly",
      delay: 0.3,
    },
    {
      icon: <FaPalette className="w-8 h-8 text-pink-600 dark:text-pink-400" />,
      title: "Brand-Centric",
      description: "Custom designs that reflect your unique brand identity",
      delay: 0.4,
    },
    {
      icon: (
        <FaHandshake className="w-8 h-8 text-orange-600 dark:text-orange-400" />
      ),
      title: "White-Glove Service",
      description: "Dedicated account manager for every client",
      delay: 0.5,
    },
    {
      icon: (
        <FaLightbulb className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
      ),
      title: "Innovative Solutions",
      description: "We stay ahead of ecommerce trends to keep you competitive",
      delay: 0.6,
    },
  ];

  const values = [
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Excellence",
      description: "We pursue mastery in everything we do",
      delay: 0.1,
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Collaboration",
      description: "Your success is our shared mission",
      delay: 0.2,
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Impact",
      description: "We build solutions that make a difference",
      delay: 0.3,
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Efficiency",
      description: "Smart solutions that save you time and money",
      delay: 0.4,
    },
  ];

  return (
    <>
      <HeadSEO
        title="About Us - ECOD"
        description="ECOD is a leading Shopify agency specializing in high-converting ecommerce stores. Learn about our team, values, and success stories."
        canonicalUrl="https://ecoddigital.com/about"
        ogImage="https://ecoddigital.com/images/about-og-image.jpg"
        twitterImage="https://ecoddigital.com/images/about-twitter-image.jpg"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Us - ECOD",
          description: "Leading Shopify experts helping brands grow online",
          url: "https://ecoddigital.com/about",
        }}
      />

      <div className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BackAndForward forward="/contact" />
          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Building the Future of{" "}
              <span className="text-purple-600 dark:text-purple-400 bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Ecommerce
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              ECOD is a premier Shopify agency dedicated to helping brands
              create exceptional online shopping experiences that drive real
              business growth.
            </p>
          </motion.section>

          {/* Company Introduction */}
          <CompanyIntro />

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "100+", label: "Stores Launched" },
              { number: "1M+", label: "Revenue Generated" },
              { number: "98%", label: "Client Retention" },
              { number: "4.7/5", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900"
              >
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {stat.number}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Services Section */}
          <ServiceSection />

          {/* Features Section */}
          <section className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Our Shopify Expertise
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We combine deep platform knowledge with conversion-focused
                design to create stores that perform.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900 group"
                >
                  <div className="flex justify-center mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-3 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800"
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className="mt-20 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 sm:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                These principles guide every decision we make and every store we
                build.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: value.delay }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-white/90 dark:hover:bg-gray-600/90"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 mr-4">
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 pl-12">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Meet The Team
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Passionate experts dedicated to your ecommerce success.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {experties_data.map((data, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TeamMemberCard data={data} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="mt-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 sm:p-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Client Success Stories
              </h2>
              <p className="mt-4 text-lg text-purple-100 max-w-3xl mx-auto">
                {`Don't just take our word for it - hear from brands we've helped
                grow.`}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "ECOD completely transformed our Shopify store. Our conversion rate increased by 120% and we hit $1M in sales within 6 months of working with them.",
                  author: "Sarah Johnson",
                  role: "CEO, Luxe Fashion Co",
                  delay: 0.1,
                },
                {
                  quote:
                    "As a startup, we needed experts who could guide us through the Shopify ecosystem. ECOD delivered beyond our expectations - they're true partners in our growth.",
                  author: "Michael Chen",
                  role: "Founder, TechGadgets",
                  delay: 0.2,
                },
                {
                  quote:
                    "The level of customization and attention to detail ECOD provided was exceptional. Our store stands out in a crowded market thanks to their creative solutions.",
                  author: "David Wilson",
                  role: "Marketing Director, HomeGoods",
                  delay: 0.3,
                },
                {
                  quote:
                    "What impressed me most was ECOD's strategic approach. They didn't just build a store - they built a revenue-generating machine tailored to our business goals.",
                  author: "Emily Rodriguez",
                  role: "Ecommerce Manager, BeautyBrand",
                  delay: 0.4,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: testimonial.delay }}
                  viewport={{ once: true }}
                  className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-start">
                    <FiCheckCircle className="flex-shrink-0 mt-1 text-purple-300 w-5 h-5" />
                    <p className="ml-3 text-lg italic">{`"${testimonial.quote}"`}</p>
                  </div>
                  <div className="mt-4 pl-8">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-purple-200 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Ecommerce Business?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {`Let's discuss how we can help you build a Shopify store that
              drives real results.`}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Buttons
                first_styles="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                first_label={
                  <>
                    Get Started <FiArrowRight className="ml-2" />
                  </>
                }
                first_onClick={() => router.push("/contact")}
              />
              <Buttons
                first_styles="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-semibold rounded-lg hover:shadow-md transition-all hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                first_label="Learn More About Our Process"
                first_onClick={() => router.push("/process")}
              />
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default About;
