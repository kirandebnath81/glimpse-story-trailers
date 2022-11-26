import React from "react";

import { AiOutlineDelete } from "react-icons/ai";

//img
import watchlater from "../../assets/watchLater.svg";

//styled components
import {
  StyledButton,
  MainContainer,
  SubContainer,
} from "../../styles/Main.styles";
import { DeleteBtn, StyledHeader } from "./styles/VideosList.styles";

//redux
import { useSelector, useDispatch } from "react-redux";
import { openModal, setDeleteListName } from "../../features";

//router
import { useNavigate } from "react-router-dom";

//component
import { DisplayVideos } from "../../components";
const WatchLater = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { watchLater } = useSelector((state) => state.videosData);

  //open modal for deleting
  const deleteHandler = () => {
    dispatch(openModal("delete"));
    dispatch(setDeleteListName("watchLater"));
  };

  return (
    <MainContainer>
      {watchLater.length === 0 ? (
        <SubContainer>
          <img src={watchlater} alt="watch Later" />

          <h2>You haven't added any videos to Watch Later .</h2>
          <StyledButton onClick={() => navigate("/videos")}>
            Explore
          </StyledButton>
        </SubContainer>
      ) : (
        <>
          <StyledHeader>
            <div className="videoslist__header-left">
              <div className="videoslist__title-text">Watch Later</div>
              <div className="videoslist__subtitle-text">
                Total {watchLater?.length} watch later
                {watchLater?.length === 1 ? " video" : " videos"}
              </div>
            </div>
            <div className="videoslist__header-right">
              <DeleteBtn onClick={deleteHandler}>
                <AiOutlineDelete className="videoslist__delete-icon" /> CLEAR
                ALL WATCH LATER{" "}
              </DeleteBtn>
            </div>
          </StyledHeader>
          {/* component for displaying videos */}
          <DisplayVideos
            videos={watchLater}
            type="watchLater"
            // title="WatchLater"
          />
        </>
      )}
    </MainContainer>
  );
};

export default WatchLater;
