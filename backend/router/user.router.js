import express from "express";
import upload from "../middleware/multer.js";
import { currentUser, googleAuth, login, logout, register } from "../controller/user.controller.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

// register route
router.post("/register", upload.single("photoUrl"), register);
router.post('/login',login);
router.post('/googleLogin',upload.single('phootUrl'),googleAuth);
// router.post('/googleLogin', googleAuth);

router.get('/logout',logout);
router.get('/currentUser',isAuth, currentUser);

export default router;
