import { motion } from "framer-motion";
const defaultColors = [
  ["bg-red-500", "text-white"],
  ["bg-blue-600", "text-white"],
  ["bg-green-600", "text-white"],
  ["bg-yellow-400", "text-gray-800"],
  ["bg-purple-600", "text-white"],
  ["bg-pink-500", "text-white"],
  ["bg-indigo-600", "text-white"],
  ["bg-teal-600", "text-white"],
  ["bg-orange-500", "text-white"],
  ["bg-amber-400", "text-gray-800"],
  ["bg-lime-400", "text-gray-800"],
  ["bg-emerald-600", "text-white"],
  ["bg-cyan-500", "text-white"],
  ["bg-violet-600", "text-white"],
  ["bg-fuchsia-500", "text-white"],
  ["bg-rose-500", "text-white"],
  ["bg-sky-500", "text-white"],
  ["bg-stone-500", "text-white"],
  ["bg-slate-600", "text-white"],
  ["bg-gray-600", "text-white"],
  ["bg-neutral-600", "text-white"],
  ["bg-zinc-600", "text-white"],
  ["bg-red-400", "text-white"],
  ["bg-blue-400", "text-white"],
  ["bg-green-400", "text-white"],
  ["bg-yellow-300", "text-gray-800"],
];

const LetterAvatar = ({ letter, size = "md", className = "" }) => {
  const charCode = letter?.charCodeAt(0) || 0;
  const colorIndex = charCode % defaultColors.length;
  const bg = defaultColors[colorIndex][0];
  const text = defaultColors[colorIndex][1];

  const sizeClasses = {
    sm: "w-4 h-4 md:w-6 md:h-6 text-xs md:text-sm",
    md: "w-6 md:w-8 h-6 md:h-8 text-sm md:text-base",
    lg: "w-8 md:w-10 h-8 md:h-10 text-base md:text-lg",
    xl: "md:w-14 md:h-14 w-10 h-10 text-lg md:text-xl",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`${bg} ${text} ${sizeClasses[size]} border-none rounded-full flex items-center justify-center font-bold ${className}`}
    >
      {letter?.toUpperCase() || "?"}
    </motion.div>
  );
};

export default LetterAvatar;
