import { 
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
} from "./constants.mjs";


export async function openMovieDetailsWindow (movieId) {
  window.location.hash = `#movieID=${movieId}`;
  movieDetailsWindow.classList.remove("inactive");
  movieDetailsWindowLoader.classList.remove("inactive");

  const { data } = await api(`/movie/${movieId}`);
  const movieHomepage = data.homepage;
  console.log(movieHomepage);

  movieDetailsWindowBackground.style.backgroundImage = `url("${backdropImagesURL}${data.backdrop_path}")`;
  moviePoster.setAttribute("src", `${posterImagesURL}${data.poster_path}`);
  movieTitle.innerHTML = data.title;
  movieOriginalTitle.innerHTML = data.original_title;
  movieReleaseDate.innerHTML = data.release_date;
  const movieGenres = data.genres;
  const genres = [];
  movieGenres.forEach((genre) => {
    genres.push(genre.name);
  });

  const runtimeInMinutes = data.runtime;
  const runtimeMinus1Hour = setRuntime(); 
  
  function setRuntime () {if (runtimeInMinutes > 60 && runtimeInMinutes < 120) {
      return runtimeInMinutes - 60;
    } else if (runtimeInMinutes > 120 && runtimeInMinutes < 180) {
      return runtimeInMinutes - 120;
    } else {
      return;
    }
  }

  movieGenresList.innerHTML = genres;
  movieRuntime.innerHTML = `1h${runtimeMinus1Hour}m`;
  movieRate.innerHTML = data.vote_average;
  movieVotes.innerHTML = `${data.vote_count} Votos`;
  moviePopularity.innerHTML = data.popularity;
  movieTagline.innerHTML = `"${data.tagline}"`;
  movieOverview.innerHTML = data.overview;
  const movieLinkBtn = movieDetailsDiv.querySelector(".movie-linkBtn");
  if (movieLinkBtn === null || movieLinkBtn === undefined) {
    if (movieHomepage === null || movieHomepage === undefined || movieHomepage == "") {
      console.warn('No homepage link')
    } else {
      const movieLinkBtn = document.createElement("button");
      movieLinkBtn.classList.add("movie-linkBtn");
      movieLinkBtn.innerHTML = "Página Oficial";
      movieDetailsDiv.appendChild(movieLinkBtn);
      movieLinkBtn.addEventListener('click', () => {
        open(movieHomepage);
      });
    }
  }

  document.body.style.position = "fixed";
  header.setAttribute("style", "background: none");
  closeWindow.addEventListener("click", () => {
    window.location.hash = "";
    movieDetailsWindow.classList.add("inactive");
    document.body.style.position = "static";
    header.style = '';
  });

  function charging() {
    movieDetailsWindowLoader.classList.add('inactive');
    movieDetailsWindowBackground.classList.remove('inactive');
  }

  setTimeout(charging, 1200);
};