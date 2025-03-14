"use client";

import { book } from "@/types/dummytypes";
import { createContext, useState } from "react";

interface WishListContextType {
  wishLists: book[] | null;
  setWishLists: React.Dispatch<React.SetStateAction<book[] | null>>;
}
const wishListContext = createContext<WishListContextType | null>(null);

interface withList {
  children: React.ReactNode;
}
const WishListProvider: React.FC<withList> = ({ children }) => {
  const [wishLists, setWishLists] = useState<book[] | null>(null);

  return (
    <wishListContext.Provider value={{ wishLists, setWishLists }}>
      {children}
    </wishListContext.Provider>
  );
};

export default WishListProvider;
