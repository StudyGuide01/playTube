import React from 'react'

const StepTwo = () => {
  return (
    <>
    <p>Email</p>
    <div className='flex flex-col'>
        <input type='password' name='password' placeholder='Password'/>
        <input type="password" name='confirmPassword' placeholder='Confirm Password' />
    </div>
    </>
  )
}

export default StepTwo
