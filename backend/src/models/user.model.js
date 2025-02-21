import mongoose from "mongoose";

const user_schema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    }
},
{timestamps:true}
);

const User=new mongoose.model('User',user_schema);

export default User;
