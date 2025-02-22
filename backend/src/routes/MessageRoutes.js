import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { getMessages, getSideBarForUser, sendMessage } from '../controllers/message.controller.js';

const router=express.Router();

router.get('/user',protectedRoute,getSideBarForUser);
router.get('/:id',protectedRoute,getMessages);
router.post('/send/:id',protectedRoute,sendMessage)

export default router;