import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--secondary-background-color);
  color: var(--text-color);
  width: 100%;
  min-height: 100vh;
  padding: 110px 25px 110px 110px;
  display: flex;
  justify-content: center;
  @media only screen and (min-width: 601px) and (max-width: 950px) {
    flex-direction: column;
    margin-bottom: 50px;
    padding: 100px 25px;
  }
  @media only screen and (max-width: 600px) {
    flex-basis: 100%;
    flex-direction: column;
    padding: 100px 12px;
  }
`;

export const VideoContainer = styled.div`
  flex: 1;
  margin-right: 35px;
  .video {
    height: 440px;
    iframe {
      border-radius: 10px;
    }
  }
  .video__details {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .video__text {
      padding-right: 15px;
      flex: 1;
      .video__title {
        font-weight: bold;
        font-size: clamp(1.2rem, 2.5vw, 1.4rem);
        line-height: 1.8rem;
        margin-bottom: 10px;
      }
      .video__tagline {
        font-weight: 600;
        font-size: clamp(15px, 1.5vw, 1rem);
        margin-bottom: 10px;
      }
      .video__release-date {
        font-size: 13px;
        font-weight: 500;
      }
    }
  }
  hr {
    margin: 50px 0px;
  }
  @media only screen and (min-width: 601px) and (max-width: 950px) {
    margin-right: 0px;
    .video {
      height: 400px;
    }
    .video__details {
      flex-direction: column;
    }
  }
  @media only screen and (max-width: 600px) {
    margin-right: 0px;
    .video {
      height: 280px;
    }
    .video__details {
      flex-direction: column;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  .video__likes {
    font-weight: 500;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
  }

  .video__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    cursor: pointer;
    svg {
      font-weight: bold;
      font-size: clamp(1rem, 2vw, 1.5rem);
      margin-right: 4px;
    }
    span {
      font-size: clamp(14px, 1.2vw, 1rem);
      font-weight: 500;
      white-space: nowrap;
    }
  }

  .video_btn--selected {
    color: var(--btn-color);
  }

  @media only screen and (min-width: 601px) and (max-width: 950px) {
    margin-top: 30px;
    justify-content: flex-end;
  }

  @media only screen and (min-width: 351px) and (max-width: 600px) {
    margin-top: 30px;
    justify-content: flex-end;

    .video__btn {
      margin-left: 10px;
    }
  }
  @media only screen and (max-width: 350px) {
    margin-top: 30px;
    justify-content: flex-end;
    .video__likes {
      font-size: 14.5px;
    }
    .video__btn {
      margin-left: 8px;

      svg {
        font-size: 14.5px;
        margin-right: 2px;
      }
      span {
        font-size: 10.5px;
      }
    }
  }
`;

export const Similar = styled.div`
  flex-basis: 27%;
  height: 100%;
  @media only screen and (max-width: 950px) {
    flex-basis: 100%;
    margin-top: 50px;
  }
`;
