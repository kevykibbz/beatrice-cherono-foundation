"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryImage } from "@/types/types";

const GallarySection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const images: GalleryImage[] = [
    {
      src: "/images/gallary-1.jpg",
      title: "Eldoret",
    },
    {
      src: "/images/gallary-2.jpg",
      title: "Kisumu",
    },
    {
      src: "/images/gallary-3.jpg",
      title: "Kericho",
    },
    {
      src: "/images/gallary-4.jpg",
      title: "Nairobi",
    },
    {
      src: "/images/gallary-5.jpg",
      title: "Kisii",
    },
    {
      src: "/images/gallary-6.jpg",
      title: "Nanyuki",
    },
  ];

  const startInterval = useCallback(() => {
    if (intervalId) clearInterval(intervalId);

    // Start new interval
    const id = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    setIntervalId(id);
  }, [intervalId,images.length]); 

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId,startInterval]);

  const handleImageClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    startInterval();
  };

  return (
    <section className="w-full max-w-7xl mx-0 md:mx-auto px-4">
      <div className="grid grid-cols-12 gap-6 items-center">
        {/* Left Section - Text and Button */}
        <div className="col-span-12 md:col-span-4 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Our Gallery
          </h2>
          <p className="text-gray-600 mb-6">
            Discover moments captured in stunning visuals. Our gallery showcases
            the best memories and experiences we have shared together.
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="px-6 py-3 flex items-center justify-center border border-purple-500 cursor-pointer bg-purple-600 text-white rounded-full shadow-md hover:bg-white hover:text-purple-500 transition">
              View More
            </button>
          </div>
        </div>

        {/* Right Section - Gallery */}
        <div className="col-span-12 md:col-span-8 relative">
          {/* Main Image */}
          <div className="relative w-full aspect-[16/9] rounded-lg shadow-md overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                custom={direction}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${images[activeIndex].src})` }}
              >
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/80  to-transparent p-4">
                  <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-sm sm:text-lg md:text-2xl font-bold text-white drop-shadow-lg"
                  >
                    {images[activeIndex].title}
                  </motion.h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Smaller Cards - Now Responsive */}
          <div className="overflow-hidden">
            <div className="absolute bottom-0 right-0 flex flex-row space-x-2 md:space-x-4 z-10 p-2 md:p-4">
              {images.map((image, index) => {
                const isVisibleOnMobile = index === activeIndex;
                const isVisibleOnDesktop =
                  index === activeIndex ||
                  index === (activeIndex + 1) % images.length ||
                  index === (activeIndex + 2) % images.length;

                const shouldShow = isMobile
                  ? isVisibleOnMobile
                  : isVisibleOnDesktop;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: shouldShow ? 1 : 0,
                      y: shouldShow ? 0 : 20,
                      scale: shouldShow ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleImageClick(index)}
                    className={`
                            ${
                              isMobile
                                ? "w-16 h-20"
                                : "w-24 h-30 md:w-30 md:h-40"
                            }
                            bg-cover bg-center rounded-lg shadow-lg cursor-pointer 
                            hover:scale-110 transform transition-all duration-300
                            ${
                              index === activeIndex
                                ? "ring-2 ring-purple-500 z-20"
                                : "z-10"
                            }
                            ${shouldShow ? "block" : "hidden"}
                          `}
                    style={{
                      backgroundImage: `url(${image.src})`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="h-16"></div>
    </section>
  );
};

export default GallarySection;
