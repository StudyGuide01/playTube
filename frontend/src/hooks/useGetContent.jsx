// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { setAllShorts, setAllVideos } from '../redux/contentSlice';
// import CustomAlert from '../components/commen/CustomAlert';

// const useGetContent = () => {
//     const dispatch = useDispatch();

//     useEffect(()=>{
//         const fetchAllVideos = async()=>{
//             try {
//                 const result = await axios.get('http://localhost:8000/api/v1/video/getAllVideos',{withCredentials:true});
//                 dispatch(setAllVideos(result.data));
//             } catch (error) {
//                 CustomAlert(error?.response.data.message);
//             }
//         }

//         fetchAllVideos();


//                 const fetchAllShorts = async()=>{
//             try {
//                 const result = await axios.get('http://localhost:8000/api/v1/short/getAllShorts',{withCredentials:true});
//                 dispatch(setAllShorts(result.data));
//             } catch (error) {
//                 CustomAlert(error?.response.data.message);
//             }
//         }

//         fetchAllShorts();

        
//     })
  
// }

// export default useGetContent;



import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllShorts, setAllVideos } from '../redux/contentSlice';
import CustomAlert from '../components/commen/CustomAlert';

const useGetContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const result = await axios.get('http://localhost:8000/api/v1/video/getAllVideos', { withCredentials: true });
        // ✅ FIX: only store the array
        dispatch(setAllVideos(result.data.videos));
      } catch (error) {
        CustomAlert(error?.response?.data?.message || "Error fetching videos");
      }
    };

    const fetchAllShorts = async () => {
      try {
        const result = await axios.get('http://localhost:8000/api/v1/short/getAllShorts', { withCredentials: true });
        // ✅ FIX: only store the array
        dispatch(setAllShorts(result.data.shorts));
      } catch (error) {
        CustomAlert(error?.response?.data?.message || "Error fetching shorts");
      }
    };

    fetchAllVideos();
    fetchAllShorts();
  }, [dispatch]); // ✅ Added dependency
};

export default useGetContent;
