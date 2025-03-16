
import { Express } from "express";
import { Router } from "express";
import axios from "axios";
import { Request, Response } from "express";
import multer from "multer";
import Book, { BookProps } from "../../models/book.model";
import { validatePosts } from "../../lib/utils";
import BookController from "./book.controller";
const bookRouter = Router();
const upload = multer();//multer config
//get all books, with pagination and with a limit of 20 books per page
bookRouter.get("/",BookController.getBooks);
bookRouter.get("/search",BookController.searchBooks);
//TODO: Add author details in the front end,mybe be author model may need
bookRouter.get("/author",BookController.getBooksByAuthor);
//TODO: add book statistics in the front end with like chart , engaging way, like total books, total authors, total genres
/*
   📖 Total Books: Total number of books in the database.
✍️ Total Authors: Unique authors available.
🔥 Most Popular Genre: Genre with the highest number of books.
⭐ Average Rating: The average rating across all books.
📅 Newest & Oldest Books: Display the newest and oldest books added.
 */
//get book statistics
bookRouter.get("/statistics",BookController.statistics);
//get Top rated books //TODO: add pagination
bookRouter.get("/topRated",BookController.topRatedBooks);
bookRouter.get("/:id",BookController.getBookById);
bookRouter.post("/create",upload.none(),BookController.postBook);
bookRouter.put("/update/:id",upload.none(),BookController.updateBook);
bookRouter.delete("/delete/:id",BookController.deleteBook);
bookRouter.get("/category/:category",BookController.getBooksByCategory);

export {bookRouter}



  