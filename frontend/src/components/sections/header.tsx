"use client";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import {
  Heart,
  Menu,
  MenuIcon,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

export default function NavBar() {
  return (
    <div className="w-full px-4 z-50   bg-gray-50 fixed top-0 left-0 right-0">
      <div className=" hidden sm:block customContainer">
        <div className="flex justify-between w-full items-center ">
          <div className="flex   items-center  sm:gap-8 ">
            <MenuIcon strokeWidth={1} />
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
            <User strokeWidth={1} />
            <Heart strokeWidth={1} />
            <Button onclick={() => {}} label="Basket" icon={ShoppingCart} />
          </div>
        </div>
      </div>
      <div className="flex sm:hidden w-full h-[100px] items-center justify-between gap-4">
        <Menu strokeWidth={1} size={28} />
        <Input
          onchange={() => {}}
          placeholder="what are you looking for?"
          icon={(props) => <Search {...props} strokeWidth={1} />}
          type="text"
          className="flex-1 bg-gray-50"
        />
        <ShoppingCart strokeWidth={1} size={28} />
      </div>
    </div>
  );
}
