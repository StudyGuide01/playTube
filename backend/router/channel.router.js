import express from 'express';
import upload from '../middleware/multer.js';
import { createChannel } from '../controller/channel.controlle.js';
import isAuth from '../middleware/isAuth.js';
const router = express.Router();

router.post('/createChannel',isAuth, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'banner', maxCount: 1 }
]), createChannel);

export default router;