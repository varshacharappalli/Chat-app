import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js"; 
import toast from 'react-hot-toast';
import axios from "axios";
import {io} from 'socket.io-client';

const BASE_URL=import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/";


export const userAuthStore=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLogining:false,
    isUpdatingProfile:false,
    onlineUsers:[],
    isCheckingAuth:true,
    socket:null,
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get('auth/check');
            set({authUser:res.data});
            get().connectSocket();

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
            get().connectSocket();
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
            toast.success("Successfully Logined in.");
            get().connectSocket();
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
            get().connectSocket()
        } catch (error) {
            toast.error(error.message);
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.put('/auth/update-profile', data); 
            set({ authUser: response.data });
            toast.success("Profile Updated Successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser||get().socket?.connected){
            return
        }
        const socket=io(BASE_URL,{
            query:{userId:authUser._id}
        });

        socket.connect();

        set({socket:socket});

        socket.on("OnlineUsers",(userIds)=>{
            set({onlineUsers:userIds});
        });
    },
    disconnectSocket:()=>{
        if(get().socket?.connected){
            get().socket().disconnect();
        }
    }
    
}));