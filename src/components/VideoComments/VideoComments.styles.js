import styled from "styled-components";

export const Container = styled.div`
  .comment__heading {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 30px;
  }
  .comment__add {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
  }
  .comment__input-container {
    flex-basis: 91%;
  }

  .comment__btns {
    text-align: end;
    .comment__btn--cancel-btn {
      background-color: #f7f7f7;
      &:focus {
        background-color: #e0e0e0;
      }
    }
  }
  @media screen and (max-width: 950px) {
    .comment__heading {
      font-size: 1.05rem;
    }
    .comment__btn {
      font-size: 14px;
    }
    .comment__input-container {
      flex-basis: 85%;
    }
  }
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  .comment__details {
    margin-left: 20px;
    .comment__user-name {
      padding: 5px 0px;
      font-weight: bold;
    }
    .comment__user-comment {
      font-size: 15.6px;
      padding: 5px 0px;
      font-weight: 600;
      word-spacing: 0.5px;
    }

    @media screen and (max-width: 600px) {
      margin-left: 15px;
    }
  }
`;

export const StyledLogo = styled.div`
  width: 45px;
  height: 45px;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 50%;
  background-color: purple;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  @media screen and (max-width: 850px) {
    font-size: 15px;
    width: 35px;
    height: 35px;
  }
`;

export const Button = styled.button`
  padding: 8px 15px;
  border-radius: 5px;
  font-family: "Montserrat";
  margin-left: 10px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 300ms background-color cubic-bezier(0.18, 0.89, 0.32, 1.28);
`;
