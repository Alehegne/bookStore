import useRoutes, { RouteType } from "@/hooks/useRoutes";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";

interface SideBarProps {
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({ setShowSideBar }) => {
  const routes: RouteType[] = useRoutes();
  const sideBarRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(e.target as Node)
      ) {
        setShowSideBar(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed h-screen w-full bg-black/50 z-[99]"
        />
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          ref={sideBarRef}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          exit={{ x: -100 }}
          transition={{ duration: 0.2 }}
          className="fixed z-[100] bg-gray-100 shadow-2xl ring-1 ring-gray-300 rounded-r-lg rounded-b-lg mt-25 sm:mt-15 h-full w-1/2 md:max-w-[200px] p-4 z-50"
        >
          <div className="flex flex-col gap-6">
            {routes.map((route: RouteType, index) => (
              <Link
                href={route.link}
                key={index}
                className={clsx(
                  "flex gap-4 items-center hover:bg-gray-200 hover:scale-[1.01] py-2 px-4 rounded-sm transition-all cursor-pointer active:scale-100",
                  route.active && "bg-sky-500 text-white stroke-3 p-2 rounded"
                )}
              >
                <route.icon strokeWidth={1} />
                <span className="">{route.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SideBar;
