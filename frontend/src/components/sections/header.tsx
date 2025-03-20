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
import { profileLinks } from "@/lib/links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/app/context/AuthContext";
import { redirect } from "next/navigation";
import { serializedBook } from "@/types/types";

export default function NavBar() {
  const { logout, user } = useAuth();

  const routes: RouteType[] = useRoutes();
  const [showSideBar, setShowSideBar] = useState(false);
  const [totalOrdered, settotalOrdered] = useState(0);
  const router = useRouter();
  //log out
  //current selected profile dropdown

  const cartItems =
    useSelector(
      (state: RootState) => state.cart.cartItems as serializedBook[]
    ) || [];

  console.log("cartItems in navbar", cartItems);
  useEffect(() => {
    settotalOrdered(cartItems.length);
  }, [cartItems.length]);

  //google login
  const handleLogOut = async () => {
    try {
      await logout();
      redirect("/logIn");
    } catch (error) {
      console.log(error);
    }
  };
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
                if (route.label === "Profile" && user) {
                  return (
                    <div key={index}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Image
                            src="/assets/avatar.png"
                            alt="profile image"
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-50 p-4 rounded-md shadow mt-4">
                          <DropdownMenuSeparator />
                          <ul>
                            {profileLinks.map((item, index) => (
                              <DropdownMenuItem
                                key={index}
                                className="hover:bg-gray-100 p-2 text-left rounded-sm"
                              >
                                <Link
                                  href={item.link}
                                  className="w-full h-full text-left"
                                >
                                  {item.name}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </ul>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="py-2 px-2 rounded-2xl hover:bg-gray-100"
                            onClick={handleLogOut}
                          >
                            Log Out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={index}
                      href={
                        route.label === "Profile" && !user
                          ? "/logIn"
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
                        {route.label === "Cart" ? (
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
                }
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
