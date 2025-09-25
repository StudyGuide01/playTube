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
    <>
      <p className="flex gap-2 justify-center items-center">
        {showProfile ? (
          <img src={showProfile} alt="Profile Preview" className="w-16 h-16 rounded-full" />
        ) : (
          <CgProfile className="w-16 h-16" />
        )}
        Profile
      </p>

      <div className="flex flex-col gap-6 mt-5 max-w-[500px] mx-auto">
        <p>Choose Profile Photo</p>
        <input
          type="file"
          accept="image/*"
          name="file"
          className="border border-slate-400"
          onChange={handleImage}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </>
  );
};

export default StepThree;
