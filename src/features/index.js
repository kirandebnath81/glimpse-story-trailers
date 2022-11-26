export { setUser, setUserProfile } from "./auth/authSlice";
export { openModal, closeModal } from "./modal/modalSlice";
export { setTheme } from "./theme/themeSlice";
export {
  getStoredData,
  setAllVideos,
  setSearchedVideos,
  setSimilarVideos,
  setSelectedVideo,
  setPlaylistNames,
  updateVideo,
  updateVideosList,
  setDeleteListName,
  toggleDropdownMenu,
  togglePlylists,
} from "./videolist/videolistSlice";

export { selectGenre, selectPage } from "./videosInfo/videosInfoSlice";
