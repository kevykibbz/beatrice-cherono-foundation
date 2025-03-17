import AboutSection from "@/components/About/About";
import CausesSection from "@/components/Causes/CausesSection";
import DonateSection from "@/components/Donate/DonateSection";
import ServicesSection from "@/components/Services/Services";
import Carousel from "@/components/Swiper/Carousel";
import TeamsSection from "@/components/Teams/Team";
import { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <>
      <Carousel />
      <AboutSection />
      <CausesSection />
      <ServicesSection />
      {/* Donate section */}
      <div
        className="relative bg-[rgba(0,29,35,0.8)] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/carousel-2.jpg')" }}
      >
        <DonateSection isDonatePage={false}/>
      </div>

      {/* Teams section */}
      <TeamsSection />
      {/* Testimonials Section */}
    </>
  );
}
