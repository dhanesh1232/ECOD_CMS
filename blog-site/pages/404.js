import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { CornerDownLeft } from "lucide-react";
const PageNotFound = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Page Not Found | ECOD</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="w-full h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          <div className="px-8 py-3 text-center relative">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 3,
              }}
              className="mx-auto w-24 h-24 sm:w-36 md:w-52 sm:h-36 md:h-52 mb-4 sm:mb-6 relative"
            >
              <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-md"
              >
                <path
                  d="M100 180C145.2 180 180 145.2 180 100C180 54.8 145.2 20 100 20C54.8 20 20 54.8 20 100C20 145.2 54.8 180 100 180Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="10,5"
                  className="text-indigo-200 dark:text-gray-700"
                />
                <path
                  d="M60 60L140 140M140 60L60 140"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-red-500 dark:text-red-400"
                />
                <text
                  x="100"
                  y="110"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="48"
                  fontWeight="bold"
                  className="text-gray-700 dark:text-gray-300"
                >
                  404
                </text>
              </svg>
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-red-400 opacity-0 dark:border-red-300"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </motion.div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2 sm:mb-6 max-w-md mx-auto">
              {`We couldn't find the page at ${router.asPath}. It might have been moved, deleted, or never existed.`}
            </p>

            <div className="space-y-4 mb-2 md:mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/"
                  className="flex items-center justify-center gap-1 w-full  px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  <CornerDownLeft size={18} /> Return to Home
                </Link>
              </motion.div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Need immediate help?{" "}
                <Link
                  href="/contact"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
          <div className="flex w-full items-center justify-center mb-1">
            <Link
              href="/privacy-policy"
              className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-gray-800"
            >
              Privacy Policy
            </Link>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 px-8 py-3 text-center flex justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Error code: 404 | {new Date().toLocaleDateString()}
            </p>
            <button
              onClick={() => router.back()}
              className="text-xs flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <CornerDownLeft size={12} /> Go back
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PageNotFound;
