"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import TopBar from "../TopBar/Topbar";
import SiteLogo from "./SiteLogo";
import { PathTypes } from "@/types/types";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const paths: PathTypes[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Causes", path: "/causes" },
  { name: "Services", path: "/services" },
  { name: "Our Teams", path: "/teams" },
  { name: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname(); // Get the current active path

  // Listen for scroll events
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
    <React.Fragment>
      <TopBar />
      <header className="bg-white">
        <nav className="flex justify-between  items-center mx-auto w-[98%]">
          <div>
            <Image
              className="cursor-pointer"
              src="/images/site-image.jpg"
              alt="site logo"
              width={100}
              height={100}
            />
          </div>
          <div
            className={`md:static absolute bg-white md:min-h-fit min-h-[38vh] left-0
    md:w-auto w-full flex items-center px-5 transition-all duration-500 
    shadow-2xl md:shadow-none rounded-bl-2xl rounded-br-2xl
    ${
      isMenuOpen
        ? "top-[9%] opacity-100 translate-y-0 delay-100 md:opacity-100 md:translate-y-0 md:top-auto"
        : "top-[-100%] opacity-0 translate-y-[-100%] delay-100 md:opacity-100 md:translate-y-0 md:top-auto"
    }`}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vh] gap-8">
              {paths.map((link, index) => (
                <li key={index}>
                  {" "}
                  <Link
                    key={index}
                    href={link.path}
                    className={`transition duration-300 ${
                      pathname === link.path
                        ? "text-purple-500 font-semibold"
                        : "text-black hover:text-purple-500"
                    } flex`}
                  >
                    <ChevronRightIcon className="block md:hidden w-5 h-5" />{" "}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2">
            {/* Donate Button (Desktop) */}
            <Link
              href="/donate"
              className="flex items-center border border-purple-500 text-purple-600 px-4 py-2 rounded-full hover:bg-purple-500 hover:text-white transition duration-300"
            >
              Donate Now
              <span className="ml-2 flex items-center justify-center w-6 h-6 bg-purple-500 text-white rounded-full">
                <ArrowRightIcon className="h-3 w-3" />
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2 hover:text-purple-500 transition duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-[30px] h-[30px] text-purple-500" />
              ) : (
                <Bars3Icon className="w-[30px] h-[30px] text-purple-500" />
              )}
            </button>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
