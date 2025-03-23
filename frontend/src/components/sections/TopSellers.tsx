"use client";

import React, { useEffect, useState } from "react";
import Carasoul from "./Carasoul";
import { genre } from "@/lib/dummy/dummy";
import CustomDropDown from "../shared/customDropDown";
import { book, serializedBook } from "@/types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/Redux/features/cart/cartSlice";
import { addToFavorite } from "@/app/Redux/features/favorite/favoriteSlice";
import { AppDispatch } from "@/app/Redux/store/cart";
import { useGetBooksQuery } from "@/app/Redux/features/backendConnection/bookApi";
import { serializedBookItem } from "@/lib/utils";
const TopSellers = () => {
  //to show the filtered books  //to dispatch the action specified in the redux toolkit
  const dispatch = useDispatch<AppDispatch>();
  //to track the current item selected in the dropdown
  const [currentItem, setCurrentItem] = React.useState("All");

  const [filteredBook, setFilteredBook] = useState<book[] | undefined>(
    undefined
  );
  //fetch books from the redux store
  const { data, isLoading, isError } = useGetBooksQuery({ page: 1, limit: 35 });
  //to get the data from the response
  // console.log("data now", data);
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

  //filtered by category
  useEffect(() => {
    if (currentItem === "All") {
      setFilteredBook(data?.books || undefined);
    } else {
      setFilteredBook(() => {
        const filtered = data?.books.filter((deta) =>
          deta?.genre.map(
            (genre) => genre.toLowerCase() == currentItem.toLowerCase()
          )
        );
        // console.log("filtered", filtered);
        return filtered || undefined;
      });
    }
  }, [currentItem, data]);

  return (
    <div className="customContainer">
      <h1 className="h1">Top Sellers</h1>
      <CustomDropDown
        items={genre}
        title="Filter By Genere"
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />

      <Carasoul
        isLoading={isLoading}
        isError={isError}
        favorite={addToFavorites}
        cart={addToCarts}
        type="TopSellers"
        slides={filteredBook}
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
