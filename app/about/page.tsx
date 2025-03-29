import AboutSection from "@/components/AboutSection/AboutSection";
import Header from "@/components/Header/Header";
import MissionSection from "@/components/Mission/Mission";
import OperationSection from "@/components/Operations/OperationSection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";
import TeamsSection from "@/components/TeamsSection/TeamSection";
import React from "react";

export default function About() {
  return (
    <React.Fragment>
      <Header title="About Us" />
      
      {/* 1. Introduction - Who We Are */}
      <AboutSection />
      
      {/* 2. Core Purpose - Mission/Vision */}
      <MissionSection />
      
      {/* 3. What We Do - Programs/Services */}
      <ServicesSection />
      
      {/* 4. Where We Work */}
      <OperationSection />
      
      {/* 5. Our Team */}
      <TeamsSection />
      
      
    </React.Fragment>
  );
}