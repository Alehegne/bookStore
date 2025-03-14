import mongoose from "mongoose";


export default async function connectToMongo() {
    await mongoose.connect(process.env.DB_URL as string)
    .then(()=>{
        console.log("mongodb connected successFully");
    })
    .catch((error)=>{
        console.log("mongodb connection failed",error);
    });

  }