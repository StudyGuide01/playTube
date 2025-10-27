import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import CategorySlider from '../components/layout/HomeCategorySlider';
import { Outlet, useLocation } from 'react-router-dom';
import AllVideoPage from '../components/layout/AllVideoPage';
import ContentMenage from '../layouts/ContentMenage';
import AllShortPage from '../components/layout/AllShortPage';

const Home = () => {
    const [open,setOpen] = useState(true);
    const location = useLocation();
    const [tabSelected, setTabSelected] = useState(() => {
  return localStorage.getItem("selectedTab") || "Home";
});

    useEffect(()=>{
        let selectTab = localStorage.getItem('selectedTab');
        if(selectTab){
            setTabSelected(selectTab);
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem('selectedTab',tabSelected);
    },[tabSelected]);
  return (
   <>
   <Header setOpen={setOpen} open={open}/>
   <div className='flex'>
   <div><Sidebar open={open} selected={tabSelected} setSelected={setTabSelected}/></div>
   <div className={` w-full ${open ? 'ml-40' : 'ml-[50px]'}`}>
       {location.pathname === '/' && <CategorySlider /> }

         <div className=''>
        <Outlet/>
       </div>


<AllVideoPage/>
<AllShortPage/>
<h2>Hello World</h2>

     
   </div>
   </div>
   </>
  )
}

export default Home
