import AboutSection from "@/components/About/About";
import CausesSection from "@/components/Causes/CausesSection";
import DonateSection from "@/components/Donate/DonateSection";
import ServicesSection from "@/components/Services/Services";
import Carousel from "@/components/Swiper/Carousel";
import TeamsSection from "@/components/Teams/Team";
import TestimonialsSection from "@/components/Testimonials/Testimonials";
import { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <>
      <Carousel/>
      <AboutSection />
      <CausesSection />
      <ServicesSection />
      <div
        className="relative bg-[rgba(0,29,35,0.8)] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/carousel-2.jpg')" }}
      >
        <div className="absolute inset-0 bg-[rgba(0,29,35,0.8)]"></div>
        <div className="relative z-10">
          <DonateSection isDonatePage={false} />
        </div>{" "}
      </div>
      <TeamsSection />
      <TestimonialsSection/>
    </>
  );
}
