import { book } from "@/types/dummytypes";
import Image from "next/image";
import React from "react";

interface BookCardProps {
  detail: book;
}

const BookCard: React.FC<BookCardProps> = ({ detail }) => {
  return (
    <div className="bg-gray-100 h-[300px] flex items-center justify-center text-black text-xl">
      <div className="w-1/3 text-wrap">
        <h1 className="h1 line-clamp-2">{detail.title}</h1>
        <p className="pmedium line-clamp-6">{detail.description}</p>
      </div>
      <div className="relative ">
        <Image src={detail.image} alt={detail.title} width={200} height={200} />
      </div>
    </div>
  );
};

export default BookCard;
