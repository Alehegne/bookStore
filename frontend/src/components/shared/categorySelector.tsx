import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CategorySelectorProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const dummyCategory = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Romance",
    "Horror",
    "Biography",
    "Self-Help",
  ];
  return (
    <div className="">
      <Label htmlFor="author" className="text-right">
        Category
      </Label>
      <Select
        onValueChange={(value) => setSelectedCategory(value)}
        defaultValue={selectedCategory}
      >
        <SelectTrigger className="col-span-3 bg-gray-100 ring-1 ring-gray-900/20 border-none focus-visible:ring-2 focus-visible:ring-gray-800/40 focus-visible:border-none focus-visible:outline-none text-gray-900 placeholder:text-gray-500 w-full h-[50px] rounded-md">
          <SelectValue placeholder="select category" />
        </SelectTrigger>
        <SelectContent
          style={{ scrollbarWidth: "none" }}
          className="bg-gray-100 ring-1 ring-gray-500/20 border-none w-full overflow-x-hidden overflow-y-scroll"
        >
          {dummyCategory.map((cat, index) => (
            <SelectItem
              className="hover:bg-gray-400/20 cursor-pointer "
              key={index}
              value={cat}
            >
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;
