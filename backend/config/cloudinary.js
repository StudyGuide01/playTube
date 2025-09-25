import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async(filePath)=>{
cloudinary.config({ 
  cloud_name: process.env.CLOUDE_NAME, 
  api_key: process.env.CLOUDE_API_KEY, 
  api_secret: process.env.CLOUDE_API_SECRET, 
});
try {
    if(!filePath) { 
        return null
    };
    const result  = await cloudinary.uploader.upload(filePath,{resource_type:'auto'}); 
    fs.unlink(filePath);
    return result.secure_url;
} catch (error) {
    console.log('Error to upload cloudinary');
    fs.unlink(filePath);
}
}

export default uploadOnCloudinary;