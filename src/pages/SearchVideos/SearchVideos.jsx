import { useEffect, useState } from "react";

//axios instance
import axios from "../../config/axiosConfig";

// api
import { requests } from "../../config/apiConfig";

//styles
import { MainContainer } from "../../styles/Main.styles";

//utils
import { getSortedData } from "../../utils";

//components
import { DisplayVideos, Spinner } from "../../components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setSearchedVideos } from "../../features";

//router
import { useParams } from "react-router-dom";

const SearchVideos = () => {
  const { searchInput } = useParams();

  const dispatch = useDispatch();

  const { searchedVideos } = useSelector((state) => state.videosData);

  const [isLoading, setIsLoading] = useState(true);

  //Fetching all the videos data
  useEffect(() => {
    fetchData(searchInput, dispatch);
  }, [searchInput, dispatch]);

  async function fetchData(searchInput, dispatch) {
    try {
      const { data } = await axios.get(requests.fetchSearchedMovie, {
        params: { query: searchInput },
      });

      if (data.results?.length !== 0) {
        const newdata = getSortedData(data, "search");
        dispatch(setSearchedVideos(newdata));
      } else {
        dispatch(setSearchedVideos(null));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MainContainer>
      {isLoading ? (
        <Spinner />
      ) : searchedVideos === null ? (
        <h2 style={{ textAlign: "center" }}>Result Not Found</h2>
      ) : (
        <DisplayVideos videos={searchedVideos} type="search" />
      )}
    </MainContainer>
  );
};

export default SearchVideos;
