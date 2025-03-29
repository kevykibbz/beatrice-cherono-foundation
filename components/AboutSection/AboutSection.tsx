"use client";
import { motion, Variants } from "framer-motion";
import React, { JSX, useState, useEffect } from "react";
import Image from "next/image";
import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


const coreValues: string[] = [
  "Integrity",
  "Committed to child Education",
  "Teamwork",
  "Innovation",
  "Transparency",
  "Attitude of Giving",
  "Compassion",
  "Empathy",
];

const AboutSection = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const targetNumber: number = 1321901;

  useEffect(() => {
    let start = 0;
    const duration = 2000; // Animation duration in ms
    const increment = targetNumber / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };
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
            Guided by our six pillars—education, environment, healthcare, women&apos;s empowerment, skill development, and community growth—we&apos;ve transformed 12,000+ lives across Nandi County since 2015. Last year alone, our programs provided 280 scholarships, planted 5,700 trees near schools and health centers, trained 450 women in sustainable agriculture, and equipped 120 youth with vocational skills. Each initiative reflects our core belief: that empowered communities create lasting change.
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
      <div className="h-16 md:h-24"></div>
      <div className="flex flex-col md:flex-row items-stretch bg-white">
        <motion.div
          className="md:w-1/2 px-10 py-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Core Values
          </motion.h2>

          <motion.p
            className="text-gray-600 mb-6 text-sm md:text-lg leading-relaxed "
            variants={itemVariants}
          >
            Our organization is deeply committed to values that shape our
            culture, guide decisions, and define relationships. These principles
            serve as our foundation, influencing internal collaboration and
            community engagement. Acting as our moral compass, they help us stay
            true to our mission while striving for excellence. The Organization
            upholds the following values:
          </motion.p>

          <motion.ul className="space-y-3">
            {coreValues.map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-start"
                variants={itemVariants}
              >
                <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 mt-1 mr-2 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full">
                  <CheckIcon className="w-3 h-3 text-white" />
                </span>
                <span className="text-gray-600">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative p-10 md:w-1/2 flex flex-col justify-center rounded-xl overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/carousel-2.jpg"
              alt="Background"
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(109, 40, 217, 0.7) 0%, rgba(76, 29, 149, 0.5) 100%)",
              }}
            ></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <p className="text-lg font-semibold text-purple-100 drop-shadow-lg">
              Served Over
            </p>
            <motion.h2
              className="text-5xl font-bold text-white drop-shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {count.toLocaleString()}
            </motion.h2>
            <p className="text-lg font-semibold text-purple-100 drop-shadow-lg">
              Children in 150 Countries
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
