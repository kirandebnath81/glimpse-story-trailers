const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const requests = {
  fetchAllMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`,

  fetchMovieGenres: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,

  fetchVideo: `/movie/{id}/videos?api_key=${API_KEY}&language=en-US`,

  fetchSimilar: `/movie/{movie_id}/similar?api_key=${API_KEY}&language=en-US&page=1`,

  fetchDetails: `/movie/{id}?api_key=${API_KEY}&language=en-US`,

  fetchSearchedMovie: `/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false`,
};
