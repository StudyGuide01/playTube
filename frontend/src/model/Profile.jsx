import { useDispatch, useSelector } from "react-redux";
import { FaGoogle, FaStudiovinari } from "react-icons/fa";
import { setCurrentUser } from "../redux/userSlice";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../uttils/googleAuth";

const Profile = ({ setOpenProfileModel }) => {
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const hanldelogout = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/user/logout"
    );
    console.log(response.data);
    dispatch(setCurrentUser(null));
    setOpenProfileModel(false);
  };

const handleGoogleLogin = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    const userName = response.user.displayName;
    const email = response.user.email;
    const photoUrl = response.user.photoURL;

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("photoUrl", photoUrl);

    const result = await axios.post(
      "http://localhost:8000/api/v1/user/googleLogin",
      formData,
      { withCredentials: true }
    );

    console.log(result);
    dispatch(setCurrentUser(result.data));
    setOpenProfileModel(false);
  } catch (error) {
    console.log(error);
    dispatch(setCurrentUser(null));
    setOpenProfileModel(false);
  }
};

  return (
    <>
      <div className=" bg-slate-300 max-w-[400px] absolute right-[8px] top-[58px] z-50">
        <div className="flex gap-2 py-2 px-4">
          <img
            src={currentUser?.photoUrl}
            className="w-10 h-10 rounded-full"
            alt="profile"
          />
          <div>
            <h3>{currentUser?.userName}</h3>
            <p>{currentUser?.email}</p>
            <p className="cursor-pointer text-blue-500  hover:text-white">
              {currentUser?.channel ? "view channel " : "create channel"}
            </p>
          </div>
        </div>

        <div className="border border-black mb-3"></div>
        <div className="px-2 py-1">
          <button onClick={handleGoogleLogin} className="flex gap-1 items-center">
            {" "}
            <FaGoogle  /> sign in with google{" "}
          </button>

          {currentUser ? (
            <>
              <button onClick={hanldelogout}>Logout</button>
            </>
          ) : (
            <>
              <button>Login</button>
            </>
          )}
          {currentUser?.channel && (
            <div className="flex gap-1 items-center">
              {" "}
              <FaStudiovinari /> PT Studio{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
