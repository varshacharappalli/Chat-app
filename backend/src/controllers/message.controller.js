import cloundinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getSideBarForUser=async (req,res)=>{
    try {
        const loggedInUser=req.user._id;
        const filteredUsers=await Message.find({_id:{$ne:loggedInUser}}).select('-password');
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
        const receiverId=req.params;
        let imageUrl;
        if(image){
            const uploaded=await cloundinary.uploader.upload(image);
            const imageUrl=uploaded.secure_url;
        }
        const message=new Message({
            senderId:myId,
            receiverId:receiverId,
            text,
            image:imageUrl
        });
        await message.save();
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }
}