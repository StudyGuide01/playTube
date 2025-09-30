import axios from 'axios';
import React, { useState } from 'react'


const ForgotPass = () => {
    const [step,setStep] = useState(2);
    const [email, setEmail] = useState('');
    const [otp,setOTP] = useState('');
    const [password,setPassword] =  useState('');


  
    


    const handleSendOTP = async()=>{
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/user/sendOTP`,{email},{withCredentials:true});
            console.log(response);
             if(step>=1){
            setStep( step + 1);
        }
        } catch (error) {
            console.log(error);
        }
    }

    //handle Verify
const handleVerifyOTP = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/verifyOTP",
      { email, otp }, // ✅ correct body
      { withCredentials: true }
    );

    console.log("Verify OTP Response:", response.data);

    // Go to next step if valid
    if (step >= 1) {
      setStep(step + 1);
    }
  } catch (error) {
    console.log(
      "Error while verifying OTP:",
      error.response?.data || error.message
    );
  }
};


    //handle Verify
const handleResetPassword = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/resetPassword",
      { email, password }, 
      { withCredentials: true }
    );

    console.log("Password Reset:", response.data);

 
  } catch (error) {
    console.log(
      "Error while verifying OTP:",
      error.response?.data || error.message
    );
  }
};

  return (
   <>
{/* step 1  */}
{step === 1 && <div className='flex flex-col max-w-[400px] mx-auto gap-2'>
    <label htmlFor="Email">Enter Your Email</label>
    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email' className='border border-black' />
    <button onClick={handleSendOTP} className='border border-black mx-auto py-1 px-3 rounded-lg'>Send OTP</button>
</div>
}


{/* step 2  */}
{step === 2 && <div className='flex flex-col max-w-[400px] mx-auto gap-2'>
    <label htmlFor="otp">Verify Your OTP</label>
    <input value={otp}  onChange={(e)=>setOTP(e.target.value)} type="text" placeholder='otp' className='border border-black' />
    <button onClick={handleVerifyOTP} className='border border-black mx-auto py-1 px-3 rounded-lg'>Verify OTP</button>

</div>
}


{/* step 3  */}
{step === 3 && <div className='flex flex-col max-w-[400px] mx-auto gap-2'>
    <label htmlFor="password">Enter Your New Password</label>
    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password' className='border border-black' />
    <button onClick={handleResetPassword}  className='border border-black mx-auto py-1 px-3 rounded-lg'>Update Password</button>
</div>
}
   </>
  )
}

export default ForgotPass
