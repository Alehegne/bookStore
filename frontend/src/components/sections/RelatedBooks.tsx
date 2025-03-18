"use client";

import React, { useCallback, useEffect } from "react";
import Loading from "../shared/loading";
import {
  useFetchBookByCategoryQuery,
  useFetchBooksByAuthorQuery,
} from "@/app/Redux/features/backendConnection/bookApi";
import Carasoul from "./Carasoul";
import { book } from "@/types/types";

interface RelatedBooksProps {
  author: string;
  genre: string[];
  addToFavorites: (book: book) => void;
  addToCarts: (book: book) => void;
  currentBookId?: string;
}

const RelatedBooks: React.FC<RelatedBooksProps> = ({
  author,
  genre,
  addToFavorites,
  addToCarts,
  currentBookId,
}) => {
  const { data, isLoading, isError } = useFetchBooksByAuthorQuery({
    author: author,
  });

  const {
    data: relatedBooks,
    isLoading: isFetching,
    isError: isFault,
  } = useFetchBookByCategoryQuery({ category: genre });

  // const [slidesAuthor, setSlidesAuthor] = React.useState<book[] | undefined>(
  //   undefined
  // );
  // const [slidesCategory, setSlidesCategory] = React.useState<
  //   book[] | undefined
  // >(undefined);

  const filteredBooksSameAuthor = useCallback(() => {
    if (data) {
      console.log("inside the filter author");
      console.log("data", data);
      console.log("currentBookId", currentBookId);

      return data.filter((book) => book._id !== currentBookId);
    }
  }, [data, currentBookId]);

  const filteredBooksSameCategories = useCallback(() => {
    if (relatedBooks) {
      return relatedBooks.books.filter((book) => book._id !== currentBookId);
    }
  }, [relatedBooks, currentBookId]);
  console.log("filteredBooksSameAuthor", filteredBooksSameAuthor());
  console.log("filteredBooksSameCategories", filteredBooksSameCategories());
  // useEffect(() => {
  //   const filteredBooksSameAuthor = () => {
  //     if (data) {
  //       return data.filter((book) => book._id !== currentBookId);
  //     }
  //   };

  //   setSlidesAuthor(filteredBooksSameAuthor());
  // }, [data, currentBookId]);

  // useEffect(() => {
  //   const filteredBooksSameCategories = () => {
  //     if (relatedBooks) {
  //       return relatedBooks.books.filter((book) => book._id !== currentBookId);
  //     }
  //   };
  //   setSlidesCategory(filteredBooksSameCategories());
  // }, [relatedBooks, currentBookId]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>unexpected Error happened</div>;
  }
  return (
    // by the same author
    <>
      <div className="mt-10 mb-10 flex flex-col">
        <h1 className="opacity-75 mb-2 text-xl font-semibold">By {author}</h1>
        {/* show the slides */}
        <Carasoul
          isLoading={isLoading}
          isError={isError}
          favorite={addToFavorites}
          cart={addToCarts}
          type="books by the same author"
          slides={filteredBooksSameAuthor()}
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

      <div className="mt-10 mb-10 flex flex-col">
        <h1 className="opacity-75 mb-2 text-xl font-semibold pb-4">
          Related Books by category:{" "}
          <div className="inline-flex gap-4">
            {Array.isArray(genre) &&
              genre.map((slid, index) => (
                <div
                  key={index}
                  className="text-lg flex bg-gray-200 p-0.5 rounded-md"
                >
                  {slid}
                </div>
              ))}
          </div>
        </h1>
        {/* show the slides */}
        <Carasoul
          isLoading={isFetching}
          isError={isFault}
          favorite={addToFavorites}
          cart={addToCarts}
          type="related Books by category"
          slides={filteredBooksSameCategories()}
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
    </>
  );
};

export default RelatedBooks;
