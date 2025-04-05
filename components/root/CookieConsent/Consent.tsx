"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hasCookie, setCookie } from "cookies-next";

export default function Consent() {
  const [open, setOpen] = useState<boolean>(false);
  const [showConsent, setShowConsent] = useState<boolean>(false); // Default: false (we assume user has not accepted yet)

  useEffect(() => {
    // Check if user has accepted cookies
    if (hasCookie("localConsent")) {
      setShowConsent(true);
    } else {
      // Wait for 2 second before showing the banner
      setTimeout(() => setOpen(true), 2000);
    }
  }, []);

  const acceptCookie = () => {
    setCookie("localConsent", "true", { maxAge: 60 * 60 * 24 * 30 }); // Store for 30 days
    // setShowConsent(true);
    setOpen(false);
  };

  if (showConsent) {
    return null;
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay with Linear Gradient */}
          <motion.div
            className="fixed inset-0 bg-gradient-to-t from-black/80 to-transparent z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          ></motion.div>

          {/* Consent Banner at Bottom */}
          <motion.div
            className="fixed inset-x-5 bottom-10 bg-white p-5 rounded-full shadow-full flex flex-wrap md:flex-nowrap gap-4 text-center md:text-left items-center justify-center md:justify-between max-w-screen-lg mx-auto z-[200]"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Animated Text */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              This website uses cookies to ensure you get the best experience on
              our website.{" "}
              <Link
                href="/privacy"
                className="text-purple-600 whitespace-nowrap hover:underline"
              >
                Privacy policy
              </Link>
            </motion.div>

            {/* Animated Buttons */}
            <motion.div
              className="flex gap-4 items-center flex-shrink-0"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
              }}
            >
              <motion.button
                onClick={acceptCookie}
                className="bg-purple-500 px-6 py-2 text-white rounded-full cursor-pointer shadow-lg hover:bg-purple-700 focus:outline-none"
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.4, type: "spring", stiffness: 100 },
                  },
                }}
              >
                Allow Cookies
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}