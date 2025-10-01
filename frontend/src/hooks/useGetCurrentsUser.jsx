import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '../redux/userSlice';

const useGetCurrentsUser = () => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/user/currentUser',
          { withCredentials: true }
        );
        dispatch(setCurrentUser(response.data.user));
      } catch (error) {
        console.log('While fetch current user in redux', error);
        dispatch(setCurrentUser(null));
      }
    };

    fetchCurrentUser();
  }, [dispatch, refresh]); 
};

export default useGetCurrentsUser;
