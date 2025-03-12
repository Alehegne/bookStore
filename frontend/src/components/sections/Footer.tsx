"use client";

import Image from "next/image";
import React from "react";
import Input from "../shared/input";
import Button from "../shared/button";
import { Facebook, Github, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <>
      <div className="customContainer hidden sm:block mb-4 mt-20">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <Image
                src="/assets/footer-logo.png"
                alt="book"
                width={100}
                height={100}
              />
              <ul className="flex gap-4 items-center">
                <li className="cursor-pointer hover:underline transition-all active:scale-[1.05]">
                  About
                </li>
                <li className="cursor-pointer hover:underline transition-all active:scale-[1.05]">
                  Features
                </li>
                <li className="cursor-pointer hover:underline transition-all active:scale-[1.05]">
                  Pricing
                </li>
                <li className="cursor-pointer hover:underline transition-all active:scale-[1.05]">
                  Gallery
                </li>
                <li className="cursor-pointer hover:underline transition-all active:scale-[1.05]">
                  Team
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h1>
                Subscribe to stay tuned for new product
                <br /> and latest updatas.lets do it!
              </h1>
              <div className="flex gap-2">
                <Input
                  className="ring-1 ring-yellow-600 border-none border-b-transparent"
                  onchange={() => {}}
                  type="text"
                  placeholder="Enter your email"
                />
                <Button onclick={() => {}} label="Subscribe" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <ul className="flex items-center gap-4">
              <li className="cursor-pointer hover:underline transition-all active:scale-[1.05]">
                Privacy policy
              </li>
              <li className="cursor-pointer hover:underline transition-all active:scale-[1.05]">
                Terms and conditions
              </li>
              <li className="cursor-pointer hover:underline transition-all active:scale-[1.05]">
                sales and refunds
              </li>
              <li className="cursor-pointer hover:underline transition-all active:scale-[1.05]">
                Legal
              </li>
            </ul>
            <ul className="flex items-center gap-4">
              <li className="cursor-pointer">
                <Image
                  src="/assets/socials/facebook.png"
                  alt="facebook"
                  width={50}
                  height={50}
                />
              </li>
              <li className="cursor-pointer">
                <Image
                  src="/assets/socials/instagram.png"
                  alt="facebook"
                  width={50}
                  height={50}
                />
              </li>
              <li className="cursor-pointer">
                <Image
                  src="/assets/socials/twitter.png"
                  alt="facebook"
                  width={50}
                  height={50}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* mobile footer */}
      <div className="customContainer  flex flex-col justify-center items-center sm:hidden mt-10 mx-0 px-0 bg-gray-200">
        <div className="flex flex-col gap-4 justify-center items-center w-[90%]">
          <h3 className="h2 opacity-85">
            Сreate an account and get a 15% discount
          </h3>
          <p className="psmall opacity-85">
            Create an account with our online bookstore today and start enjoying
            amazing discounts on all your book purchases! By signing up, you
            will receive a 15% discount on all your payments, making it more
            affordable than ever to get your hands on your favorite books.
          </p>
          <Button className="w-[80%]" label="Get now" onclick={() => {}} />
          <Image
            src="/assets/mobileFooterBg.png"
            width={1000}
            height={300}
            alt="footer image"
          />
        </div>
        <div className="flex flex-col bg-amber-500 gap-4 text-white w-full items-center">
          <ul className=" w-full flex flex-col gap-4 items-center">
            <li className="cursor-pointer hover:underline ">Contact</li>
            <li className="cursor-pointer hover:underline ">Terms of Use</li>
            <li className="cursor-pointer hover:underline ">Privacy Policy</li>
            <li className="cursor-pointer hover:underline ">FAQ</li>
          </ul>
          <ul className="flex gap-8">
            <li className="cursor-pointer">
              <Facebook size={24} stroke="blue" strokeWidth={2} fill="blue" />
            </li>
            <li className="cursor-pointer">
              <Instagram size={24} stroke="purple" fill="white" />
            </li>
            <li className="cursor-pointer">
              <Github size={24} stroke="black" fill="gray" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
