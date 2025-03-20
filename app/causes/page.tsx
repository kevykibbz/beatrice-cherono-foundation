import Header from "@/components/Header/Header";
import React from "react";
import { JSX } from "react";
import CausesSection from "@/components/CausesSection/CausesSection";

const Causes = (): JSX.Element => {
  return (
    <React.Fragment>
      <Header title="Causes" />
     <CausesSection/>
    </React.Fragment>
  );
};

export default Causes;
