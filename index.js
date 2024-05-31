import express from "express";
import router from "./routes/routes.js";
import cors from 'cors'
import DBConnection from "./database/db.js";
import dotenv from 'dotenv';

const app = express();

app.use(cors());
app.use('/',router);

dotenv.config();
const PORT = process.env.PORT||3000

//calling databse 
DBConnection();

app.listen(PORT,()=>{
    console.log(`App is running on port no ${PORT}`)
})

//default route
app.get("/",(req,res)=>{
    res.send("<h1>Hello</h1>")
})