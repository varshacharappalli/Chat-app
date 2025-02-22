import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const protectedRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt; 
        if(!token){
            return res.status(400).json({message:'Token Not Found'});
        }
        const decoded=jwt.verify(token,process.env.SECRET_KEY);

        if(!decoded){
            return res.status(400).json({message:'Invalid Token'});
        }

        const user=await User.findbyId(decoded.userId).select('-password');

        if(!user){
            return res.status(400).json({message:'User Not Found'});
        
        }

        req.user=user;

        next();
        
        
    } catch (error) {
        console.log(error.message);
    }

}