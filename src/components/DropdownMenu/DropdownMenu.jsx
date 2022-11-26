// icons
import {
  MdOutlineShare,
  MdPlaylistAdd,
  MdOutlineWatchLater,
} from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";

// copy to clipboard
import copy from "copy-to-clipboard";

//toast
import { toast } from "react-toastify";

//styles
import { Menu } from "./DropdownMenu.styles";

//utils
import { deleteData, deleteDataList, addWatchLater } from "../../utils";

//custom-hook
import useClickOutside from "../../custom-hooks/OutsideClickHandlerHook";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  setSelectedVideo,
  updateVideo,
  toggleDropdownMenu,
} from "../../features";

//router
import { useNavigate } from "react-router-dom";

const DropdownMenu = ({ video, type, title, date }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { watchLater, likedVideos, historyVideos, selectedVideo, playlists } =
    useSelector((state) => state.videosData);
  const { user } = useSelector((state) => state.auth);

  //custom-hook
  const nodeRef = useClickOutside(() => {
    dispatch(toggleDropdownMenu({ type, id: video.id }));
  });

  //opening dropdown
  const dropdownHandler = () => {
    dispatch(toggleDropdownMenu({ type, id: video.id }));
    dispatch(setSelectedVideo(video));
  };

  //opening modal for saving
  const saveHandler = (video) => {
    //close dropdown
    dispatch(toggleDropdownMenu({ type, id: video.id }));

    if (user) {
      dispatch(openModal("add"));
      dispatch(setSelectedVideo(video));
    } else {
      navigate("/login");
    }
  };

  //save watch later video in the firebase db
  const watchHandler = (video) => {
    dispatch(toggleDropdownMenu({ type, id: video.id }));

    if (user) {
      const newVideo = {
        ...video,
        playlists: { ...video.playlists, watchLater: true },
      };
      dispatch(updateVideo(newVideo));
      addWatchLater(watchLater, video, user);
    } else {
      navigate("/login");
    }
  };

  //Delete Video
  //We need to delete a video from two places :
  // 1.From the specific list where it is stored in database
  // 2.From the updated lists (each video gets updated when added to any specific list so that the change gets reflected to all the places where the video exists)

  const deleteHandler = () => {
    console.log(type);
    dispatch(toggleDropdownMenu({ type, id: video.id }));
    //getting the playlist name from  playlist title
    const name = title?.split(" ").join("").toLowerCase();

    if (type === "liked") {
      //updating list
      dispatch(updateVideo({ ...selectedVideo, isLiked: false }));

      //delete from db
      deleteData(likedVideos, selectedVideo, user, "likedVideos");
    } else if (type === "watchLater") {
      dispatch(
        updateVideo({
          ...selectedVideo,
          playlists: { ...selectedVideo.playlists, watchLater: false },
        })
      );
      deleteData(watchLater, selectedVideo, user, "watchLater");
    } else if (type === "playlistVideo") {
      dispatch(
        updateVideo({
          ...selectedVideo,
          playlists: { ...selectedVideo.playlists, [name]: false },
        })
      );

      deleteDataList(playlists, selectedVideo, user, title, "playlists");
    } else {
      deleteDataList(historyVideos, selectedVideo, user, date, "historyVideos");
    }
  };

  //share video
  const shareHandler = (id) => {
    copy(`https://glimpse-story.netlify.app/video/${id}`);
    toast.info("Link copied to clipboard", { theme: "colored" });
    dispatch(toggleDropdownMenu({ type, id }));
  };

  return (
    <Menu>
      {video.isDropdown ? (
        <div ref={nodeRef}>
          <div className="menu__menu-icon" onClick={dropdownHandler}>
            <HiDotsVertical />
          </div>
          <div className="menu__container">
            {type !== "mainPage" && type !== "similar" && type !== "search" && (
              <div
                className="menu__dropdown-item"
                style={{ color: "red" }}
                onClick={deleteHandler}
              >
                <AiOutlineDelete className="menu__dropdown-icon" />
                <span>Remove from {title ? `playlist` : `${type} videos`}</span>
              </div>
            )}

            <div>
              {type !== "watchLater" && (
                <div
                  className="menu__dropdown-item"
                  onClick={() => watchHandler(video)}
                >
                  <MdOutlineWatchLater className="menu__dropdown-icon" />
                  <span> Save to watch later</span>
                </div>
              )}
            </div>

            <div
              className="menu__dropdown-item"
              onClick={() => saveHandler(video)}
            >
              <MdPlaylistAdd className="menu__dropdown-icon" />
              <span> Save to playlist</span>
            </div>

            <div
              className="menu__dropdown-item"
              onClick={() => shareHandler(video.id)}
            >
              <MdOutlineShare className="menu__dropdown-icon" />
              <span> Share</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="menu__menu-icon" onClick={dropdownHandler}>
          <HiDotsVertical />
        </div>
      )}
    </Menu>
  );
};

export default DropdownMenu;
