"use client";

import Header from "@/components/root/Header/Header";
import { TestimonialForm } from "@/components/root/Forms/TestimonialForm";
import { Button } from "@/components/root/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/use-session";
import DualRingLoader from "@/components/root/Loader/DualRingLoader";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import React from "react";
import { LoginModal } from "@/components/root/Modals/LoginModal";

export default function AddTestimonial() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();
  const { width } = useWindowSize();
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const isMobile = width < 768;

  useEffect(() => {
    if (!isLoading) {
      setAuthChecked(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      if (isMobile) {
        router.push("/login");
      }
    }
  }, [authChecked, isAuthenticated, isMobile, router]);

  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-50">
        <Header title="Add Testimonial" />

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 text-purple-600 hover:bg-purple-50 cursor-pointer"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to Testimonials
          </Button>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-purple-800">
                  Share Your Story
                </h1>

                <div className="space-y-4">
                  <p className="text-lg text-gray-700">
                    Your experiences help others understand the impact of our
                    work.
                  </p>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-gray-600">
                      Help us showcase real stories from our community
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-gray-600">
                      Inspire others to join our cause
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-gray-600">
                      Your voice matters in our journey
                    </p>
                  </div>
                </div>

                <div className="relative h-64 mt-6 rounded-lg overflow-hidden">
                  <Image
                    src="/images/testimonial-illustration.jpg"
                    alt="Sharing experiences"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md relative min-h-[400px]">
              {(isLoading || !authChecked) && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10 rounded-lg">
                  <DualRingLoader fullScreen={false} size={50} />
                </div>
              )}

              {!isLoading && authChecked && (
                <>
                  {isAuthenticated ? (
                    <>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Your Testimonial Details
                      </h2>
                      <TestimonialForm
                        onSuccess={() => {
                          router.push("/testimonials");
                          router.refresh();
                        }}
                      />
                    </>
                  ) : (
                    !isMobile && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center max-w-xs w-full">
                          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Please log in to share your testimonial.
                          </h2>
                          <Button
                            onClick={() => setIsLoginModalOpen(true)}
                            className="w-full bg-purple-600 hover:bg-purple-700 rounded-full cursor-pointer py-3 px-8 h-auto min-h-[1.5rem]"
                          >
                            Log In
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
        onGoogleLogin={() => {}}
      />
    </React.Fragment>
  );
}
