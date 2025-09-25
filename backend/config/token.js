import jwt from 'jsonwebtoken';

const genToken = async(userId)=>{
    try {
        const token = await jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:'7d'});
        console.log('token',token);
        return token;
    } catch (error) {
        console.log('error to generate token');
    }
};

export default genToken;
