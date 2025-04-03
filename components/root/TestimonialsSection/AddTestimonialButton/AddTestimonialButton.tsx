"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@/hooks/useWindowSize";
import { AddTestimonialModal } from "../AddTestimonialModal";
import { LoginModal } from "@/components/Modals/LoginModal"; 
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/use-session";

export const AddTestimonialButton = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { width } = useWindowSize();
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isMobile = width < 768;

  const handleAddTestimonial = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    if (isMobile) {
      router.push("/testimonials/add-testimonial");
    } else {
      setIsTestimonialModalOpen(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleAddTestimonial}
        className="bg-purple-500 hover:bg-purple-600 text-white flex justify-center items-center rounded-full text-sm md:text-lg py-3 px-8 h-auto min-h-[1.5rem] cursor-pointer"
      >
        <PlusIcon className="w-6 h-6 mr-2" /> Add Your Testimonial
      </Button>

      {/* Testimonial Modal (shown when authenticated) */}
      {!isMobile && isAuthenticated && (
        <AddTestimonialModal
          isOpen={isTestimonialModalOpen}
          onClose={() => setIsTestimonialModalOpen(false)}
        />
      )}

      {/* Login Modal (shown when not authenticated) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onOpenChange={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};