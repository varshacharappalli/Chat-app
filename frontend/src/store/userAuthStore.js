import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js"; 
import toast from 'react-hot-toast';
import axios from "axios";


export const userAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLogining:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get('auth/check');
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
            const response=await axiosInstance.post('auth/signup',data);
            set({authUser:res.data});
            toast.success('Account created successfully');
        }
        catch(error){
            toast.error(error.message);
        }
        finally{
            set({isSigningUp:false});
        }
    },

    login:async(data)=>{
        set({isLogining:true});
        try {
            const response=await axiosInstance.post('/auth/login',data);
            set({authUser:response.data});
            toast.success("Successfully Logined in.")
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            set({isLogining:false});
        }
    },

    logout:async ()=>{
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser:null});
            toast.success("Successfully logged out!");
        } catch (error) {
            toast.error(error.message);
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.put('/update-profile', data); // Changed `post` to `put`
            set({ authUser: response.data });
            toast.success("Profile Updated Successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    
}));