//icons
import { RiChatHistoryFill } from "react-icons/ri";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineLike,
  AiFillLike,
} from "react-icons/ai";

import {
  MdOutlineWatchLater,
  MdFeaturedPlayList,
  MdWatchLater,
  MdPlaylistAdd,
  MdOutlineHistory,
} from "react-icons/md";

//styles
import { Container } from "./styles/Sidebar.styles";

//component
import { CustomNavLink } from "../components";

//router
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const conditionedStyle = () => {
    const { pathname } = location;
    if (
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/profile" ||
      pathname === "/404"
    ) {
      return { display: "none" };
    }
  };

  return (
    <Container style={conditionedStyle()}>
      <CustomNavLink
        to="/videos"
        activeIcon=<AiFillHome />
        inActiveIcon=<AiOutlineHome />
        name="Home"
      />
      <CustomNavLink
        to="/playlists"
        activeIcon=<MdFeaturedPlayList />
        inActiveIcon=<MdPlaylistAdd />
        name="Playlist"
      />
      <CustomNavLink
        to="/watchlater"
        activeIcon=<MdWatchLater />
        inActiveIcon=<MdOutlineWatchLater />
        name="WatchLater"
      />
      <CustomNavLink
        to="/liked"
        activeIcon=<AiFillLike />
        inActiveIcon=<AiOutlineLike />
        name="Like"
      />
      <CustomNavLink
        to="/history"
        activeIcon=<RiChatHistoryFill />
        inActiveIcon=<MdOutlineHistory />
        name="History"
      />
    </Container>
  );
};

export default Sidebar;
