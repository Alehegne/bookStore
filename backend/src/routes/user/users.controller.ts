import { Request, Response } from "express";
import User, { IUser } from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
    // This is a placeholder for the UserController class

    static async adminLogIn(req:Request, res:Response):Promise<void> {
        const {userName,password} = req.body;
        console.log("body",req.body);
        if(!userName || !password){
            console.log("error in admin login, please provide username and password");
             res.status(400).json({message:"please provide username and password"});
             return;
        }
        try {
            const admin:IUser | null = await User.findOne({userName:userName});
            if(!admin){
            console.log("error in admin login, admin not found");

                 res.status(404).json({message:"admin not found"});
                    return;
            }
            const isMatch = await bcrypt.compare(password as string,admin?.password as string);
            if(!isMatch){
                console.log("error in admin login, password is incorrect");
                 res.status(401).json({message:"invalid credentials,incorrect password"});
             return;

            }
            
            const token = jwt.sign(
                {id:admin?._id,userName:admin?.userName,role:admin?.role},
                process.env.JWT_SECRET as string,
                {expiresIn:'2h'}
            );
            if(!token){
                console.log("error in admin login, token not created");
             res.status(500).json({message:"error creating token"})
             return;

            }
             res.status(200).json({
                message: "Authentication successful",
                token: token,
            })
          console.log("admin login success");

            
        } catch (error) {
             console.log("error in admin router")
             res.status(500).json({message:"internal server error at admin route"})
             return;

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