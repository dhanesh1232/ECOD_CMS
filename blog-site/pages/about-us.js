"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";
const TeamMemberCard = dynamic(() => import("./components/About/team"));

import { experties_data } from "@/data/shopify";
import Buttons from "./components/Reusable/buttons";
import Intro from "./components/About/intro";
import ServiceSection from "./components/About/about-services";

// Dynamic imports for better performance
const BackAndForward = dynamic(() => import("./components/Reusable/back-forw"));

const About = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>About Us - ECOD</title>
        <meta
          name="description"
          content="Learn more about our mission, vision, and the team behind Your Website Name."
        />
        <meta property="og:title" content="About Us - Your Website Name" />
        <meta
          property="og:description"
          content="Learn more about our mission, vision, and the team behind Your Website Name."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/about-us`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/about-us-og-image.jpg`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - Your Website Name" />
        <meta
          name="twitter:description"
          content="Learn more about our mission, vision, and the team behind Your Website Name."
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/about-us-twitter-image.jpg`}
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/about-us`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Us",
            description:
              "Learn more about our mission, vision, and the team behind Your Website Name.",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`,
            publisher: {
              "@type": "Organization",
              name: "Your Website Name",
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
              },
            },
          })}
        </script>
      </Head>
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
