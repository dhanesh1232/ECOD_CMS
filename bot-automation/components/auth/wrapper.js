// components/AIFormWrapper.jsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AIAgents = () => {
  const agents = [
    {
      id: 1,
      emoji: "🤖",
      color: "dark:bg-blue-500/20 bg-blue-100/80",
      border: "dark:border-blue-400/40 border-blue-300/60",
      size: 16,
      x: "15%",
      y: "20%",
      delay: 0,
    },
    {
      id: 2,
      emoji: "👩‍💻",
      color: "dark:bg-purple-500/20 bg-purple-100/80",
      border: "dark:border-purple-400/40 border-purple-300/60",
      size: 14,
      x: "85%",
      y: "30%",
      delay: 0.5,
    },
    {
      id: 3,
      emoji: "🦾",
      color: "dark:bg-cyan-500/20 bg-cyan-100/80",
      border: "dark:border-cyan-400/40 border-cyan-300/60",
      size: 12,
      x: "20%",
      y: "70%",
      delay: 1,
    },
    {
      id: 4,
      emoji: "🧠",
      color: "dark:bg-emerald-500/20 bg-emerald-100/80",
      border: "dark:border-emerald-400/40 border-emerald-300/60",
      size: 18,
      x: "75%",
      y: "60%",
      delay: 1.5,
    },
    {
      id: 5,
      emoji: "📊",
      color: "dark:bg-amber-500/20 bg-amber-100/80",
      border: "dark:border-amber-400/40 border-amber-300/60",
      size: 14,
      x: "10%",
      y: "50%",
      delay: 2,
    },
  ];

  return (
    <>
      {agents.map((agent) => (
        <motion.div
          key={agent.id}
          className={`absolute ${agent.color} ${agent.border} rounded-full flex items-center justify-center dark:backdrop-blur-sm backdrop-blur-xs`}
          style={{
            width: `${agent.size}px`,
            height: `${agent.size}px`,
            left: agent.x,
            top: agent.y,
            fontSize: `${agent.size / 2}px`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0.8],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            delay: agent.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {agent.emoji}
        </motion.div>
      ))}
    </>
  );
};

const BotFeatures = () => {
  const features = [
    { icon: "⚡", text: "Real-time Processing", x: "10%", y: "10%" },
    { icon: "🔗", text: "API Integrations", x: "90%", y: "15%" },
    { icon: "📈", text: "Analytics Dashboard", x: "5%", y: "80%" },
    { icon: "🔄", text: "Auto-learning", x: "95%", y: "75%" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          className="absolute text-xs dark:bg-black/20 bg-white/80 dark:border-white/10 border-gray-200 backdrop-blur-sm px-2 py-1 rounded-md border"
          style={{ left: feature.x, top: feature.y }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -10, -20],
          }}
          transition={{
            duration: 15,
            delay: i * 3,
            repeat: Infinity,
          }}
        >
          <span className="mr-1">{feature.icon}</span>
          <span className="dark:text-white/70 text-gray-600">
            {feature.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const CodeParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        char: Math.random() > 0.5 ? "{ }" : Math.random() > 0.3 ? "< />" : "AI",
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.8 + 0.4,
        speed: Math.random() * 3 + 2,
        color: `dark:text-${
          ["blue", "purple", "cyan", "green"][Math.floor(Math.random() * 4)]
        }-400/50 text-${
          ["blue", "purple", "cyan", "green"][Math.floor(Math.random() * 4)]
        }-300/30`,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.color} font-mono`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}rem`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 10 * p.speed,
            repeat: Infinity,
            delay: p.id * 0.1,
            ease: "linear",
          }}
        >
          {p.char}
        </motion.div>
      ))}
    </div>
  );
};

export default function AIFormWrapper({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center dark:bg-gray-900 bg-gray-50 p-4">
        <div className="w-full max-w-md dark:bg-gray-800/80 bg-white/90 rounded-2xl p-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full flex items-center justify-center dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-black bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 dark:bg-[url('/grid-pattern.svg')] bg-[url('/grid-pattern-light.svg')] dark:opacity-[0.03] opacity-[0.05]" />
      <CodeParticles />
      <AIAgents />
      <BotFeatures />

      {/* Data Connections */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#gradient)"
              strokeWidth="0.5"
              strokeDasharray="5,5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 15, repeat: Infinity, delay: i * 2 }}
            />
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md dark:bg-gray-800/80 bg-white/90 dark:border-gray-700/50 border-gray-200/80 rounded-2xl backdrop-blur-lg dark:shadow-2xl dark:shadow-blue-500/10 shadow-xl shadow-gray-400/10 overflow-hidden"
      >
        {/* Form Content */}
        <div className="p-4 pt-2">{children}</div>

        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-40 h-40 dark:bg-blue-500/10 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 dark:bg-purple-500/10 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      </motion.div>
    </div>
  );
}
