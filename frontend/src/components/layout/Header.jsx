import { FaBars } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import Profile from "../../model/Profile";
import { useState } from "react";
const Header = ({open,setOpen}) => {
  const {currentUser} = useSelector((store)=>store.auth);
  const [openProfileModel,setOpenProfileModel] = useState(false);

 
  return (
  <>
  <header className="relative">
  <div className='bg-black px-5 flex items-center justify-between py-2'>

    {/* logo */}
    <div className="flex gap-3 items-center">
        <div className="bg-[#0f0f0f0] text-white border border-slate-200 p-3 rounded-full">
        <FaBars onClick={()=>setOpen(!open)}/>
        </div>
        <p className="text-white">YouTube Logo</p>
    </div>

    {/* search */}
    <div className="flex relative">
        <input type="search" className="border border-slate-500 rounded-l-full h-10 p-3" />
        <div className="bg-[#0f0f0f0] text-white border border-slate-200 p-3 rounded-r-full"><IoIosSearch /></div>
    </div>

    {/* create and profile  */}
    <div className="flex items-center gap-3">
        {currentUser?.channel && <div className="text-white flex items-center border border-slate-300 rounded-full p-2 gap-2"><IoMdAdd /> Create</div>}
        <div>
          {!currentUser?.photoUrl ? <><FaUserCircle onClick={()=>setOpenProfileModel(!openProfileModel)} className="text-white w-10 h-10" /></> : <><img src={currentUser?.photoUrl}  onClick={()=>setOpenProfileModel(!openProfileModel)} className="text-white w-10 h-10 rounded-full object-cover object-center"/></>} 

        </div>
    </div>

  </div>

{/* profile model  */}
{openProfileModel && <Profile openProfileModel={openProfileModel} setOpenProfileModel={setOpenProfileModel}/>}

  </header> 
  
  </>
  )
}

export default Header
