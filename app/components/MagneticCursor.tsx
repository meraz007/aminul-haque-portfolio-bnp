"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"]'
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
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 60 : 20,
            height: isHovering ? 60 : 20,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border-2 border-white"
        />
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isVisible ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="w-2 h-2 rounded-full bg-emerald-400 blur-sm"
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9998"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isVisible ? 0.2 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="w-24 h-24 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 blur-2xl"
        />
      </motion.div>
    </>
  );
}
