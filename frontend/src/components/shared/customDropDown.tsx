"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropDown";
import { ChevronDown } from "lucide-react";

interface CustomDropDownProps {
  currentItem: string;
  setCurrentItem: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  title,
  items,
  currentItem,
  setCurrentItem,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-gray-200 mb-4  rounded-sm py-2 w-[200px] px-4">
        {
          <div className="flex w-full hover:scale-105 active:scale-100 transition-all items-center justify-between">
            <span>{currentItem}</span>
            <ChevronDown />
          </div>
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white shadow-lg z-50">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item, index) => (
          <DropdownMenuItem
            style={{
              scrollbarWidth: "none",
            }}
            className={`hover:bg-gray-200 ${
              item === currentItem && "bg-gray-200"
            }`}
            onSelect={() => {
              setCurrentItem(item);
            }}
            key={index}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropDown;
