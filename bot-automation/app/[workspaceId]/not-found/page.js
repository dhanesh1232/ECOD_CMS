"use client";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function WorkspaceNotFound() {
  const params = useParams();
  const workspaceId = params.workspaceId;
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
    >
      <motion.div
        variants={item}
        className="mb-8 text-6xl text-yellow-500 dark:text-yellow-400"
      >
        <FiAlertTriangle className="inline-block" />
      </motion.div>

      <motion.h1
        variants={item}
        className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-800 dark:text-white"
      >
        404 - Page Not Found
      </motion.h1>

      <motion.p
        variants={item}
        className="text-lg md:text-xl mb-8 text-center text-gray-600 dark:text-gray-300 max-w-md"
      >
        {`The page you're looking for in "${workspaceId}" workspace doesn't exist.`}
      </motion.p>

      <motion.div variants={item}>
        <Link
          href={`/${workspaceId}`}
          className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <FiArrowLeft className="mr-2" />
          Return to Workspace Dashboard
        </Link>
      </motion.div>
    </motion.div>
  );
}
