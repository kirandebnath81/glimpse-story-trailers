import { useState } from "react";

//toast
import { toast } from "react-toastify";

//icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

//styles
import { Container, Box, InputContainer } from "./styles/Login.styles";
import { StyledButton } from "../../styles/Main.styles";

//firebase
import { auth } from "../../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

//router
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  //login with firebase auth
  const loginHandler = async (type, email, password) => {
    if (!email || !password) {
      toast.error("Fill the fields", { theme: "colored" });
      return;
    }
    if (type === "test") {
      setEmail(email);
      setPassword(password);
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/videos");
    } catch (error) {
      toast.error(error.message, { theme: "colored" });
    }
  };

  return (
    <Container>
      <Box>
        <h1 className="auth__title">Login</h1>
        <div className="auth__user-input">
          <label htmlFor="email">Email</label>
          <InputContainer>
            <input
              type="text"
              name="email"
              value={email}
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
        </div>
        <div className="auth__user-input">
          <label htmlFor="password">Password</label>
          <InputContainer>
            <input
              type={viewPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="Enter your password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              {viewPassword ? (
                <AiOutlineEye
                  className="icon"
                  onClick={() => setViewPassword(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="icon"
                  onClick={() => setViewPassword(true)}
                />
              )}
            </div>
          </InputContainer>
        </div>

        <StyledButton
          className="auth__btn"
          onClick={() => loginHandler("normal", email, password)}
        >
          Login
        </StyledButton>
        <StyledButton
          className="auth__btn"
          onClick={() => loginHandler("test", "admin81@gmail.com", "5454545")}
        >
          Test Login
        </StyledButton>
        <div className="auth__signup">
          Don't have an account ?{" "}
          <Link to={"/signup"}>
            <span className="auth__link">Signup</span>
          </Link>
        </div>
      </Box>
    </Container>
  );
};

export default Login;
