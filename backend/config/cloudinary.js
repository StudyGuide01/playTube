// import { v2 as cloudinary } from "cloudinary";
// import dotenv from 'dotenv';
// import fs from "fs";

// dotenv.config();
// cloudinary.config({
//   cloud_name: process.env.CLOUDE_NAME,
//   api_key: process.env.CLOUDE_API_KEY,
//   api_secret: process.env.CLOUDE_API_SECRET,
// });

// const uploadOnCloudinary = async (filePath) => {
//   try {
//     if (!filePath) {
//       return null;
//     }
//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type: "auto",
//     });

//     // delete local file
//     fs.unlinkSync(filePath);

//     return result.secure_url;
//   } catch (error) {
//     console.log("Error while uploading to Cloudinary", error);
//     fs.unlinkSync(filePath);
//     return null;
//   }
// };

// export default uploadOnCloudinary;


import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUDE_API_KEY,
  api_secret: process.env.CLOUDE_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // Agar filePath ek local file hai to hi unlink karo
    if (!filePath.startsWith("http")) {
      fs.unlinkSync(filePath);
    }

    return result.secure_url;
  } catch (error) {
    console.log("Error while uploading to Cloudinary", error);

    // error ke case me bhi unlink tabhi jab local file ho
    if (filePath && !filePath.startsWith("http") && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;
