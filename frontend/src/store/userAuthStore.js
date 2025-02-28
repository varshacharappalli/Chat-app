import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js"; 


export const userAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLogining:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get('/auth/check');
            set({authUser:res.data});
        } catch (error) {
            set({authUser:""});
            console.log(error.message);
        }
        finally{
            set({isCheckingAuth:false});
        }
    },
    signUp:async(data)=>{
        set({isSigningUp:true});
        try{
            const response=await axiosInstance.post('/auth/signup',data);
            set({authUser:data});
            toast.success('Account created successfully');
        }
        catch(error){
            toast.error(error.message);
        }
    }
}));