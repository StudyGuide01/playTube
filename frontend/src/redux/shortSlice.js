import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showCustomAlert } from "../components/commen/CustomAlert";
// import { useDispatch, useSelector } from "react-redux";
import { setAllShorts } from "./contentSlice";
import { setChannel } from "./channelSlice";

// const dispatch = useDispatch();
// const {channel} = useSelector((store)=>store.channel);
// const {allShorts} = useSelector((store)=>store.content);

export const uploadShort = createAsyncThunk('shorts/uploadShorts',async(formData,{rejectWithValue,dispatch,getState})=>{
try {
     const res = await axios.post(
        'http://localhost:8000/api/v1/short/create-short',
        formData,
        { withCredentials: true }
      );
      showCustomAlert(res.data?.message || 'short upload successfully');

      //  Access current Redux state safely
      const { channel } = getState().channel;
      const { allShorts } = getState().content;

      //  Update Redux states
      dispatch(setAllShorts([...allShorts, res.data]));

      const updatedChannel = {
        ...channel,
        shorts: [...(channel.shorts || []), res.data],
      };
      dispatch(setChannel(updatedChannel));
      return res.data;
} catch (error) {
    showCustomAlert('Upload failed: ' + error.message);
      return rejectWithValue(error.response?.data || error.message);
}
})


const shortSlice = createSlice({
  name: 'Short',
  initialState: { loading: false, shorts: [], message: null },
  reducers: {
    clearMessage: (state) => {   //  4 second baad ye dispatch hoga
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadShort.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadShort.fulfilled, (state, action) => {
        state.loading = false;
        state.shorts.push(action.payload.data);
        state.message = action.payload.message || "Short uploaded successfully!";
      })
      .addCase(uploadShort.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Upload failed!";
      });
  }
});

export const { clearMessage } = shortSlice.actions;
export default shortSlice.reducer;

