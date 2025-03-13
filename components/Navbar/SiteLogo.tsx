"use client"

import React, { JSX } from "react";
import Image from "next/image";
import SiteLogoImage from "@/public/favicon/favicon.png";

export default function SiteLogo(): JSX.Element {
  return (
    <>
      <Image
        src={SiteLogoImage} 
        alt="ChariTeam Logo"
        width={70}
        height={70}
      />
    </>
  );
}
