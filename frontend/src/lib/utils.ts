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



export {serializedBookItem} 