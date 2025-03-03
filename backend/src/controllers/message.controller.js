import { Socket } from "socket.io";
import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getreceiverId } from "../lib/socket.js";

export const getSideBarForUser=async (req,res)=>{
    try {
        const loggedInUser=req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select('-password');
        res.status(200).json(filteredUsers);
        
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }
}

export const getMessages= async(req,res)=>{
    try {
        const myId=req.user._id;
        const {id:userToChatId}=req.params;
        const messages=await Message.find({$or:[{senderId:myId,receiverId:userToChatId},{senderId:userToChatId,receiverId:myId}]});
        res.status(201).json(messages);
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }
}

export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const myId=req.user._id;
        const { id: receiverId } = req.params; 
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const message=new Message({
            senderId:myId,
            receiverId:receiverId,
            text,
            image:imageUrl,
        });
        await message.save();
        const receiver_socket=getreceiverId(receiverId);

        io.to(receiver_socket).emit("newmessages");

        res.status(200).json(message);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({message:'Server Error'});
    }
}