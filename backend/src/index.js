import express from "express";
import authRoutes from "./routes/authRoutes.js";
import MessageRoutes from './routes/MessageRoutes.js'
import dotenv from "dotenv";
import cookieParser from "cookieParser";

dotenv.config({ path: "./src/.env" });  

import { mongo_db } from "./lib/db.js";

const app = express();
app.use(express.json());

console.log("MONGO_URI:", process.env.MONGO_URI); 

mongo_db();

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message",MessageRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running in port:"+process.env.PORT);
});