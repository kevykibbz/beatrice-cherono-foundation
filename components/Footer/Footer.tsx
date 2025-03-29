import React from "react";
import {
  ChevronRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { PathTypes } from "@/types/types";

const paths: PathTypes[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Causes", path: "/causes" },
  { name: "Services", path: "/services" },
  { name: "Our Teams", path: "/teams" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
];

const Footer: React.FC = () => {
  return (
    <div className="bg-[#0D1B1E] text-white py-12 mt-[-20px]">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h1 className="font-bold text-2xl  mb-4">
              Beatrice Cherono <span className="text-purple-500">Melly</span>{" "}
              Foundation
            </h1>
            <p className="text-gray-400 mb-4">
              The main objective of the Organization is to support educational
              projects, promote environmental conservation, to set up relief of
              poverty projects/programs, and to promote health initiatives
              within the scope of its operations.
            </p>
            <div className="flex space-x-2">
              {[
                { icon: <FaTwitter />, link: "#" },
                { icon: <FaFacebook />, link: "#" },
                { icon: <FaYoutube />, link: "#" },
                { icon: <FaLinkedin />, link: "#" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="p-2 border border-gray-500 text-gray-400 rounded-full hover:bg-purple-600 hover:text-white hover:border-purple-600 transition duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-4">Address</h5>
            <ul className="text-gray-400 space-y-2">
              <li className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-3" /> Eldoret,Uasin Gishu
                county, Kenya
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-3" /> +254 117483970
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-3" />
                <span className="truncate">
                  info@beatricecheronomellyfoundation.org
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h5>

            <ul className="text-gray-400 space-y-2">
              {paths.map((link, index) => (
                <li
                  key={index}
                  className="hover:text-purple-500 transition flex duration-300 cursor-pointer"
                >
                  <ChevronRightIcon className="w-5 h-5" />{" "}
                  <a href={link.path}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="w-full max-w-md mx-auto">
            <h5 className="text-white text-lg font-semibold mb-4">
              Newsletter
            </h5>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest projects, success stories, and how
              you can make a difference. Subscribe to our newsletter today!
            </p>
            <div className="flex w-full">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-full bg-transparent border border-purple-500 text-gray-400 px-4 py-2 outline-none focus:border-purple-300"
              />
              <button
                className="bg-purple-600 rounded-r-full text-white px-5 py-2 font-semibold hover:bg-purple-700 transition duration-300 whitespace-nowrap"
                disabled
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="border-t border-gray-600 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm">
          {" "}
          <div>
            &copy; {new Date().getFullYear()} Beatrice Cherono Melly Foundation,
            All Rights Reserved.
          </div>
          <div>
            Designed by{" "}
            <a href="https://tevinly.com" className="hover:text-purple-500">
              Tevinly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
