"use client";
import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { book } from "@/types/dummytypes";
import Image from "next/image";
import Button from "../shared/button";
import { Heart, ShoppingCart } from "lucide-react";

interface CarasoulProps {
  type: string;
  slides: book[];
  spaceBetween?: number;
  navigation?: boolean;
  pagination?: boolean;
  mousewheel?: boolean;
  keyboard?: boolean;
  className?: string;
  loop?: boolean;
  onClick: () => void;
}

const Carasoul: React.FC<CarasoulProps> = ({
  slides,
  type,
  spaceBetween,

  navigation = true,
  pagination = true,
  mousewheel = true,
  keyboard = true,
  loop = false,
  className,
  onClick,
}) => {
  const [sliderPerView, setSliderPerView] = React.useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      switch (true) {
        case width > 1024:
          setSliderPerView(4);
          break;
        case width > 768:
          setSliderPerView(3);
          break;
        case width > 640:
          setSliderPerView(2);
          break;
        default:
          setSliderPerView(1);
          break;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("sliderPerView", sliderPerView);

  return (
    <div className="relative w-full ">
      <Swiper
        navigation={navigation}
        pagination={pagination}
        mousewheel={mousewheel}
        spaceBetween={spaceBetween}
        loop={loop}
        keyboard={keyboard}
        slidesPerView={
          type === "mobile"
            ? 1
            : type === "news" && sliderPerView > 1
            ? 2
            : sliderPerView
        }
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className={`mySwiper ${className}`}
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className={`bg-gray-100 h-[250px] flex items-center rounded-md justify-center  px-2 py-2 gap-2 ${
                  type == "news" && "gap-12"
                } text-black text-xl`}
              >
                <div
                  className={`w-[60%] text-wrap flex flex-col gap-2  ${
                    type !== "mobile" && type !== "news" && "order-4  gap-2"
                  }`}
                >
                  <h1 className="h4 line-clamp-2">{slide.title}</h1>
                  <p
                    className={`psmall line-clamp-3 ${
                      type === "mobile" && "line-clamp-6"
                    }`}
                  >
                    {slide.description}
                  </p>
                  {type !== "mobile" && type !== "news" && (
                    <div>
                      <div className="flex gap-4">
                        <p className="font-semibold">${slide?.price || 10}</p>
                        <p className="line-through font-semibold ">
                          ${slide?.price || 100}
                        </p>
                      </div>
                      {/* <Button
                        onclick={onClick}
                        icon={ShoppingCart}
                        className="hidden sm:flex items-center justify-center w-fit"
                      /> */}
                      <div className="flex gap-4 mt-4">
                        <div
                          onClick={onClick}
                          className=" w-14 h-14 bg-white relative rounded-full ring-1 ring-offset-2 ring-gray-500 flex items-center justify-center"
                        >
                          <Image
                            src="/assets/cart.png"
                            alt="cart"
                            fill
                            className="bg-contain bg-center rounded-full"
                          />
                        </div>
                        <div
                          onClick={onClick}
                          className=" w-14 h-14 bg-white relative rounded-full ring-1 ring-offset-2 ring-gray-500 flex items-center justify-center"
                        >
                          <Heart size={40} fill="gray" stroke="gray" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={`${type == "mobile" ? 180 : 200}`}
                    height={`${type == "news" ? 180 : 250}`}
                    className="rounded-md"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carasoul;
