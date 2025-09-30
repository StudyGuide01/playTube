import UserModel from "../model/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import uploadOnCloudinary from "../config/cloudinary.js";
import genToken from "../config/token.js";
import sendMailer from "../config/sendMailer.js";

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
      return res.status(400).json({ message: "Invalid email", success: false });
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
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist", success: false });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ message: "Password is incorrect", success: false });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const newUser = {
      userName: user.userName,
      email: user.email,
      photoUrl: user.photoUrl || null,
    };

    res
      .status(200)
      .json({
        message: "User Login successfully",
        user: newUser,
        success: true,
      });
  } catch (error) {
    console.log("While login user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({ message: "User Loged out successfully" });
  } catch (error) {
    console.log("While logout user");
    res.status(500).json({ message: "Enter Server Error" });
  }
};

//get current user
export const currentUser = async (req, res) => {
  try {
    const userId = req.id; // middleware se aana chahiye
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log(user);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("While get current user:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//google Auth

export const googleAuth = async (req, res) => {
  try {
    const { userName, email, photoUrl } = req.body;
    let googlePhoto = photoUrl;

    if (googlePhoto) {
      // Upload remote Google photo URL to Cloudinary
      googlePhoto = await uploadOnCloudinary(googlePhoto);
    } else {
      console.log("failed to upload on cloudinary");
    }

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        userName,
        email,
        photoUrl: googlePhoto,
      });
    } else {
      if (!user.photoUrl && googlePhoto) {
        user.photoUrl = googlePhoto;
        await user.save();
      }
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(201).json({ success: true, user });
  } catch (error) {
    console.log("While google login", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

//send mail to recive otp
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    //  Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    //  Generate OTP
    const otp = String(Math.floor(1000 + Math.random() * 9000)); 
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; 
    user.isOtpVerified = false;

    await user.save();

    // Try sending OTP via email
    try {
      await sendMailer(email, otp);
      return res.status(201).json({
        message: "OTP sent successfully",
        success: true,
      });
    } catch (mailError) {
      console.error("Mail service error:", mailError.message);
      // 503 = Service unavailable
      return res.status(503).json({
        message: "Email service temporarily unavailable. Please try again later.",
        success: false,
      });
    }

  } catch (error) {
    console.error("While sending OTP:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};



// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Check OTP expiry
    if (!user.resetOtp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired", success: false });
    }

    // Compare OTP (convert both to string)
    if (String(user.resetOtp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }

    // If valid
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerified = true;

    await user.save();

    return res
      .status(200)
      .json({ message: "OTP Verified Successfully", success: true });
  } catch (error) {
    console.error("While verifying OTP:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


// reset password
export const resetPassword = async(req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user || !user.isOtpVerified){
      return res.status(404).json({message:'OTP Verified required',success:false});
    };

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.isOtpVerified = false;
    await user.save();

    return res.status(200).json({message:'Password Reset Successfully',success:false});
  } catch (error) {
    console.error("While reset password:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
