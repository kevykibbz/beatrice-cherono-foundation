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
  }, [targetDate]); // targ

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate,calculateTimeLeft]);

  return (
    <section className="container mx-auto p-6 my-6">
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="col-span-12 md:col-span-8">
          <div
            className="relative h-[70vh] w-full rounded-lg shadow-lg flex flex-col items-center justify-center text-white bg-cover bg-center"
            style={{ backgroundImage: "url('/images/background.jpg')" }}
          >
            {/* Overlay with Linear Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent/20" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative text-center"
            >
              <h1 className="text-4xl font-medium mb-6">Time To New Event</h1>
              <div className="flex gap-12 md:gap-16">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <motion.div
                    key={unit}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center"
                  >
                    <h2 className="text-6xl font-thin">
                      {value.toString().padStart(2, "0")}
                    </h2>
                    <p className="text-lg capitalize">{unit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="col-span-12 md:col-span-4 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Be Part of the Change
          </h2>
          <p className="text-gray-600 mb-6">
            Our NGO fundraiser is more than just an event—it&apos;s a movement.
            Together, we can provide education, healthcare, and support for
            those in need. Explore our gallery to see the impact we&apos;ve made so
            far.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
