"use client";
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="relative h-screen">
      <div className="absolute left-1/2 top-1/2 w-full max-w-[520px] -translate-x-1/2 -translate-y-1/2 text-center leading-normal">
        <div className="relative mx-auto mb-5 h-[200px] sm:mb-[20px] sm:h-[200px]">
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-sans text-[86px] font-[200] uppercase text-[#211b19] sm:text-[148px] md:text-[236px]">
            Oops!
          </h1>
          <h2 className="absolute bottom-0 left-0 right-0 mx-auto inline-block bg-white px-[5px] py-[10px] font-sans text-[16px] font-[400] uppercase text-[#211b19] sm:text-[28px]">
            500 - Something went wrong
          </h2>
        </div>
        <p className="mb-3 flex justify-center items-center text-sm sm:text-base text-gray-600">
          {error ? decodeURIComponent(error) : "Unknown error"}
        </p>
        <Link
          href="/"
          className="inline-block bg-purple-500 px-4 py-4 rounded-full text-sm md:text-lg  uppercase text-white transition-all duration-200 hover:bg-purple-700 cursor-pointer"
        >
          Go TO Homepage
        </Link>
      </div>
    </div>
  );
}
