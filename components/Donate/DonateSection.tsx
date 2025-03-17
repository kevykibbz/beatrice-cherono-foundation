"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { DonatePageTypes } from "@/types/types";

export default function DonateSection({isDonatePage=true}:DonatePageTypes) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  return (
    <div className={`py-20 ${isDonatePage ? "bg-gray-100" : ""}`}>
      <div className="container mx-auto px-4">
        <div className={`flex flex-wrap items-center ${isDonatePage ? "bg-white" : "" } shadow-lg ${isDonatePage ? "rounded-lg" : "" } overflow-hidden`}>
          {/* Left Column */}
          <motion.div
            className="w-full lg:w-1/2 p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 1 }}
          >
            <div className="inline-block bg-gray-200 text-purple-500 text-sm font-semibold py-2 px-3 rounded-full mb-5">
              Donate Now
            </div>
            <h1 className={`text-4xl font-bold ${isDonatePage ? "text-gray-900" : "text-white" } mb-5`}>
              Thanks For The Results Achieved With You
            </h1>
            <p className={`${isDonatePage ? "text-gray-600" : "text-white" } mb-5`}>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet.
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className={`w-full lg:w-1/2 bg-[#F3E8FF] p-10 ${isDonatePage ? "" : "rounded-2xl" }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            variants={fadeInUp}
          >
            <form>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium  mb-2"
                  >
                    Your Name
                  </label>
                </div>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="!h-15 !border !border-gray-300 focus:!ring-2 focus:!ring-purple-500"
                />{" "}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium  mb-2"
                  >
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className="!h-15 !border !border-gray-300 focus:!ring-2 focus:!ring-purple-500"
                  />{" "}
                </div>
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    Donation Amount
                  </label>
                  <div className="w-full">
                    <div className="inline-flex w-full">
                      {[10, 20, 30].map((amount, index, arr) => (
                        <div key={amount} className="flex-1">
                          <Input
                            type="radio"
                            id={`btnradio${amount}`}
                            name="btnradio"
                            checked={selectedAmount === amount}
                            className="hidden"
                            onChange={() => setSelectedAmount(amount)}
                          />
                          <label
                            htmlFor={`btnradio${amount}`}
                            className={`!h-15 block text-center cursor-pointer py-3 px-6 bg-white text-purple-500 font-semibold transition duration-300 border-2 w-full
            border-gray-100 
            ${
              selectedAmount === amount
                ? "border-purple-500"
                : "hover:border-purple-500"
            }
            ${index === 0 ? "rounded-l-md" : ""}
            ${index === arr.length - 1 ? "rounded-r-md" : ""}
          `}
                          >
                            ${amount}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full h-16 px-5 bg-white text-purple-500 font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-purple-500 transition duration-300 cursor-pointer hover:text-white group"
                  >
                    Donate Now
                    <div className="w-8 h-8 bg-purple-500 text-white flex items-center justify-center rounded-full transition duration-300 group-hover:bg-white group-hover:text-purple-500">
                      <ChevronRightIcon className="h-4 w-4" />
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
