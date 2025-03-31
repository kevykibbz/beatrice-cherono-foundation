"use client";
import { motion } from "framer-motion";
import React, { JSX } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function CausesSection(): JSX.Element {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const causes = [
    {
      title: "SCHOLARSHIP FUND",
      description: "Providing full and partial scholarships for bright students from poor families, covering tuition, sanitary towels, shoes, books and other necessities.",
      goal: 50000,
      raised: 42750,
      image: "/images/courses-1.jpg"
    },
    {
      title: "ENVIRONMENT CONSERVATION",
      description: "Tree planting initiatives in schools, health centers and public spaces to promote quality education and healthy communities.",
      goal: 30000,
      raised: 18500,
      image: "/images/courses-2.jpg"
    },
    {
      title: "POVERTY RELIEF",
      description: "Supporting sustainable projects for food security, clean water access and quality of life improvements in local communities.",
      goal: 45000,
      raised: 32100,
      image: "/images/courses-3.jpg"
    }
  ];

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mx-auto max-w-2xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="inline-block rounded-full bg-purple-200 text-purple-600 py-1 px-3 mb-3 text-sm font-medium cursor-pointer"
        >
          Our Key Projects
        </motion.div>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold mb-5 text-gray-800"
        >
          Transforming Communities Through Sustainable Initiatives
        </motion.h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {causes.map((cause, index) => {
          const progress = Math.min(Math.round((cause.raised / cause.goal) * 100), 100);
          
          return (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={cause.image}
                  alt={cause.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 bg-purple-600 text-white px-4 py-2 rounded-tr-xl">
                  {cause.title}
                </div>
              </div>

              <div className="p-6 flex-1">
                <p className="text-gray-600 mb-5">
                  {cause.description}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between text-gray-700 mb-2">
                    <span className="font-medium">Goal: Ksh{cause.goal.toLocaleString()}</span>
                    <span className="font-medium">Raised: Ksh{cause.raised.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-purple-600 h-full rounded-full text-xs text-white flex items-center justify-center"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right mt-1 text-sm text-purple-600 font-medium">
                    {progress}% Funded
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <a 
                  href="#"
                  className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800 transition-colors"
                >
                  Learn more about this project
                  <ChevronRightIcon className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}