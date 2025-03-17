"use client";

import React, { JSX, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const TopBar = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden lg:flex justify-between items-center px-10 border-b border-gray-600 text-white/50 shadow-md py-4 fixed top-0 w-full z-100 backdrop-blur-sm bg-black/50"
        >
          <div className="hidden lg:flex space-x-6">
            <small>
              <MapPinIcon className="h-4 w-4 inline-block mr-1" /> Eldoret, Uasin Gishu County, Kenya
            </small>
            <small>
              <EnvelopeIcon className="h-4 w-4 inline-block mr-1" /> info@beatricecheronomellyfoundation.org
            </small>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <small>Follow us:</small>
            <Link href="#" className="text-purple-400 hover:text-purple-800">
              <FaFacebookF className="h-3.5 w-3.5" />
            </Link>
            <Link href="#" className="text-purple-400 hover:text-purple-800">
              <FaTwitter className="h-3.5 w-3.5" />
            </Link>
            <Link href="#" className="text-purple-400 hover:text-purple-800">
              <FaLinkedinIn className="h-3.5 w-3.5" />
            </Link>
            <Link href="#" className="text-purple-400 hover:text-purple-800">
              <FaInstagram className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopBar;
