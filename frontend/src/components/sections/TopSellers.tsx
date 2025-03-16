"use client";

import React, { useEffect, useState } from "react";
import Carasoul from "./Carasoul";
import { genre } from "@/lib/dummy/dummy";
import CustomDropDown from "../shared/customDropDown";
import { book, serializedBook } from "@/types/dummytypes";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/Redux/features/cart/cartSlice";
import { addToFavorite } from "@/app/Redux/features/favorite/favoriteSlice";
import { AppDispatch } from "@/app/Redux/store/cart";
import { useGetBooksQuery } from "@/app/Redux/features/backendConnection/bookApi";
const TopSellers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentItem, setCurrentItem] = React.useState("All");
  const [filteredBook, setFilteredBook] = useState<book[] | undefined>(
    undefined
  );
  //fetch books from the backend
  const { data, isLoading, isError } = useGetBooksQuery({ page: 1, limit: 35 });
  const addToFavorites = (book: book) => {
    dispatch(addToFavorite(book));
    console.log("added to favorite", book);
  };
  const addToCarts = (book: book) => {
    const serializedState: serializedBook = {
      ...book,
      createdAt: new Date(book.createdAt).toISOString(),
      updatedAt: new Date(book.updatedAt).toISOString(),
      publishedAt: new Date(book.publishedAt).toISOString(),
    };

    dispatch(addToCart(serializedState));
    console.log("added to cart", book);
  };

  useEffect(() => {
    if (currentItem === "All") {
      setFilteredBook(data || undefined);
    } else {
      setFilteredBook(() => {
        const filtered = data?.filter(
          (deta) => deta.genre.toUpperCase() === currentItem.toLowerCase()
        );
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
