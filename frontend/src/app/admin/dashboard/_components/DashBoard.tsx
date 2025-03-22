"use client";
import { Book, BookCopy, BookOpen, Users } from "lucide-react";
import React from "react";
import Card from "./Card";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import BooksByCategoryOrYear from "./BooksByCategoryOrYear";
import RecentActivity from "./RecentActivity";

const DashBoard = () => {
  const router = useRouter();
  const analytics = [
    {
      name: "Total Books",
      value: 1430,
      icon: BookOpen,
      analysis: "20% increase from last month",
    },
    {
      name: "Total Authors",
      value: 342,
      icon: Users,
      analysis: "2% increase from last month",
    },
    {
      name: "Total Categories",
      value: 30,
      icon: BookCopy,
      analysis: "30% increase from last month",
    },
    {
      name: "New Books",
      value: 1430,
      icon: Book,
      analysis: "32% increase from last month",
    },
  ];
  const quickAccessLinks = [
    {
      name: "Books",
      link: "/admin/dashboard/books",
      icon: BookOpen,
      description: "manage your book inventory",
    },
    {
      name: "Authors",
      link: "/admin/dashboard/authors",
      icon: Users,
      description: "manage your authors information",
    },
    {
      name: "Categories",
      link: "/admin/dashboard/categories",
      icon: BookCopy,
      description: "manage your book categories",
    },
    {
      name: "Publishers",
      link: "/admin/dashboard/publishers",
      icon: Book,
      description: "manage your book publishers",
    },
    {
      name: "Analytics",
      link: " /admin/dashboard/analytics",
      icon: BookOpen,
      description: "manage your book analytics",
    },
    {
      name: "Reports",
      link: "/admin/dashboard/reports",
      icon: Book,
      description: "manage your book reports",
    },
  ];

  return (
    <main className="flex flex-col gap-4 p-4 overflow-y-scroll w-full h-full bg-gray-100">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl opacity-85 font-bold text-center sm:text-start">
          Dashboard
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 },
            type: "spring",
          }}
          viewport={{ once: false }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {analytics.map((analytic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { duration: 0.2, delay: index * 0.1 },
              }}
              viewport={{ once: false }}
            >
              <Card data={analytic} className="shadow-sm" />
            </motion.div>
          ))}
        </motion.div>
        {/* Quick Access */}
        <div className="flex flex-col">
          <h1 className="h1">Quick Access</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2 mt-4">
            {quickAccessLinks.map((link, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 0.8,

                  transition: { duration: 0.2, delay: index * 0.1 },
                  type: "spring",
                }}
                viewport={{ once: false }}
                whileHover={{
                  scale: 1.05,
                  opacity: 1,
                  y: -5,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  duration: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                key={index}
                className="w-full flex flex-col shadow-lg hover:shadow-2xl rounded-lg  py-4 px-4 gap-2 transition-all duration-200 cursor-pointer"
                onClick={() => router.push(link.link)}
              >
                {<link.icon size={42} />}
                <h4 className="font-semibold text-[23px]">{link.name}</h4>
                <p className="text-sm ">{link.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Book overView and recent activity */}
      <div className="flex flex-col h-[400px] md:flex-row gap-6 justify-between mb-10 ">
        <BooksByCategoryOrYear />
        {/* recent actvity */}
        <div className=" w-full md:w-[50%] ">
          <RecentActivity />
        </div>
      </div>
    </main>
  );
};

export default DashBoard;
