"use client";
import React from "react";
import Carasoul from "./Carasoul";
import { useGetBooksQuery } from "@/app/Redux/features/backendConnection/bookApi";

const News = () => {
  const { data, isLoading, isError } = useGetBooksQuery({ page: 1, limit: 5 });

  return (
    <div className="customContainer mt-8">
      <div className="flex flex-col gap-6">
        <h1 className="h1">News</h1>
        <Carasoul
          isLoading={isLoading}
          isError={isError}
          cart={() => {}}
          favorite={() => {}}
          type="news"
          slides={data?.books}
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
