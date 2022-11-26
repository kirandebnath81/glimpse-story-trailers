import styled from "styled-components";

export const PlaylistContainer = styled.div`
  margin: 50px 0px;

  .playlists__text {
    font-weight: 600;
    padding-bottom: 25px;
    .playlists__title-text {
      font-size: clamp(1.05rem, 2vw, 1.15rem);
      font-weight: 600;
      margin-bottom: 5px;
    }
    .playlists__subtitle-text {
      font-size: 12px;
      font-size: clamp(13px, 1.5vw, 15px);
      margin: 6px 0px 20px;
    }
  }
`;

export const Card = styled.div`
  width: 350px;
  height: 250px;
  margin-bottom: 50px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .playlists__img-container {
    width: 100%;
    height: 210px;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }

  .playlists__details-one {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .playlists__title {
      font-size: 1.1rem;
      font-weight: bold;
    }
  }

  @media screen and (max-width: 600px) {
    margin-right: 0px;
    width: 100%;
    height: auto;
    .playlists__img-container {
      height: 100%;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const Gradient = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    height: 98%;
  }
`;
