import { Request, Response } from "express";
import User, { IUser } from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
    // This is a placeholder for the UserController class

    static async adminLogIn(req:Request, res:Response) {
        const {userName,password} = req.body;
        console.log("body",req.body);
        if(!userName || !password){
             res.status(400).json({message:"please provide username and password"});
            
        }
        try {
            const admin:IUser | null = await User.findOne({userName:userName});
            if(!admin){
            
                 res.status(404).json({message:"user not found"});
            }
            const isMatch = await bcrypt.compare(password as string,admin?.password as string);
            if(!isMatch){
                 res.status(401).json({message:"invalid credentials,incorrect password"});
            }
            // var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
    //         //create a token
            const token = jwt.sign(
                {id:admin?._id,userName:admin?.userName,role:admin?.role},
                process.env.JWT_SECRET as string,
                {expiresIn:'1h'}
            );
            if(!token){
                // return res.status(500).json({message:"error creating token"})
            }
             res.status(200).json({
                message: "Authentication successful",
                token: token,
                user: {
                    username: admin?.userName,
                    role: admin?.role
                }
            })


            
        } catch (error) {
             console.log("error in admin router")
             res.status(500).json({message:"internal server error"})
        }
    }

  
   
   

    static async updateUser(req:Request, res:Response) {
        // Logic to update a user
       res.json({message:"user updated"});
    };
    static async deleteUser(req:Request, res:Response) {
        const {userId} = req.params;
        try {
         const user = await User.findByIdAndDelete(userId);
         
           res.status(200).json({message:"successfully deleted"})
         
        } catch (error) {
            res.status(500).json({message:"error in deleting user"});
         
        }
    };
    static getAllUsers(req:Request, res:Response) {
        // Logic to get all users
       res.json({message:"users returned"});
    };
    static getUserByRole(req:Request, res:Response) {
        // Logic to get users by role
       res.json({message:"users returned by role"});
    };
    static getUserById(req:Request, res:Response) {
        // Logic to get a user by ID
       res.json({message:"user returned by id"});
    };
    static async getUserByEmailOrUserName(req:Request, res:Response) {
         const email = req.params.email;
         const userName = req.params.userName;
         const query = email || userName;
         try {
            // const user:IUser | null = await User.findByEmailOrUserName(query);

            
         } catch (error) {
            res.status(500).json({message:"error in getting user by email or username"});
         }
    }


}

export default UserController;