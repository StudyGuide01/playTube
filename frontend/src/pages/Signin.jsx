import React, { useState } from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa";
import StepTwo from '../parts/signupParts/StepTwo';
import axios from 'axios';
import { showCustomAlert } from '../components/commen/CustomAlert';


const Signin = () => {
  
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [showPassword,setShowPassword] = useState(false)




//const handle Submit 
const handleSignIn = async()=>{

  try {
 

const response = await axios.post(
  "http://localhost:8000/api/v1/user/login",
  { email, password },
  { withCredentials: true }
);
    console.log(response.data);
    // showCustomAlert(response.data.message);
     
  } catch (error) {
     console.log("Error to submit Signup Form", error);

  
    if (error.response && error.response.data && error.response.data.message) {
      showCustomAlert(error.response.data.message);
    } else {
      showCustomAlert("Something went wrong! Please try again.");
    }


  }
}
   
  return (
 <>

<p className='text-center'> Login </p>



 <StepTwo   showPassword={showPassword} setShowPassword={setShowPassword} password={password} setPassword={setPassword} email={email} setEmail={setEmail} handleSignIn={handleSignIn}/>



 </>
  )
}

export default Signin
