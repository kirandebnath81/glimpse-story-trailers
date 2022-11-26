import { useEffect } from "react";

//axios instance
import axios from "../../config/axiosConfig";

//components
import DisplayVideos from "../DisplayVideos/DisplayVideos";

//utils
import { getSortedData } from "../../utils";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setSimilarVideos } from "../../features";

const SimilarVideos = ({ id }) => {
  const dispatch = useDispatch();

  const { similarVideos } = useSelector((state) => state.videosData);

  useEffect(() => {
    fetchData(id, dispatch);
  }, [id, dispatch]);

  const fetchData = async (id, dispatch) => {
    try {
      const { data } = await axios.get(
        `/movie/${id}/similar?language=en-US&page=1`,
        { params: { api_key: process.env.REACT_APP_TMDB_API_KEY } }
      );
      const newData = getSortedData(data, "similar");
      dispatch(setSimilarVideos(newData?.slice(0, 10)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DisplayVideos videos={similarVideos} type="similar" />
    </div>
  );
};

export default SimilarVideos;
