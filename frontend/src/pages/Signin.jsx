import React, { useState } from 'react'
import { FaLongArrowAltLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { showCustomAlert } from '../components/commen/CustomAlert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/userSlice';

const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false)

  const handleSignIn = async()=>{
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(setCurrentUser(response.data.user));
      navigate('/');
    } catch (error) {
      console.log("Error to submit Signin Form", error);
      if (error.response && error.response.data && error.response.data.message) {
        showCustomAlert(error.response.data.message);
      } else {
        showCustomAlert("Something went wrong! Please try again.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-3xl w-full max-w-md p-10">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-white hover:text-gray-200 mb-6 transition"
        >
          <FaLongArrowAltLeft className="mr-2"/> Back
        </button>

        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-white mb-3">Welcome Back 👋</h2>
        <p className="text-center text-gray-200 mb-8 text-sm">
          Sign in to your account to continue
        </p>

        {/* Form */}
        <div className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
              className="w-full py-3 px-4 rounded-xl bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
              className="w-full py-3 px-4 rounded-xl bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-0 pr-12"
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSignIn}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition"
          >
            Sign In
          </button>
        </div>

        {/* Divider */}
        {/* <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-white/30"></div>
          <span className="px-4 text-white text-sm">or</span>
          <div className="flex-grow h-px bg-white/30"></div>
        </div> */}

        {/* Google Login */}
        {/* <button className="w-full py-3 flex items-center justify-center gap-3 rounded-xl bg-white text-gray-700 font-medium shadow hover:shadow-lg transition">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="google" className="w-5 h-5"/>
          Continue with Google
        </button> */}

      </div>
    </div>
  )
}

export default Signin
