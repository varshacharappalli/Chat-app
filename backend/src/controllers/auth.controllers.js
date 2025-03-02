import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloundinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    
    try {

        if(!fullname||!email||!password){
            return res.status(400).json({message:'All fields must be entered.'});
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword 
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,  
                email: newUser.email,
                profilePic: newUser.profilePic
            });
        } else {
            return res.status(400).json({ message: 'The data is invalid' });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(user){
            const isPasswordcorrect=await bcrypt.compare(password,user.password);
            if(!isPasswordcorrect){
                return res.status('404').json({message:'Invalid credentials'});
            }
            generateToken(user._id,res);
            res.status(201).json({
                _id: user._id,
                fullname: user.fullname,  
                email: user.email,
                profilePic: user.profilePic
            });
        }
        else{
            return res.status('401').json({message:'Invalid credentials.'});
        }
    } catch (error) {
        console.log("Error in login credentials:"+error.message);
        res.status(500).json({message:'Error in login credentials'});
    }
}

export const logout=async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(201).json({message:"Logged out successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(401).json({message:'Couldnt logout.'});
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const{profilePic}=req.body;
        if(!profilePic){
            return res.status(400).json({message:'Error'});
        }
        const userId=req.user._id;
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
          );
      
          res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'Error in updating profile'});
    }
}

export const checkAuth=async(req,res)=>{
    try {
        const user=req.user;
        res.status(201).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:'Internal server error'});
    }
}