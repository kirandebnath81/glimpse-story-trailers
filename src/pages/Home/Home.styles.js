import styled from "styled-components";

//img
import backgroundImg from "../../assets/background.jpg";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.4)
    ),
    url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #ffffff;
  padding: 0px 50px;

  .home__title {
    font-size: clamp(2.2rem, 3vw, 2.7rem);
    font-weight: bold;
    margin-bottom: 10px;
    font-family: "Playfair Display", serif;
  }

  .home__info {
    text-align: center;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.8rem;
    letter-spacing: 1px;
    margin-bottom: 2.5rem;
  }

  @media only screen and (max-width: 600px) {
    padding: 0px 15px;
    .home__info {
      line-height: 1.4rem;
    }
  }
`;
