import { MoveUpRight } from "lucide-react";
import React from "react";

interface CardProps {
  data: {
    name?: string;
    value?: number;
    icon?: React.ElementType;
    analysis?: string;
  };
  className?: string;
}

const Card: React.FC<CardProps> = ({ data, className }) => {
  return (
    <div className={`flex flex-col  rounded-md  p-4 gap-2 ${className}`}>
      <div className="flex w-full justify-between items-center p-2">
        <h5 className="text-[18px]">{data.name}</h5>
        {data.icon && <data.icon size={18} />}
      </div>
      <h1 className="h1">{data.value}</h1>
      <div className="flex gap-2 items-center">
        <MoveUpRight size={12} />
        <p className="text-sm  font-extralight text-green-400">
          {data.analysis}
        </p>
      </div>
    </div>
  );
};

export default Card;
