import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js"; 
import toast from 'react-hot-toast';
import axios from "axios";

export const userChatStore=(set)=>({
    messages:[],
    users:[],
    isUsersLoading:false,
    isMessagesLoading:false,
    selectedUser: null,
    getUsers:async()=>{
        set({isUsersLoading:true});
        try {
            const response=await axiosInstance.post('/message/user');
            set({users:response.data});
        } catch (error) {
            console.log(error.message);
        }
        finally{
            set({isUsersLoading:false});
        }
    },
    getMessages:async(userId)=>{
        set({isMessagesLoading:true});
        try {
            const response=await axiosInstance.post('/message/${userId}');
            set({messages:response.data});
        } catch (error) {
            console.log(error.message);
        }
        finally{
            set({isMessagesLoading:false});
        }
    },
    setSelectedUser:(selectedUser)=>{set({selectedUser:selectedUser})}
});
