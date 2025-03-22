import { Request, Response,NextFunction, response } from "express";


interface UserPayload {
    id:string,
    userName:string,
    role:string,
    email:string,
    iat:number,
    exp:number,
}
//declare global { , for extending the express request object
declare global {
    namespace Express {
        interface Request{
            user?:UserPayload
        }
    }
}
import jwt, { JwtPayload, Secret } from "jsonwebtoken";


export const verifyAdminToken = (req:Request,res:Response,next:NextFunction):void => {
   
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){ 
        console.log("no token provided")
         res.status(401).json({message:"no token provided"});
         
         return;
    }
    try {

        if(!process.env.JWT_SECRET){
            console.log("no secret key")
             res.status(500).json({message:"internal server error, no secret key"});
            return;}


         const decoded = jwt.verify(token!,process.env.JWT_SECRET as Secret) as JwtPayload;
         console.log("decoded",decoded);
            if(!decoded){
                 console.log("invalid token")
                 res.status(401).json({message:"invalid token"});
                 return;
            }
            //check if the user is an admin
            if(decoded && decoded.role !== "admin"){
                console.log("unauthorized, not admin")
                 res.status(403).json({message:"forbidden"});
                return;}

            console.log("logging admin...")
            req.user = decoded as any;
            next();
  
    } catch (error) {
         
         if(error instanceof jwt.TokenExpiredError){
            console.log("token expired")
             res.status(401).json({message:"token expired"});
             return;
         }
         console.log("error verifying token")
         res.status(401).json({message:"error verifying token"});
    }

}