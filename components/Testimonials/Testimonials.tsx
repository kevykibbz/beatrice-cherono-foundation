"use client";
import { useEffect, useState } from "react";
import "./Testimonials.css";
import Image from "next/image";
import { TestimonialsTypes } from "@/types/types";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const users: TestimonialsTypes[] = [
  {
    id: 1,
    name: "Erick Jones",
    role: "Managing Director, USA",
    img: "/images/client-1.jpg",
    testimonial:
      "Working with this NGO has been a life-changing experience. Their commitment to community development and transparency in operations is truly inspiring. I’ve seen firsthand how their projects positively impact lives.",
  },
  {
    id: 2,
    name: "Ben Smith",
    role: "Volunteer Coordinator, USA",
    img: "/images/client-2.jpg",
    testimonial:
      "Volunteering here has given me a new perspective on social impact. The team is incredibly dedicated, and the projects are well-organized, making it easy for volunteers to contribute effectively.",
  },
  {
    id: 3,
    name: "Ellen Harper",
    role: "Content Strategist, USA",
    img: "/images/client-3.jpg",
    testimonial:
      "This NGO is doing incredible work in underserved communities. I had the chance to document their initiatives, and the stories of resilience and change are truly moving.",
  },
  {
    id: 4,
    name: "Jonathan Doe",
    role: "Program Manager, USA",
    img: "/images/client-4.jpg",
    testimonial:
      "I've collaborated with many NGOs, but this organization stands out for its professionalism and impact-driven approach. Their education and healthcare programs are making a real difference.",
  },
  {
    id: 5,
    name: "Emiley McArthur",
    role: "Donor & Supporter, USA",
    img: "/images/client-5.jpg",
    testimonial:
      "I’ve supported this NGO for years, and I’m always impressed by their accountability and dedication. Seeing the progress reports and real-life success stories makes every donation feel meaningful.",
  },
];

export default function TestimonialsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedUser = users[selectedIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % users.length);
    }, 5000); // Auto-switch every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
          {/* Clients List */}
          <div className="clients-list">
            <motion.div
              className="clients-tabs space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  className={`client-item rounded-lg transition-all duration-300 relative ${
                    selectedUser.id === user.id
                      ? "scale-90 shadow-lg translate-x-4 bg-purple-600 text-white"
                      : "opacity-50"
                  }`}
                  onClick={() => setSelectedIndex(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  <div className="client-thumbnail">
                    <Image
                      src={user.img}
                      alt={user.name}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="client-intro">
                    <h5>{user.name}</h5>
                    <small className="client-designation">{user.role}</small>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="show-info flex-1 w-full relative flex flex-col">
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
                  <small className="show-designation text-gray-600">
                    {selectedUser.role}
                  </small>
                </div>

                {/* Testimonial with Closing Quotes */}
                <p className="show-description text-gray-800 mt-3 mb-8 relative text-lg italic flex items-start">
                  <Image
                    src="/images/opening-mark.png"
                    alt="Opening Quote"
                    width={30}
                    height={30}
                    className="mr-2"
                  />
                  <span className="flex-1">{selectedUser.testimonial}</span>
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
                    src={selectedUser.img}
                    alt={selectedUser.name}
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-gray-300 shadow-md"
                  />
                </div>

                {/* Inquire Button (Fixed at Bottom) */}
                <div className="mt-auto">
                  <Link
                    href="#"
                    className=" bg-purple-500 text-white px-6 py-2 rounded-full border-2 border-transparent hover:bg-white hover:text-purple-500 hover:border-purple-500 transition-all duration-300"
                  >
                    Inquire Now
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Navigation Dots */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
            >
              {users.map((_, index) => (
                <button
                  key={index}
                  className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
                    selectedIndex === index
                      ? "bg-purple-500 shadow-purple-500/50 scale-110"
                      : "bg-gray-300 shadow-gray-400/50 hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
