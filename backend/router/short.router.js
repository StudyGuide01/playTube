import express from 'express';
import { createShort } from '../controller/short.controller.js';
import upload from '../middleware/multer.js';
import isAuth from '../middleware/isAuth.js';
const router = express.Router();

router.post('/create-short',isAuth,upload.single('shortFile'),createShort);

export default router;