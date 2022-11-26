import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 40px 90px 120px;
  background-color: var(--secondary-background-color);
  color: var(--text-color);
  position: relative;

  @media only screen and (max-width: 950px) {
    padding: 120px 10px 150px;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 330px;
    max-height: 250px;
    margin-bottom: 50px;
  }

  h2 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    text-align: center;
    line-height: 2rem;
  }

  @media only screen and (max-width: 600px) {
    margin: 70px 0px;
    h2 {
      font-size: 1rem;
      line-height: 1.7rem;
    }
  }
`;

export const StyledButton = styled.button`
  display: block;
  padding: 8px 20px;
  background-color: var(--btn-color);
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  font-family: "Montserrat";
  font-weight: 600;
  cursor: pointer;
  transition: 250ms background-color ease-in;
  border: none;
  &:hover {
    background-color: var(--btn-hover-color);
  }
`;
