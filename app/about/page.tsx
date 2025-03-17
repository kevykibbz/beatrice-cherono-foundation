import Header from "@/components/Header/Header";
import React from "react";
import Services from "@/components/Services/Services";
import Teams from "@/components/Teams/Team";
import AboutSection from "@/components/About/About";

export default function About() {
  return (
    <React.Fragment>
      <Header title="About Us" />
      <AboutSection/>
      <Services/>
      <Teams/>
    </React.Fragment>
  );
}
