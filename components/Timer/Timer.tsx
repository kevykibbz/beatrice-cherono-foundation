"use client";

import { CountdownTimerProps, TimeLeft } from "@/types/types";
import { motion } from "framer-motion";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";

export default function Timer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  return (
    <section className="w-full overflow-hidden px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Timer Card */}
          <div className="w-full md:w-2/3">
            <div
              className="relative h-[50vh] min-h-[300px] w-full rounded-lg shadow-lg flex flex-col items-center justify-center text-white bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: "url('/images/background.jpg')" }}
            >
              {/* Overlay with Linear Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent/20" />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative text-center w-full px-4"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4 sm:mb-6">
                  Time To New Event
                </h1>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <motion.div
                      key={unit}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-center min-w-[60px]"
                    >
                      <h2 className="text-4xl sm:text-5xl md:text-6xl font-thin">
                        {value.toString().padStart(2, "0")}
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg capitalize">
                        {unit}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text Content */}
          <motion.div
            className="w-full md:w-1/3 text-center md:text-left mt-4 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              Be Part of the Change
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 md:mb-6">
              Our NGO fundraiser is more than just an event—it&apos;s a movement.
              Together, we can provide education, healthcare, and support for
              those in need. Explore our gallery to see the impact we&apos;ve made so
              far.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}