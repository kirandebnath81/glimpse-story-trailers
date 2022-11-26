import React from "react";

//icons
import { HiDotsVertical } from "react-icons/hi";
import { MdPlaylistAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

//styles
import { PlaylistContainer, Gradient, Card } from "./SinglePlaylist.styles";
import { Menu } from "../DropdownMenu/DropdownMenu.styles";

//component
import DisplayVideos from "../DisplayVideos/DisplayVideos";

//redux
import { useDispatch } from "react-redux";
import {
  toggleDropdownMenu,
  togglePlylists,
  openModal,
  setDeleteListName,
} from "../../features";

//hook
import useClickOutside from "../../custom-hooks/OutsideClickHandlerHook";

//img base url
const imgBaseUrl = `https://image.tmdb.org/t/p/original`;

const SinglePlaylist = ({
  videos,
  isDropdown,
  isListOpen,
  title,
  id,
  handleFilter,
}) => {
  const dispatch = useDispatch();

  //custom-hook
  const nodeRef = useClickOutside(() => {
    dispatch(toggleDropdownMenu({ type: "playlists", id: "" }));
  });

  //opening dropdown menu
  const dropdownHandler = (id) => {
    dispatch(toggleDropdownMenu({ type: "playlists", id }));
  };

  //deleting single playlist
  const deleteHandler = (title, id) => {
    dispatch(openModal("delete"));
    dispatch(setDeleteListName(title));
    dispatch(toggleDropdownMenu({ type: "playlists", id }));
    handleFilter();
  };

  return (
    <div>
      {isListOpen ? (
        <PlaylistContainer key={id}>
          <div className="playlists__text">
            <div className="playlists__title-text">
              <span>
                {title.slice(0, 1).toUpperCase() +
                  title.slice(1, title.length).toLowerCase()}
              </span>
              <span> Playlist</span>
            </div>
            <div className="playlists__subtitle-text">
              There are total {videos?.length}
              {videos?.length === 1 ? " video" : " videos"}
            </div>
          </div>

          <DisplayVideos videos={videos} type="playlistVideo" title={title} />
        </PlaylistContainer>
      ) : (
        <Card key={id}>
          <div
            onClick={() => dispatch(togglePlylists({ id }))}
            className="playlists__img-container"
          >
            {}
            <img
              src={imgBaseUrl + videos[0]?.backdrop_path}
              alt={videos[0]?.title}
            />
            <Gradient>
              <div>{videos?.length}</div>
              <MdPlaylistAdd />
            </Gradient>
          </div>

          <div className="playlists__details-one">
            <div className="playlists__title">{title.toUpperCase()}</div>

            <Menu>
              {!isDropdown ? (
                <div
                  onClick={() => dropdownHandler(id)}
                  className="menu__menu-icon"
                >
                  <HiDotsVertical />
                </div>
              ) : (
                <div ref={nodeRef}>
                  <div
                    onClick={() => dropdownHandler(id)}
                    className="menu__menu-icon"
                  >
                    <HiDotsVertical />
                  </div>
                  <div className="menu__container">
                    <div
                      style={{ color: "red" }}
                      onClick={() => deleteHandler(title, id)}
                      className="menu__dropdown-item"
                    >
                      <AiOutlineDelete className="menu__dropdown-icon" />
                      <span>CLEAR {title.toUpperCase()} </span>
                    </div>
                  </div>
                </div>
              )}
            </Menu>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SinglePlaylist;
