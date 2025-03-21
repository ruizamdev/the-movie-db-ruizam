import { openMovieDetailsWindow } from './openMovieDetailsWindow.mjs';

export async function getTrendingMoviesPreview () {
  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=bbda25d057b9c8c6bbf7f6966d3f9f1b&language=es-MX`);
  const data = await response.json();
  
  const movies = data.results;
  const moviesSorted = movies.sort((a, b) => b.popularity - a.popularity);
  // console.log({ movies });

  // function to set the color of the rate and popularity values
  function setValuesColor (value) {
    if (value >= 7 || value <= 10) {
      return 'color: #00bfa5';
    } else if (movieRateValue >= 4.0 || movieRateValue <= 6.9) {
      return 'color: #f9a825';
    } else if (movieRateValue >= 0 || movieRateValue <= 3.9) {
      return 'color: #e53935';
    } else {
      return 'color: #77767c';
    }
  }

  // hero populating
  const hero = document.querySelector('#hero');
  hero.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`
  const heroTitle = hero.querySelector('.hero-info__title');
  heroTitle.innerHTML = `${moviesSorted[0].title}`;
  const heroYear = hero.querySelector('.hero-info__year');
  heroYear.innerHTML = `${moviesSorted[0].release_date.substr(0, 4)}`;
  heroYear.setAttribute('style', 'font-weight: 700;');
  const heroRate = hero.querySelector('.hero-info__rate');
  const heroRateValue = moviesSorted[0].vote_average.toFixed(1);
  heroRate.innerHTML = `${heroRateValue}`;
  heroRate.setAttribute('style', 'font-weight: 700;');
  const heroOverview = hero.querySelector('.hero-info__synopsis');
  heroOverview.innerHTML = moviesSorted[0].overview;
  const heroDetailsBtn = hero.querySelector('.hero-info__movie-btn');
  heroDetailsBtn.setAttribute('id', moviesSorted[0].id);
  heroDetailsBtn.addEventListener('click', (e) => {
    const movieId = e.target.id;
    openMovieDetailsWindow(movieId);
  })
  

  // trending section populating
  const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
  let counter = 0;
  moviesSorted.forEach(movie => {
    counter++;
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title)
    movieImg.setAttribute('src', `http://image.tmdb.org/t/p/w300${movie.poster_path}`);

    const movieDetailsContainer = document.createElement('div');
    movieDetailsContainer.setAttribute('id', movie.id);
    movieDetailsContainer.style.transition = 'display 500ms';
    movieDetailsContainer.classList.add('movie-details-container');
    const topNumber = document.createElement('span');
    topNumber.classList.add('top-number');
    topNumber.innerHTML = `#${counter}`;
    topNumber.style.fontWeight = '700';
    const movieTitle = document.createElement('span');
    movieTitle.classList.add('movie-title');
    movieTitle.innerHTML = movie.title;
    const movieYear = document.createElement('span');
    movieYear.classList.add('movie-year');
    movieYear.innerHTML = `Año de estreno: ${movie.release_date.substr(0, 4)}`;
    const movieRate = document.createElement('span');
    const movieRateValue = movie.vote_average.toFixed(1);
    movieRate.classList.add('movie-rate');
    movieRate.innerHTML = `Calificación: <span class="movie-rate__value" style="${setValuesColor(movieRateValue)}">${movieRateValue}</span>`;
    const movieVotes = document.createElement('span');
    movieVotes.classList.add('movie-votes');
    movieVotes.innerHTML = `Votos: ${movie.vote_count}`;
    const moviePopularity = document.createElement('span');
    moviePopularity.classList.add('movie-popularity');
    moviePopularity.innerHTML = `Popularidad: <span class="movie-popularity__value">${movie.popularity.toFixed(1)}`;
    const moreDetailsBtn = document.createElement('button');
    moreDetailsBtn.setAttribute('id', movie.id);
    moreDetailsBtn.classList.add('moreDetails-btn');
    moreDetailsBtn.classList.add('details-button');
    moreDetailsBtn.innerHTML = "Más detalles";

    movieDetailsContainer.appendChild(topNumber);
    movieDetailsContainer.appendChild(movieTitle);
    movieDetailsContainer.appendChild(movieYear);
    movieDetailsContainer.appendChild(movieRate);
    movieDetailsContainer.appendChild(movieVotes);
    movieDetailsContainer.appendChild(moviePopularity);
    movieDetailsContainer.appendChild(moreDetailsBtn);

    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieDetailsContainer);
    movieDetailsContainer.classList.add('inactive');
    trendingPreviewMoviesContainer.appendChild(movieContainer);

    movieContainer.addEventListener('mouseenter', () => {
      movieDetailsContainer.classList.remove('inactive');
    });
    movieContainer.addEventListener('mouseleave', () => {
      movieDetailsContainer.classList.add('inactive');
    });
    moreDetailsBtn.addEventListener('click', (e) => {
      const movieId = e.target.id;
      openMovieDetailsWindow(movieId);
    });
  });
};