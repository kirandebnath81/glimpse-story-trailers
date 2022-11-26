import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { email: "", uid: "" },
  profile: { name: "", email: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setUser, setUserProfile } = authSlice.actions;
export default authSlice.reducer;
