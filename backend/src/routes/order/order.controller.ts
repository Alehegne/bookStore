import { Request,Response } from "express";
import Order from "../../models/order.model";

class OrderController{

//get all orders by the user
    static async getOrdersByEmail(req:Request,res:Response){
        const {email} = req.params;
        console.log("email",email)

        try {
            const orders = await Order.find({email:email});
            console.log("orders",orders)
            res.status(200).json(orders)
            
        } catch (error) {
            res.status(500).json({message:error})
            
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