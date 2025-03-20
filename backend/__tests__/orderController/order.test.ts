import request from "supertest"
import express,{Request as req,Response} from "express"
import OrderController from "../../src/routes/order/order.controller"
import Order from "../../src/models/order.model"


jest.mock("../../src/models/order.model.ts");// mocking the order model


const app = express();
app.use(express.json());

//mocking routes
app.get("/api/orders/:email",(req,res)=>{
    OrderController.getOrdersByEmail(req,res);
})

describe.only('Get/orders/:emai', () => { 
    it("should return orders by email",async()=>{
        const mockOrders = [
            {
                _id:"1",
                email:"alex@gmail.com",
                item:"laptorp",
                quantity:1,
            }
        ];

        (Order.find as jest.Mock).mockResolvedValue(mockOrders);
        const response = await request(app).get("/orders/test@example.com");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrders);
    });
        it ("should return 500 if there is an error",async()=>{
            (Order.find as jest.Mock).mockRejectedValue(new Error("Database error"));
            const response = await request(app).get("/orders/test@example.com");

            expect(response.status).toBe(500);
            expect(response.body).toEqual({message:"Internal server error"});

    
        });
    });
 