"use client";

import { useGetBookByIdQuery } from "@/app/Redux/features/backendConnection/bookApi";
import { addToCart } from "@/app/Redux/features/cart/cartSlice";
import { addToFavorite } from "@/app/Redux/features/favorite/favoriteSlice";
import { AppDispatch } from "@/app/Redux/store/cart";
import BookDetails from "@/components/sections/BookDetails";
import RelatedBooks from "@/components/sections/RelatedBooks";
import { serializedBookItem } from "@/lib/utils";
import { book } from "@/types/types";
import { useParams } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

export default function BookDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data, isLoading, isError } = useGetBookByIdQuery({ id: id });
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (info: book) => {
    const serializedBook = serializedBookItem(info as book);
    dispatch(addToCart(serializedBook));
  };
  const handleAddToFav = (info: book) => {
    const serializedBook = serializedBookItem(info as book);
    dispatch(addToFavorite(serializedBook));
  };

  return (
    <div className="customBody h-full">
      <div className="flex flex-col">
        <div>
          {/* book details */}
          <BookDetails
            handleAddToCart={handleAddToCart}
            handleAddToFav={handleAddToFav}
            data={data!}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
        {!isLoading && !isError && data && (
          <div>
            {/* related books */}

            <RelatedBooks
              currentBookId={id}
              addToFavorites={handleAddToFav}
              addToCarts={handleAddToCart}
              author={data.author}
              genre={data.genre}
            />
          </div>
        )}
      </div>
    </div>
  );
}
