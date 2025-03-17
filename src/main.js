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

function searchBarInteractive () {
  const searchIconContainer = document.querySelector('.search-icon-container');
  const searchIconPath = searchIconContainer.querySelector('#search-icon .path');
  const searchFormInput = document.querySelector('.searchForm-input');
  searchIconContainer.addEventListener('mouseenter', () => {
    searchIconPath.setAttribute('style', 'fill:#e2e2e2;');
  });
  searchIconContainer.addEventListener('mouseleave', () => {
    searchIconPath.setAttribute('style', 'fill:#77767c;')
  });
  searchIconContainer.addEventListener('click', () => {
    searchFormInput.classList.remove('inactive');
    searchFormInput.setAttribute('style', 'transform: translateX(0px)');
    console.log(searchFormInput);
  });
  document.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target.id);
    if (target.id === 'search-icon' || target.id === 'search-input') {
      return;
    } else {
      searchFormInput.classList.add('inactive');
      searchFormInput.setAttribute('style', 'transform: translateX(520px)')
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
  // movies.shift()
  let counter = 0;
  movies.forEach(movie => {
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
    const movieTitle = document.createElement('span');
    movieTitle.classList.add('movie-title');
    movieTitle.innerHTML = movie.title;
    const movieYear = document.createElement('span');
    movieYear.classList.add('movie-year');
    movieYear.innerHTML = `Release date: ${movie.release_date}`
    const movieRate = document.createElement('span');
    movieRate.classList.add('movie-rate');
    movieRate.innerHTML = `Rate: ${movie.vote_average}`;
    const movieVotes = document.createElement('span');
    movieVotes.classList.add('movie-votes');
    movieVotes.innerHTML = `Votes: ${movie.vote_count}`;
    const moviePopularity = document.createElement('span');
    moviePopularity.classList.add('movie-popularity');
    moviePopularity.innerHTML = `Popularity: ${movie.popularity}`;
    const moreDetailsBtn = document.createElement('button');
    moreDetailsBtn.classList.add('moreDetails-btn');
    moreDetailsBtn.innerHTML = "More details"

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
    })
    movieContainer.addEventListener('mouseleave', () => {
      movieDetailsContainer.classList.add('inactive');
    })
  })


}

navbarScrollTransform();
searchBarInteractive();
getTrendingMoviesPreview();