import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ pageType }) =>
    pageType === "similar" ? "column" : "row"};
  flex-wrap: wrap;
  align-items: ${({ pageType }) => pageType === "similar" && "center"};

  margin-top: ${({ pageType }) => (pageType === "mainPage" ? "50px" : "0px")};
  margin-bottom: 60px;

  @media only screen and (min-width: 601px) and (max-width: 950px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Card = styled.div`
  width: ${({ pageType }) => (pageType === "similar" ? "100%" : "257px")};
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    cursor: pointer;
    border-radius: 8px;
  }
  .video__blank-poster {
    width: 255px;
    height: 145px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 8px;
  }
  .video__details-one {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: 10px;
    .video__title {
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .video__details-two {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 13px;
    color: var(--secondary-text-color);
    margin-top: 7px;
    padding-right: 6px;
    .video__rating {
      color: var(--text-color);
      font-weight: 600;
    }
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin-bottom: 60px;
    .video__blank-poster {
      width: 100%;
      height: 190px;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 8px;
    }
    .video__details-two {
      margin-top: 5px;
    }
  }
  @media only screen and (min-width: 601px) and (max-width: 950px) {
    width: 48%;
  }
`;
