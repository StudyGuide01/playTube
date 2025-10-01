import React from 'react';

const StepOne = ({step, setStep, userName, setUserName, email, setEmail}) => {
  return (
    <div className="flex flex-col gap-6">
      <input
        value={userName}
        onChange={(e)=>setUserName(e.target.value)}
        type="text"
        placeholder="User Name"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
      />
      <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
      />
      <button
        onClick={()=>setStep(step+1)}
        className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition"
      >
        Next
      </button>
    </div>
  );
}

export default StepOne;
