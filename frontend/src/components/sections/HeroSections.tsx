"use client";

import React from "react";
import Button from "../shared/button";
import Image from "next/image";
import { BookSlides } from "@/lib/dummy/dummy";
import Carasoul from "./Carasoul";

const HeroSections = () => {
  return (
    <div className="w-full  px-0 sm:px-4  pt-[120px] sm:pt-[0px] ">
      <div className="customContainer py-4 sm:py-20 mt-8">
        <div className="flex flex-col-reverse relative  justify-between items-center gap-8 md:gap-4  md:flex-row">
          <div className="flex flex-col gap-4 w-full md:w-1/2 text-wrap">
            <h1 className="h1">New Releases This Week</h1>
            <p className="pmedium line-clamp-6">
              It's time to update your reading list with some of the latest and
              greatest releases in the literary world. From heart-pumping
              thrillers to captivating memoirs, this week's new releases offer
              something for everyone
            </p>
            <Button
              className="w-1/2 sm:w-[200px] md:w-[300px] text-center"
              label="Subscribe"
              onclick={() => {}}
            />
          </div>
          <div className=" w-full  rounded-xl relative md:w-1/2 sm:justify-end h-[250px] sm:h-[300px] md:h-[400px] ">
            <Image
              src="/assets/banner.png"
              alt="banner"
              layout="fill"
              objectFit="cover"
              className="rounded-xl flex-1 w-full right-0 left-0"
            />
          </div>
        </div>
        {/* mobile hero */}
        <div className="px-2 block sm:hidden">
          <Carasoul
            favorite={() => {}}
            cart={() => {}}
            slides={BookSlides.slice(0, 6)}
            type="mobile"
            spaceBetween={10}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            loop={true}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSections;
