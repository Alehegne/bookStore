import dotenv from "dotenv";
import { IUserType } from "./user.model";
import User from "../models/user.model"
import connectToMongo from "../lib/mongoConnection";
import mongoose from "mongoose";
import { hashPassword } from "../lib/utils";
import path from "path";

dotenv.config({path:path.resolve(__dirname,"../../.env")});


const Users:IUserType[] = [
    {
        userName: "admin",
        password: "admin123",
        email:"admin@gmail.com",
        role:"admin",
    },
    {
        userName: "user",
        password: "user123",
        email:"user@gmail.com",
        role:"admin"
    },
    {
        userName: "john",
        password:"john123",
        email:"john@gmail.com",
        role:"user"
    }
]


const seedUsers = async()=>{
  
    try {
        await connectToMongo();
        console.log("connected to mongo");
        await User.deleteMany();
        console.log("deleted all users");
        const hashedUsers = Promise.all(
            Users.map(async (user)=>{
                const hashedUser = {
                    ...user,
                    password: await hashPassword(user.password)
                };
                return hashedUser;
            })
        )
        await User.insertMany(await hashedUsers);
        console.log("inserted users");
        console.log("Users Seeded Successfully!");
        // close the connection
        process.exit(0);
        
    } catch (error) {
        console.error("Error seeding users");
         process.exit(1);
    }
}

seedUsers()
.then(()=>{
    console.log("users seeded successfully");
})
.catch((error)=>{
    console.error("error in seeding users");
    console.error(error);
})