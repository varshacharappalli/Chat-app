import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js"; 
import toast from 'react-hot-toast';
import axios from "axios";

export const userThemeStore = create((set)=>({
    theme:localStorage.getItem('chat-item')||'coffee',
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
      },
}));



