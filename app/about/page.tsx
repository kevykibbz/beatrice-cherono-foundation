import AboutSection from "@/components/AboutSection/AboutSection";
import Header from "@/components/Header/Header";
import MissionSection from "@/components/Mission/Mission";
import ServicesSection from "@/components/ServicesSection/ServicesSection";
import TeamsSection from "@/components/TeamsSection/TeamSection";
import React from "react";


export default function About() {
  return (
    <React.Fragment>
      <Header title="About Us" />
      <AboutSection/>
      <MissionSection/>
      <ServicesSection/>
      <TeamsSection/>
    </React.Fragment>
  );
}
