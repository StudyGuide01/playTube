import React, { useState } from 'react'
import StepOne from '../parts/signupParts/StepOne'
import { FaLongArrowAltLeft } from "react-icons/fa";
import StepTwo from '../parts/signupParts/StepTwo';


const Signup = () => {
    const [step,setStep] = useState(2);
    const [userName, setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photoUrl,setPhotoUrl] = useState(null);
  return (
 <>
<div className='flex'>
  <FaLongArrowAltLeft />
<p>Create Accout</p>
</div>
{
    step === 1 && <> 
     <StepOne/>
    </>
}


{
    step === 2 && <> 
     <StepTwo/>
    </>
}

 
 
 </>
  )
}

export default Signup
