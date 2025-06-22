"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { data: session, status } = useSession();

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
  useEffect(() => {
    console.log(session, status);
  });

  const handleRedirect = () => {
    if (status === "authenticated") {
      return (window.location.href =
        session?.user?.workspaceSlug || "/workspaces");
    }
    return (window.location.href = "/auth/login");
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
        404 - Workspace Not Found
      </motion.h1>

      <motion.p
        variants={item}
        className="text-lg md:text-xl mb-8 text-center text-gray-600 dark:text-gray-300 max-w-md"
      >
        {`The workspace you're looking for doesn't exist or was deleted.`}
      </motion.p>

      <motion.div variants={item}>
        <Button onClick={handleRedirect} variants="forest" size="lg">
          <FiArrowLeft className="mr-2" />
          {status === "authenticated" ? "Return to Your Workspaces" : "Login"}
        </Button>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-12 text-sm text-gray-500 dark:text-gray-400"
      >
        Need help? Contact support
      </motion.div>
    </motion.div>
  );
}
