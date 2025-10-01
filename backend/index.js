import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

//routes 
import userRouter from './router/user.router.js';
import channelRouter from './router/channel.router.js';
import videoRouter from './router/video.router.js';

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.get('/',(req,res)=>{
res.json({message:'SERVer is correct'});
});

app.use('/api/v1/user',userRouter);
app.use('/api/v1/channel',channelRouter);
app.use('/api/v1/video',videoRouter);



app.listen(port,()=>{
    connectDB();
    console.log(`server is running on port:${port}`);
})