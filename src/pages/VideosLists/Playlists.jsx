import { useEffect, useState } from "react";

//img
import playlistImg from "../../assets/playlists.svg";

//icons
import { AiOutlineDelete } from "react-icons/ai";

//styles
import {
  StyledButton,
  MainContainer,
  SubContainer,
} from "../../styles/Main.styles";

import {
  DeleteBtn,
  StyledHeader,
  StyledSelect,
} from "./styles/VideosList.styles";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  openModal,
  setDeleteListName,
  toggleDropdownMenu,
  togglePlylists,
} from "../../features";

//router
import { useNavigate } from "react-router-dom";

//component
import { SinglePlaylist } from "../../components";

const Playlists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { playlists, playlistNames } = useSelector((state) => state.videosData);

  const [filterInput, setFilterInput] = useState("");

  //Closing all playlists
  useEffect(() => {
    dispatch(togglePlylists({ id: "" }));
  }, [filterInput, dispatch]);

  //deleting all playlists
  const deleteHandler = (title, id) => {
    dispatch(openModal("delete"));
    dispatch(setDeleteListName(title));
    dispatch(toggleDropdownMenu({ type: "playlists", id }));
  };

  //Displaying all playlists
  const filterHandler = () => {
    setFilterInput("");
  };

  //sorting all playlists
  const getSortedList = () => {
    const selectedList = playlists.find((list) => list.title === filterInput);

    if (selectedList) {
      return (
        <SinglePlaylist
          key={selectedList.id}
          {...selectedList}
          handleFilter={filterHandler}
        />
      );
    } else {
      return (
        <div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "1.2rem",
              marginBottom: "20px",
            }}
          >
            No videos exists in the playlist
          </div>
          <StyledButton onClick={() => navigate("/videos")}>
            Explore
          </StyledButton>
        </div>
      );
    }
  };

  return (
    <MainContainer>
      {playlists.length === 0 ? (
        <SubContainer>
          <img src={playlistImg} alt="playlistImg" />
          <h2>There are no videos in your playlists .</h2>
          <StyledButton onClick={() => navigate("/videos")}>
            Explore
          </StyledButton>
        </SubContainer>
      ) : (
        <div>
          <StyledHeader>
            <div className="videoslist__header-left">
              <div className="videoslist__title-text">Playlist Videos</div>
              <div className="videoslist__subtitle-text">
                You have total {playlistNames?.length}
                {playlistNames?.length === 1 ? " playlist" : " playlists"}
              </div>
            </div>

            <div className="videoslist__header-right">
              <DeleteBtn onClick={() => deleteHandler("playlists")}>
                <AiOutlineDelete className="videoslist__delete-icon" /> CLEAR
                ALL PLAYLIST
              </DeleteBtn>
              <div>
                {playlists.length !== 0 && (
                  <StyledSelect
                    value={filterInput}
                    onChange={(e) => setFilterInput(e.target.value)}
                  >
                    <option value="">PLAYLISTS</option>
                    {playlistNames?.map((name, i) => (
                      <option key={i} value={name}>
                        {name.toUpperCase()}
                      </option>
                    ))}
                  </StyledSelect>
                )}
              </div>
            </div>
          </StyledHeader>

          {/* displaying the playlists */}
          {filterInput === ""
            ? playlists.map((list) => (
                <SinglePlaylist
                  key={list.id}
                  {...list}
                  handleFilter={filterHandler}
                />
              ))
            : getSortedList()}
        </div>
      )}
    </MainContainer>
  );
};

export default Playlists;
