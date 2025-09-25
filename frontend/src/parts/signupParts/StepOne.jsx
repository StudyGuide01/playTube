import React from 'react'

const StepOne = ({step, setStep,userName, setUserName, email, setEmail}) => {
  return (
    <>
    <div className='flex flex-col gap-6 mt-5 max-w-[500px] mx-auto'>
        <input value={userName} onChange={(e)=>setUserName(e.target.value)} type='text' name='name' placeholder='User Name' className='border border-slate-400'/>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="Email" name='email' placeholder='Email' className='border border-slate-400'/>

        <button onClick={()=>setStep(step + 1)}>Next</button>
    </div>
    </>
  )
}

export default StepOne
