"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import TopBar from "../TopBar/Topbar";
import { PathTypes } from "@/types/types";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/use-session";
import { SignOutModal } from "../../Modals/SignOutModal";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import Image from "next/image";

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
  const [signOutModal, setSignOutModal] = useState<boolean>(false);
  const { settings, isLoading } = useSiteSettings();

  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  return (
    <React.Fragment>
      <TopBar />
      <SignOutModal open={signOutModal} onOpenChange={setSignOutModal} />
      <header className="bg-white z-[120]">
        <nav className="flex justify-between items-center mx-auto w-[98%]">
          <div className="flex items-center gap-4 py-3 px-4">
            {isLoading ? (
              <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
            ) : settings?.siteLogo ? (
              <div className="h-12 w-12 relative flex-shrink-0">
                <Image
                  src={settings.siteLogo || "/default-logo.png"}
                  alt="Site Logo"
                  fill
                  className="rounded-full object-cover"
                  sizes="48px"
                />
              </div>
            ) : (
              <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">BC</span>
              </div>
            )}

            {/* Site Name with loading skeleton */}
            {isLoading ? (
              <div className="hidden lg:block h-7 w-56 bg-gray-200 rounded animate-pulse ml-2"></div>
            ) : (
              <h1 className="hidden lg:block text-base md:text-xl lg:text-xl font-bold ml-2  capitalize">
                {settings?.siteName || (
                  <>
                    Beatrice Cherono{" "}
                    <span className="text-purple-500">Melly</span> Foundation
                  </>
                )}
              </h1>
            )}
          </div>

          {/* Nav Links & Donate Button */}
          <div className="flex justify-end items-center gap-6">
            <div
              className={`md:static absolute bg-white md:min-h-fit min-h-[38vh] left-0
    md:w-auto w-full flex items-center px-5 transition-all duration-500 
    shadow-2xl md:shadow-none rounded-bl-2xl rounded-br-2xl
    ${
      isMenuOpen
        ? "top-[14%] opacity-100 translate-y-0 delay-100 md:opacity-100 md:translate-y-0 md:top-auto"
        : "top-[-100%] opacity-0 translate-y-[-100%] delay-100 md:opacity-100 md:translate-y-0 md:top-auto"
    }`}
            >
              <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vh] gap-6 text-sm md:text-base my-6 md:my-0">
                {paths.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`transition duration-300 ${
                        pathname === link.path
                          ? "text-purple-500 font-semibold"
                          : "text-black hover:text-purple-500"
                      } flex`}
                    >
                      <ChevronRightIcon className="block md:hidden w-4 h-4" />{" "}
                      {link.name}
                    </Link>
                  </li>
                ))}
                {isAuthenticated && (
                  <li>
                    <Link
                      href="#"
                      onClick={() => setSignOutModal(true)}
                      className="text-black hover:text-purple-500"
                    >
                      <ChevronRightIcon className="block md:hidden w-4 h-4" />{" "}
                      Sign Out
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Donate Button */}
            {/* <Link
              href="/donate"
              aria-disabled="true"
              className="cursor-not-allowed opacity-50 hidden md:flex items-center border border-purple-500 text-xs md:text-sm lg:text-base text-purple-600 px-4 py-2 rounded-full hover:bg-purple-500 hover:text-white transition duration-300"
            >
              Donate Now
              <span className="ml-2 flex items-center justify-center w-5 h-5 bg-purple-500 text-white rounded-full">
                <ArrowRightIcon className="h-2.5 w-2.5" />
              </span>
            </Link> */}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 hover:text-purple-500 transition duration-300"
              onClick={() => {
                setIsMenuOpen(false);
                setSignOutModal(true);
              }}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-purple-500" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-purple-500" />
              )}
            </button>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
