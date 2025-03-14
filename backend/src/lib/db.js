import mongoose from "mongoose";


export const mongo_db=async ()=>{
    
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("Database successfully connected.");
    }
    catch(err){
        console.log("Database couldnt be connected successfully.");
        console.log(err.message);
    }
}