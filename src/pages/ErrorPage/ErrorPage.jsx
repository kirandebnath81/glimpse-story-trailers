//img
import errorImg from "../../assets/errorPage.svg";

//styles
import { Container } from "./ErrorPage.styles";
import { StyledButton } from "../../styles/Main.styles";

//router
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="error__img">
        <img src={errorImg} alt="pageNotFound" />
      </div>
      <div className="error__text">
        <h1>We have looked everywhere</h1>
        <div>Looks like the page is missing</div>
        <StyledButton onClick={() => navigate("/")}>
          Go to home page
        </StyledButton>
      </div>
    </Container>
  );
};

export default ErrorPage;
