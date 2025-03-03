import {Server} from "socket.io";
import http from "http";
import express from "express";

const app=express();

const server=http.createServer(app);

const io=new Server(server,{
    cors:{origin:["http://localhost:5173"]}
});

const userSocketMap={};

export function getreceiverId(userId){
    return userSocketMap[userId];
}

io.on("connection",(socket)=>{

    console.log("User has successfully connected!",socket.id);
    const userId=socket.handshake.query.userId;
    userSocketMap[userId]=socket.id;
    io.emit("OnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        console.log("User has successfully disconnected!",socket.id);
        delete userSocketMap[userId];
        io.emit("OnlineUsers",Object.keys(userSocketMap));
    })
})

export {io,app,server};