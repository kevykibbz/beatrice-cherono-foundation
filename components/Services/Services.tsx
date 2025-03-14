"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { ServicesTypes } from "@/types/types";
import { JSX } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const services:ServicesTypes[] = [
  {
    title: "Child Education",
    description:"Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.",
    icon: "/images/icon-1.png",
  },
  {
    title: "Medical Treatment",
    description:"Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.",
    icon: "/images/icon-2.png",
  },
  {
    title: "Pure Drinking Water",
    description:"Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.",
    icon: "/images/icon-3.png",
  },
];

export default function Services():JSX.Element {
  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-purple-500 text-white py-1 px-3 rounded-full mb-3"
        >
          What We Do
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold"
        >
          Learn More What We Do And Get Involved
        </motion.h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white shadow-lg rounded-lg p-6 text-center"
          >
            <div className="flex justify-center mb-4">
              <Image src={service.icon} alt={service.title} width={64} height={64} />
            </div>
            <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <a
              href="#"
              className="inline-flex items-center text-purple-500 font-semibold hover:text-purple-600"
            >
              Learn More
              <span className="ml-2 bg-purple-500 text-white p-2 rounded-full">
                <ChevronRightIcon className="w-5 h-5"/>
              </span>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
