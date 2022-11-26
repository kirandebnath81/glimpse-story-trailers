import styled from "styled-components";

export const StyledForm = styled.form`
  flex: 1;
  height: 35px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search__icon {
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: var(--hover-background-color);
  }
  .search__icon--cross {
    height: 100%;
    flex-basis: 7%;
    min-width: 25px;
    display: flex;
    justify-content: flex-start;
    font-weight: 500;
    font-size: clamp(1.2rem, 2vw, 1.3rem);
    background-color: var(--secondary-background-color);
  }
  .search__icon--search {
    flex-basis: 10%;
    min-width: 35px;
    height: 100%;
    font-size: clamp(1.3rem, 2vw, 1.4rem);
    border-left: 1px solid black;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);
    color: var(--text-color);
  }

  @media screen and (max-width: 600px) {
    height: 30px;
  }
`;

export const StyledInput = styled.input`
  flex: 1;
  height: 100%;
  text-indent: 15px;
  border: none;
  user-select: none;
  outline: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: clamp(15.5px, 2vw, 1.05rem);
  background-color: var(--secondary-background-color);
  color: var(--text-color);
`;
