//lazy load
import { LazyLoadImage } from "react-lazy-load-image-component";

//styles
import { Container, Card } from "./DisplayVideos.styles";

//utils
import { addDataList } from "../../utils";

//components
import DropdownMenu from "../DropdownMenu/DropdownMenu";

//router
import { useNavigate } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

//img base url
const imgBaseUrl = `https://image.tmdb.org/t/p/original`;

const DisplayVideos = ({ videos, type, title, date }) => {
  const navigate = useNavigate();

  const { historyVideos } = useSelector((state) => state.videosData);
  const { user } = useSelector((state) => state.auth);

  //navigate to watch video page and set history videos to the db
  const navigateHandler = (video) => {
    navigate(`/video/${video.id}`);
    window.scroll(0, 0);

    //getting the current date which will be used as title under which the video is going to be stored in the history list
    const today = new Date().toLocaleDateString("en-us", {
      day: "numeric",
      month: "short",
    });

    //saving this video in the history list of the firebase db
    if (user) {
      addDataList(historyVideos, video, user, today, "historyVideos");
    }
  };

  //Get dropdown
  const getDropdown = (video) => {
    if (type === "history") {
      return <DropdownMenu video={video} type={type} date={date} />;
    } else if (type === "playlistVideo") {
      return <DropdownMenu video={video} type={type} title={title} />;
    } else {
      return <DropdownMenu video={video} type={type} />;
    }
  };

  return (
    <Container pageType={type}>
      {videos?.map(
        (video) =>
          video.backdrop_path && (
            <Card key={video.id} pageType={type}>
              <LazyLoadImage
                src={imgBaseUrl + video.backdrop_path}
                alt={video.title}
                effect="blur"
                onClick={() => navigateHandler(video)}
              />

              <div className="video__details-one">
                <div
                  className="video__title"
                  onClick={() => navigateHandler(video)}
                >
                  {video.title}
                </div>

                {/* getting dropdown with specific properties */}
                {getDropdown(video)}
              </div>

              <div className="video__details-two">
                <div>{video.release_date}</div>
                <div className="video__rating">
                  {video.vote_average?.toFixed(1)}
                </div>
              </div>
            </Card>
          )
      )}
    </Container>
  );
};

export default DisplayVideos;
