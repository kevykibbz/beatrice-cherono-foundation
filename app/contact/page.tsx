"use client";
import Header from "@/components/Header/Header";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import React from "react";

export default function Contact() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <React.Fragment>
      <Header title="Contact us" />
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
          >
            <div className="inline-block rounded-full bg-gray-200 text-purple-700 py-1 px-3 mb-3">
              Contact Us
            </div>
            <h1 className="text-3xl font-bold mb-5">
              If You Have Any Query, Please Contact Us
            </h1>
            <p className="mb-4 text-gray-600">
              Feel free to reach out to us with any questions or inquiries.
              Simply fill out the form below, and we will get back to you as
              soon as possible.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    placeholder=" "
                    className="peer w-full p-3 border rounded focus:outline-none focus:ring focus:ring-purple-300"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
                  >
                    Your Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder=" "
                    className="peer w-full p-3 border rounded focus:outline-none focus:ring focus:ring-purple-300"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
                  >
                    Your Email
                  </label>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  placeholder=" "
                  className="peer w-full p-3 border rounded focus:outline-none focus:ring focus:ring-purple-300"
                />
                <label
                  htmlFor="subject"
                  className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
                >
                  Subject
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  placeholder=" "
                  className="peer w-full p-3 border rounded h-24 focus:outline-none focus:ring focus:ring-purple-300"
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
                >
                  Message
                </label>
              </div>
              <div className="sm:flex sm:items-center sm:justify-center sm:h-screen">
                <button className="bg-purple-500 text-white py-2 px-4 flex items-center gap-2 hover:bg-purple-700 transition cursor-pointer rounded-full sm:mx-auto">
                  Send Message
                  <span className="bg-white text-purple-600 p-2 rounded-full">
                    <ChevronRightIcon className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </form>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
              style={{ border: "none" }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
          </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
}
