import mongoose, { Document, Schema } from "mongoose"
import bcrypt from "bcryptjs";
import {formatDistanceToNow}  from "date-fns";

//lets create easy and separeted interfaces for the user model
export interface IUser extends Document{
    userName:string,
    password:string,
    email:string,
    role:string,
    createdAt:Date,
    updatedAt:Date,
    _id:string,
}
export interface IUserMethods {
    comparePassword(password:string):Promise<boolean>,
}

//mongoose schema for user
const UserSchema:Schema<IUser> = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    role:{
        type:String,
        required:true,
        enum:["admin","user"],
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    
},{
    timestamps:true,
    toJSON:{
        virtuals:true,
        required:true,
    },
    toObject:{
        virtuals:true,
        required:true,
    }
}
);
//pre save
UserSchema.pre<IUser>("save",async function(next){
    if(!this.isModified("password")){
        //skip hashing
        return next();
    }
    //hash password
    const salt = await bcrypt.genSalt(10);//
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
//method to compare password
UserSchema.methods.comparePassword = async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password,this.password);
}
//update the updatedAt field before saving
UserSchema.pre<IUser>("save",async function(next){
    this.updatedAt = new Date();
    //log the update
    console.log(`User ${this.userName} updated at ${this.updatedAt}`);
    next();
})
//log a user when created
UserSchema.post<IUser>("save",async function(doc){
    console.log(`User ${doc.userName} created at ${doc.createdAt}`);
})
//virtuals, allow to get computed properties with out storing them in the database
UserSchema.virtual("fullName").get(function(){
    return `${this.userName}`;
})
//virtuals to get the time since the user was created
UserSchema.virtual("createdAtDistance").get(function(){
    return formatDistanceToNow(this.createdAt,{addSuffix:true});
})
//statics methods: allow to create methods that can be called on the model itself
// UserSchema.statics.findByEmailOrUserName = async function(emailOrUserName:string):Promise<IUser | null>{
//     return await this.findOne({
//         $or:[
//             {email:emailOrUserName},
//             {userName:emailOrUserName}
//         ]
//     })
// }

export default mongoose.model("User",UserSchema)
