import { useLocation, useNavigate } from "react-router-dom";

const StepTwo = ({
  email,
  setEmail,
  showPassword,
  setShowPassword,
  step,
  setStep,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleSignIn,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 mt-5 max-w-[500px] mx-auto">
      {/* Password Input */}
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        placeholder="Password"
        className="border border-slate-400"
      />

      {/* Conditional input */}
      {location.pathname === "/signin" ? (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-slate-400"
        />
      ) : (
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="border border-slate-400"
        />
      )}

      {/* Show password toggle */}
      <div>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        &nbsp;&nbsp; Show Password
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        {location.pathname === "/signin" && (
          <button onClick={() => navigate("/forgotPass")}>
            Forgot Password
          </button>
        )}

        {location.pathname === "/signin" ? (
          <button onClick={handleSignIn}>Sign In</button>
        ) : (
          <button onClick={() => setStep(step + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default StepTwo;
