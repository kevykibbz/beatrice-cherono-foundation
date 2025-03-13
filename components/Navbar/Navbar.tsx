"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import TopBar from "../TopBar/Topbar";
import SiteLogo from "./SiteLogo";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-opacity-90 z-50">
      <TopBar />

      {/* Navbar */}
      <nav className="py-4 px-6 lg:px-10 flex items-center justify-between bg-dark">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <SiteLogo />
          <h1 className="text-2xl font-bold text-white">
            Beatrice Cherono <span className="text-purple-500">Melly</span> Foundation
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2 hover:text-purple-500 transition duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>

        {/* Navbar Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-purple-500 transition duration-300">Home</Link>
          <Link href="/about" className="text-white hover:text-purple-500 transition duration-300">About</Link>
          <Link href="/causes" className="text-white hover:text-purple-500 transition duration-300">Causes</Link>
          <Link href="/contact" className="text-white hover:text-purple-500 transition duration-300">Contact</Link>
        </div>

        {/* Donate Button (Desktop) */}
        <Link
          href="/donate"
          className="hidden lg:flex items-center border border-purple-500 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500 hover:text-white transition duration-300"
        >
          Donate Now
          <span className="ml-2 p-1 bg-white text-purple-500 rounded-full">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
      </nav>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#0D1B1E] py-4 px-6 w-[90%] rounded-tr-2xl rounded-br-2xl shadow-lg"
          >
            <Link href="/" className="block text-white hover:text-purple-500 py-2 transition duration-300">Home</Link>
            <Link href="/about" className="block text-white hover:text-purple-500 py-2 transition duration-300">About</Link>
            <Link href="/causes" className="block text-white hover:text-purple-500 py-2 transition duration-300">Causes</Link>
            <Link href="/contact" className="block text-white hover:text-purple-500 py-2 transition duration-300">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
