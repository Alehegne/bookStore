import { NextFunction } from "express";
import { Request, Response } from "express";


interface UserPayload {
    id:string,
    userName:string,
    role:string,
    email:string,
}
//declare global { , for extending the express request object
declare global {
    namespace Express {
        interface Request{
            user?:UserPayload
        }
    }
}
import jwt from "jsonwebtoken";


export const verifyAdminToken = (req:Request,res:Response,next:NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"unauthorized"});
    }
    try {

        if(!process.env.JWT_SECRET)
            return res.status(500).json({message:"internal server error, no secret key"});


         const decoded = jwt.verify(token,process.env.JWT_SECRET) as UserPayload;
            if(!decoded){
                return res.status(401).json({message:"invalid token"});
            }
            //check if the user is an admin
            if(decoded && decoded.role !== "admin")
                return res.status(403).json({message:"forbidden"});

            if(decoded){
                req.user = decoded as any;
                res.status(200).json({message:"success",user:decoded});
                next();
            }

         
         
       

        
    } catch (error) {
        return res.status(401).json({message:"error verifying token"});
        
    }

}