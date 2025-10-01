import { CgProfile } from "react-icons/cg";

const StepThree = ({ setPhotoUrl, showProfile, setShowProfile, loading, handleSubmit }) => {

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoUrl(file);
      setShowProfile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex flex-col gap-2 items-center">
        {showProfile ? (
          <img src={showProfile} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"/>
        ) : (
          <CgProfile className="w-20 h-20 text-indigo-300" />
        )}
        <p className="text-gray-200 font-medium">Profile Photo</p>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg flex justify-center items-center gap-2 transition disabled:opacity-50"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </div>
  );
};

export default StepThree;
