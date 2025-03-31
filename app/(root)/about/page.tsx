import AboutSection from "@/components/root/AboutSection/AboutSection";
import Header from "@/components/root/Header/Header";
import MissionSection from "@/components/root/Mission/Mission";
import OperationSection from "@/components/root/Operations/OperationSection";
import ServicesSection from "@/components/root/ServicesSection/ServicesSection";
import TeamsSection from "@/components/root/TeamsSection/TeamSection";
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