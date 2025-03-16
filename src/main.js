function navbarScrollTransform () {
  const navbar = document.querySelector('#header');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      navbar.classList.add('header-container--scrolled');
    } else if (window.scrollY <= 50) {
      navbar.classList.remove('header-container--scrolled');
    }
  })
}

async function getTrendingMoviesPreview() {
  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=bbda25d057b9c8c6bbf7f6966d3f9f1b`);
  const data = await response.json();
  
  const movies = data.results;
  // console.log({ movies });

  // hero populating
  const hero = document.querySelector('#hero');
  hero.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`
  const heroTitle = hero.querySelector('.hero-info__title');
  heroTitle.innerHTML = `${movies[0].original_title}`
  const heroYear = hero.querySelector('.hero-info__year');
  heroYear.innerHTML = `${movies[0].release_date.substr(0, 4)}`;
  const heroRate = hero.querySelector('.hero-info__rate');
  heroRate.innerHTML = `${movies[0].vote_average}`;
  const heroOverview = hero.querySelector('.hero-info__synopsis');
  heroOverview.innerHTML = movies[0].overview;

  // trending section populating
  const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
  movies.shift()
  movies.forEach(movie => {

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title)
    movieImg.setAttribute('src', `http://image.tmdb.org/t/p/w300${movie.poster_path}`);

    movieContainer.appendChild(movieImg);
    trendingPreviewMoviesContainer.appendChild(movieContainer);
  })


}

navbarScrollTransform();
getTrendingMoviesPreview();