import styled from "styled-components";

export const Container = styled.div`
  width: 75px;
  height: 100%;
  position: fixed;
  left: 0px;
  z-index: 6;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  color: var(--text-color);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  margin-top: 75px;

  @media only screen and (max-width: 950px) {
    margin: 0px;
    width: 100%;
    height: 70px;
    bottom: 0px;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    a {
      flex-basis: 20%;
    }
  }
`;
