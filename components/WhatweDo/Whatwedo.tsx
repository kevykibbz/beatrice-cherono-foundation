"use client";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <div className="relative w-full bg-gradient-to-r from-purple-400 via-purple-600 to-purple-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="text-left">
          <motion.h4
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase opacity-75"
          >
            Trust Us
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold mt-1"
          >
            What We Done
          </motion.h2>
        </div>

        {/* Stats Section - All in One Line */}
        <div className="flex space-x-16 text-center">
          {[
            { value: 141, suffix: "+", text: "Campaigns" },
            { value: 251, suffix: "k", text: "Voices Added" },
            { value: 880, suffix: "k", text: "Add Your Voice" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-6xl font-light"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-2xl">{stat.suffix}</span>
              </motion.p>
              <hr className="border-white opacity-50 my-2 w-24 mx-auto" />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg"
              >
                {stat.text}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
