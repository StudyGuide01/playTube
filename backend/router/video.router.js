import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { createVideo, getAllVideos } from "../controller/video.controller.js";
// import { create } from "../controller/.controller.js";
const router = express.Router();


router.post('/create-video',isAuth,upload.fields([
    {name:'video',maxCount:1},
    {name:'thumbnail',maxCount:1}
]),createVideo);

router.get('/getAllVideos',isAuth,getAllVideos);


export default router;
