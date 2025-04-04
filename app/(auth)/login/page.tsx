"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EmailLoginForm } from "@/components/root/Forms/EmailLoginForm";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import GoogleSigningButton from "@/components/root/GoogleSigningButton/GoogleSigningButton";
import { useQuery } from "@tanstack/react-query";
import { getCarouselImages } from "@/services/carousel";
import Loader from "@/components/panel/Loader/Loader";
import { ImageIcon } from "lucide-react";

type CarouselImage = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default function Login() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { settings, isLoading: settingsLoading } = useSiteSettings();

  // Fetch carousel images from database
  const { 
    data: carouselImages = [], 
    isLoading: imagesLoading,
    isError
  } = useQuery({
    queryKey: ['login-carousel-images'],
    queryFn: getCarouselImages,
    select: (data) => data.map((img: CarouselImage) => ({
      id: img.id,
      image: img.imageUrl,
      title: img.title,
      description: img.description
    }))
  });

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Auto-advance slides every 5000ms if there are images
  useEffect(() => {
    if (carouselImages.length > 0) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % carouselImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [carouselImages.length]);

  if (imagesLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Failed to load carousel images</div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="h-10"></div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row h-[500px] max-h-screen bg-white">
          {/* Left Side - Compact Login Form */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center h-full">
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-center md:text-left space-y-4"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600 text-sm">
                  Log in to your Beatrice Cherono Melly Foundation account
                </p>

                <EmailLoginForm />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <GoogleSigningButton />
              </motion.div>
            </div>
          </div>

          {/* Right Side - Contained Card Slider */}
          <div className="hidden md:flex w-full md:w-1/2 p-4 items-center justify-center h-full">
            {carouselImages.length > 0 ? (
              <div className="relative h-full w-full max-w-2xl rounded-xl overflow-hidden shadow-lg">
                <AnimatePresence mode="wait">
                  {carouselImages.map(
                    (slide, index) =>
                      index === activeSlide && (
                        <motion.div
                          key={slide.id}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={slideVariants}
                          className="absolute inset-0"
                        >
                          <div className="relative h-full w-full">
                            <Image
                              src={slide.image}
                              alt={slide.title}
                              fill
                              className="object-cover"
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                            <div className="absolute bottom-16 left-0 right-0 p-6 text-white">
                              <motion.h2
                                variants={textVariants}
                                className="text-xl font-bold mb-1"
                              >
                                {slide.title}
                              </motion.h2>
                              <motion.p
                                variants={textVariants}
                                transition={{ delay: 0.1 }}
                                className="text-white/90 text-sm"
                              >
                                {slide.description}
                              </motion.p>
                            </div>
                          </div>
                        </motion.div>
                      )
                  )}
                </AnimatePresence>

                {/* Slider Navigation Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="bg-white backdrop-blur-sm rounded-full p-3 shadow-lg border border-white">
                    <div className="flex space-x-2">
                      {carouselImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveSlide(index)}
                          className={`
                            h-2 rounded-full transition-all duration-300
                            ${
                              index === activeSlide
                                ? "bg-purple-500 w-6 shadow-purple-500/50"
                                : "bg-gray-300 w-2 hover:bg-white/70"
                            }
                          `}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-xl">
                <div className="text-center p-6">
                  <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No carousel images available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed md:sticky bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 z-10">
        <div className="flex justify-center items-center h-10 px-4">
          {settingsLoading ? (
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-gray-500 text-xs md:text-sm text-center capitalize">
              &copy; {new Date().getFullYear()}{" "}
              {settings?.siteName || "Beatrice Cherono Melly Foundation"}, All
              Rights Reserved.
            </p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}