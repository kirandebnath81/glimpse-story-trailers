import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--secondary-background-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 75px;
  @media screen and (max-width: 950px) {
    height: 100vh;
    padding-top: 0px;
  }
`;

export const Box = styled.div`
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px auto 50px;
  width: 460px;
  padding: 40px 50px;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  .auth__user-input {
    margin-bottom: 20px;
    label {
      display: block;
      margin-bottom: 5px;
      font-size: 15px;
      font-weight: 500;
    }
  }
  .auth__title {
    text-align: center;
    margin-bottom: 40px;
  }
  .auth__btn {
    width: 100%;
    margin-bottom: 25px;
    border-radius: 0px;
    padding: 8px 0px;
  }
  .auth__reset-password {
    margin-top: 10px;
  }

  .auth__link {
    color: var(--btn-color);
    font-weight: 500;
    cursor: pointer;
    margin-left: 5px;
  }
  @media only screen and (min-width: 601px) and (max-width: 950px) {
    margin: 0px;
    width: 500px;
    padding: 80px 60px;
  }
  @media only screen and (max-width: 600px) {
    margin: 0px;
    width: 340px;
    padding: 50px 30px;
  }
`;

export const InputContainer = styled.div`
  border: 1px solid #000;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    background-color: var(--secondary-background-color);
    color: var(--text-color);
    user-select: none;
    outline: none;
    border: none;
    text-indent: 10px;
    font-weight: 500;
    flex: 1;
    height: 36px;

    &::placeholder {
      color: var(--secondary-text-color);
    }
  }
  div {
    flex-basis: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: var(--secondary-background-color);
    .auth__icon {
      cursor: pointer;
      font-size: 1.1rem;
    }
  }
`;
