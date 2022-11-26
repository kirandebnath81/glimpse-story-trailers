import { useEffect, useState, useRef } from "react";

// icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

//styles
import { Container, GenreContainer, Genre } from "./Genres.styles";

//axios instance
import axios from "../../config/axiosConfig";

// api
import { requests } from "../../config/apiConfig";

// redux
import { useDispatch, useSelector } from "react-redux";
import { selectPage, selectGenre } from "../../features";

const Genres = () => {
  const dispatch = useDispatch();

  const { genreId } = useSelector((state) => state.videosInfo);
  const [genres, setGenres] = useState([]);

  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);

  const scrl = useRef();

  //api call get the list of genres
  useEffect(() => {
    getGenres();
    dispatch(selectGenre(""));
  }, [dispatch]);

  const getGenres = async () => {
    try {
      const { data } = await axios.get(requests.fetchMovieGenres);
      setGenres(data?.genres);
    } catch (err) {
      console.log(err);
    }
  };

  //select genre
  const clickHandler = (id) => {
    window.scroll(0, 0);
    dispatch(selectGenre(id));
    dispatch(selectPage(1));
  };

  //scrolling the bar
  const scroll = (shift) => {
    //when the next or previous button is clicked , the scroll bar is shifting based on the input it receives
    scrl.current.scrollLeft += shift;
  };

  //func for displaying or hiding the prev and next btns
  const scrollHandler = () => {
    //prev btn
    //setting the scrollX equal to the current value of scroll left
    setScrollX(scrl.current.scrollLeft);

    // next btn
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  return (
    <Container>
      {scrollX !== 0 && (
        <button
          onClick={() => scroll(-100)}
          className="scrollbar__btn scrollbar__btn--prev-btn"
        >
          <IoIosArrowBack />
        </button>
      )}

      <GenreContainer ref={scrl} onScroll={scrollHandler}>
        <Genre
          className={genreId === "" && "scrollbar__active-genre"}
          onClick={() => clickHandler("")}
        >
          all
        </Genre>
        {genres.map(({ name, id }) => (
          <Genre
            key={id}
            onClick={() => clickHandler(id)}
            className={genreId === id && "scrollbar__active-genre"}
          >
            {name}
          </Genre>
        ))}
      </GenreContainer>

      {!scrollEnd && (
        <button
          onClick={() => scroll(100)}
          className="scrollbar__btn scrollbar__btn--next-btn"
        >
          <IoIosArrowForward />
        </button>
      )}
    </Container>
  );
};

export default Genres;
