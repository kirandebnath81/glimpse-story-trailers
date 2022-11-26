import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--background-color);
  color: var(--text-color);
  position: fixed;
  left: 75px;
  height: 70px;
  top: 75px;
  z-index: 8;
  width: 94%;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 1px 0px grey;
  padding: 0px 15px;
  .scrollbar__btn {
    height: 30px;
    font-size: 1.4rem;
    font-weight: bold;
    border: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    background-color: var(--background-color);
    color: var(--text-color);
  }
  .scrollbar__btn--prev-btn {
    width: 35px;
    display: flex;
    justify-content: flex-start;
  }
  .scrollbar__btn--next-btn {
    width: 35px;
    display: flex;
    justify-content: flex-end;
  }
  @media only screen and (min-width: 601px) and (max-width: 950px) {
    left: 0px;
    width: 100%;
  }
  @media only screen and (max-width: 600px) {
    left: 0px;
    width: 100%;
    top: 60px;
    padding: 0px 8px;
    .scrollbar__btn {
      height: 25px;
    }
  }
`;

export const GenreContainer = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .scrollbar__active-genre {
    background-color: var(--active-genre-background-color);
    color: var(--active-genre-text-color);
  }

  @media only screen and (max-width: 600px) {
    height: 25px;
  }
`;

export const Genre = styled.div`
  height: 100%;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-right: 20px;

  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  background-color: rgb(180, 180, 180);
  color: black;
  user-select: none;
  &:last-child {
    margin-right: 0px;
  }

  @media only screen and (max-width: 600px) {
    padding: 8px;
    font-size: 13px;
    border-radius: 6px;
  }
`;
