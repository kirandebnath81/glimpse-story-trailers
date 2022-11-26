import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allVideos: [],
  searchedVideos: [],
  similarVideos: [],
  playlistNames: [],
  selectedVideo: {},
  updatedVideos: [],
  watchLater: [],
  likedVideos: [],
  playlists: [],
  historyVideos: [],
  deleteListName: "",
};

const videolistSlice = createSlice({
  name: "videosData",
  initialState,
  reducers: {
    getStoredData: (state, { payload }) => {
      if (payload.type === "watchLater") {
        state.watchLater = payload.data;
      } else if (payload.type === "likedVideos") {
        state.likedVideos = payload.data;
      } else if (payload.type === "updatedVideos") {
        state.updatedVideos = payload.data;
      } else if (payload.type === "playlistNames") {
        state.playlistNames = payload.data;
      } else if (payload.type === "playlists") {
        state.playlists = payload.data;
      } else if (payload.type === "historyVideos") {
        state.historyVideos = payload.data;
      }
    },

    setAllVideos: (state, { payload }) => {
      if (payload.page > 1) {
        state.allVideos = [...state.allVideos, ...payload.data];
      } else {
        state.allVideos = payload.data;
      }
    },

    setSearchedVideos: (state, action) => {
      state.searchedVideos = action.payload;
    },

    setSimilarVideos: (state, action) => {
      state.similarVideos = action.payload;
    },

    setSelectedVideo: (state, { payload }) => {
      const video = state.updatedVideos.find(
        (video) => video.id === payload.id
      );

      if (video) {
        state.selectedVideo = video;
      } else {
        state.selectedVideo = {
          ...payload,
          playlists: { watchLater: "" },
        };
      }
    },

    //updating the videos in updated videos list
    updateVideo: (state, { payload }) => {
      state.selectedVideo = payload;

      state.updatedVideos = state.updatedVideos.filter(
        (video) => video.id !== payload.id
      );

      state.updatedVideos.push(payload);
    },

    //updating the list of videos in updated videos list
    updateVideosList: (state, { payload }) => {
      const { deleteListName, videos } = payload;

      const commonList = (list) => {
        videos?.forEach(({ id }) => {
          state.updatedVideos = state.updatedVideos.map((video) =>
            video.id === id
              ? {
                  ...video,
                  playlists: { ...video.playlists, [list]: false },
                }
              : video
          );
        });
      };

      if (deleteListName === "likedVideos") {
        videos?.forEach(({ id }) => {
          state.updatedVideos = state.updatedVideos.map((video) =>
            video.id === id ? { ...video, isLiked: false } : video
          );
        });
      } else if (deleteListName === "watchLater") {
        commonList("watchLater");
      } else if (deleteListName === "Playlists") {
        videos?.forEach(({ id }) => {
          state.updatedVideos = state.updatedVideos.map((video) =>
            video.id === id
              ? {
                  ...video,
                  playlists: { watchLater: video.playlists.watchLater },
                }
              : video
          );
        });
      } else {
        // for single playlists
        const list = deleteListName.split(" ")[0].toLowerCase();
        commonList(list);
      }
    },

    //delete playlists name
    setDeleteListName: (state, action) => {
      state.deleteListName = action.payload;
    },

    //opens or closes the menu of each video
    toggleDropdownMenu: (state, { payload }) => {
      //It's for general purpose
      const singleList = (videoList) => {
        const newList = videoList.map((video) =>
          video.id === payload.id
            ? { ...video, isDropdown: !video.isDropdown }
            : { ...video, isDropdown: false }
        );

        return newList;
      };
      //It's for videos which are inside a list
      const multipleList = (videoList) => {
        console.log(payload.id);
        const newList = videoList.map((list) => ({
          ...list,
          videos: list.videos.map((video) =>
            video.id === payload.id
              ? { ...video, isDropdown: !video.isDropdown }
              : { ...video, isDropdown: false }
          ),
        }));

        return newList;
      };

      if (payload.type === "mainPage") {
        state.allVideos = singleList(state.allVideos);
      } else if (payload.type === "liked") {
        state.likedVideos = singleList(state.likedVideos);
      } else if (payload.type === "playlists") {
        state.playlists = singleList(state.playlists);
      } else if (payload.type === "playlistVideo") {
        state.playlists = multipleList(state.playlists);
      } else if (payload.type === "watchLater") {
        state.watchLater = singleList(state.watchLater);
      } else if (payload.type === "history") {
        state.historyVideos = multipleList(state.historyVideos);
      } else if (payload.type === "search") {
        state.searchedVideos = singleList(state.searchedVideos);
      } else if (payload.type === "similar") {
        state.similarVideos = singleList(state.similarVideos);
      }
    },

    //opens or closes each playlist
    togglePlylists: (state, { payload }) => {
      if (payload.id === "") {
        state.playlists = state.playlists.map((list) => ({
          ...list,
          isListOpen: false,
        }));
      } else {
        state.playlists = state.playlists.map((list) =>
          list.id === payload.id
            ? { ...list, isListOpen: !list.isListOpen }
            : { ...list, isListOpen: false }
        );
      }
    },
  },
});

export const {
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
} = videolistSlice.actions;
export default videolistSlice.reducer;
