"use client";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { book } from "@/types/dummytypes";
import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CarasoulProps {
  type: string;
  slides?: book[];
  spaceBetween?: number;
  navigation?: boolean;
  pagination?: boolean;
  mousewheel?: boolean;
  keyboard?: boolean;
  className?: string;
  loop?: boolean;
  onClick: () => void;
  favorite: (book: book) => void;
  cart: (book: book) => void;
  isLoading?: boolean;
  isError?: boolean;
}

const Carasoul: React.FC<CarasoulProps> = ({
  slides,
  type,
  isLoading,
  isError,
  spaceBetween,
  favorite,
  cart,
  navigation = true,
  mousewheel = true,
  keyboard = true,
  className,
}) => {
  const [sliderPerView, setSliderPerView] = useState<number | undefined>(
    undefined
  );
  const router = useRouter();
  console.log("fetched slides", slides);
  useEffect(() => {
    const innerWidth = window.innerWidth;

    switch (true) {
      case innerWidth > 1024:
        setSliderPerView(4);
        break;
      case innerWidth > 768:
        setSliderPerView(3);
        break;
      case innerWidth > 640:
        setSliderPerView(2);
        break;
      default:
        setSliderPerView(1);
        break;
    }

    const handleResize = () => {
      const width = window.innerWidth;
      console.log("width", width);
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

  const detailsPage = (id: number | string) => {
    router.push(`/books/details/${id}`);
  };

  // show the slides if the slides are fetched and not loading
  return slides && sliderPerView && !isError && !isLoading ? (
    <div className="relative w-full ">
      <Swiper
        navigation={navigation}
        mousewheel={mousewheel}
        spaceBetween={spaceBetween}
        loop={false}
        keyboard={keyboard}
        slidesPerView={
          type === "mobile"
            ? 1
            : type === "news" && sliderPerView > 1
            ? 2
            : sliderPerView
        }
        modules={[Navigation, Mousewheel, Keyboard]}
        className={`mySwiper ${className}`}
      >
        {slides.map((slide: book, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className={`bg-gray-100 h-[250px] relative flex items-center rounded-md justify-center  px-2 py-2 gap-2 ${
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
                        <p className="font-semibold">
                          ${slide?.newPrice.toFixed(2) || "Free"}
                        </p>
                        {slide.oldPrice && (
                          <p className="line-through font-semibold ">
                            ${slide?.oldPrice.toFixed(2)}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-4 mt-4">
                        <div
                          onClick={() => cart(slide)}
                          className=" w-8 h-8 bg-white relative rounded-full ring-1 ring-offset-2 ring-gray-500 flex items-center justify-center"
                        >
                          <Image
                            src="/assets/cart.png"
                            alt="cart"
                            fill
                            className="bg-contain bg-center rounded-full"
                          />
                        </div>
                        <div
                          onClick={() => favorite(slide)}
                          className="hover:scale-105 active:scale-100 transition-all w-8 h-8 bg-white relative rounded-full ring-1 ring-offset-2 ring-gray-500 flex items-center justify-center"
                        >
                          <Heart size={40} fill="gray" stroke="gray" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="relative cursor-pointer hover:scale-105 transition-all active:scale-100"
                  onClick={() => detailsPage(slide._id)}
                >
                  <Image
                    src={slide.coverImage}
                    alt={slide.title}
                    width={`${type == "mobile" ? 180 : 200}`}
                    height={`${type == "news" ? 180 : 250}`}
                    className="rounded-md"
                  />
                </div>
                <div
                  onClick={() => detailsPage(slide._id)}
                  className="absolute  -bottom-4 right-1  group flex justify-center items-center cursor-pointer w-14 h-14 bg-transparent"
                >
                  <div className=" group-hover:bg-gray-500  transition-all flex justify-center items-center bg-white w-7 h-7 rounded-full p-1">
                    <ArrowUpRight
                      size={40}
                      className="group-hover:scale-150 group-active:scale-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  ) : (
    <motion.div className="relative flex justify-center items-center bg-gray-200 h-[250px] w-full rounded-3xl overflow-hidden">
      {/* Animated shimmer effect */}
      <motion.div
        initial={{ x: !isError ? "-100%" : "0%" }}
        animate={{ x: !isError ? "100%" : "0%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
      />

      {/* Text animation */}
      <motion.h1
        initial={{ opacity: !isError ? 0.5 : 1, scale: !isError ? 0.9 : 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
          duration: 1.2,
          repeat: !isError ? Infinity : 0,
          repeatType: "reverse",
        }}
        className="text-gray-500 text-lg font-semibold z-10"
      >
        {isError
          ? `An Error occured While fetching ${type}`
          : `loading ${type}...`}
      </motion.h1>
    </motion.div>
  );
};

export default Carasoul;
