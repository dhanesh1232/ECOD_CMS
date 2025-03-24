import Link from "next/link";
import { MessageCircle } from "lucide-react"; // Or any other appropriate icon
import { motion } from "framer-motion";
import { useState } from "react";

const StickyContactButton = ({
  label = "Contact",
  href = "/contact",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      className={`fixed bottom-5 right-5 z-50 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Link href={href} passHref>
        <motion.button
          className={`
            w-32 h-12
            flex items-center justify-center gap-2
            bg-gradient-to-br from-indigo-600 to-indigo-500
            text-white font-medium text-sm
            rounded-full
            shadow-lg
            transition-all duration-200 ease-out
            border border-indigo-700/50
            relative overflow-hidden
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
            ${isHovered ? "shadow-xl from-indigo-500 to-indigo-400" : ""}
            ${isPressed ? "scale-[0.98] shadow-md" : ""}
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          aria-label={label}
        >
          {/* Animated background effect */}
          <motion.span
            className="absolute inset-0 bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />

          <MessageCircle
            className={`w-4 h-4 transition-transform ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <span>{label}</span>

          {/* Optional shimmer effect on hover */}
          {isHovered && (
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: -100, skewX: -15 }}
              animate={{ x: 300, skewX: -15 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default StickyContactButton;
