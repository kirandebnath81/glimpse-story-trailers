import { useEffect, useState } from "react";

//axios instance
import axios from "../../config/axiosConfig";

//api
import { requests } from "../../config/apiConfig";

//styles
import { MainContainer, StyledButton } from "../../styles/Main.styles";

//utils
import { getSortedData } from "../../utils";

//components
import { DisplayVideos, Genres, Spinner } from "../../components";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setAllVideos, selectPage } from "../../features";

const Videos = () => {
  const dispatch = useDispatch();

  const { genreId, page } = useSelector((state) => state.videosInfo);

  const { allVideos } = useSelector((state) => state.videosData);

  const [isLoading, setIsLoading] = useState(true);

  //api call to get the all videos
  useEffect(() => {
    fetchData(page, genreId, dispatch);
  }, [page, genreId, dispatch]);

  async function fetchData(page, genreId, dispatch) {
    try {
      const { data } = await axios.get(requests.fetchAllMovies, {
        params: { page, with_genres: genreId },
      });

      if (data.results?.length !== 0) {
        dispatch(setAllVideos({ data: getSortedData(data, "all"), page }));
      } else {
        dispatch(setAllVideos(null));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  //setting the by default videos page
  useEffect(() => {
    dispatch(selectPage(1));
  }, [dispatch]);

  return (
    <MainContainer>
      <Genres />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <DisplayVideos videos={allVideos} type="mainPage" />

          <StyledButton
            onClick={() => dispatch(selectPage(page + 1))}
            style={{ margin: "0px auto" }}
          >
            Load More
          </StyledButton>
        </>
      )}
    </MainContainer>
  );
};

export default Videos;
