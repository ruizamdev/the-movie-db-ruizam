const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    'api_key': 'bbda25d057b9c8c6bbf7f6966d3f9f1b',
    'language': 'es-MX'
  }
});
const movieDetailsWindow = document.querySelector('.movie-details-window');
const movieDetailsWindowLoader = document.querySelector('.loader-animation');
const movieDetailsContainer = movieDetailsWindow.querySelector('.movie-details');
const movieDetailsDiv = movieDetailsWindow.querySelector('.movie-details-div');
const moviePoster = movieDetailsContainer.querySelector('.movie-poster');
const movieTitle = movieDetailsContainer.querySelector('.movie-title');
const movieOriginalTitle = movieDetailsContainer.querySelector('.movie-originalTitle');
const movieReleaseDate = movieDetailsContainer.querySelector('.movie-releaseDate');
const movieGenresList = movieDetailsContainer.querySelector('.movie-genres');
const movieRuntime = movieDetailsContainer.querySelector('.movie-runtime');
const movieRate = movieDetailsContainer.querySelector('.movie-rate')
const movieVotes = movieDetailsContainer.querySelector('.movie-votes');
const moviePopularity = movieDetailsContainer.querySelector('.movie-popularity');
const movieTagline = movieDetailsContainer.querySelector('.movie-tagline');
const movieOverview = movieDetailsContainer.querySelector('.movie-overview');
const movieDetailsWindowBackground = movieDetailsWindow.querySelector('.movie-details-window__background');
const header = document.querySelector('.header-container');
const backdropImagesURL = 'https://image.tmdb.org/t/p/original';
const posterImagesURL = 'https://image.tmdb.org/t/p/w500';
const closeWindow = movieDetailsWindowBackground.querySelector('.close-window');
const headerContainer = document.querySelector('.header-container');
const headerLogo = document.querySelector('.header-logo');


export {
  api,
  movieDetailsWindow,
  movieDetailsWindowLoader,
  movieDetailsContainer,
  movieDetailsDiv,
  moviePoster,
  movieTitle,
  movieOriginalTitle,
  movieReleaseDate,
  movieGenresList,
  movieRuntime,
  movieRate,
  movieVotes,
  moviePopularity,
  movieTagline,
  movieOverview,
  movieDetailsWindowBackground,
  header,
  backdropImagesURL,
  posterImagesURL,
  closeWindow,
  headerContainer,
  headerLogo,
}