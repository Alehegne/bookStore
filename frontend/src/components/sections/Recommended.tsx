"use client";
import React from "react";
import Carasoul from "./Carasoul";
import { book, serializedBook } from "@/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/Redux/store/cart";
import { addToFavorite } from "@/app/Redux/features/favorite/favoriteSlice";
import { addToCart } from "@/app/Redux/features/cart/cartSlice";
import { serializedBookItem } from "@/lib/utils";
import { useTopRatedQuery } from "@/app/Redux/features/backendConnection/bookApi";

const Recommended = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, isError } = useTopRatedQuery({ limit: 5 });

  const addToFavorites = (book: book) => {
    //serialize the book object to store in the redux store;since redux store does not support date objects
    const serializedState: serializedBook = serializedBookItem(book);
    dispatch(addToFavorite(serializedState));
  };
  const addToCarts = (book: book) => {
    //serialize the book object to store in the redux store;since redux store does not support date objects
    const serializedState: serializedBook = serializedBookItem(book);
    dispatch(addToCart(serializedState));
    // console.log("added to cart", book);
  };

  return (
    <div className="customContainer mt-8">
      <div className="flex flex-col gap-6">
        <h1 className="h2">Recommended for you</h1>
        <Carasoul
          isLoading={isLoading}
          isError={isError}
          favorite={addToFavorites}
          cart={addToCarts}
          type="recommended"
          slides={data}
          navigation={true}
          pagination={true}
          loop={true}
          onClick={() => {}}
          mousewheel={true}
          keyboard={true}
          className="w-full"
          spaceBetween={5}
        />
      </div>
    </div>
  );
};

export default Recommended;
