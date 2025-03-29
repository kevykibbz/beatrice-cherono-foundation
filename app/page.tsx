import AboutSection from "@/components/AboutSection/AboutSection";
import Carousel from "@/components/Carousel/Carousel";
import CausesSection from "@/components/CausesSection/CausesSection";
import DonateSection from "@/components/DonateSection/DonateSection";
import EventsSection from "@/components/Events/Events";
import FounderCard from "@/components/Founder/FounderCard";
import GallarySection from "@/components/GallarySection/GallarySection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";
import TeamsSection from "@/components/TeamsSection/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import Timer from "@/components/Timer/Timer";
import StatsSection from "@/components/WhatweDo/Whatwedo";
import { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <>
      {/* 1. Hero Carousel - Immediate visual impact */}
      <Carousel />

      {/* 2. Founder Introduction - Establish credibility */}
      <FounderCard />

      {/* 3. About Section - Core identity */}
      <AboutSection />

      {/* 4. Our Pillars - Key focus areas */}
      <CausesSection />

      {/* 5. Services/Programs - Detailed offerings */}
      <ServicesSection />

      {/* 6. Impact Stats - Social proof */}
      <StatsSection />

      {/* 7. Donation CTA - Conversion point */}
      <div className="relative bg-[rgba(0,29,35,0.8)] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/carousel-2.jpg')" }}>
        <div className="absolute inset-0 bg-[rgba(0,29,35,0.8)]"></div>
        <div className="relative z-10">
          <DonateSection isDonatePage={false} />
        </div>
      </div>

      {/* 8. Testimonials - Social validation */}
      <TestimonialsSection />

      {/* 9. Team Section - Human element */}
      <TeamsSection />

      {/* 10. Events - Engagement opportunities */}
      <EventsSection />

      {/* 11. Gallery - Visual storytelling */}
      <GallarySection />

      {/* 12. Timer (optional) - For time-sensitive campaigns */}
      <Timer targetDate="2025-04-01 00:00:00"/>
    </>
  );
}