import { useState } from "react";

import { v4 } from "uuid";

import FlipMove from "react-flip-move";

//styled components
import { Container, Card, Button, StyledLogo } from "./VideoComments.styles";
import { StyledInput } from "../Modal/Modal.styles";

//redux
import { useSelector, useDispatch } from "react-redux";
import { updateVideo } from "../../features";

const VideoComments = ({ video }) => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.auth);
  const [showBtns, setShowBtns] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  //cancel comment
  const cancelHandler = () => {
    setShowBtns(false);
    setCommentInput("");
  };

  //submit comment
  const submitHandler = () => {
    if (!commentInput) {
      return;
    }

    const newComments = [
      {
        user: profile.name,
        comment: commentInput,
        id: v4(),
      },
      ...video.comments,
    ];

    dispatch(
      updateVideo({
        ...video,
        comments: newComments,
      })
    );

    setShowBtns(false);
    setCommentInput("");
  };

  const btnStyles = {
    backgroundColor: commentInput ? "var(--btn-color)" : "",
    color: commentInput ? "white" : "",
  };

  return (
    <Container>
      {!user ? (
        <p>Comments are turned off. Login to see the comments.</p>
      ) : (
        <>
          <div className="comment__heading">
            {video?.comments?.length} Comments
          </div>
          <div className="comment__add">
            <StyledLogo>{profile.name?.slice(0, 1).toUpperCase()}</StyledLogo>
            <div className="comment__input-container">
              <StyledInput
                type="text"
                placeholder="Add your comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onFocus={() => setShowBtns(true)}
              />

              <div>
                {showBtns && (
                  <div className="comment__btns">
                    <Button
                      onClick={cancelHandler}
                      className="comment__btn comment__btn--cancel-btn"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="comment__btn comment__btn--submit-btn"
                      style={btnStyles}
                      onClick={submitHandler}
                    >
                      Submit
                    </Button>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
          <FlipMove enterAnimation="fade">
            {video?.comments?.map(({ user, comment, id }) => (
              <Card key={id}>
                <StyledLogo>{user.slice(0, 1).toUpperCase()}</StyledLogo>
                <div className="comment__details">
                  <div className="comment__user-name">{user}</div>
                  <div className="comment__user-comment">{comment}</div>
                </div>
              </Card>
            ))}
          </FlipMove>
        </>
      )}
    </Container>
  );
};

export default VideoComments;
