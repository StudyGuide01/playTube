import express from 'express';
import { createShort, getAllShorts } from '../controller/short.controller.js';
import upload from '../middleware/multer.js';
import isAuth from '../middleware/isAuth.js';
const router = express.Router();

router.post('/create-short',isAuth,upload.single('shortFile'),createShort);
router.get('/getAllShorts',isAuth,getAllShorts);


export default router;