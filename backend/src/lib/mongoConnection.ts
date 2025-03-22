import mongoose from "mongoose";




export default async function connectToMongo() {

    try {
        console.log("DB_URL",process.env.DB_URL);

        if(process.env.DB_URL === undefined){
            throw new Error("DB_URL is not defined");
        }
        
        await mongoose.connect(
            process.env.DB_URL as string,
            
        )
        console.log("MongoDB connected successfully");    
        
    } catch (error) {
        console.log("MongoDB connection failed",error);
    }
   

  }