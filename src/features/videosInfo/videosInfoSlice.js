import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreId: "",
  page: 1,
};

const videosInfoSlice = createSlice({
  name: "videosInfo",
  initialState,
  reducers: {
    selectGenre: (state, action) => {
      if (state.genreId === action.payload) {
        state.genreId = "";
      } else {
        state.genreId = action.payload;
      }
    },
    selectPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { selectGenre, selectPage } = videosInfoSlice.actions;
export default videosInfoSlice.reducer;
