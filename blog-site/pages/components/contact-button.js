import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

const StickyContactButton = ({
  label = "Contact Us",
  href = "/contact",
  className = "",
  icon = true,
  pulse = true,
  variant = "default", // 'default' or 'minimal'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  let animationRunning = true;

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pulse animation effect
  useEffect(() => {
    if (pulse && !isMobile) {
      // Disable pulse on mobile
      const sequence = async () => {
        while (animationRunning) {
          await controls.start({
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              "0 10px 15px -3px rgb(79 70 229 / 0.3)",
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            ],
            transition: { duration: 2, repeat: Infinity, repeatDelay: 5 },
          });
        }
      };

      sequence();

      return () => {
        animationRunning = false;
      };
    }
  }, [pulse, controls, isMobile]);

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return {
          button:
            "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700/50 shadow-sm hover:shadow-md",
          icon: "text-indigo-500 dark:text-indigo-400",
          pulse: false,
        };
      default:
        return {
          button:
            "bg-gradient-to-br from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg hover:shadow-xl",
          icon: "text-white",
          pulse: pulse,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <motion.div
      className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.7, type: "spring" }}
      whileHover={!isMobile ? { scale: 1.05 } : {}}
    >
      <Link href={href} passHref legacyBehavior>
        <motion.a className="block" aria-label={label}>
          <motion.button
            className={`flex items-center justify-center gap-2 font-medium text-sm rounded-full transition-all duration-200 ease-out relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 px-4 sm:px-6 py-2 sm:py-3 min-w-[auto] sm:min-w-[120px] ${variantStyles.button}`}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            whileHover={!isMobile ? { y: -3 } : {}}
            whileTap={{ scale: 0.96 }}
            animate={variantStyles.pulse ? controls : {}}
          >
            {/* Animated background layer */}
            {variant === "default" && (
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Icon with enhanced animation */}
            {icon && (
              <motion.span
                className={variantStyles.icon}
                animate={
                  !isMobile
                    ? {
                        rotate: isHovered ? [0, 10, -10, 0] : 0,
                        scale: isHovered ? [1, 1.1, 1] : 1,
                      }
                    : {}
                }
                transition={{ duration: 0.6 }}
              >
                {isMobile ? (
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </motion.span>
            )}

            {/* Text with subtle animation - hidden on mobile if minimal variant */}
            {(!isMobile || variant !== "minimal") && (
              <motion.span
                className="hidden xs:inline-block"
                animate={
                  !isMobile
                    ? {
                        x: isHovered ? [0, 2, 0] : 0,
                      }
                    : {}
                }
                transition={{ duration: 0.4 }}
              >
                {isMobile && variant === "minimal" ? "Contact" : label}
              </motion.span>
            )}

            {/* Ripple effect on hover */}
            {isHovered && variant === "default" && (
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

            {/* Mobile badge */}
            {isMobile && variant === "default" && (
              <span className="absolute -top-1 -right-1 h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-indigo-500 items-center justify-center text-white text-xs font-bold">
                  !
                </span>
              </span>
            )}
          </motion.button>
        </motion.a>
      </Link>
    </motion.div>
  );
};

export default StickyContactButton;
