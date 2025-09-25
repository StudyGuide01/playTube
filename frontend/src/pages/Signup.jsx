import React, { useState } from 'react'
import StepOne from '../parts/signupParts/StepOne'
import { FaLongArrowAltLeft } from "react-icons/fa";
import StepTwo from '../parts/signupParts/StepTwo';
import StepThree from '../parts/signupParts/StepThree';
import axios from 'axios';


const Signup = () => {
    const [step,setStep] = useState(1);
    const [userName, setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photoUrl,setPhotoUrl] = useState(null);
    const [showPassword,setShowPassword] = useState(false)
    const [showProfile,setShowProfile] = useState(null);
    const [loading,setLoading] = useState(false);

const handleReversStep =()=>{
  if(step >=2 && step<=3){
    setStep(step - 1);
  }
}

//const handle Submit 
const handleSubmit = async()=>{
  setLoading(true)
  try {
    const formData = new FormData();
    formData.append('userName',userName);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('confirmPassword',confirmPassword);
    formData.append('photoUrl',photoUrl);

    const response = await axios.post(`http://localhost:8000/api/v1/user/register`,formData,{withCredentials:true});
    console.log(response.data);
     setLoading(false)
  } catch (error) {
    console.log('Error to submit Signup Form ',error);
     setLoading(false);
  }
}
   
  return (
 <>
<div className='flex'>
  <FaLongArrowAltLeft  onClick={handleReversStep}/>
<p>Create Accout</p>
</div>

{/* Step 1 */}
{ step === 1 && <> <StepOne step={step} setStep={setStep} userName={userName} setUserName={setUserName} email={email} setEmail={setEmail}/> </> }

{/* Step 2 */}
{ step === 2 && <> <StepTwo email={email} step={step} setStep={setStep} showPassword={showPassword} setShowPassword={setShowPassword} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}/> </> }

{/* Step 3 */}
{ step === 3 && (
  <StepThree  

    photoUrl={photoUrl} 

    setPhotoUrl={setPhotoUrl} 
    showProfile={showProfile} 
    setShowProfile={setShowProfile} 
       loading={loading}
    handleSubmit={handleSubmit}  
  />
) }

 </>
  )
}

export default Signup
