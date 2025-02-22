import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middleware/auth.middleware.js";



const router=express.Router();

router.post('/login',login);

router.post('/signup',signup);

router.post('/logout',logout);

router.put('/update-profile',protectedRoute,updateProfile);

router.get('/check',protectedRoute,checkAuth);

export default router;
