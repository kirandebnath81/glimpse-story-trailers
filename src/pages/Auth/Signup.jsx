import { useEffect, useState } from "react";

//icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

//toast
import { toast } from "react-toastify";

//styles
import { Container, Box, InputContainer } from "./styles/Login.styles";
import { StyledButton } from "../../styles/Main.styles";

//router
import { Link, useNavigate } from "react-router-dom";

//firebase
import { auth, db } from "../../config/firebaseConfig";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

//redux
import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = userInput;

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  //writing profile data to firebase db
  useEffect(() => {
    if (user !== null) {
      (async function () {
        const profileRef = ref(db, `${user?.uid}/profile`);

        try {
          await set(profileRef, { name, email });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [user, name, email]);

  //get user input
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  //signup with firebase auth
  const signupHandler = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please Fill the fields", { theme: "colored" });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Opps! password has not matched", { theme: "colored" });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/videos");
    } catch (error) {
      toast.error(error.message, { theme: "colored" });
    }
  };

  return (
    <Container>
      <Box>
        <h1 className="auth__title">Signup</h1>

        <div className="auth__user-input">
          <label htmlFor="userName">Name</label>
          <InputContainer>
            <input
              type="text"
              name="name"
              id="userName"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => changeHandler(e)}
            />
          </InputContainer>
        </div>

        <div className="auth__user-input">
          <label htmlFor="userEmail">Email</label>
          <InputContainer>
            <input
              type="email"
              name="email"
              value={email}
              id="userEmail"
              placeholder="Enter a email"
              onChange={(e) => changeHandler(e)}
            />
          </InputContainer>
        </div>

        <div className="auth__user-input">
          <label htmlFor="userPassword">Password</label>
          <InputContainer>
            <input
              type={viewPassword ? "text" : "password"}
              name="password"
              value={password}
              id="userPassword"
              placeholder="Enter a password"
              className="input"
              onChange={(e) => changeHandler(e)}
            />

            <div>
              {viewPassword ? (
                <AiOutlineEye
                  className="auth__icon"
                  onClick={() => setViewPassword(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="auth__icon"
                  onClick={() => setViewPassword(true)}
                />
              )}
            </div>
          </InputContainer>
        </div>

        <div className="auth__user-input">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <InputContainer>
            <input
              type={viewConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              id="confirmPassword"
              placeholder="Confirm your password"
              className="input"
              onChange={(e) => changeHandler(e)}
            />
            <div>
              {viewConfirmPassword ? (
                <AiOutlineEye
                  className="icon"
                  onClick={() => setViewConfirmPassword(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="icon"
                  onClick={() => setViewConfirmPassword(true)}
                />
              )}
            </div>
          </InputContainer>
        </div>

        <StyledButton className="auth__btn" onClick={signupHandler}>
          Signup
        </StyledButton>
        <div>
          Already have an account ?
          <Link to={"/login"}>
            <span className="auth__link">Login</span>
          </Link>
        </div>
      </Box>
    </Container>
  );
};

export default Signup;
