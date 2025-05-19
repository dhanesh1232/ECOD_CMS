"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import { useSession } from "next-auth/react";

export default function Forbidden() {
  const { data: session } = useSession();
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
        className="mb-8 text-6xl text-red-500 dark:text-red-400"
      >
        <FiLock className="inline-block" />
      </motion.div>

      <motion.h1
        variants={item}
        className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-800 dark:text-white"
      >
        Access Denied
      </motion.h1>

      <motion.p
        variants={item}
        className="text-lg md:text-xl mb-8 text-center text-gray-600 dark:text-gray-300 max-w-md"
      >
        {`You don't have permission to access this workspace.`}
      </motion.p>

      <motion.div variants={item}>
        <Link
          href={`/${session.user.workspaceSlug}`}
          className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <FiArrowLeft className="mr-2" />
          Return to Your Workspaces
        </Link>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-12 text-sm text-gray-500 dark:text-gray-400"
      >
        Need access? Contact your workspace administrator
      </motion.div>

      {/* Additional subtle animation for emphasis */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
        className="absolute w-64 h-64 rounded-full bg-red-500 dark:bg-red-600 pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </motion.div>
  );
}
