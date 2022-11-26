import styled from "styled-components";

export const Box = styled.div`
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 50px auto;
  width: 450px;
  padding: 60px 40px;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: relative;
  .profile__title {
    margin-bottom: 30px;
    color: var(--btn-color);
  }
  .profile__user-details {
    margin-bottom: 40px;
    div {
      font-size: 1.2rem;
      word-spacing: 0.5px;
      font-weight: 500;
      margin-bottom: 15px;
    }
    span {
      font-weight: 600;
    }
  }
  .profile__logout-btn {
    position: absolute;
    right: 25px;
    bottom: 20px;
    background-color: red;
    color: white;

    &:hover {
      background-color: #e40606;
    }
  }
  @media screen and (max-width: 600px) {
    width: 90%;
    padding: 60px 30px;

    .profile__title {
      font-size: 1.4rem;
    }
    .profile__user-details {
      div {
        font-size: 15px;
      }
    }
    .profile__logout-btn {
      font-size: 14px;
    }
  }
`;
