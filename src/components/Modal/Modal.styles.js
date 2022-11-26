import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0px;
  z-index: 50;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;

export const Box = styled.div`
  width: 280px;
  background-color: var(--secondary-background-color);
  color: var(--text-color);
  border-radius: 5px;
  .modal__title {
    padding: 15px 15px 15px 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--text-color);
    font-weight: 500;
    font-size: 1.3rem;
    .modal__close-icon {
      cursor: pointer;
      font-size: 1.5rem;
      transition: 200ms transform ease-in-out;
      &:hover {
        transform: scale(110%);
      }
    }
  }

  .modal__create-playlistName {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    cursor: pointer;
    transition: 200ms transform ease-in-out;
    .modal__create-icon {
      font-size: 1.3rem;
      margin-right: 10px;
      font-weight: 600;
    }
    span {
      font-size: 1.1rem;
      font-weight: 500;
    }
    &:hover {
      .modal__create-icon {
        transform: scale(115%);
      }
    }
  }
  .modal__playlistName-input {
    height: 150px;
    padding: 20px;
    .modal__create-btn {
      width: 100%;
      padding: 5px 0px;
    }
  }
`;

export const PlaylistContainer = styled.div`
  width: 100%;
  padding: 10px 30px;
  border-bottom: 1px solid var(--text-color);
  font-weight: 600;
  font-size: 1.1rem;
  .modal__check-playlist {
    margin: 15px 0px;
    display: flex;
    align-items: center;
  }
  input {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  label {
    user-select: none;
    cursor: pointer;
  }
`;

export const StyledInput = styled.input`
  background-color: var(--secondary-background-color);
  color: var(--text-color);
  width: 100%;
  height: 30px;
  border: none;
  padding: 5px 0px;
  border-bottom: 1px solid var(--text-color);
  margin: 20px 0px;
  user-select: none;
  outline: none;
  transition: 150ms border ease-in;
  font-size: 1.1rem;
  text-indent: 5px;
  font-family: "Montserrat";
  font-weight: 500;
  &:focus {
    border-bottom: 2px solid var(--text-color);
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 30px;
  background-color: blue;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-family: "Montserrat";
  font-weight: 600;
`;

export const StyledModal = styled.div`
  background-color: var(--secondary-background-color);
  color: var(--text-color);
  width: 40%;
  border-radius: 5px;
  .modal__text {
    padding: 25px;
    .modal__title {
      font-weight: 500;
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
    .modal__user-details {
      font-weight: 600;
      margin-bottom: 15px;
      line-height: 1.5rem;
    }
    p {
      line-height: 1.2rem;
      font-size: 15px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
  }
  .modal__btns {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    color: var(--btn-color);
    div {
      font-weight: 500;
      cursor: pointer;
      font-size: 15px;
    }

    .modal__clear-videos {
      margin-left: 30px;
      word-spacing: 2px;
      font-size: 1rem;
      color: red;
      font-weight: 600;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 950px) {
    width: 65%;
  }
  @media screen and (max-width: 600px) {
    width: 90%;
    .modal__text {
      padding: 20px;
      .modal__title {
        font-size: 1.1rem;
      }
      .modal__user-details {
        font-size: 15px;
      }
      p {
        line-height: 1.1rem;
        font-size: 14px;
      }
    }
    .modal__btns {
      div {
        font-size: 15px;
      }
    }
  }
`;
