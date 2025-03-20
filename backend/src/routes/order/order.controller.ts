import { Request,Response } from "express";
import Order from "../../models/order.model";

class OrderController{

//get all orders by the user
    static async getOrdersByEmail(req:Request,res:Response){
        const {email} = req.params;
        
        if(!email){
            res.status(400).json({message:"email is required"})
        }

        try {
            const orders = await Order.find({email:email}).sort({createdAt:-1});
            console.log("orders",orders)
            res.status(200).json(...orders)
            
        } catch (error) {
            res.status(500).json({message:"internal server error",error:error})
            
        }

         
    }
    //create order
    static async createOrder(req:Request,res:Response){

        try {
        const newOrder = new Order(req.body);
        console.log("created Order",newOrder)
        await newOrder.save();
        res.status(200).json(newOrder)

        } catch (error) {
            res.status(500).json({message:error})
            
        }
    }
}

export default OrderController;