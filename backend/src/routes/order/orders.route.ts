import { Express } from "express";
import {Router} from "express"
import multer from "multer";
import orderController from "./order.controller";


const upload = multer()
const orderRouter = Router();
//get order by email
orderRouter.get("/:email",orderController.getOrdersByEmail)
orderRouter.post("/create",upload.none(),orderController.createOrder);


export {orderRouter}