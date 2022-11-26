import { ref, set } from "firebase/database";
import { db } from "../config/firebaseConfig";

// delete liked and watch later videos
export const deleteData = async (videos, deleteVideo, user, type) => {
  const databaseRef = ref(db, `${user?.uid}/${type}`);
  const newVideos = videos.filter((video) => video.id !== deleteVideo.id);
  try {
    await set(databaseRef, newVideos);
  } catch (err) {
    console.log(err);
  }
};

//Delete playlist and history video
export const deleteDataList = async (
  allVideos,
  deleteVideo,
  user,
  title,
  type
) => {
  let newVideosList = [];

  const videolist = allVideos.find((list) => list.title === title);

  if (videolist?.videos?.length === 1) {
    newVideosList = allVideos.filter((list) => list.title !== title);
  } else {
    newVideosList = allVideos.map((list) =>
      list.title === title
        ? {
            ...list,
            videos: list.videos?.filter((video) => video.id !== deleteVideo.id),
          }
        : list
    );
  }

  const databaseRef = ref(db, `${user?.uid}/${type}`);

  try {
    await set(databaseRef, newVideosList);
  } catch (error) {
    console.log(error);
  }
};

//Delete complete list from the database
export const deleteAll = async (user, deleteListName, playlists) => {
  if (playlists) {
    //for deleting single playlists
    const newVideos = playlists.filter((list) => list.title !== deleteListName);

    const databaseRef = ref(db, `${user.uid}/playlists`);
    try {
      set(databaseRef, newVideos);
    } catch (err) {
      console.log(err);
    }
  } else {
    //for deleting entire lists
    const databaseRef = ref(db, `${user.uid}/${deleteListName}`);
    try {
      set(databaseRef, []);
    } catch (err) {
      console.log(err);
    }
  }
};

//delete playlistNames from the database
export const deletePlaylistNames = async (names, deleteName, user) => {
  const newNames = names.filter((name) => name !== deleteName);
  const databaseRef = ref(db, `${user.uid}/playlistNames`);

  try {
    if (deleteName === "all") {
      set(databaseRef, []);
    } else {
      set(databaseRef, newNames);
    }
  } catch (err) {
    console.log(err);
  }
};
