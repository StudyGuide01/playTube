import React, { useState } from 'react'

const ForgotPass = () => {
    const [step,setStep] = useState(1);
console.log(step);
    const hanldeStep = ()=>{

        if(step>=1){
            setStep( step + 1);
        }
    }
  return (
   <>
{/* step 1  */}
{step === 1 && <div className='flex flex-col max-w-[400px] mx-auto gap-2'>
    <label htmlFor="Email">Enter Your Email</label>
    <input type="email" placeholder='Email' className='border border-black' />
    <button onClick={hanldeStep} className='border border-black mx-auto py-1 px-3 rounded-lg'>Next</button>
</div>
}


{/* step 2  */}
{step === 2 && <div className='flex flex-col max-w-[400px] mx-auto gap-2'>
    <label htmlFor="otp">Verify Your OTP</label>
    <input type="text" placeholder='otp' className='border border-black' />
    <button onClick={hanldeStep} className='border border-black mx-auto py-1 px-3 rounded-lg'>Next</button>
</div>
}


{/* step 3  */}
{step === 3 && <div className='flex flex-col max-w-[400px] mx-auto gap-2'>
    <label htmlFor="password">Enter Your New Password</label>
    <input type="password" placeholder='password' className='border border-black' />
    <button  className='border border-black mx-auto py-1 px-3 rounded-lg'>Update Password</button>
</div>
}
   </>
  )
}

export default ForgotPass
