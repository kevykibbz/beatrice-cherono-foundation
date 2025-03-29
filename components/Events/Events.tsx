"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegSmile } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";

const projects = [
  {
    image: "/images/carousel-1.jpg",
    title: "Education Initiative",
    description:
      "Providing quality education to underprivileged children through our network of community schools and digital learning programs.",
  },
  {
    image: "/images/carousel-2.jpg",
    title: "Clean Water Project",
    description:
      "Installing sustainable water filtration systems in rural communities to combat waterborne diseases.",
  },
  {
    image: "/images/carousel-3.jpg",
    title: "Healthcare Outreach",
    description:
      "Mobile medical units delivering essential healthcare services to remote areas with limited access.",
  },
];

export default function EventsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full my-16 px-4">
      {" "}
      {/* Increased top margin */}
      {/* Gallery Header Section */}
      <div className="text-center mb-12">
        {" "}
        {/* Added margin-bottom */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Our Impactful Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Discover how we&apos;re making a difference across the globe through our
          innovative initiatives. Each project represents our commitment to
          creating sustainable change.
        </motion.p>
      </div>
      {/* Project Gallery Container */}
      <div className="relative p-6 bg-gradient-to-r from-yellow-200 to-red-300 rounded-xl shadow-lg overflow-hidden min-h-[600px]">
        <div className="flex flex-col md:flex-row gap-8 items-center h-full pb-16">
          {/* Image Container - Left Side */}
          <div className="relative w-full md:w-1/2 h-[400px] md:h-[500px] z-0">
            {projects.map((project, index) => (
              <AnimatePresence key={index}>
                {index === currentIndex && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    transition={{ duration: 0.8 }}
                    className="absolute w-full h-full rounded-lg shadow-lg bg-white overflow-hidden z-0"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="object-cover rounded-lg z-0"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Top-left Heart Icon */}
                    <div className="absolute top-3 left-3 z-[100] rotate-45">
                      <div className="w-10 h-10 bg-white shadow-lg flex items-center justify-center rounded-lg">
                        <FaHeart className="text-red-500 -rotate-45 text-xl" />
                      </div>
                    </div>

                    {/* Top-right Smile Icon */}
                    <div className="absolute top-3 right-3 z-[100] -rotate-45">
                      <div className="w-10 h-10 bg-white shadow-lg flex items-center justify-center rounded-lg">
                        <FaRegSmile className="text-gray-600 rotate-45 text-xl" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Text Content - Right Side */}
          <div className="w-full md:w-1/2 space-y-6">
            <AnimatePresence mode="wait">
              {projects.map(
                (project, index) =>
                  index === currentIndex && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-6"
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {project.title}
                      </h2>
                      <p className="text-gray-700 text-lg">
                        {project.description}
                      </p>

                      {/* Learn More Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center md:text-left"
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <Link
                          href={`/projects/${index}`}
                          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300 shadow-md"
                        >
                          Learn More
                          <ChevronRightIcon className="ml-2 w-4 h-4" />
                        </Link>
                      </motion.div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Navigation Dots - Bottom Center */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`mx-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-purple-900 h-3"
                      : "w-3 h-3 bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
