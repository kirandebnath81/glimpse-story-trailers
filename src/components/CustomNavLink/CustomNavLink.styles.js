import styled from "styled-components";

export const NavItem = styled.div`
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70px;
  margin-bottom: 20px;
  color: var(--text-color);
  transition: 300ms background-color ease-in-out, 350ms color ease-in-out;
  div {
    font-size: 11px;
    font-weight: 500;
    text-align: center;
  }
  .icon {
    font-size: 1.5rem;
  }

  :hover {
    background-color: var(--hover-background-color);
  }

  @media only screen and (max-width: 950px) {
    width: 100%;
    margin-bottom: 0px;
    div {
      font-size: 9px;
    }
    .icon {
      font-size: 1.4rem;
    }
  }
`;
