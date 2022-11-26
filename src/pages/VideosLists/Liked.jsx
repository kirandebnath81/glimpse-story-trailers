import React from "react";

//icon
import { AiOutlineDelete } from "react-icons/ai";

//img
import like from "../../assets/like.svg";

//styles
import {
  MainContainer,
  StyledButton,
  SubContainer,
} from "../../styles/Main.styles";
import { DeleteBtn, StyledHeader } from "./styles/VideosList.styles";

//component
import { DisplayVideos } from "../../components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { openModal, setDeleteListName } from "../../features";

//router
import { useNavigate } from "react-router-dom";

const Liked = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { likedVideos } = useSelector((state) => state.videosData);

  //open modal for deleting the list , also setting the deleted list name
  const deleteHandler = () => {
    dispatch(openModal("delete"));
    dispatch(setDeleteListName("likedVideos"));
  };

  return (
    <MainContainer>
      {likedVideos.length === 0 ? (
        <SubContainer>
          <img src={like} alt="like" />
          <h2>Looks like, you haven't Liked any videos yet.</h2>
          <StyledButton onClick={() => navigate("/videos")}>
            Explore
          </StyledButton>
        </SubContainer>
      ) : (
        <>
          <StyledHeader>
            <div className="videoslist__header-left">
              <div className="videoslist__title-text">Liked Videos</div>
              <div className="videoslist__subtitle-text">
                Total {likedVideos?.length} liked
                {likedVideos?.length === 1 ? " video" : " videos"}
              </div>
            </div>

            <div className="videoslist__header-right">
              <DeleteBtn onClick={deleteHandler}>
                <AiOutlineDelete className="videoslist__delete-icon" />
                CLEAR ALL LIKED VIDEOS
              </DeleteBtn>
            </div>
          </StyledHeader>
          {/* component for displaying the videos */}
          <DisplayVideos
            videos={likedVideos}
            type="liked"
            // title="Liked videos"
          />
        </>
      )}
    </MainContainer>
  );
};

export default Liked;
