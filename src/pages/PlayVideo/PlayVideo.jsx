import React, { useEffect, useState } from "react";

import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

//icons
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {
  MdOutlineWatchLater,
  MdWatchLater,
  MdPlaylistAdd,
  MdOutlineShare,
} from "react-icons/md";

//styles
import {
  Container,
  VideoContainer,
  Similar,
  ButtonsContainer,
} from "./PlayVideo.styles";

//axios instance
import axios from "../../config/axiosConfig";

//router
import { useParams, useNavigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateVideo, setSelectedVideo } from "../../features";

//utils
import {
  deleteData,
  addLikedVideo,
  addWatchLater,
  getSortedData,
} from "../../utils";

//components
import { SimilarVideos, VideoComments, Spinner } from "../../components";

const Video = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();

  const { likedVideos, watchLater, updatedVideos } = useSelector(
    (state) => state.videosData
  );

  const { user } = useSelector((state) => state.auth);

  const [videoData, setVideoData] = useState([]);
  const [videoDetails, setVideoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //Api call to get the video link
  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const { data } = await axios.get(`/movie/${id}/videos?language=en-US`, {
        params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
      });

      const mainData = data.results?.filter((data) => data.type === "Trailer");

      if (mainData?.length !== 0) {
        setVideoData(mainData);
      } else {
        setVideoData(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //Api call to get the video details
  useEffect(() => {
    fetchDetails(id, updatedVideos);
  }, [id, updatedVideos]);

  const fetchDetails = async (id, updatedVideos) => {
    try {
      const { data } = await axios.get(`/movie/${id}&language=en-US`, {
        params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
      });

      const newData = getSortedData(data, "videoDetails");

      // check whether the video has  updated earlier or not .
      const video = updatedVideos?.find((video) => video.id === newData?.id);

      if (video) {
        setVideoDetails(video);
      } else {
        setVideoDetails({
          ...newData,
          playlists: { watchLater: "" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Save or delete  Video:
  //we save or delete the video in two places
  //1.In the specific list in firebase db
  //2.In the updated list(each video must be added to the updated list so that the change can be reflected in all the places where the video exists )

  //Liked videos
  const likeHandler = (value) => {
    if (user) {
      const video = {
        ...videoDetails,
        isLiked: value,
        likes: value ? videoDetails.likes + 1 : videoDetails.likes - 1,
      };

      //update video
      dispatch(updateVideo(video));

      if (value) {
        //Add to firebase db
        addLikedVideo(likedVideos, video, user);
      } else {
        //delete from firebase db
        deleteData(likedVideos, video, user, "likedVideos");
      }
    } else {
      navigate("/login");
    }
  };

  //Watch later videos
  const watchLaterHandler = (value) => {
    if (user) {
      const video = {
        ...videoDetails,
        playlists: {
          ...videoDetails.playlists,
          watchLater: value,
        },
      };

      //update video
      dispatch(updateVideo(video));

      if (value) {
        //Add to firebase db
        addWatchLater(watchLater, video, user);
      } else {
        //delete from firebase db
        deleteData(watchLater, video, user, "watchLater");
      }
    } else {
      navigate("/login");
    }
  };

  //open modal to save in the playlist
  const saveHandler = () => {
    if (user) {
      dispatch(setSelectedVideo(videoDetails));
      dispatch(openModal("add"));
    } else {
      navigate("/login");
    }
  };

  //share video
  const shareHandler = () => {
    copy(`https://glimpse-story.netlify.app/video/${id}`);
    toast.info("Link copied to clipboard", { theme: "colored" });
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : videoData === null ? (
        <h2 style={{ textAlign: "center" }}>Result Not Found</h2>
      ) : (
        <>
          <VideoContainer>
            <div className="video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoData[0]?.key}`}
                title="Video"
                frameBorder="0"
                allowFullScreen={true}
              ></iframe>
            </div>
            <div className="video__details">
              <div className="video__text">
                <div className="video__title">{videoDetails?.title}</div>
                <div className="video__tagline">{videoDetails?.tagline}</div>
                <small className="video__release-date">
                  {videoDetails?.release_date}
                </small>
              </div>
              <ButtonsContainer>
                <div className="video__likes"> {videoDetails?.likes}</div>
                <div
                  onClick={() => likeHandler(!videoDetails?.isLiked)}
                  className={`video__btn ${
                    videoDetails?.isLiked && "video_btn--selected"
                  }`}
                >
                  {videoDetails?.isLiked ? <AiFillLike /> : <AiOutlineLike />}
                  <span>Like</span>
                </div>
                <div
                  onClick={() =>
                    watchLaterHandler(!videoDetails?.playlists?.watchLater)
                  }
                  className={`video__btn ${
                    videoDetails?.playlists?.watchLater && "video_btn--selected"
                  }`}
                >
                  {videoDetails?.playlists?.watchLater ? (
                    <MdWatchLater />
                  ) : (
                    <MdOutlineWatchLater />
                  )}
                  <span> Watch later</span>
                </div>
                <div onClick={saveHandler} className="video__btn">
                  <MdPlaylistAdd /> <span>Save</span>
                </div>
                <div className="video__btn" onClick={shareHandler}>
                  <MdOutlineShare />
                  <span>Share </span>
                </div>
              </ButtonsContainer>
            </div>

            <hr />

            <div>
              <VideoComments video={videoDetails} />
            </div>
          </VideoContainer>
          <Similar>
            <SimilarVideos id={id} />
          </Similar>
        </>
      )}
    </Container>
  );
};

export default Video;
