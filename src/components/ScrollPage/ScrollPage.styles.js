import styled from "styled-components";

export const ScrollTopButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.7rem;
  position: fixed;
  right: 40px;
  color: white;
  background-color: var(--btn-color);
  transition: 250ms background-color ease-in,
    400ms bottom cubic-bezier(0.48, 0.34, 0.43, 1.37);

  &:hover {
    background-color: #635cee;
  }
  &:active {
    background-color: black;
  }

  @media only screen and (max-width: 600px) {
    width: 35px;
    height: 35px;
    font-size: 1.4rem;
    right: 25px;
  }
`;
