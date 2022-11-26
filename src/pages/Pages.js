import { lazy, Suspense } from "react";

//router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//redux
import { useSelector } from "react-redux";

//components
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { Spinner } from "../components";

//importing components dynamically
const Home = lazy(() => import("./Home/Home"));
const AllVideos = lazy(() => import("./AllVideos/AllVideos"));
const PlayVideo = lazy(() => import("./PlayVideo/PlayVideo"));
const SearchVideos = lazy(() => import("./SearchVideos/SearchVideos"));
const WatchLater = lazy(() => import("./VideosLists/WatchLater"));
const Liked = lazy(() => import("./VideosLists/Liked"));
const Playlists = lazy(() => import("./VideosLists/Playlists"));
const History = lazy(() => import("./VideosLists/History"));
const Login = lazy(() => import("./Auth/Login"));
const Signup = lazy(() => import("./Auth/Signup"));
const Profile = lazy(() => import("./Auth/Profile"));
const ErrorPage = lazy(() => import("./ErrorPage/ErrorPage"));

const Pages = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<AllVideos />} />
          <Route
            path="/watchlater"
            element={user ? <WatchLater /> : <Navigate to={"/login"} replace />}
          />
          <Route
            path="/liked"
            element={user ? <Liked /> : <Navigate to={"/login"} replace />}
          />
          <Route
            path="/playlists"
            element={user ? <Playlists /> : <Navigate to={"/login"} replace />}
          />
          <Route
            path="/history"
            element={user ? <History /> : <Navigate to={"/login"} replace />}
          />
          <Route path="/search/:searchInput" element={<SearchVideos />} />
          <Route path="/video/:id" element={<PlayVideo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to={"/404"} replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default Pages;
