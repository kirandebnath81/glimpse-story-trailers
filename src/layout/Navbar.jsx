import React, { useState } from "react";

//logo img
import logo from "../assets/logo.png";

//icons
import { CgProfile } from "react-icons/cg";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

//styles
import {
  StyledNav,
  BoxOne,
  BoxTwo,
  StyledProfile,
  HeroLogo,
} from "./styles/Navbar.styles";
import { StyledButton } from "../styles/Main.styles";

//components
import { SearchInput, ThemeToggler } from "../components";

//custom-hook
import useClickOutside from "../custom-hooks/OutsideClickHandlerHook";

//router
import { Link, useNavigate, useLocation } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [isSearch, setIsSearch] = useState(false);

  const nodeRef = useClickOutside(() => {
    setIsSearch(false);
  });

  //logo
  const getLogo = () => {
    return (
      <>
        <img src={logo} alt="" />
        <span> Glimpse Story </span>
      </>
    );
  };

  //nav items
  const getNavItems = () => {
    return (
      <>
        <span className="nav__toggle-theme">
          <ThemeToggler />
        </span>

        <div className="nav__login">
          {user ? (
            <StyledProfile>
              <Link to={"/profile"}>
                <CgProfile />
              </Link>
            </StyledProfile>
          ) : (
            <StyledButton
              onClick={() => navigate("/login")}
              className="nav__login-btn"
            >
              Login
            </StyledButton>
          )}
        </div>
      </>
    );
  };

  //style
  const conditionedStyle = () => {
    if (location.pathname === "/404") {
      return { display: "none" };
    }
  };

  return (
    <StyledNav ref={nodeRef} style={conditionedStyle()}>
      <BoxOne>
        <HeroLogo onClick={() => navigate("/")}>{getLogo()}</HeroLogo>

        <SearchInput />
        <div className="nav__nav-items">{getNavItems()}</div>
      </BoxOne>

      <BoxTwo>
        {isSearch ? (
          <>
            <div
              className="nav__back-icon"
              onClick={() => setIsSearch(false)}
              data-info="Back"
            >
              <BiArrowBack />
            </div>
            <SearchInput />
          </>
        ) : (
          <>
            <HeroLogo onClick={() => navigate("/")}>{getLogo()}</HeroLogo>

            <div className="nav__nav-items">
              <div
                className="nav__search-icon"
                data-info="Search"
                onClick={() => setIsSearch(true)}
              >
                <AiOutlineSearch />
              </div>

              {getNavItems()}
            </div>
          </>
        )}
      </BoxTwo>
    </StyledNav>
  );
};

export default Navbar;
