"use client";

import React from "react";
import Carasoul from "./Carasoul";
import { BookSlides, genre } from "@/lib/dummy/dummy";
import CustomDropDown from "../shared/customDropDown";
import { ChevronDown } from "lucide-react";
//  type: string;
//   slides: book[];
//   slidesPerView: number;
//   spaceBetween?: number;
//   navigation?: boolean;
//   pagination?: boolean;
//   mousewheel?: boolean;
//   keyboard?: boolean;
//   className?: string;
//   loop?: boolean;
//   onClick: () => void;
const TopSellers = () => {
  return (
    <div className="customContainer">
      <h1 className="h1">Top Sellers</h1>
      <CustomDropDown
        items={genre}
        title="Filter By Genere"
        onSelect={() => {}}
      />
      <Carasoul
        type="TopSellers"
        slides={BookSlides}
        navigation={true}
        pagination={true}
        loop={true}
        onClick={() => {}}
        mousewheel={true}
        keyboard={true}
        className="w-full"
        spaceBetween={5}
      />
    </div>
  );
};

export default TopSellers;
