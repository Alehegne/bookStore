"use client";
import { BookSlides } from "@/lib/dummy/dummy";
import React from "react";
import Carasoul from "./Carasoul";

const News = () => {
  return (
    <div className="customContainer mt-8">
      <div className="flex flex-col gap-6">
        <h1 className="h1">News</h1>
        <Carasoul
          type="news"
          slides={BookSlides.slice(0, 10)}
          navigation={true}
          pagination={true}
          loop={true}
          onClick={() => {}}
          mousewheel={true}
          keyboard={true}
          className="w-full"
          spaceBetween={10}
        />
      </div>
    </div>
  );
};

export default News;
