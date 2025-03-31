"use client";

import { JSX, useEffect, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function BackToTop():JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 border border-purple-500 cursor-pointer bg-purple-600 text-white rounded-full hover:bg-white shadow-lg hover:text-purple-500"
      aria-label="Back to top"
      initial={{ opacity: 0, y: 100 }} // Start off-screen
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }} // Slide up/down
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <ArrowUpIcon className="w-6 h-6" />
    </motion.button>
  );
}
