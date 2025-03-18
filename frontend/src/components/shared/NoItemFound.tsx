import { BookOpenText } from "lucide-react";
import React from "react";

interface NoItemFoundProps {
  type?: string;
}

const NoItemFound: React.FC<NoItemFoundProps> = ({ type }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <BookOpenText size={100} />
        <h1 className="text-2xl font-semibold">No {type} found</h1>
      </div>
    </div>
  );
};

export default NoItemFound;
