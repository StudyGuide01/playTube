import React, { useState } from 'react';
import StepOne from '../parts/signupParts/StepOne';
import StepTwo from '../parts/signupParts/StepTwo';
import StepThree from '../parts/signupParts/StepThree';
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from 'axios';
import { showCustomAlert } from '../components/commen/CustomAlert';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photoUrl,setPhotoUrl] = useState(null);
  const [showPassword,setShowPassword] = useState(false);
  const [showProfile,setShowProfile] = useState(null);
  const [loading,setLoading] = useState(false);

  const handleReversStep = () => {
    if(step >= 2 && step <= 3) setStep(step - 1);
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('photoUrl', photoUrl);

      const response = await axios.post(`http://localhost:8000/api/v1/user/register`, formData, { withCredentials:true });
      showCustomAlert(response.data.message);
      setLoading(false);
      navigate('/signin');
    } catch (error) {
      console.log("Error to submit Signup Form", error);
      if(error.response && error.response.data && error.response.data.message) {
        showCustomAlert(error.response.data.message);
      } else {
        showCustomAlert("Something went wrong! Please try again.");
      }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl w-full max-w-md p-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {step > 1 && (
            <button onClick={handleReversStep} className="text-white hover:text-gray-200 transition">
              <FaLongArrowAltLeft className="text-lg"/>
            </button>
          )}
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
        </div>

        {/* Steps */}
        { step === 1 && <StepOne step={step} setStep={setStep} userName={userName} setUserName={setUserName} email={email} setEmail={setEmail}/> }
        { step === 2 && <StepTwo email={email} step={step} setStep={setStep} showPassword={showPassword} setShowPassword={setShowPassword} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}/> }
        { step === 3 && <StepThree photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} showProfile={showProfile} setShowProfile={setShowProfile} loading={loading} handleSubmit={handleSubmit}/> }

      </div>
    </div>
  )
}

export default Signup;
