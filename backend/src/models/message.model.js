import mongoose from "mongoose";
import User from "./user.model.js";

const message_schema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    text:{
        type:String
    },
    image:{
        type:String
    }
},{timestamps:true});

const Message=new mongoose.model("Message",message_schema);

export default Message;