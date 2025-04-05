"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ITestimonial, TestimonialsTypes } from "@/types/types";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { AddTestimonialButton } from "./AddTestimonialButton/AddTestimonialButton";
import { Types } from "mongoose";
import React from "react";
import DualRingLoader from "../Loader/DualRingLoader";
import { useTestimonials } from "@/hooks/use-testimonials";
import "./Testimonials.css";
import { useSession } from "next-auth/react";

const DEFAULT_USER: TestimonialsTypes = {
  id: "",
  name: "Loading...",
  email: "Loading...",
  role: "Loading...",
  image: "/images/profile.png",
  testimonial: "Loading...",
};

export default function TestimonialsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { data: testimonialsData, isLoading } = useTestimonials();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  // Process testimonials into displayable users
  const processTestimonials = useCallback(
    (testimonials: ITestimonial[]): TestimonialsTypes[] => {
      if (!testimonials?.length) return [DEFAULT_USER];
      return testimonials.map((testimonial) => {
        const user =
          testimonial.user && !(testimonial.user instanceof Types.ObjectId)
            ? testimonial.user
            : null;

        return {
          id: testimonial.id,
          name: user?.name || "Anonymous",
          email: user?.email,
          role: testimonial.role,
          image: user?.image || "/images/profile.png",
          testimonial: testimonial.testimonial,
        };
      });
    },
    []
  );

  const users = useMemo(() => {
    const dataToProcess = isAdmin
      ? testimonialsData
      : (testimonialsData || []).slice(0, 6);
    return processTestimonials(dataToProcess || []);
  }, [testimonialsData, processTestimonials, isAdmin]);

  const selectedUser = users[selectedIndex] || DEFAULT_USER;

  useEffect(() => {
    if (users.length > 1) {
      const interval = setInterval(() => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % users.length);
      }, 6000); // Auto-switch every 6 seconds

      return () => clearInterval(interval);
    }
  }, [users.length]);

  useEffect(() => {
    if (users.length > 1) {
      const interval = setInterval(() => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % users.length);
      }, 6000); // Auto-switch every 6 seconds

      return () => clearInterval(interval);
    }
  }, [users.length]);

  // Animation for testimonials when switching
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  // Animation variants for sliding in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
      },
    },
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0 }, // Start off-screen to the left
    visible: { x: 0, opacity: 1 }, // Slide in to the center
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 overflow-x-hidden">
      <div className="bg-white mx-0 sm:mx-8 p-4 rounded shadow-lg w-full">
        <div className="title">
          <h2 className="text-purple-500">
            Our <span>Testimonials</span>
          </h2>
          <h3>Our Clients</h3>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto mb-3 text-center px-6">
          At our NGO, we strive to make a real difference in communities
          worldwide. Hear from those who have worked alongside us—whether
          it&apos;s volunteers dedicating their time, businesses collaborating
          on social impact projects, or beneficiaries whose lives have changed.
          Their experiences showcase the power of collective action in creating
          meaningful change.
        </p>
        <div className="content">
          {isLoading ? (
            <div className="mt-5 flex-1 w-full relative flex flex-col min-h-[300px]">
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10 rounded-lg">
                <DualRingLoader fullScreen={false} size={50} />
              </div>
            </div>
          ) : (
            <React.Fragment>
              {/* Clients List */}
              <div className="clients-list">
                <motion.div
                  className="clients-tabs space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="relative h-full flex flex-col min-h-[400px]">
                    <div className="flex-grow overflow-y-auto">
                      {users[0]?.id !== "" && users.length > 0 ? (
                        users.map((user, index) => (
                          <motion.div
                            key={user.id}
                            className={`
                    client-item rounded-lg transition-all duration-300 relative
                    ${
                      selectedIndex === index
                        ? "scale-90 shadow-lg translate-x-4 bg-gray-100 border-3 border-purple-500 text-purple-500"
                        : "opacity-50 border-2 border-transparent"
                    }
                  `}
                            onClick={() => setSelectedIndex(index)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            variants={itemVariants}
                          >
                            <div className="client-thumbnail">
                              <Image
                                src={user.image}
                                alt={user.name}
                                width={50}
                                height={50}
                                className="rounded-full"
                              />
                            </div>
                            <div className="client-intro">
                              <h5
                                className={`font-medium ${
                                  selectedIndex === index
                                    ? "text-purple-600"
                                    : "text-gray-700"
                                }`}
                              >
                                {user.name}
                              </h5>
                              <small
                                className={`text-sm ${
                                  selectedIndex === index
                                    ? "text-purple-400"
                                    : "text-gray-500"
                                }`}
                              >
                                {user.role}
                              </small>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg"
                          variants={itemVariants}
                        >
                          <ChatBubbleLeftRightIcon className="w-12 h-12 text-gray-400 mb-4" />
                          <p className="text-gray-500 text-lg">
                            No testimonials yet
                          </p>
                        </motion.div>
                      )}
                    </div>

                    <div className="sticky bottom-3 pt-4 flex justify-center items-baseline">
                      <AddTestimonialButton />
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="show-info flex-1 w-full relative flex flex-col">
                {selectedUser.id == "" ? (
                  <motion.div
                    className="show-text p-6 rounded-lg w-full bg-gray-50 border-2 border-dashed border-gray-200 relative flex flex-col h-full items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center max-w-md">
                      <ChatBubbleLeftRightIcon className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                      <h4 className="text-xl font-medium text-gray-600 mb-2">
                        No Testimonials Yet
                      </h4>
                      <p className="text-gray-500 mb-6">
                        Be the first to share your experience with us!
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedUser.id}
                      className="show-text p-6 rounded-lg w-full bg-white shadow-lg relative flex flex-col h-full"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {/* User Name and Role */}
                      <div className="mb-4">
                        <h4 className="show-name text-2xl font-bold">
                          {selectedUser.name}
                        </h4>
                        <small className="show-designation text-gray-600 capitalize">
                          {selectedUser.role}
                        </small>
                      </div>

                      {/* Testimonial with Closing Quotes */}
                      <p className="show-description text-gray-800 mt-3 mb-8 relative text-lg italic flex items-start">
                        <span className="flex-1">
                          {selectedUser.testimonial}
                        </span>
                        <Image
                          src="/images/opening-mark.png"
                          alt="Closing Quote"
                          width={30}
                          height={30}
                          className="ml-2 rotate-180"
                        />
                      </p>

                      <ChatBubbleLeftRightIcon className="absolute right-5  top-5 w-8 h-8 text-purple-500" />
                      <div className="absolute bottom-4 right-4">
                        <Image
                          src={selectedUser.image}
                          alt={selectedUser.name}
                          width={100}
                          height={100}
                          className="rounded-full border-2 border-gray-300 shadow-md"
                        />
                      </div>

                      {/* Inquire Button (Fixed at Bottom) */}
                      <div className="mt-auto">
                        <Link
                          href={`mailto:${selectedUser.email}`}
                          className=" bg-purple-500 text-white px-6 py-2 rounded-full border-2 border-transparent hover:bg-white hover:text-purple-500 hover:border-purple-500 transition-all duration-300"
                        >
                          Inquire Now
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
