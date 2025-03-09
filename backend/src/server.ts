import express, { Request, Response } from "express";
import cors from "cors"

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

const corsConfig =  {
    origin:"http://localhost:3000",
    methods:['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders:["Content-type","Authorization"],
    credentials:true
    
}
app.use(cors(
   corsConfig
))


// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
