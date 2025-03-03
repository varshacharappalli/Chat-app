import express from "express";
import authRoutes from "./routes/authRoutes.js";
import MessageRoutes from './routes/MessageRoutes.js'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({ path: "./src/.env" });  

import path from "path";

import { mongo_db } from "./lib/db.js";

import {io,app,server} from '../src/lib/socket.js';

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));  // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

console.log("MONGO_URI:", process.env.MONGO_URI); 

mongo_db();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
  }));

app.use("/api/auth", authRoutes);
app.use("/api/message",MessageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(process.env.PORT, () => {
    console.log("Server is running in port:"+process.env.PORT);
});