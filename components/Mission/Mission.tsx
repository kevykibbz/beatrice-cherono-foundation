"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Our Mission",
    text: "To raise social and economic standard of living through education, health, and environmental conservation.",
  },
  {
    title: "Our Vision",
    text: "To achieve a strong and cohesive society that contributes to the overall growth of the country’s economy. A better place where children become responsible citizens of their Country, and contribute towards the benefit of others.",
  },
  {
    title: "Core Values",
    text: "The Organization upholds the following values:",
    values: [
      "Integrity",
      "We are committed to child Education",
      "Teamwork",
      "Innovation",
      "Transparency",
      "Attitude of Giving",
      "Compassion",
      "Empathy",
    ],
  },
];

export default function MissionSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] bg-gray-100">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/carousel-1.jpg')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent/50" />

      {/* Floating Card with Smooth Height Animation */}
      <div className="absolute bottom-0 md:right-4 transform translate-y-1/2 z-10 w-full flex justify-center md:justify-end">
        <motion.div
          layout 
          className="bg-white p-6 shadow-xl rounded-lg w-[350px] md:w-[400px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Title with Underline */}
              <h2 className="text-2xl font-bold text-purple-800 relative after:content-[''] after:block after:w-12 after:h-[3px] after:bg-purple-800 after:mt-2">
                {slides[currentIndex].title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mt-3">{slides[currentIndex].text}</p>

              {/* Render Values List If Present */}
              {slides[currentIndex].values && (
                <ul className="mt-3 space-y-1 text-gray-600 list-disc list-inside">
                  {slides[currentIndex].values.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 cursor-pointer rounded-full transition-all ${
                  currentIndex === index ? "bg-purple-800 w-8" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
