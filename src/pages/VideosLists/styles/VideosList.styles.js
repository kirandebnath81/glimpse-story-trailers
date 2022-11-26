import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 50px;
  font-weight: 600;
  .videoslist__header-left,
  .videoslist__header-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .videoslist__header-left {
    .videoslist__title-text {
      font-size: 1.45rem;
    }
    .videoslist__subtitle-text {
      font-size: 1rem;
      margin-top: 10px;
    }
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    .videoslist__header-left {
      .videoslist__title-text {
        font-size: 1.2rem;
      }
      .videoslist__subtitle-text {
        font-size: 15px;
      }
    }
    .videoslist__header-right {
      width: 100%;
      margin-top: 30px;
      align-items: flex-end;
    }
  }
`;

export const DeleteBtn = styled.div`
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  color: var(--secondary-text-color);
  transition: 200ms color ease-in;
  white-space: nowrap;
  .videoslist__delete-icon {
    font-size: 1.2rem;
    margin-right: 5px;
  }
  &:hover {
    color: red;
  }
  @media only screen and (max-width: 600px) {
    font-size: 14px;
    .videoslist__delete-icon {
      font-size: 1rem;
    }
  }
`;

export const StyledSelect = styled.select`
  padding: 5px 12px;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  margin-top: 20px;
  background-color: var(--background-color);
  color: var(--text-color);
  @media only screen and (max-width: 600px) {
    font-size: 14px;
    margin-top: 15px;
  }
`;
