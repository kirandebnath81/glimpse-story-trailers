import React from "react";

//styles
import { Container, StyledModal } from "./Modal.styles";

//redux
import { useSelector, useDispatch } from "react-redux";
import { closeModal, updateVideosList } from "../../features";

//hook
import useClickOutside from "../../custom-hooks/OutsideClickHandlerHook";

//utils
import { deleteAll, deletePlaylistNames } from "../../utils";

const DeleteModal = () => {
  const dispatch = useDispatch();

  const { profile, user } = useSelector((state) => state.auth);

  const { deleteListName, playlists, likedVideos, playlistNames, watchLater } =
    useSelector((state) => state.videosData);

  //custom-hook
  const nodeRef = useClickOutside(() => {
    dispatch(closeModal());
  });

  //Delete Video lists
  //We need to delete the videos list from two places :
  // 1.From the specific list stored in database
  // 2.From the updated lists (each video gets updated when added to any specific list so that the change gets reflected to all the places where the video exists)

  const deleteHandler = () => {
    if (deleteListName === "likedVideos") {
      dispatch(updateVideosList({ deleteListName, videos: likedVideos }));
      deleteAll(user, deleteListName);
    } else if (deleteListName === "watchLater") {
      dispatch(updateVideosList({ deleteListName, videos: watchLater }));
      deleteAll(user, deleteListName);
    } else if (deleteListName === "historyVideos") {
      deleteAll(user, deleteListName);
    } else if (deleteListName === "playlists") {
      //deleting all the playlists
      const allVideos = [];
      playlists.forEach((list) => {
        list.videos?.forEach((video) => {
          allVideos.push(video);
        });
      });

      //deleting from updated lists
      dispatch(updateVideosList({ deleteListName, videos: allVideos }));

      //deleting the list from db
      deleteAll(user, deleteListName);

      //deleting the list name
      deletePlaylistNames(playlistNames, "all", user);
    } else {
      //deleting single playlist videos
      let allVideos = [];
      playlists.forEach((list) => {
        if (list.title === deleteListName) {
          allVideos = list.videos;
        }
      });

      dispatch(updateVideosList({ deleteListName, videos: allVideos }));
      deleteAll(user, deleteListName, playlists);
      deletePlaylistNames(playlistNames, deleteListName, user);
    }

    dispatch(closeModal());
  };

  return (
    <Container>
      <StyledModal ref={nodeRef}>
        <div className="modal__text">
          <div className="modal__title">
            CLEAR {deleteListName.toUpperCase()} ?
          </div>
          <div className="modal__user-details">
            {profile?.name} ({profile?.email})
          </div>
          <p>
            Your Glimpse Story {deleteListName.toUpperCase()}{" "}
            {deleteListName !== "playlists" && "list"} will be cleared forever ,
            do you want to do it ?
          </p>
        </div>
        <hr />
        <div className="modal__btns">
          <div
            className="modal__cancel-modal"
            onClick={() => dispatch(closeModal())}
          >
            CANCEL
          </div>
          <div className="modal__clear-videos" onClick={deleteHandler}>
            CLEAR
          </div>
        </div>
      </StyledModal>
    </Container>
  );
};

export default DeleteModal;
