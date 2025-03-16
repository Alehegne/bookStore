import mongoose from "mongoose";

export interface BookProps{
    title:string;
    description:string;
    coverImage:string;
    author:string;
    rating:number ;
    release:string;
    genre:string;
    pages:number ;
    
    newPrice:number;
    oldPrice:number;
    publishedAt:Date;
    createdAt:Date;
    updatedAt:Date;
    _id:string;
    }

const Book = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    publishedAt:{
        type:Date,
        default:Date.now
    },
  
    coverImage:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    rating:{
        type:Number 
    },
    releaseDate:{
        type:String
    },
    genre:{
        type:String
    },
    pages:{
        type:Number 
    },
   newPrice:{
         type:Number 
   },
   oldPrice:{
     type:Number
   },
    createdAt:{
         type:Date,
         default:Date.now
    },
    updatedAt:{
         type:Date,
         default:Date.now
    },
     

  },{
    timestamps:true
  });

export default mongoose.model<BookProps>('Book',Book);