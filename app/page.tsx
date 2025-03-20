import AboutSection from "@/components/AboutSection/AboutSection";
import Carousel from "@/components/Carousel/Carousel";
import CausesSection from "@/components/CausesSection/CausesSection";
import DonateSection from "@/components/DonateSection/DonateSection";
import GallarySection from "@/components/GallarySection/GallarySection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";
import TeamsSection from "@/components/TeamsSection/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import Timer from "@/components/Timer/Timer";
import Volunteer from "@/components/Volunteer/Volunteer";
import StatsSection from "@/components/WhatweDo/Whatwedo";
import { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <>
      {/* Hero Section (Showcasing the Foundation) */}

      <Carousel />
      {/* About Section (Mission, Vision, and Core Values) */}

      <AboutSection />
      {/* Our Pillars (Education, Healthcare, Environment, Women Empowerment, etc.) */}

      <CausesSection />
      {/* Services Section (Scholarships, Environmental Conservation, Community Development) */}

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
      <StatsSection/>
      {/* Meet the Team Section */}

      <TeamsSection />
      {/* Testimonials (Real Stories from Beneficiaries and Stakeholders) */}

      <TestimonialsSection />
      <GallarySection/>
      <Timer targetDate="2025-04-01 00:00:00"/>
      <Volunteer/>
    </>
  );
}
