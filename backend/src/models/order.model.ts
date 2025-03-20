import mongoose from "mongoose";


export interface OrderProps{
    // userId:string;
    //TODO: add user model and create a relationship
    name:string;
    email:string;
    phone:string;
    address:{
        address:string,
        city:string,
        country:string,
        state:string,
        zip:string
    },
    productIds:string[];
    totalPrice:number;
    status:"pending"|"shipped"|"delivered"|"cancelled";
    createdAt:Date;
    updatedAt:Date;
    _id:string;

}

const Order = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    status:{
        // enum:["pending","shipped","delivered","cancelled"],
        type:String,
        enum:["pending","shipped","delivered","cancelled"],
        default:"pending"
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        zip:{
            type:String,
            required:true
        }
    },
    productIds:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book",
            required:true

        }
    ],
    totalPrice:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
},
{timestamps:true}
);


export default mongoose.model<OrderProps>("Order",Order);