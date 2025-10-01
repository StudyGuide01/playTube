// slice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    refresh: false,   // <- refresh flag
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    refreshCurrentUser: (state) => {
      state.refresh = !state.refresh; // toggle refresh flag
    }
  }
});

export const { setCurrentUser, refreshCurrentUser } = userSlice.actions;
export default userSlice.reducer;
