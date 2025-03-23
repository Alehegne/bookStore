import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AuthorSelectorProps {
  selectedAuthor: string;
  setSelectedAuthor: React.Dispatch<React.SetStateAction<string>>;
}

const AuthorSelector: React.FC<AuthorSelectorProps> = ({
  selectedAuthor,
  setSelectedAuthor,
}) => {
  const dummyAuthor = [
    "John Doe",
    "Jane Doe",
    "Mark Twain",
    "J.K. Rowling",
    "Stephen King",
    "Agatha Christie",
    "Ernest Hemingway",
    "F. Scott Fitzgerald",
    "George Orwell",
    "J.R.R. Tolkien",
  ];

  return (
    <div className="">
      <Label htmlFor="author" className="text-right">
        Author
      </Label>
      <Select
        onValueChange={(value) => setSelectedAuthor(value)}
        defaultValue={selectedAuthor}
      >
        <SelectTrigger className="col-span-3 bg-gray-100 ring-1 ring-gray-900/20 border-none focus-visible:ring-2 focus-visible:ring-gray-800/40 focus-visible:border-none focus-visible:outline-none text-gray-900 placeholder:text-gray-500 w-full h-[50px] rounded-md">
          <SelectValue placeholder="select author" />
        </SelectTrigger>
        <SelectContent
          style={{ scrollbarWidth: "none" }}
          className="bg-gray-100 ring-1 ring-gray-500/20 border-none w-full overflow-x-hidden overflow-y-scroll"
        >
          {dummyAuthor.map((auth, index) => (
            <SelectItem
              className="hover:bg-gray-400/20 cursor-pointer "
              key={index}
              value={auth}
            >
              {auth}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AuthorSelector;
