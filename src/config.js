export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "75e30f6866b92ab202d7564db5ca81ce";
const tmdbEndPoint = `https://api.themoviedb.org/3/movie`;
const tmdbEndPointSearch = `https://api.themoviedb.org/3/search/movie`;
export const tmdbApi = {
  getMovieList: (type, page = 1) =>
    ` ${tmdbEndPoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieSetails: (movieId) => ` ${tmdbEndPoint}/${movieId}?api_key=${apiKey}`,
  getMovieInfo: (movieId, type) =>
    `${tmdbEndPoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndPointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
