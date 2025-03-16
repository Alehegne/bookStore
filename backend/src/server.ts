import dotenv from 'dotenv'
import express from "express";
import {bookRouter} from "./routes/book/books.route";
import connectToMongo from './lib/mongoConnection';
import corsConfig from './lib/cors';


//env config
dotenv.config()
// Create Express Server
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors
corsConfig(app);
// Connect to MongoDB
connectToMongo();
//use routes
app.use("/api/books/", bookRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;//exporting app for testing
