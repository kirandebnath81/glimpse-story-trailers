import styled from "styled-components";

export const StyledNav = styled.nav`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 75px;
  z-index: 10;
  background-color: var(--background-color);
  padding: 0px 10px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 600px) {
    height: 60px;
  }
`;

export const StyledProfile = styled.div`
  svg {
    font-size: 2rem;
    cursor: pointer;
    @media screen and (min-width: 351px) and (max-width: 600px) {
      font-size: 1.55rem;
    }

    @media screen and (max-width: 350px) {
      font-size: 1.3rem;
    }
  }
`;

export const BoxOne = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav__nav-items {
    flex-basis: 32%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .nav__toggle-theme {
      margin-right: 30px;
    }
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const BoxTwo = styled.div`
  display: none;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .nav__back-icon {
      font-size: 1.5rem;
      height: 32px;
      width: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .nav__nav-items {
      flex-basis: 35%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .nav__search-icon {
        font-size: 1.3rem;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
      }
      .nav__login-btn {
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 4px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .nav__back-icon {
      font-size: 1.3rem;
      height: 30px;
      width: 30px;
    }
  }
`;

export const HeroLogo = styled.div`
  flex-basis: 35%;
  margin-right: 25px;
  display: flex;
  align-items: center;
  font-family: "Playfair Display", serif;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 1.5rem;
  white-space: nowrap;
  cursor: pointer;

  span {
    margin-left: 10px;
  }

  img {
    width: 30px;
  }

  @media screen and (min-width: 351px) and (max-width: 600px) {
    flex: 1;
    font-size: 20px;
    letter-spacing: 0px;
    margin-right: 0px;
    span {
      margin-left: 6px;
    }
    img {
      width: 26px;
    }
  }

  @media screen and (max-width: 350px) {
    flex: 1;
    font-size: 17px;
    letter-spacing: 0px;
    margin-right: 0px;
    span {
      margin-left: 5px;
    }
    img {
      width: 21px;
    }
  }
`;
