"use client";

import React from "react";
import Carasoul from "./Carasoul";
import { BookSlides, genre } from "@/lib/dummy/dummy";
import CustomDropDown from "../shared/customDropDown";
import { book } from "@/types/dummytypes";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/Redux/features/cart/cartSlice";
import { addToFavorite } from "@/app/Redux/features/favorite/favoriteSlice";
import { AppDispatch } from "@/app/Redux/store/cart";
const TopSellers = () => {
  const dispatch = useDispatch<AppDispatch>();

  const addToFavorites = (book: book) => {
    dispatch(addToFavorite(book));
    console.log("added to favorite", book);
  };
  const addToCarts = (book: book) => {
    dispatch(addToCart(book));
    console.log("added to cart", book);
  };
  return (
    <div className="customContainer">
      <h1 className="h1">Top Sellers</h1>
      <CustomDropDown
        items={genre}
        title="Filter By Genere"
        onSelect={() => {}}
      />
      <Carasoul
        favorite={addToFavorites}
        cart={addToCarts}
        type="TopSellers"
        slides={BookSlides}
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
  );
};

export default TopSellers;
