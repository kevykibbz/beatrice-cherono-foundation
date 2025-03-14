"use client";
import Header from "@/components/Header/Header";
import { motion } from "framer-motion";
import React from "react";
import { JSX } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const CausesSection = (): JSX.Element => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <React.Fragment>
      <Header title="Causes" />
      <div className="container mx-auto py-10">
        <div className="text-center mx-auto max-w-xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="inline-block rounded-full bg-purple-200 text-purple-600 py-1 px-3 mb-3"
          >
            Feature Causes
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-3xl font-bold mb-5"
          >
            Every Child Deserves The Opportunity To Learn
          </motion.h1>
        </div>

        <div className="ml-2 mr-2 grid md:grid-cols-3 gap-6 justify-center">
          {["Education", "Pure Water", "Healthy Life"].map((cause, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              whileHover={{scale:1.1}}
              className="bg-gray-100 border-t-4 border-purple-600 rounded-xl overflow-hidden shadow-lg flex flex-col h-full cursor-pointer"
            >
              <div className="text-center p-6">
                <div className="relative -top-6 inline-block bg-purple-600 text-white rounded-b-xl text-lg pb-1 px-4 mb-4">
                  <small>{cause}</small>
                </div>
                <h5 className="text-xl font-semibold mb-3">
                  {cause === "Education"
                    ? "Education For African Children"
                    : cause === "Pure Water"
                    ? "Ensure Pure Drinking Water"
                    : "Ensure Medical Treatment"}
                </h5>
                <p className="text-gray-600">
                  Tempor erat elitr rebum at clita dolor diam ipsum sit diam
                  amet diam et eos
                </p>
                <div className="bg-white p-4 rounded-lg mt-4">
                  <div className="flex justify-between text-gray-700">
                    <p>
                      $10,000 <small>Goal</small>
                    </p>
                    <p>
                      $9,542 <small>Raised</small>
                    </p>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden mt-2">
                    <div
                      className="bg-purple-600 h-full text-center text-white text-sm flex items-center justify-center"
                      style={{ width: "90%" }}
                    >
                      90%
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mt-auto group w-full h-56 sm:mb-3">
                <div className="absolute inset-0">
                  <Image
                    src={`/images/courses-${index + 1}.jpg`}
                    alt={cause}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a className="text-white border border-purple-500 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white hover:text-purple-600 transition-colors duration-300">
                    Read More <ChevronRightIcon className="w-5 h-5"/>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CausesSection;
