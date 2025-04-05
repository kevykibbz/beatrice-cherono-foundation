"use client";

import React, { useState, useEffect, JSX, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { SlideTypes } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import DualRingLoader from "../Loader/DualRingLoader";
import { useWindowSize } from "@/hooks/use-window-size";

const initialItems: SlideTypes[] = [
  {
    image: "/images/carousel-1.jpg",
    title: "Education for a Brighter Future",
    description:
      "A young student sits in a classroom, smiling with hope and determination. Every child deserves access to quality education for a better tomorrow.",
    link: "#",
  },
  {
    image: "/images/carousel-2.jpg",
    title: "A Cry for Hope",
    description:
      "An African child gazes up, searching for hope and help. We strive to provide essential resources and opportunities to uplift vulnerable children.",
  },
  {
    image: "/images/carousel-3.jpg",
    title: "Building a Future of Human Rights",
    description:
      "Human rights are the foundation of a just society. We advocate for equality, freedom, and dignity for all, ensuring a better future for generations to come.",
    link: "#",
  },
  {
    image: "/images/carousel-4.jpg",
    title: "Empowering Farmers for Sustainability",
    description:
      "A hardworking farmer pushes a wheelbarrow, tending to his shamba. We support sustainable agriculture to improve food security and livelihoods.",
  },
  {
    image: "/images/carousel-5.jpg",
    title: "A Refugee’s Silent Strength",
    description:
      "An African girl looks up with resilience and hope, despite being displaced. We provide support and opportunities to refugees and orphans in need.",
    link: "#",
  },
  {
    image: "/images/carousel-6.jpg",
    title: "Sustaining Livelihoods Through Fishing",
    description:
      "A crowded boat filled with people fishing, working hard to support their families. We promote sustainable fishing practices and economic empowerment.",
  },
];

const Carousel = (): JSX.Element => {
  const { width: windowWidth } = useWindowSize();
  const isSmallScreen = windowWidth < 768;
  const isMediumScreen = windowWidth >= 768 && windowWidth < 1024;
  const [items, setItems] = useState<SlideTypes[]>(initialItems);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const duration = 6000;
  const totalItems = items.length;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const isMounted = useRef<boolean>(false);
  const rotationLock = useRef<boolean>(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Next slide function
  const nextSlide = useCallback((targetIndex?: number) => {
    if (rotationLock.current) return;
    rotationLock.current = true;

    setItems((prevItems) => {
      if (typeof targetIndex === "number") {
        const clickedItem = prevItems[targetIndex];
        const remainingItems = prevItems.filter(
          (_, idx) => idx !== targetIndex
        );
        return [clickedItem, ...remainingItems];
      } else {
        return [prevItems[1], ...prevItems.slice(2), prevItems[0]];
      }
    });

    setProgress(100);
    setTimeout(() => {
      rotationLock.current = false;
    }, 50);
  }, []);

  // Previous slide function
  const prevSlide = () => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const lastItem = newItems.pop(); // Remove the last item
      if (lastItem) {
        newItems.unshift(lastItem); // Move it to the beginning of the array
      }
      return newItems;
    });
    setProgress(100);
  };

  // Start/restart the progress timer
  const startProgressTimer = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 1;
        if (newProgress <= 0) {
          nextSlide();
          return 100;
        }
        return newProgress;
      });
    }, duration / 100);
  }, [nextSlide]);

  // Initialize and clean up timer
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      startProgressTimer();
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [startProgressTimer]);

  // Restart timer when items change
  useEffect(() => {
    startProgressTimer();
  }, [items, startProgressTimer]);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Background Images */}
      <div className="list">
        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <DualRingLoader fullScreen={false} size={50} />
          </div>
        )}
        {/* Loader ends */}

        {/* Background Image Transition */}
        {totalItems > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={items[0].image} // Use the image URL as the key
              initial={{ opacity: 0, y: 100, scale: 1.05 }} // Start from the bottom
              animate={{ opacity: 1, y: 0, scale: 1 }} // Slide up to the center
              exit={{ opacity: 0, y: -100, scale: 0.95 }} // Slide up and fade out
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${items[0].image})` }}
            >
              {/* Hidden Image Element to Detect Load */}
              <Image
                src={items[0].image}
                alt="background"
                className="hidden"
                fill
                onLoad={handleImageLoad} // Trigger when the image is loaded
                onError={() => setIsLoading(false)} // Handle errors
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent/50"></div>

              {/* Text Description */}
              <div className="absolute top-1/2 left-[36px] md:left-[100px] -translate-y-1/2 w-[80%] max-w-[600px] text-white">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold"
                >
                  {items[0].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                  className="mt-3 text-sm md:text-lg lg:text-lg"
                >
                  {items[0].description}
                </motion.p>

                {items[0].link && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  >
                    <Link
                      href={items[0].link}
                      className="text-sm md:text-lg lg:text-lg mt-4 inline-flex items-center px-4 py-2 border-2 border-purple-500 rounded-full transition duration-200 hover:bg-purple-500"
                    >
                      See More{" "}
                      <ChevronRightIcon className="ml-2 w-5 h-5 sm:w-4 sm:h-4" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
        {/* Background Image Transition ends*/}
      </div>
      {/* Background Images end */}

      {/* Foreground Items with nth-child spacing */}
      <div>
        <AnimatePresence>
          {items.slice(1).map((item, idx) => {
            // Determine how many images to show based on screen size
            let shouldShow = true;
            let shouldFade = false;

            if (isSmallScreen) {
              shouldShow = idx === 0; // Only show first image on small screens
            } else {
              shouldShow = idx < 3; // Show max 3 images on larger screens
              shouldFade = idx >= 3; // Fade out images beyond 3
            }

            if (!shouldShow && !shouldFade) return null;

            const largeScreenOffset = `calc(65vw + ${idx * 200}px)`;
            const mediumScreenOffset = `calc(60vw + ${idx * 180}px)`;
            const smallScreenOffset = `calc(60vw + ${idx * 120}px)`;

            // Scale and opacity logic
            const scale = idx === 0 ? 1 : 0.9;
            let opacity = idx === 0 ? 1 : idx > 0 ? 0.7 : 0;
            if (shouldFade) opacity = 0; // Force opacity to 0 for hidden images

            // Responsive dimensions
            const width = isSmallScreen
              ? "160px"
              : isMediumScreen
              ? "170px"
              : "180px";
            const height = isSmallScreen
              ? "220px"
              : isMediumScreen
              ? "230px"
              : "250px";

            return (
              <motion.div
                key={item.image}
                onClick={() => nextSlide(idx + 1)}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 30,
                  left: isSmallScreen
                    ? `calc(65vw + ${(idx + 1) * 120}px)`
                    : isMediumScreen
                    ? `calc(65vw + ${(idx + 1) * 180}px)`
                    : `calc(65vw + ${(idx + 1) * 200}px)`,
                }}
                animate={{
                  opacity,
                  scale,
                  y: 0,
                  left: isSmallScreen
                    ? smallScreenOffset
                    : isMediumScreen
                    ? mediumScreenOffset
                    : largeScreenOffset,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: -20,
                  left: isSmallScreen
                    ? `calc(65vw + ${(idx - 1) * 120}px)`
                    : isMediumScreen
                    ? `calc(65vw + ${(idx - 1) * 180}px)`
                    : `calc(65vw + ${(idx - 1) * 200}px)`,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="cursor-pointer absolute top-[90%] md:top-[80%] z-50 -translate-y-[70%] rounded-[20px] 
                  shadow-[0_25px_50px_rgba(0,0,0,0.3)] bg-center bg-cover transition-all duration-1000"
                style={{
                  backgroundImage: `url(${item.image})`,
                  width: width,
                  height: height,
                }}
              ></motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {/* Foreground Items with nth-child spacing ends*/}

      {/* Next/Prev Buttons */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-[82%] md:top-[85%] lg:top-[85%] left-[40%] transform -translate-x-1/2 z-[70] w-auto flex items-center gap-4 sm:gap-3"
      >
        {/* Previous Button */}
        <motion.button
          whileHover={totalItems > 2 ? { scale: 1.1 } : {}}
          onClick={prevSlide}
          disabled={totalItems < 2}
          whileTap={totalItems > 2 ? { scale: 0.9 } : {}}
          className={`flex justify-center items-center w-[50px] h-[50px] sm:w-[40px] sm:h-[40px] rounded-full 
      font-bold border transition duration-500 
      ${
        totalItems < 2
          ? "cursor-not-allowed bg-gray-400 text-gray-200 border-gray-400"
          : "cursor-pointer bg-purple-500 text-white border-purple-500 hover:bg-white hover:text-purple-500"
      }`}
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-4 sm:h-4" />
        </motion.button>

        {/* Circular Progress with Next Button Inside */}
        <div className="relative flex items-center justify-center w-[60px] h-[60px] sm:w-[50px] sm:h-[50px]">
          <svg className="w-full h-full" viewBox="0 0 60 60">
            {/* Background Circle */}
            <circle
              className="text-gray-300"
              strokeWidth="5"
              stroke="currentColor"
              fill="transparent"
              r="25"
              cx="30"
              cy="30"
            />
            {/* Progress Circle */}
            <circle
              className="text-white"
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - (progress / 100) * circumference
              }
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="25"
              cx="30"
              cy="30"
              transform="rotate(-90,30,30)"
            />
          </svg>
          {/* Next Button Inside */}
          <motion.button
            whileHover={totalItems > 2 ? { scale: 1.1 } : {}}
            onClick={() => nextSlide()}
            disabled={totalItems < 2}
            whileTap={totalItems > 2 ? { scale: 0.9 } : {}}
            className={`absolute flex justify-center items-center w-[40px] h-[40px] sm:w-[32px] sm:h-[32px] rounded-full 
        font-bold border transition duration-500 
        ${
          totalItems < 2
            ? "cursor-not-allowed bg-gray-400 text-gray-200 border-gray-400"
            : "cursor-pointer bg-purple-500 text-white border-purple-500 hover:bg-white hover:text-purple-500"
        }`}
          >
            <ChevronRightIcon className="w-5 h-5 sm:w-4 sm:h-4" />
          </motion.button>
        </div>
      </motion.div>
      {/* Next/Prev Buttons  Ends*/}
    </div>
  );
};

export default Carousel;
