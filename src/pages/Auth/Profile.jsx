//styles
import { StyledButton } from "../../styles/Main.styles";
import { Box } from "./styles/Profile.styles";
import { Container } from "./styles/Login.styles";

//firebase
import { auth } from "../../config/firebaseConfig";
import { signOut } from "firebase/auth";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile, getStoredData } from "../../features";

//router
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.auth);

  //sign out
  const clickHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
      return;
    }

    navigate("/");

    //updating the global data once the user logged out
    dispatch(getStoredData({ type: "likedVideos", data: [] }));
    dispatch(getStoredData({ type: "watchLater", data: [] }));
    dispatch(getStoredData({ type: "playlistNames", data: [] }));
    dispatch(getStoredData({ type: "playlists", data: [] }));
    dispatch(getStoredData({ type: "historyVideos", data: [] }));
    dispatch(getStoredData({ type: "updatedVideos", data: [] }));
    dispatch(setUserProfile(null));
  };

  return (
    <Container>
      <Box>
        <h1 className="profile__title"> User Details</h1>
        <div className="profile__user-details">
          <div>
            Name : <span>{profile?.name}</span>
          </div>
          <div>
            Email : <span>{profile?.email}</span>
          </div>
        </div>
        <StyledButton className="profile__logout-btn" onClick={clickHandler}>
          Logout
        </StyledButton>
      </Box>
    </Container>
  );
};

export default Profile;
