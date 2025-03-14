
import { Express } from "express";
import { Router } from "express";
import axios from "axios";
import { Request, Response } from "express";
import multer from "multer";
import Book, { BookProps } from "../models/book.model";

const bookRouter = Router();
const upload = multer();//multer config

//get all books
bookRouter.get("/",async(req,res)=>{

    try {
        const books = await Book.find();
        console.log("books",books);
        res.status(200).json({message:"Books fetched successfully",books});    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error",error:error});
    }
  
})
//get book by id
bookRouter.get("/:id",async(req,res)=>{
    const {id} = req.params;
    if(!id){
        res.status(400).json({message:"Invalid request"});
    }
    
    try {
        const book = await Book.findById(id);
        if(book){
            res.status(200).json({message:"Book fetched successfully",book});
        }else{
            res.status(404).json({message:"Book not found"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error",error:error});
    }
})

//post books
bookRouter.post("/create",upload.none(),(req:Request,res:Response)=>{
    const body = req.body;
    if(!body){
        res.status(400).json({message:"Invalid request"});
    }
    const {
        title,
        description,
        coverImage,
        author,
        rating,
        release,
        genre,
        pages,
        category,
        newPrice,
        oldPrice
    } = body;
    const newBook = {
        title,
        description,
        coverImage,
        author,
        rating,
        release,
        genre,
        pages,
        category,
        newPrice,
        oldPrice
    }

    const book = new Book(newBook);
    book.save()
         .then((book)=>{
             res.status(201).json({message:"Book created successfully",book});
         })
         .catch((err)=>{
            res.status(500).json({message:"Internal server error",error:err});
         })
    
})
//update book
bookRouter.put("/update/:id",upload.none(),async(req,res)=>{
    
    const {id} = req.params;
    const body = req.body;
    console.log("put body",body);
    console.log("put id",id);
    if(!id || !body){
        res.status(400).json({message:"Invalid request"});
    }


    try {
        const updatedBook = await Book.findByIdAndUpdate(id,body,{new:true});
        res.status(200).json({message:"Book updated successfully",updatedBook});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error",error:error});
    }
})
//delete book
bookRouter.delete("/delete/:id",async(req,res)=>{

    const {id} = req.params;
    if(!id){
        res.status(400).json({message:"Invalid request"});
    }
    try {

        const deletedBook = await Book.findOneAndDelete({
            _id:id
        })
        res.status(200).json({message:`${deletedBook?.title} deleted successfully`,deletedBook});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error",error:error});
        
    }
})
//search book //TODO: add pagination, AND make it work with title,author,genre,category
//http://localhost:5000/api/books/search?search=book
bookRouter.get("/search",async(req,res)=>{
    console.log("search route hitted")
    console.log("search query",req.query);
    const {search} = req.query;
    if(!search){
        res.status(400).json({message:"Invalid request"});
    }
    try {
        const books = await Book.find({
            $or:[
                {title:{$regex:search as string,$options:"i"}},
                {author:{$regex:search as string,$options:"i"}},
                

            ]

        });

        if(books.length>0){
            res.status(200).json({message:"Books fetched successfully",books});
        }
        else{
            res.status(404).json({message:"No books found"});
        }
        
    } catch (error) {
        console.log("error in search",error);
        res.status(500).json({message:"Internal server error",error:error});
        
    }
})

//get book by category/genre
bookRouter.get("/category/:category",async(req,res)=>{

    const {category} = req.params;
    if(!category){
        res.status(400).json({message:"Invalid request"});
    }
    try {

        const books = await Book.find({
            genre:category
        })
        if(books.length>0){
            res.status(200).json({message:"Books fetched by category",books});
        }
        else{
            res.status(404).json({message:"No books found in this category"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error",error:error});
        
    }
})

//get Top rated books
bookRouter.get("/topRated",async(req,res)=>{
    console.log("top rated route hitted");
    try {
        const books = await Book.find().sort({rating:-1}).limit(10);
        if(books.length>0){
            res.status(200).json({message:"Top rated books fetched successfully",books});
        }
        else{
            res.status(404).json({message:"No books found"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error",error:error});
        
    }
})


export {bookRouter}



  