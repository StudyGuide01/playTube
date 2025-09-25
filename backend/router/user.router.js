import express from "express";
import upload from "../middleware/multer.js";
import { register } from "../controller/user.controller.js";

const router = express.Router();

// register route
router.post("/register", upload.single("photoUrl"), register);

export default router;
