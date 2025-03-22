"use client";

import React, { useState } from "react";
import useAdminRoutes from "../_utils/routes";
import Link from "next/link";
import { BookOpen, MenuIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MobileAdminSideBar = () => {
  const routes = useAdminRoutes();
  const [showSideBar, setShowBar] = useState<boolean>(true);

  return (
    <>
      {showSideBar ? (
        <AnimatePresence>
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 sm:hidden z-[999]  left-0 w-2/3 bottom-0 bg-gray-100 shadow-lg"
          >
            <div className="w-full flex flex-col mb-10">
              <div className="flex sm:hidden gap-2 relative flex-col items-center mt-8 mb-8 justify-center ">
                <BookOpen width={32} height={32} />
                <h1 className="text-[16px] font-bold">Book Admin</h1>
                <div className="absolute top-1/3 right-4 hover:bg-gray-500 active:">
                  <X width={32} height={32} onClick={() => setShowBar(false)} />
                </div>
              </div>

              <div className="w-full h-0.5 bg-gray-500/20 mb-4" />
              <ul
                style={{ scrollbarWidth: "none" }}
                className="flex flex-col gap-2 relative overflow-y-scroll transition-all"
              >
                {routes.map((route) => (
                  <li key={route.link} className="px-2 py-1">
                    <div
                      className={`flex items-center group  gap-1  rounded  transition-all cursor-pointer    ${
                        route.active && "opacity-100 bg-gray-300"
                      }`}
                    >
                      <Link
                        href={route.link}
                        className="flex items-center  w-full  gap-3 p-1  rounded-lg  transition duration-200"
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
          </motion.aside>
        </AnimatePresence>
      ) : (
        <div onClick={() => setShowBar(true)} className="absolute top-4 left-2">
          <MenuIcon width={42} height={42} />
        </div>
      )}
    </>
  );
};

export default MobileAdminSideBar;
