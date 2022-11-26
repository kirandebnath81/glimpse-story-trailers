import { ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { db } from "../config/firebaseConfig";

// Liked videos
export const addLikedVideo = async (videos, newVideo, activeUser) => {
  const addVideo = { ...newVideo, isDropdown: false };
  const databaseRef = ref(db, `${activeUser?.uid}/likedVideos`);
  try {
    await set(databaseRef, [addVideo, ...videos]);
  } catch (err) {
    console.log(err);
  }
};

// Watch later videos
export const addWatchLater = async (videos, newVideo, user) => {
  const newVideos = [...videos];
  const addVideo = { ...newVideo, isDropdown: false };

  if (videos.length > 0) {
    if (videos.every((video) => video.id !== newVideo.id)) {
      newVideos.unshift(addVideo);
      toast.info("Added to watch later");
    } else {
      toast.warning("Already added");
    }
  } else {
    newVideos.push(addVideo);
    toast.info("Added to watch later");
  }

  const databaseRef = ref(db, `${user?.uid}/watchLater`);

  try {
    await set(databaseRef, newVideos);
  } catch (err) {
    console.log(err);
  }
};

//Write playlist  and history data
export const addDataList = async (videosList, newVideo, user, title, type) => {
  let newVideosList = [...videosList];

  //checking whether the list is already exists or not
  const existedList = videosList.find((list) => list?.title === title);

  //checking whether the list already has the newVideo or not
  //If it has then we will not add the video again
  const existedVideo = existedList?.videos?.find(
    (video) => video.id === newVideo.id
  );

  //setting a new video
  const addNewVideo = {
    ...newVideo,
    isDropdown: false,
  };

  //setting a new list of videos
  let addNewList;

  if (type === "playlists") {
    addNewList = {
      title,
      videos: [addNewVideo],
      isDropdown: false,
      isListOpen: false,
      id: v4(),
    };
  } else {
    addNewList = {
      title,
      videos: [addNewVideo],
      id: v4(),
    };
  }

  if (videosList.length > 0) {
    if (existedList) {
      newVideosList = videosList?.map((list) =>
        list.title === title
          ? {
              ...list,
              videos: existedVideo
                ? list.videos
                : [addNewVideo, ...list.videos],
            }
          : list
      );
    } else {
      newVideosList.unshift(addNewList);
    }
  } else {
    newVideosList.push(addNewList);
  }

  const databaseRef = ref(db, `${user?.uid}/${type}`);

  try {
    await set(databaseRef, newVideosList);
  } catch (error) {
    console.log(error);
  }
};

//write playlistNames in the database
export const addPlaylistNames = async (names, newName, user) => {
  const databaseRef = ref(db, `${user.uid}/playlistNames`);

  try {
    set(databaseRef, [...names, newName]);
  } catch (err) {
    console.log(err);
  }
};
