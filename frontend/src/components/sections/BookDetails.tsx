"use client";

import { book } from "@/types/types";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import Loading from "../shared/loading";

interface BookDetailsProps {
  handleAddToCart: (book: book) => void;
  handleAddToFav: (book: book) => void;
  data: book;
  isLoading: boolean;
  isError: boolean;
}

const BookDetails: React.FC<BookDetailsProps> = ({
  handleAddToCart,
  handleAddToFav,
  data,
  isLoading,
  isError,
}) => {
  if (isError)
    return (
      <div className="w-full flex flex-col sm:flex-row items-start  gap-8 px-4 sm:px-1">
        Error...
      </div>
    );
  const book: book = data as book;
  return (
    <div className="w-full flex flex-col sm:flex-row items-start  gap-8 px-4 sm:px-1">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="relative w-full sm:w-1/2 h-[536px]  p-4">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-center rounded-4xl object-fill inset-0"
            />
          </div>
          <div className=" w-full  sm:w-1/2 flex flex-col px-4">
            <div className="h-[536px] relative  rounded-4xl flex flex-col md:pr-8 md:pl-16 py-4">
              <h1 className="h1bold">{book.title}</h1>
              <h4 className="text-xl font-semibold opacity-85 mb-4">
                By {book.author}
              </h4>
              <p className="text-[14px] font-light">{book.description}</p>
              <div className="flex justify-between mt-4">
                <p className="text-[14px] bg-gray-100 p-2 rounded-2xl">
                  Price:{" "}
                  <span className="font-semibold bold">${book.newPrice}</span>
                </p>
                {true && (
                  <p className="bg-gray-100 p-2 rounded-2xl">
                    Old Price:{" "}
                    <span className="line-through font-semibold">$55</span>
                  </p>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex flex-wrap gap-0.5">
                  {Array.isArray(book.genre) &&
                    book.genre.map((slid, index) => (
                      <div
                        key={index}
                        className="text-sm flex justify-center items-center bg-gray-200 p-0.5 rounded-full"
                      >
                        {slid}
                      </div>
                    ))}
                </div>
                <p className="text-[14px] bg-gray-100 p-2 rounded-2xl">
                  Rating: {book.rating}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <p className="text-[14px] bg-gray-100 p-2 rounded-2xl">
                  Total pages: {book.pages}
                </p>
                <p className="text-[14px] bg-gray-100 p-2 rounded-2xl">
                  released At: {book.release}
                </p>
              </div>
              <div className="flex gap-8 mt-4 absolute bottom-4">
                <Button
                  onClick={() => handleAddToCart(data)}
                  className="group hover:scale-[1.02] active:scale-100 transition-all"
                >
                  Add to Cart
                  <span>
                    <ShoppingCart
                      size={40}
                      className="group-hover:scale-105 transition-all"
                    />
                  </span>
                </Button>
                <Button
                  onClick={() => handleAddToFav(data)}
                  className="group hover:scale-[1.02] active:scale-100 transition-all"
                >
                  Add to favorite
                  <span>
                    <Heart
                      size={30}
                      className="group-hover:scale-105 transition-all"
                    />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetails;
