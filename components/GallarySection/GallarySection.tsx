"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GallarySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    {
      src: "https://i.ibb.co/qCkd9jS/img1.jpg",
      title: "Switzerland",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    },
    {
      src: "https://i.ibb.co/jrRb11q/img2.jpg",
      title: "Finland",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    },
    {
      src: "https://i.ibb.co/NSwVv8D/img3.jpg",
      title: "Iceland",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    },
    {
      src: "https://i.ibb.co/Bq4Q0M8/img4.jpg",
      title: "Australia",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    },
    {
      src: "https://i.ibb.co/jTQfmTq/img5.jpg",
      title: "Netherland",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    },
    {
      src: "https://i.ibb.co/RNkk6L0/img6.jpg",
      title: "Ireland",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="container mx-auto p-6 my-6">
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
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${images[activeIndex].src})` }}
              >
                {/* Optional: Add a caption or overlay here */}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Smaller Cards */}
          <div className="overflow-hidden">
            <div className="absolute bottom-0 right-0 flex flex-row space-x-4 z-10 p-4">
              {images.map((image, index) => {
                // Determine if the card should be visible
                const isVisible =
                  index === activeIndex || // Always show the active card
                  index === (activeIndex + 1) % images.length || // Show the next card
                  index === (activeIndex + 2) % images.length; // Show the second next card

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: 0 }} // Control opacity based on visibility
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setActiveIndex(index)}
                    className={`
              w-24 h-34 md:w-30 md:h-40 bg-cover bg-center rounded-lg shadow-lg cursor-pointer hover:scale-110 transform transition
              ${isVisible ? "block" : "hidden"} // Hide non-visible cards
              ${
                index === activeIndex ? "z-20" : "z-10"
              } // Bring active card to front
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
    </section>
  );
};

export default GallarySection;
