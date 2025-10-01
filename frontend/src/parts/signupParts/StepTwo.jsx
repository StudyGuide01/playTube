import { useLocation, useNavigate } from "react-router-dom";

const StepTwo = ({ email,setEmail, showPassword, setShowPassword, step, setStep, password, setPassword, confirmPassword, setConfirmPassword, handleSignIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
      />

      {location.pathname === "/signin" ? (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
        />
      ) : (
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
        />
      )}

      <label className="flex items-center gap-2 text-gray-100">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
          className="accent-indigo-500"
        />
        Show Password
      </label>

      <div className="flex justify-between mt-4">
        {location.pathname === "/signin" && (
          <button onClick={() => navigate("/forgotPass")} className="text-sm text-indigo-200 hover:text-white transition">
            Forgot Password?
          </button>
        )}
        {location.pathname === "/signin" ? (
          <button onClick={handleSignIn} className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition">
            Sign In
          </button>
        ) : (
          <button onClick={() => setStep(step+1)} className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default StepTwo;
