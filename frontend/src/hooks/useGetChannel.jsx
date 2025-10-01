import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setChannel } from '../redux/channelSlice';


const useGetChannel = () => {
const dispatch = useDispatch();
    useEffect(()=>{
        const fetchChannel = async()=>{
            try {
                const response = await axios.get('http://localhost:8000/api/v1/channel/getChannel',{withCredentials:true});
                dispatch(setChannel(response.data.channel));
            } catch (error) {
                console.log('While fetch current user in redux',error);
                dispatch(setChannel(null));
            }
        }
        fetchChannel();
    },[]);
}

export default useGetChannel
