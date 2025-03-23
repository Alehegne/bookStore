"use client";

import React from "react";
import useAdminRoutes from "../_utils/routes";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import AdminBread from "./adminBreadCrumb";

const SideBar = () => {
  const routes = useAdminRoutes();

  return (
    <aside className="hidden top-0 sm:flex left-0  md:w-1/5 relative  h-screen bg-gray-100 shadow-lg">
      <div className="w-full flex flex-col mb-10">
        <div className="flex gap-2  flex-col items-center mt-8 mb-8 justify-center ">
          <BookOpen width={62} height={62} />
          <h1 className="text-[25px] font-bold">Book Admin</h1>
        </div>
        <div className="w-full h-0.5 bg-gray-500/20 mb-4" />
        <ul
          style={{ scrollbarWidth: "none" }}
          className="flex flex-col gap-1 relative overflow-y-scroll transition-all"
        >
          {routes.map((route) => (
            <li key={route.link} className="px-2 py-2">
              <div
                className={`flex items-center group  gap-1  rounded  transition-all cursor-pointer    ${
                  route.active && "opacity-100 bg-gray-300"
                }`}
              >
                <Link
                  href={route.link}
                  className="flex items-center  w-full  gap-3 py-1 px-2  rounded-lg  transition duration-200"
                >
                  {
                    <route.icon className="w-4 h-4 group-hover:scale-105 group-active:scale-105 transition-all font-semibold text-md opacity-80" />
                  }
                  <span className="text-[16px] truncate max-w-[200px] font-semibold opacity-80">
                    {route.name}
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute top-0 left-[300px] bg-gray-100 z-[999] py-1 px-2">
        <AdminBread />
      </div>
    </aside>
  );
};

export default SideBar;
