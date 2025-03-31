import React, { JSX } from "react";
import Image from "next/image";
import SiteLogoImage from "@/public/favicon/favicon.png";

export default function SiteLogo(): JSX.Element {
  return (
    <>
      <Image
        className="cursor-pointer"
        src={SiteLogoImage}
        alt="site logo"
        width={100}
        height={100}
      />
    </>
  );
}
