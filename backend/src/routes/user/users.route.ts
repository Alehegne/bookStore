import { Router } from "express"
import multer from "multer";
import UserController from "./users.controller";
import {verifyAdminToken}  from "../../middleware/verifyAdmin";




const userRouter = Router()
const upload = multer();


userRouter.get("/",UserController.getAllUsers);
userRouter.post("/admin",verifyAdminToken,upload.none(), UserController.adminLogIn);





export {userRouter}
