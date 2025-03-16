import { Request, Response } from "express";
import Book from "../../models/book.model";
import { validatePosts } from "../../lib/utils";



class BookController {

    //get all books, with pagination and with a limit of 20 books per page
    static async getBooks(req:Request,res:Response){
            try {
                const limit = req.query.limit ? parseInt(req.query.limit as string) : 20
                const pageNumber = req.query.page ? parseInt(req.query.page as string) : 1;
                const skip = (pageNumber-1)*limit;
                const books = await Book.find().limit(limit).skip(skip).sort({createdAt:-1});
                res.status(200).json({message:"Books fetched successfully",books});    
            } catch (error) {
                console.log(error);
                res.status(500).json({message:"Internal server error",error:error});
            }
        }
        //search books by title, author or genre
    static async searchBooks(req:Request,res:Response){
        const {search} = req.query;
        if(!search){
            res.status(400).json({message:"Invalid request"});
        }
        try {
            const books = await Book.find({
                $or:[
                    {title:{$regex:search as string,$options:"i"}},
                    {author:{$regex:search as string,$options:"i"}},
                    {genre:{$regex:search as string,$options:"i"}}
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
    }
    //get books by author
    static async getBooksByAuthor(req:Request,res:Response){
        const {name} = req.query;
        if(!name){
            res.status(400).json({message:"Invalid request,author query param is required"});
        }
        try {
            const books = await Book.find({
                author:{$regex:name as string,$options:"i"}
            })
            if(books.length>0){
                res.status(200).json({message:"Books fetched by author",books});
            }
            else{
                res.status(404).json({message:"No books found by this author"});
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Internal server error",error:error});
            
        }
    }
    static async statistics(req:Request,res:Response)
        {
            try {
                const totalBooks = await Book.countDocuments();
                const totalAuthors = (await Book.distinct("author"))
                
                const totalGenres = (await Book.distinct("genre"))
                //TODO: add most popular genre, average rating, newest and oldest books
                //TODO: get the category lists,Top Rated from the api , to include in the statistics
                
                const statistics = {
                    genres:totalGenres,
                    authors:totalAuthors,
                    totalBooks:totalBooks,
                    mostPopularGenre:"",
                }
        
                res.status(200).json({
                    message:"Statistics fetched successfully",
                    statistics
                })
               
            } catch (error) {
                console.log(error);
                res.status(500).json({message:"Internal server error",error:error});
                
            }
     }
    static async topRatedBooks(req:Request,res:Response){
        
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
    }
    static async getBookById(req:Request,res:Response){
           
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
      }
     static async postBook(req:Request,res:Response){
               
                  
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
                    //validate the request
                    const validation:Record<string,any> = validatePosts(newBook);
                    if(validation.status===400){
                        res.status(400).json({message:validation.message});
                    }
                
                    const book = new Book(newBook,res);
                    
                    book.save()
                         .then((book)=>{
                             res.status(201).json({message:"Book created successfully",book});
                         })
                         .catch((err)=>{
                            res.status(500).json({message:"Internal server error",error:err});
                         })
                    
    }
     static async updateBook(req:Request,res:Response){
                   
                       
                       const {id} = req.params;
                       const body = req.body;
                       console.log("put body",body);
                       console.log("put id",id);
                       if(!id || !body){
                           res.status(400).json({message:"Invalid request"});
                       }
                   
                   
                       try {
                           const existingBook = await Book.findById(id);
                           if(!existingBook){
                               res.status(404).json({message:"Book not found"});
                           }else{
                               const updatedBook = await Book.findOneAndUpdate(
                                   {_id:id},
                                   body,
                                   {new:true}
                               );
                               res.status(200).json({message:"Book updated successfully",updatedBook});
                           }
                       } catch (error) {
                           console.log(error);
                           res.status(500).json({message:"Internal server error",error:error});
                       }
      }
   static async deleteBook(req:Request,res:Response){
                  
                    
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
      }
    static async getBooksByCategory(req:Request,res:Response){
                     

                            const {category} = req.params;
                            if(!category){
                                res.status(400).json({message:"Invalid request"});
                            }
                            try {
                        
                                const books = await Book.find({
                                    genre:category
                                })
                                if(books.length>0){
                                    res.status(200).json({
                                        message:"Books fetched by category",
                                        books,
                                        total:books.length
                                    });
                                }
                                else{
                                    res.status(404).json({message:"No books found in this category"});
                                }
                                
                            } catch (error) {
                                console.log(error);
                                res.status(500).json({message:"Internal server error",error:error});
                                
                            }
      }
                }





export default BookController;
