"use client";
import { motion } from "framer-motion";
import React, { JSX } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const AboutSection = ():JSX.Element => {
  return (
    <div className="container mx-auto py-10 px-5">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="relative h-[400px] w-full"
        >
          <Image
            src="/images/about-1.jpg"
            alt="Main Image"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white p-2">
            <Image
              src="/images/about-2.jpg"
              alt="Overlay Image"
              width={200}
              height={200}
              className="rounded-md"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-block bg-gray-200 text-purple-500 text-sm font-semibold py-2 px-3 rounded-full mb-3"
          >
            About Us
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            We Help People In Need Around The World
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-gray-100 border-l-4 border-purple-500 rounded p-4 mb-4"
          >
            <p className="text-gray-700 mb-2">
              The main objective of the Organization is to support educational
              projects, promote environmental conservation, to set up relief of
              poverty projects/programs, and to promote health initiatives
              within the scope of its operations.
            </p>
            <span className="text-purple-500 font-semibold">
              Beatrice Cherono, Founder
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-gray-600 mb-5"
          >
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
            lorem sit clita duo justo magna dolore erat amet
          </motion.p>

          {/* Buttons with Fade-in Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-4 justify-center sm:justify-start"
          >
            <Link
              className="flex items-center bg-purple-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-purple-600 transition"
              href="#"
            >
              Learn More
              <span className="ml-2 bg-white text-purple-500 p-1 rounded-full">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </Link>

            <Link
              className="flex items-center border border-purple-500 text-purple-500 py-2 px-4 rounded-full shadow-md hover:bg-purple-500 hover:text-white transition"
              href="/contact"
            >
              Contact Us
              <span className="ml-2 bg-purple-500 text-white p-1 rounded-full">
                <ChevronRightIcon className="h-4 w-4 text-white" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};


export default AboutSection;