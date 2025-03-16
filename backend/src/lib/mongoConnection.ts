import mongoose, { mongo } from "mongoose";


export default async function connectToMongo() {

    try {
        await mongoose.connect(
            process.env.DB_URL as string,
            
        )
        console.log("MongoDB connected successfully");    
        
    } catch (error) {
        console.log("MongoDB connection failed",error);
    }
   

  }