import React, { useState } from "react";

//icons
import { IoMdAdd } from "react-icons/io";
import { VscChromeClose } from "react-icons/vsc";

//toast
import { toast } from "react-toastify";

//styles
import { StyledButton } from "../../styles/Main.styles";
import { Container, Box, StyledInput, PlaylistContainer } from "./Modal.styles";

//hook
import useClickOutside from "../../custom-hooks/OutsideClickHandlerHook";

//redux
import { useDispatch, useSelector } from "react-redux/es/exports";
import { closeModal, updateVideo } from "../../features";

//utils
import {
  deleteData,
  deleteDataList,
  addDataList,
  addWatchLater,
  addPlaylistNames,
} from "../../utils";
import { useEffect } from "react";

const AddModal = () => {
  const dispatch = useDispatch();

  const { selectedVideo, playlistNames, watchLater, playlists } = useSelector(
    (state) => state.videosData
  );

  const { user } = useSelector((state) => state.auth);

  //local state
  const [isCreatePlaylist, setIsCreatePlaylist] = useState(false);
  const [playlistInput, setPlaylistInput] = useState("");
  const [addedVideo, setAddedVideo] = useState(null);

  //custom-hook
  const nodeRef = useClickOutside(() => {
    dispatch(closeModal());
  });

  //adding all playlist names to the video playilists
  useEffect(() => {
    let playlists = { ...selectedVideo?.playlists };

    //getting the existed list names of the video so that we do not change them.
    let existedPlaylists = [];

    for (const n in selectedVideo.playlists) {
      existedPlaylists.push(n);
    }

    if (playlistNames.length !== 0) {
      playlistNames.forEach((listName) => {
        const name = listName.split(" ").join("")?.toLowerCase();

        if (existedPlaylists.every((list) => list !== name)) {
          playlists = { ...playlists, [name]: "" };
        }
      });
    }

    setAddedVideo({ ...selectedVideo, playlists });
  }, [playlistNames, selectedVideo]);

  //create playlist name
  const playlistHandler = (e) => {
    e.preventDefault();

    if (playlistInput === "") {
      toast.error("Please write the name");
      return;
    }

    //Checking whether the list name already exists or
    const isExists = playlistNames.find(
      (name) => name.toLowerCase() === playlistInput.toLowerCase()
    );

    if (isExists) {
      toast.warning("Playlist name already exists,");
      return;
    }
    addPlaylistNames(playlistNames, playlistInput, user);
    setPlaylistInput("");
  };

  //Add or remove video from playlist
  const changeHandler = (e, listTitle) => {
    const { name, checked } = e.target;

    const video = {
      ...addedVideo,
      playlists: { ...addedVideo.playlists, [name]: checked },
    };

    //local state
    setAddedVideo(video);

    //updating in update list
    dispatch(updateVideo(video));

    //watchlater
    if (name === "watchLater") {
      if (video.playlists[name]) {
        //Add to db
        addWatchLater(watchLater, video, user);
      } else {
        //remove from db
        deleteData(watchLater, video, user, "watchLater");
      }
    } else {
      //playlists
      if (video.playlists[name]) {
        //Add to db
        addDataList(playlists, video, user, listTitle, "playlists");
        toast.info(`Added to ${listTitle}`);
      } else {
        //remove from db
        deleteDataList(playlists, video, user, listTitle, "playlists");
        toast.info(`Removed from ${listTitle}`);
      }
    }
  };

  if (!addedVideo) {
    return;
  }

  return (
    <Container>
      <Box ref={nodeRef}>
        <div className="modal__title">
          <span> Save to ...</span>
          <div
            className="modal__close-icon"
            onClick={() => dispatch(closeModal())}
          >
            <VscChromeClose />
          </div>
        </div>

        <PlaylistContainer>
          <div className="modal__check-playlist">
            <input
              type="checkbox"
              id="watch"
              name="watchLater"
              checked={addedVideo?.playlists?.watchLater}
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="watch">Watch Later</label>
          </div>

          {playlistNames?.map((listTitle, i) => {
            const listName = listTitle.split(" ").join("").toLowerCase();

            return (
              <div key={i} className="modal__check-playlist">
                <input
                  type="checkbox"
                  id={listName}
                  name={listName}
                  checked={addedVideo?.playlists[listName]}
                  onChange={(e) => changeHandler(e, listTitle)}
                />
                <label htmlFor={listName}>{listTitle}</label>
              </div>
            );
          })}
        </PlaylistContainer>

        <div>
          {isCreatePlaylist ? (
            <form
              className="modal__playlistName-input"
              onSubmit={playlistHandler}
            >
              <StyledInput
                type="text"
                placeholder="Enter playlist name.."
                value={playlistInput}
                onChange={(e) => setPlaylistInput(e.target.value)}
              />
              <StyledButton
                className="modal__create-btn"
                onClick={playlistHandler}
              >
                Create
              </StyledButton>
            </form>
          ) : (
            <div
              className="modal__create-playlistName"
              onClick={() => setIsCreatePlaylist(true)}
            >
              <div className="modal__create-icon">
                <IoMdAdd />
              </div>

              <span>Create a playlist</span>
            </div>
          )}
        </div>
      </Box>
    </Container>
  );
};

export default AddModal;
