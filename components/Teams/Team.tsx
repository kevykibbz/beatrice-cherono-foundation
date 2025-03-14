"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { TeamMembersTypes } from "@/types/types";
import { JSX } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const teamMembers: TeamMembersTypes[] = [
  {
    id: 1,
    name: "Joe Simmons",
    designation: "Designation",
    img: "/images/team-1.jpg",
  },
  {
    id: 2,
    name: "Sarah Hassan",
    designation: "Designation",
    img: "/images/team-2.jpg",
  },
  {
    id: 3,
    name: "Tabitha walker",
    designation: "Designation",
    img: "/images/team-3.jpg",
  },
  {
    id: 4,
    name: "Timothy Johns",
    designation: "Designation",
    img: "/images/team-4.jpg",
  },
];

const Teams = (): JSX.Element => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <motion.div
          className="inline-block rounded-full bg-purple-200 text-purple-600 px-4 py-1 text-sm font-semibold mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Team Members
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let&apos;s Meet With Our Ordinary Soldiers
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden text-center group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={300}
                  height={350}
                  className="w-full h-60 object-cover"
                />
                {/* Social Icons Slide Up Effect */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-3 py-2 bg-white bg-opacity-80 transform translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Link
                    className="bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300"
                    href="#"
                  >
                    <FaFacebookF className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    className="bg-white p-2 rounded-full shadow-md text-blue-400 hover:bg-blue-400 hover:text-white transition duration-300"
                    href="#"
                  >
                    <FaTwitter className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    className="bg-white p-2 rounded-full shadow-md text-pink-500 hover:bg-pink-500 hover:text-white transition duration-300"
                    href="#"
                  >
                    <FaInstagram className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h5 className="text-xl font-semibold">{member.name}</h5>
                <p className="text-purple-600">{member.designation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
