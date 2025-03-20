import { book, serializedBook } from "@/types/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


function serializedBookItem(book:book):serializedBook{
    return {
        ...book,
        createdAt: new Date(book.createdAt).toISOString(),
        updatedAt: new Date(book.updatedAt).toISOString(),
        publishedAt: new Date(book.publishedAt).toISOString(),
    }
}

export const saveCartToLocalStorage =(state:{cartItems:serializedBook[]})=>{
    console.log("saving cart to local storage");
    try {
        if(typeof window !== "undefined"){
          const serializedState = JSON.stringify(state);
          const toBeSaved = serializedState ? serializedState : JSON.stringify({cartItems:[]});
          localStorage.setItem('cart',toBeSaved);
        }else{
          console.log("window is undefined");
          // return {cartItems:[]}
        }

      
    } catch (error) {
        console.log("Error saving cart to local storage",error);
        return {cartItems:[]}
      
    }
} 

export const loadCartFromLocalStorage = () => {
  try{
      if(typeof window !== "undefined"){
        const serializedState = localStorage.getItem('cart');
         if(serializedState){
          return JSON.parse(serializedState);
         }
         return {cartItems:[]}
    
      }
  }catch (error) {
    console.error("Error loading cart from local storage",error);
    return {cartItems:[]}
  }
}



export {serializedBookItem} 