import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isAuth = async(req, res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(403).json({message:'Please do login',success:false});
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status({message:'User not authenticated',success:false});
        };
        req.id = decode.userId
        
      
        next();
    } catch (error) {
        console.log('Error to get current user id : ',error);
    }
}

export default isAuth;