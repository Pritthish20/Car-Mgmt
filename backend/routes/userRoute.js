import express from 'express';

import { logIn,logOut,signUp } from '../controllers/userControllers.js';

const router=express.Router();

//auth
router.post('/signup',signUp)
router.post('/login',logIn)
router.post('/logout',logOut)

export default router;