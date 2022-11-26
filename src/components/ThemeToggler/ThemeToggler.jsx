//style
import styled from "styled-components";

//icons
import { BsSun } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../features";

const ThemeToggler = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.theme);

  const clickHandler = () => {
    if (theme === "light") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  };

  if (theme === "light") {
    return (
      <Box onClick={clickHandler}>
        <MdDarkMode />
      </Box>
    );
  } else {
    return (
      <Box onClick={clickHandler}>
        <BsSun />
      </Box>
    );
  }
};

export default ThemeToggler;

//style
const Box = styled.div`
  font-size: 2rem;
  display: flex;
  justify-items: center;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
  }
`;
