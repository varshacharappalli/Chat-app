import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js"; 
import toast from 'react-hot-toast';
import {io} from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const userAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLogining: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: true,
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('auth/check');
            set({ authUser: response.data });
            get().connectSocket();
        } catch (error) {
            set({ authUser: null });
            console.error("Auth check error:", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('auth/signup', data);
            set({ authUser: response.data });
            toast.success('Account created successfully');
            get().connectSocket();
        } catch (error) {
            console.error("Signup error:", error);
            toast.error(error.response?.data?.message || "Failed to create account");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLogining: true });
        try {
            const response = await axiosInstance.post('auth/login', data);
            if (response.data) {
                set({ authUser: response.data });
                toast.success("Successfully logged in!");
                get().connectSocket();
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            set({ isLogining: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('auth/logout');
            get().disconnectSocket();
            set({ authUser: null });
            toast.success("Successfully logged out!");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.put('auth/update-profile', data);
            set({ authUser: response.data });
            toast.success("Profile Updated Successfully!");
        } catch (error) {
            console.error("Update profile error:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) {
            return;
        }
        const socket = io(BASE_URL, {
            query: { userId: authUser._id }
        });

        socket.connect();
        set({ socket });

        socket.on("OnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
        }
    }
}));