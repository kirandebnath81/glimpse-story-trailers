import React from "react";

//icon
import { AiOutlineDelete } from "react-icons/ai";

//img
import history from "../../assets/history.svg";

//styles
import styled from "styled-components";
import {
  MainContainer,
  SubContainer,
  StyledButton,
} from "../../styles/Main.styles";
import { DeleteBtn, StyledHeader } from "./styles/VideosList.styles";

//util
import { getVideosDate } from "../../utils";

//component
import { DisplayVideos } from "../../components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { openModal, setDeleteListName } from "../../features";

//router
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { historyVideos } = useSelector((state) => state.videosData);

  //open modal for deleting the list , also setting the deleted list name
  const deleteHandler = () => {
    dispatch(openModal("delete"));
    dispatch(setDeleteListName("historyVideos"));
  };

  return (
    <MainContainer>
      {historyVideos.length === 0 ? (
        <SubContainer>
          <img src={history} alt="history" />
          <h2>Looks like, you haven't watched any videos yet.</h2>
          <StyledButton onClick={() => navigate("/videos")}>
            Explore
          </StyledButton>
        </SubContainer>
      ) : (
        <Box>
          <StyledHeader className="videoslist__header">
            <div className="videoslist__header-left">
              <div className="videoslist__title-text">Watch History</div>
            </div>

            <div className="videoslist__header-right">
              <DeleteBtn onClick={deleteHandler}>
                <AiOutlineDelete className="videoslist__delete-icon" /> CLEAR
                ALL WATCH HISTORY
              </DeleteBtn>
            </div>
          </StyledHeader>

          {historyVideos.map(({ videos, id, title }) => (
            <div key={id}>
              <hr />
              <div className="date-title">{getVideosDate(title)}</div>
              <DisplayVideos videos={videos} type="history" date={title} />
            </div>
          ))}
          <hr />
        </Box>
      )}
    </MainContainer>
  );
};

export default History;

const Box = styled.div`
  .date-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 20px 0px;
  }
`;
