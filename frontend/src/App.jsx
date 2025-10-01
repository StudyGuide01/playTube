import { useSelector } from "react-redux";
import CustomAlert, { showCustomAlert } from "./components/commen/CustomAlert";
import CreateChannel from "./components/layout/CreateChannel";
import ForgotPass from "./components/layout/ForgotPass";
import useGetChannel from "./hooks/useGetChannel";
import useGetCurrentsUser from "./hooks/useGetCurrentsUser";
import HomeChild from "./layouts/HomeChild";
import Shorts from "./layouts/Shorts";
import UpdateChannel from "./layouts/UpdateChannel";
import ViewChannel from "./layouts/ViewChannel";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const ProtectRoute = ({ userData, children }) => {
    if (!userData) {
        showCustomAlert('please sign up first to use this feature');
        return <Navigate to="/" replace />;
    }
    return children;
};


export default function App() {
  
  useGetCurrentsUser();
  useGetChannel();

  const {currentUser} = useSelector((store)=>store.auth);
  return (
    <BrowserRouter>
      <CustomAlert />
      <Routes>
         <Route path="/" element={<Home/>}>
           <Route path="/shorts" element={<ProtectRoute userData={currentUser}><Shorts/></ProtectRoute>}></Route>
           <Route path="/viewChannel" element={<ViewChannel/>}></Route>
           <Route path="/updateChannel" element={<UpdateChannel/>}></Route>
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotPass" element={<ForgotPass/>}></Route>
       
       
         <Route path="/createChannel" element={<CreateChannel/>}></Route>


      </Routes>
    </BrowserRouter>
  );
}
