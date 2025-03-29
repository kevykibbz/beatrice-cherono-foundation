"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";

const FounderCard = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        {/* Image Card (Left) */}
        <motion.div
          variants={imageVariants}
          className="w-full md:w-1/3 lg:w-2/5 relative"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/founder.jpg"
              alt="Beatrice Cherono"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
          >
            <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white px-2 py-1">
              Founder & CEO
            </div>
          </motion.div>
        </motion.div>

        {/* Text Content (Right) */}
        <motion.div
          variants={containerVariants}
          className="w-full md:w-2/3 lg:w-3/5 space-y-4 sm:space-y-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
          >
            Meet Our Founder
          </motion.h2>

          <motion.h3
            variants={itemVariants}
            className="relative text-xl sm:text-2xl font-semibold text-purple-600 dark:text-purple-400
             inline-block pb-1
             after:content-[''] after:absolute after:left-0 after:bottom-0 
             after:w-1/2 after:h-[5px] after:bg-purple-600 after:dark:bg-purple-400"
          >
            Beatrice Cherono
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-lg text-gray-600 dark:text-gray-300"
          >
            Beatrice Cherono Melly Foundation, is guided by its pillars that
            form the foundation of its transformative work. By prioritizing
            education, environment, healthcare, women’s empowerment, skill
            enhancement, and community development, we are driving positive
            change in the region. These pillars represent not only the core
            values of this NGO but also its unwavering commitment to creating a
            more equitable and empowered society in Nandi. Through our dedicated
            efforts, we continue to touch lives and shape destinies, making a
            significant impact on the communities we serve.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2 sm:pt-4"
          >
            <a
              href="/contact"
              className="group rounded-full px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300 inline-flex items-center text-sm sm:text-base"
            >
              Contact
              <span className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-800 group-hover:bg-purple-900 flex items-center justify-center transition-colors duration-300">
                <ChevronRightIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FounderCard;
