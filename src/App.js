import { useEffect } from "react";
import "./App.css";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//lazy load css
import "react-lazy-load-image-component/src/effects/blur.css";

//components
import Pages from "./pages/Pages";
import { ScrollPage, Modal } from "./components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setUser, setUserProfile, getStoredData } from "./features";

//firebase
import { auth, db } from "./config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";

const App = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { isOpen, type } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.auth);
  const { updatedVideos } = useSelector((state) => state.videosData);

  //Collecting user data from firebase on state changed(login or logout)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ email: user.email, uid: user.uid }));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  //Reading all the data from firebase database
  useEffect(() => {
    if (user) {
      getData(user, "watchLater", dispatch);
      getData(user, "likedVideos", dispatch);
      getData(user, "playlists", dispatch);
      getData(user, "playlistNames", dispatch);
      getData(user, "historyVideos", dispatch);
      getData(user, "updatedVideos", dispatch);
      getProfileData(user, dispatch);
    }
  }, [user, dispatch]);

  const getData = (user, type, dispatch) => {
    const dbRef = ref(db, `${user.uid}/${type}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        dispatch(getStoredData({ data, type }));
      } else {
        dispatch(getStoredData({ data: [], type }));
      }
    });
  };

  //Reading profile data
  const getProfileData = (user, dispatch) => {
    const dbRef = ref(db, `${user.uid}/profile`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        dispatch(setUserProfile(data));
      }
    });
  };

  //Writing updatedVideos data in the firebase db
  useEffect(() => {
    if (updatedVideos?.length !== 0) {
      (async function () {
        const dbRef = ref(db, `${user?.uid}/updatedVideos`);
        try {
          await set(dbRef, updatedVideos);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [user, updatedVideos]);

  return (
    <div className="app" data-theme={theme}>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      {isOpen && <Modal modalType={type} />}
      <Pages />
      <ScrollPage />
    </div>
  );
};

export default App;
