"use client";
import dynamic from "next/dynamic";
const BackAndForward = dynamic(() => import("./components/Reusable/back-forw"));

const About = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-6 md:px-12 lg:px-24">
      <BackAndForward forward="/contact" />
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          About ECOD
        </h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Welcome to{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            ECOD
          </span>
          , your digital partner for cutting-edge web development, strategic
          digital marketing, and seamless Shopify solutions. Our mission is to
          empower businesses with innovative technology and marketing strategies
          that drive growth and success.
        </p>
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Our Expertise
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              We specialize in <strong>Next.js, React.js, MongoDB</strong>, and
              full-stack web solutions, alongside expert digital marketing
              strategies, including{" "}
              <strong>Meta Ads, Google Ads, and SEO</strong> to maximize online
              reach.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Get in Touch
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            Have a project in mind? {`Let's`} bring your vision to life. Reach
            out to us at:
          </p>
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-2">
            ecoddigital@ecod.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
