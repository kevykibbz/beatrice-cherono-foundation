"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Slide {
  image: string;
  title: string;
  description: string;
  link: string;
}

const slides: Slide[] = [
  {
    image: "/images/carousel-1.jpg",
    title: "Let's Change The World With Humanity",
    description:
      "Aliqu diam amet diam et eos. Clita erat ipsum et lorem sed stet lorem sit clita duo justo erat amet",
    link: "#",
  },
  {
    image: "/images/carousel-2.jpg",
    title: "Let's Save More Lives With Our Helping Hand",
    description:
      "Aliqu diam amet diam et eos. Clita erat ipsum et lorem sed stet lorem sit clita duo justo erat amet",
    link: "#",
  },
];

export default function HeroCarousel() {
  return (
    <div className="w-full mb-5 relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full min-h-screen object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[rgba(0,29,35,0.8)]">
                <div className="text-white px-6 w-full lg:w-[58.3333%]">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-3 animate-fadeIn">
                    {slide.title}
                  </h1>
                  <p className="text-lg lg:text-xl text-gray-300 mb-5 animate-fadeIn">
                    {slide.description}
                  </p>
                  <a
                    href={slide.link}
                    className="bg-purple-500 hover:bg-purple-600 px-4 py-2 text-center rounded-lg text-white flex items-center gap-2 transition-all duration-300 w-fit mx-auto"
                  >
                    Learn More
                    <span className="w-8 h-8 bg-white text-purple-500 rounded-full flex items-center justify-center">
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="absolute lg:left-10 lg:right-10 bottom-20 lg:transform lg:translate-y-0 z-10 flex lg:block justify-center mt-4 lg:mt-0">
  <button className="swiper-button-prev-custom bg-[rgba(0,29,35,0.96)] text-white p-2 rounded-full mx-2 lg:absolute lg:left-0">
    <ChevronLeftIcon className="h-6 w-6" />
  </button>
  <button className="swiper-button-next-custom bg-[rgba(0,29,35,0.96)] text-white p-2 rounded-full mx-2 lg:absolute lg:right-0">
    <ChevronRightIcon className="h-6 w-6" />
  </button>
</div>
    </div>
  );
}