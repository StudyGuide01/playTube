import express from "express";
import upload from "../middleware/multer.js";
import { currentUser, googleAuth, login, logout, register, resetPassword, sendOTP, verifyOTP } from "../controller/user.controller.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

// register route
router.post("/register", upload.single("photoUrl"), register);
router.post('/login',login);
router.post('/googleLogin',upload.single('phootUrl'),googleAuth);
// router.post('/googleLogin', googleAuth);

router.get('/logout',logout);
router.get('/currentUser',isAuth, currentUser);
router.post('/sendOTP',isAuth,sendOTP);
router.post('/verifyOTP',isAuth, verifyOTP);
router.post('/resetPassword',isAuth, resetPassword);

export default router;
