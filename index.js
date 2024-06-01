import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';

import DBConnection from "./database/db.js";
import router from "./routes/routes.js";

dotenv.config();


const app = express();

// middlewares
app.use(cors());


const PORT = process.env.PORT||5000

// Database connection
DBConnection();


// Default Route
app.get("/",(req,res)=>{
    return res.send("<h1>Hello</h1>")
});



// file upload routes
app.use('/',router);

// -----------------------------------------------------------


// listen on the port
app.listen(PORT,()=>{
    console.log(`App is running on port no ${PORT}`)
})