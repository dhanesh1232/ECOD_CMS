"use client";

import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const ServicePost = () => {
  const router = useRouter();
  const { href } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate content loading
    if (href) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        // In a real app, you would fetch content here
        setContent({
          title: href,
          description: `Detailed information about ${href.replace(/-/g, " ")}`,
          body: `<p>This is a comprehensive guide about ${href.replace(/-/g, " ")}. Here you'll find all the information you need to understand this service.</p>
                 <h2>Key Features</h2>
                 <ul>
                   <li>Feature 1: Description of feature</li>
                   <li>Feature 2: Description of feature</li>
                   <li>Feature 3: Description of feature</li>
                 </ul>
                 <h2>How It Works</h2>
                 <p>Detailed explanation of the service process...</p>`,
          lastUpdated: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [href]);

  const formattedTitle = href
    ? href
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  if (!href) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          No service post found.
        </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{formattedTitle} | ECOD</title>
        <meta
          name="description"
          content={`Learn about ${formattedTitle} services from ECOD.`}
        />
        <meta property="og:title" content={`${formattedTitle} | ECOD`} />
        <meta
          property="og:description"
          content={`Discover our ${formattedTitle} services`}
        />
        <meta property="og:type" content="article" />
      </Head>

      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="animate-pulse flex flex-col items-center space-y-4">
              <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="mt-8 space-y-4 w-full max-w-3xl">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 py-12"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {formattedTitle}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {content.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-500 mb-8">
                Last updated: {content.lastUpdated}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content.body }}
            />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Contact us today to learn more about our {formattedTitle}{" "}
                services.
              </p>
              <button
                onClick={() => router.push("/contact")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
              >
                Contact Our Team
              </button>
            </motion.div>
          </motion.div>
        )}
      </main>
    </>
  );
};

export default ServicePost;
