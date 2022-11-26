//styles
import { Container } from "./Home.styles";
import { StyledButton } from "../../styles/Main.styles";

//router
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="home__title">Glimpse Story</div>
      <div className="home__info">
        Glimpse Story is a one stop solution for watching all kinds of movie
        trailers, across your devices.
      </div>
      <StyledButton onClick={() => navigate("/videos")}>Explore</StyledButton>
    </Container>
  );
};

export default Home;
