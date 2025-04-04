"use client";

import React, { JSX, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { SocialLinks } from "@/types/types";


const TopBar = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { settings, isLoading } = useSiteSettings();

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

  // Social media links from settings or default empty array
  const socialLinks = settings?.openGraph || {};
  const hasSocialLinks = (socialLinks: SocialLinks | null): boolean => {
    if (!socialLinks) return false;

    return socialLinks.facebook?.url ||
      socialLinks.twitter?.url ||
      socialLinks.linkedin?.url ||
      socialLinks.instagram?.url ||
      socialLinks.tiktok?.url ||
      socialLinks.youtube?.url
      ? true
      : false;
  };

  // T
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
              <MapPinIcon className="h-4 w-4 inline-block mr-1" /> Eldoret,
              Uasin Gishu County, Kenya
            </small>
            <small>
              <EnvelopeIcon className="h-4 w-4 inline-block mr-1" />{" "}
              info@beatricecheronomellyfoundation.org
            </small>
          </div>

          <div className="hidden lg:flex items-center justify-end flex-1 space-x-4">
            {hasSocialLinks(socialLinks) && (
              <React.Fragment>
                <small className="flex-shrink-0">Follow us:</small>
                <div className="flex space-x-2">
                  {/* Facebook */}
                  {isLoading ? (
                    <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse" />
                  ) : (
                    socialLinks?.facebook?.url && (
                      <Link
                        href={socialLinks.facebook.url}
                        className="group relative p-2 rounded-full transition-all duration-200"
                        aria-label="Facebook"
                      >
                        <div className="absolute inset-0 bg-purple-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <FaFacebookF className="h-4 w-4 text-purple-400 group-hover:text-white relative z-10" />
                      </Link>
                    )
                  )}

                  {/* Twitter */}
                  {isLoading ? (
                    <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse" />
                  ) : (
                    socialLinks?.twitter?.url && (
                      <Link
                        href={socialLinks.twitter.url}
                        className="group relative p-2 rounded-full transition-all duration-200"
                        aria-label="Twitter"
                      >
                        <div className="absolute inset-0 bg-purple-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <FaTwitter className="h-4 w-4 text-purple-400 group-hover:text-white relative z-10" />
                      </Link>
                    )
                  )}

                  {/* LinkedIn */}
                  {isLoading ? (
                    <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse" />
                  ) : (
                    socialLinks?.linkedin?.url && (
                      <Link
                        href={socialLinks.linkedin.url}
                        className="group relative p-2 rounded-full transition-all duration-200"
                        aria-label="LinkedIn"
                      >
                        <div className="absolute inset-0 bg-purple-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <FaLinkedinIn className="h-4 w-4 text-purple-400 group-hover:text-white relative z-10" />
                      </Link>
                    )
                  )}

                  {/* Instagram */}
                  {isLoading ? (
                    <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse" />
                  ) : (
                    socialLinks?.instagram?.url && (
                      <Link
                        href={socialLinks.instagram.url}
                        className="group relative p-2 rounded-full transition-all duration-200"
                        aria-label="Instagram"
                      >
                        <div className="absolute inset-0 bg-purple-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <FaInstagram className="h-4 w-4 text-purple-400 group-hover:text-white relative z-10" />
                      </Link>
                    )
                  )}

                  {/* TikTok */}
                  {!isLoading && socialLinks?.tiktok?.url && (
                    <Link
                      href={socialLinks.tiktok.url}
                      className="group relative p-2 rounded-full transition-all duration-200"
                      aria-label="TikTok"
                    >
                      <div className="absolute inset-0 bg-purple-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <FaTiktok className="h-4 w-4 text-purple-400 group-hover:text-white relative z-10" />
                    </Link>
                  )}

                  {/* YouTube */}
                  {!isLoading && socialLinks?.youtube?.url && (
                    <Link
                      href={socialLinks.youtube.url}
                      className="group relative p-2 rounded-full transition-all duration-200"
                      aria-label="YouTube"
                    >
                      <div className="absolute inset-0 bg-purple-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <FaYoutube className="h-4 w-4 text-purple-400 group-hover:text-white relative z-10" />
                    </Link>
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopBar;
