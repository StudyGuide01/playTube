import CustomAlert from "./components/commen/CustomAlert";
import ForgotPass from "./components/layout/ForgotPass";
import useGetCurrentsUser from "./hooks/useGetCurrentsUser";
import HomeChild from "./layouts/HomeChild";
import Shorts from "./layouts/Shorts";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  
  useGetCurrentsUser();
  return (
    <BrowserRouter>
      <CustomAlert />
      <Routes>
        <Route path="/" element={<Home/>}>
        {/* <Route index path="/" element={<Home/>}></Route> */}
        <Route path="/shorts" element={<Shorts/>}></Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotPass" element={<ForgotPass/>}></Route>
        {/* <Route path="/viewChannel" element={</ViewChannel>}></Route> */}
         {/* <Route path="/createChannel" element={<CreateChannel/>}></Route> */}


      </Routes>
    </BrowserRouter>
  );
}
