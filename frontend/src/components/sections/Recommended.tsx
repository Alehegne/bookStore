"use client";
import React from "react";
import Carasoul from "./Carasoul";
import { BookSlides } from "@/lib/dummy/dummy";

// type: string;
//   slides: book[];
//   spaceBetween?: number;
//   navigation?: boolean;
//   pagination?: boolean;
//   mousewheel?: boolean;
//   keyboard?: boolean;
//   className?: string;
//   loop?: boolean;
//   onClick: () => void;
const Recommended = () => {
  return (
    <div className="customContainer mt-8">
      <div className="flex flex-col gap-6">
        <h1 className="h2">Recommended for you</h1>
        <Carasoul
          type="recommended"
          slides={BookSlides.slice(0, 10)}
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
    </div>
  );
};

export default Recommended;
