import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
const AnimatedCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSize = useMotionValue(20);
  const isHovering = useRef(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
      cursorSize.set(40);
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      cursorSize.set(20);
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, .interactive"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY, cursorSize]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const springSize = useSpring(cursorSize, springConfig);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 bg-blue-500 rounded-full pointer-events-none mix-blend-difference z-50"
      style={{
        x: springX,
        y: springY,
        width: springSize,
        height: springSize,
      }}
    />
  );
};

export default AnimatedCursor;
