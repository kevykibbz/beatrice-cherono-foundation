import React from "react";
import {
  ChevronRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";
import { PathTypes } from "@/types/types";
import { fetchSiteSettings } from "@/hooks/site-settings";
import Image from "next/image";
import { ClockIcon } from "lucide-react";

const paths: PathTypes[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Causes", path: "/causes" },
  { name: "Services", path: "/services" },
  { name: "Our Teams", path: "/teams" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
];

export default async function Footer() {
  let settings;
  let contactDetails;
  let isLoading = true;

  try {
    settings = await fetchSiteSettings();
    contactDetails = settings.contactDetails;
    isLoading = false;
  } catch (error) {
    console.error("Failed to load site settings:", error);
    settings = {
      openGraph: {},
    };
    contactDetails = null;
    isLoading = false;
  }

  return (
    <div className="bg-[#0D1B1E] text-white py-12 mt-[-20px]">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              {/* Logo Skeleton */}
              {isLoading ? (
                <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse"></div>
              ) : settings?.siteLogo ? (
                <div className="h-12 w-12 flex-shrink-0">
                  <Image
                    src={settings.siteLogo}
                    alt={settings?.siteName || "Site Logo"}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">BC</span>
                </div>
              )}

              {/* Site Name Skeleton */}
              {isLoading ? (
                <div className="h-8 w-48 bg-gray-700 rounded animate-pulse"></div>
              ) : (
                <h1 className="font-bold text-2xl capitalize">
                  {settings?.siteName || (
                    <>
                      Beatrice Cherono{" "}
                      <span className="text-purple-500">Melly</span> Foundation
                    </>
                  )}
                </h1>
              )}
            </div>

            <p className="text-gray-400 mb-4">
              The main objective of the Organization is to support educational
              projects, promote environmental conservation, to set up relief of
              poverty projects/programs, and to promote health initiatives
              within the scope of its operations.
            </p>

            {/* Social Icons with Skeletons */}
            <div className="flex space-x-2">
              {isLoading ? (
                <>
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="h-10 w-10 rounded-full bg-gray-700 animate-pulse"
                    ></div>
                  ))}
                </>
              ) : (
                [
                  {
                    icon: <FaTwitter />,
                    link: settings.openGraph?.twitter?.url,
                  },
                  {
                    icon: <FaFacebook />,
                    link: settings.openGraph?.facebook?.url,
                  },
                  {
                    icon: <FaInstagram />,
                    link: settings.openGraph?.instagram?.url,
                  },
                  { icon: <FaTiktok />, link: settings.openGraph?.tiktok?.url },
                ].map((item, index) => {
                  const hasLink = !!item.link;
                  return (
                    <a
                      key={index}
                      href={hasLink ? item.link : undefined}
                      className={`p-2 border rounded-full transition duration-300 ${
                        hasLink
                          ? "border-gray-500 text-gray-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 cursor-pointer"
                          : "border-gray-700 text-gray-600 opacity-50 cursor-not-allowed"
                      }`}
                      target={hasLink ? "_blank" : undefined}
                      rel={hasLink ? "noopener noreferrer" : undefined}
                      aria-label={hasLink ? "Social Media Link" : undefined}
                    >
                      {item.icon}
                    </a>
                  );
                })
              )}
            </div>
          </div>

          {/* Address Section with Skeletons */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-4">Contact Details</h5>
            <ul className="text-gray-400 space-y-2">
              {/* Address */}
              {isLoading ? (
                <li className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-3" />
                  <div className="h-4 w-48 bg-gray-700 rounded animate-pulse"></div>
                </li>
              ) : contactDetails?.address ? (
                <li className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-3" />
                  {contactDetails.address}
                </li>
              ) : null}

              {/* Combined Postal Address */}
              {isLoading ? (
                <li className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-3" />
                  <div className="h-4 w-56 bg-gray-700 rounded animate-pulse"></div>
                </li>
              ) : contactDetails?.city ||
                contactDetails?.country ||
                contactDetails?.postalCode ? (
                <li className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-3" />
                  {[
                    contactDetails?.city,
                    contactDetails?.country,
                    contactDetails?.postalCode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </li>
              ) : null}

              {/* Phone */}
              {isLoading ? (
                <li className="flex items-center">
                  <PhoneIcon className="h-5 w-5 mr-3" />
                  <div className="h-4 w-36 bg-gray-700 rounded animate-pulse"></div>
                </li>
              ) : contactDetails?.phoneNumber ? (
                <li className="flex items-center">
                  <PhoneIcon className="h-5 w-5 mr-3" />
                  {contactDetails.phoneNumber}
                </li>
              ) : null}

              {/* Email */}
              {isLoading ? (
                <li className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 mr-3" />
                  <div className="h-4 w-56 bg-gray-700 rounded animate-pulse"></div>
                </li>
              ) : contactDetails?.contactEmail ? (
                <li className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 mr-3" />
                  <span className="truncate">
                    {contactDetails.contactEmail}
                  </span>
                </li>
              ) : null}

              {/* Business Hours */}
              {isLoading ? (
                <li className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-3" />
                  <div className="h-4 w-56 bg-gray-700 rounded animate-pulse"></div>
                </li>
              ) : contactDetails?.businessHours ? (
                <li className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-3" />
                  <span>{contactDetails.businessHours}</span>
                </li>
              ) : null}
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
          <div>
            {isLoading ? (
              <div className="h-4 w-64 bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <div className="capitalize">
                &copy; {new Date().getFullYear()}{" "}
                {settings?.siteName || "Beatrice Cherono Melly Foundation"}, All
                Rights Reserved.
              </div>
            )}
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
}
