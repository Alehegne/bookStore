"use client";
import Input from "@/components/shared/input";
import useRoutes, { RouteType } from "@/hooks/useRoutes";
import clsx from "clsx";
import { Menu, MenuIcon, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Image from "next/image";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store/cart";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const routes: RouteType[] = useRoutes();
  const [showSideBar, setShowSideBar] = useState(false);
  const [totalOrdered, settotalOrdered] = useState(0);
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  console.log("cartItems in navbar", cartItems);
  useEffect(() => {
    settotalOrdered(cartItems.length);
  }, [cartItems.length]);

  const userLoggedIn = false;

  return (
    <>
      {showSideBar && <SideBar setShowSideBar={setShowSideBar} />}
      <div className="w-full px-4 z-50   bg-gray-50 fixed top-0 left-0 right-0">
        <div className=" hidden sm:block customContainer">
          <div className="flex justify-between w-full items-center ">
            <div className="flex   items-center  sm:gap-8 ">
              <MenuIcon
                className="hover:scale-105 active:scale-100 transition-all"
                strokeWidth={1}
                onClick={() => setShowSideBar((prev) => !prev)}
              />
              <div className="flex flex-1 items-center gap-1">
                <Input
                  onchange={() => {}}
                  placeholder="what are you looking for?"
                  icon={(props) => <Search {...props} strokeWidth={1} />}
                  type="text"
                  className="bg-gray-50"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 md:gap-8 lg:gap-12">
              {/* <User strokeWidth={1} />
            <Link href="/wishList">
              <Heart strokeWidth={1} />
            </Link>
            <Button onclick={() => {}} label="Basket" icon={ShoppingCart} /> */}
              {routes.map((route: RouteType, index: number) => {
                return (
                  <Link
                    key={index}
                    href={
                      route.label === "Profile" && !userLoggedIn
                        ? "/login"
                        : route.link
                    }
                  >
                    <div
                      className={clsx(
                        "flex items-center gap-2",
                        route.active &&
                          "bg-sky-500 text-white stroke-3 p-2 rounded"
                      )}
                    >
                      {route.label === "Profile" && userLoggedIn ? (
                        <Image
                          src="/assets/avatar.png"
                          alt="profile image"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      ) : route.label === "Cart" ? (
                        <Button
                          variant="outline"
                          className="bg-amber-300  hover:scale-105 active:scale-100 transition-all"
                        >
                          <span className="mx-1">{totalOrdered}</span>
                          <ShoppingCart strokeWidth={1} size={38} />
                        </Button>
                      ) : (
                        <route.icon strokeWidth={1} />
                      )}
                      <span className="sr-only">{route.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex sm:hidden w-full h-[100px] items-center justify-between gap-4">
          <Menu
            strokeWidth={1}
            size={28}
            onClick={() => setShowSideBar((prev) => !prev)}
          />
          <Input
            onchange={() => {}}
            placeholder="what are you looking for?"
            icon={(props) => <Search {...props} strokeWidth={1} />}
            type="text"
            className="flex-1 bg-gray-50"
          />
          <Button
            onClick={() => router.push("/cart")}
            variant="outline"
            className="bg-amber-300 hover:scale-105 active:scale-100 transition-all"
          >
            <span className="mr-y-1">{totalOrdered}</span>
            <ShoppingCart strokeWidth={1} size={28} />
          </Button>
        </div>
      </div>
    </>
  );
}
