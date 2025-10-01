import express from "express";
import isAuth from "../middleware/isAuth.js";
import uploadVideoChunk from "../middleware/videoUploader.multer.js";
import { uploadVideo } from "../controller/video.controller.js";
// import isAuth from "../middleware/isAuth.js";
// import { uploadVideo } from "../controller/video.controller.js";
// import uploadVideoChunk from "../middleware/video.multer.js";

const router = express.Router();

router.post("/uploadVideo", isAuth, uploadVideoChunk.single("file"), uploadVideo);

export default router;
