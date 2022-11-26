import { configureStore } from "@reduxjs/toolkit";

//reducers
import videolistReducer from "./features/videolist/videolistSlice";
import videosInfoReducer from "./features/videosInfo/videosInfoSlice";
import modalReducer from "./features/modal/modalSlice";
import authSlice from "./features/auth/authSlice";
import themeReducer from "./features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    videosInfo: videosInfoReducer,
    videosData: videolistReducer,
    modal: modalReducer,
    auth: authSlice,
    theme: themeReducer,
  },
});
