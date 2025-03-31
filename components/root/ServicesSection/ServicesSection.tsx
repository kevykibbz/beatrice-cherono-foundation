"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const pillars = [
  {
    title: "Education for All",
    description: "One of our primary pillars is ensuring access to quality education for all, especially for underprivileged children. We have a scholarship program to bridge the educational gap and empower children with knowledge that can transform their lives.",
     icon: "/images/education.png",
  },
  {
    title: "Healthcare and Well-being",
    description: "We organize health camps, awareness programs, and medical assistance initiatives to ensure that basic healthcare services are accessible to those who need them the most.",
    icon: "/images/healthcare.png",
  },
  {
    title: "Women Empowerment",
    description: "We provide vocational training, skill development, and awareness campaigns to enable women to become self-sufficient, fostering gender equality in society.",
    icon: "/images/woman.png",
  },
  {
    title: "Skill Enhancement",
    description: "We partner with institutions to offer training in various sectors like IT, hospitality, and retail to empower individuals to secure better job opportunities.",
    icon: "/images/learning.png",
  },
  {
    title: "Environment Conservation",
    description: "We conduct tree planting in public spaces especially in schools to enhance conducive learning environment and promote sustainable practices.",
    icon: "/images/conservation.png",
  },
  {
    title: "Community Development",
    description: "We work closely with communities to improve water, sanitation, and promote sustainable practices for future generations.",
    icon: "/images/teamwork.png",
  },
];

export default function ServicesSection() {
  return (
    <div className="py-16 bg-gray-100 mt-24 md:mt-0">
      <div className="max-w-5xl mx-auto text-center mb-10 mt-0 sm:mt-40">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-purple-500 text-white py-2 px-3 rounded-full mb-3"
        >
          OUR PILLARS
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold"
        >
          Core Foundations of Our Work
        </motion.h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {pillars.map((pillar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={pillar.icon}
                alt={pillar.title}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h4 className="text-xl font-semibold mb-3 text-purple-600">
              {pillar.title}
            </h4>
            <p className="text-gray-600 mb-4">{pillar.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}