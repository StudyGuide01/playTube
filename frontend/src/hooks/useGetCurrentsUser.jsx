import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../redux/userSlice';

const useGetCurrentsUser = () => {
const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCurrentUser = async()=>{
            try {
                const response = await axios.get('http://localhost:8000/api/v1/user/currentUser',{withCredentials:true});
                dispatch(setCurrentUser(response.data.user));
            } catch (error) {
                console.log('While fetch current user in redux',error);
                dispatch(setCurrentUser(null));
            }
        }
        fetchCurrentUser();
    },[]);
}

export default useGetCurrentsUser
