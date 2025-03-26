import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

const StickyContactButton = ({
  label = "Contact Us",
  href = "/contact",
  className = "",
  icon = true,
  pulse = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const controls = useAnimation();
  let animationRunning = true;

  // Pulse animation effect
  useEffect(() => {
    if (pulse) {
      const sequence = async () => {
        while (animationRunning) {
          await controls.start({
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              "0 25px 50px -12px rgb(79 70 229 / 0.3)",
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            ],
            transition: { duration: 2, repeat: Infinity, repeatDelay: 5 },
          });
        }
      };

      sequence();

      return () => {
        animationRunning = false; // Cleanup on unmount
      };
    }
  }, [pulse, controls]);

  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-50 ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.7, type: "spring" }}
      whileHover={{ scale: 1.05 }}
    >
      <Link href={href} passHref legacyBehavior>
        <motion.a className="block" aria-label={label}>
          <motion.button
            className="flex items-center justify-center gap-2 bg-gradient-to-br from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:from-indigo-700 active:to-indigo-600 text-white font-medium text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-out border border-indigo-700/50 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 px-6 py-3 min-w-[120px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            animate={controls}
          >
            {/* Animated background layer */}
            <motion.span
              className="absolute inset-0 bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Icon with enhanced animation */}
            {icon && (
              <motion.span
                animate={{
                  rotate: isHovered ? [0, 10, -10, 0] : 0,
                  scale: isHovered ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.6 }}
              >
                <MessageCircle className="w-5 h-5" />
              </motion.span>
            )}

            {/* Text with subtle animation */}
            <motion.span
              animate={{
                x: isHovered ? [0, 2, 0] : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {label}
            </motion.span>

            {/* Ripple effect on hover */}
            {isHovered && (
              <>
                <motion.span
                  className="absolute inset-0 bg-white/10 rounded-full"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.span
                  className="absolute inset-0 bg-white/20 rounded-full"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </>
            )}
          </motion.button>
        </motion.a>
      </Link>
    </motion.div>
  );
};

export default StickyContactButton;
