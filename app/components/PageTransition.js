"use client";

import { motion } from "framer-motion";

/**
 * PageTransition Component
 * 
 * A wrapper component that adds smooth fade-in transition animations to pages.
 * Uses Framer Motion for animations.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to be animated
 */
const PageTransition = ({ children }) => {
  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.61, 1, 0.88, 1] // Custom easing function
      }
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      variants={variants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 