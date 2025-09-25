import UserModel from "../model/user.model.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import uploadOnCloudinary from "../config/cloudinary.js";





export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    let photoUrl;

    // Upload photo if file is present
    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }

    // Check if user already exists
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email", success: false });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
        success: false,
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await UserModel.create({
      userName,
      email,
      password: hashPassword,
      photoUrl,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user, success: true });
  } catch (error) {
    console.log("While register user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//sign in 
export const login = async(req, res)=>{
    try {
        const {email,password} = req.body;
        const user = await UserModel.fineOne({email});
        if(!user){
            return res.status(404).json({message:'User is not exist',success:false});
        };

        const matchPassword = await bcrypt.compare(password,user.password);
        if(!matchPassword){
            return res.status(400).json({message:'password is incorrect',success:false});
        };

             
         const token = await genToken(user._id);
         res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'Strict',
            maxAge:7*24*60*60*1000  
         });

             const newUser ={
            userName:user.userName,
            email:user.email,
            photoUrl
         };

         res.status(200).json({message:'User Login successfully',user,success:true});



    } catch (error) {
        console.log('While login user');
        res.status(500).json({message:'Enter Server Error'});
    }
}

//logout
export const logout = async(req, res)=>{
    try {
     await res.clearCookie('token');
     return res.status(200).json({message:'User Loged out successfully'});
    } catch (error) {
        console.log('While logout user');
        res.status(500).json({message:'Enter Server Error'});
    }
}