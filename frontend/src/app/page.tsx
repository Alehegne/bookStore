"use client";
import Footer from "@/components/sections/Footer";
import HeroSections from "@/components/sections/HeroSections";
import News from "@/components/sections/News";
import Recommended from "@/components/sections/Recommended";
import TopSellers from "@/components/sections/TopSellers";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSections />
      <TopSellers />
      <Recommended />
      <News />
      <Footer />
    </div>
  );
};

export default Home;
