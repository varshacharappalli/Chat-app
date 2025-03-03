import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js"; 
import toast from 'react-hot-toast';
import axios from "axios";
import { userAuthStore } from "./userAuthStore.js";

export const userChatStore=create((set,get)=>({
    messages:[],
    users:[],
    isUsersLoading:false,
    isMessagesLoading:false,
    selectedUser: null,
    getUsers:async()=>{
        set({isUsersLoading:true});
        try {
            const response=await axiosInstance.get('/message/user');
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
            const response=await axiosInstance.get(`/message/${userId}`);
            set({messages:response.data});
        } catch (error) {
            console.log(error.message);
        }
        finally{
            set({isMessagesLoading:false});
        }
    },
    sendMessages:async(messageData)=>{
        const {selectedUser,messages}=get();
        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.message);
        }
    }
    ,setSelectedUser:(selectedUser)=>{set({selectedUser:selectedUser})},
    subscribeToMessages() {
        const socket = userAuthStore.getState().socket;
        if (!socket) {
          console.warn("Socket not connected");
          return;
        }
      
        socket.on("newmessages", (newMessage) => {
          const selectedUser = get().selectedUser;
          if (!selectedUser || newMessage.senderId !== selectedUser._id) return;
      
          set((state) => ({ messages: [...state.messages, newMessage] }));
        });
      },
    unsubscribeToMessages(){
        const socket=userAuthStore.getState().socket;
        socket.off("newmessages");
    }
}));
