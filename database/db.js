import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const DBConnection = async () => {
    const MONGODB_URI = process.env.MONGODB_URL;
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error while connecting to db", error.message);
    }
};
export default DBConnection;
