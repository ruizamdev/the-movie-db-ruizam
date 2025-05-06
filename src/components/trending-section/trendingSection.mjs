import { api } from '/src/constants.mjs';

export class TrendingSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentSlide = 0;
    this.slidesToShow = 5; // Número de cards visibles, ajusta según lo necesites
    this.slideWidth = 0;
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  connectedCallback() {
    this.render();
    this.cacheElements();
    this.populateTrendingSection();
    this.prevBtn.addEventListener('click', this.prevSlide);
    this.nextBtn.addEventListener('click', this.nextSlide);
  }

  disconnectedCallback() {
    this.prevBtn.removeEventListener('click', this.prevSlide);
    this.nextBtn.removeEventListener('click', this.nextSlide);
  }

  cacheElements() {
    this.movieList = this.shadowRoot.querySelector('.trendingPreview-movieList');
    this.prevBtn = this.shadowRoot.querySelector('.slider-btn.prev');
    this.nextBtn = this.shadowRoot.querySelector('.slider-btn.next');
  }

  async populateTrendingSection() {
    const { data } = await api('/trending/movie/day');
    const moviesSorted = data.results.sort((a, b) => b.popularity - a.popularity);
    moviesSorted.forEach((movie, idx) => this.createMovieCard(movie, idx + 1));
    this.updateSlideWidth();
    this.updateNavigation();
  }

  updateSlideWidth() {
    const firstMovie = this.movieList.querySelector('.movie-container');
    if (!firstMovie) return;
    const style = getComputedStyle(this.movieList);
    const gap = parseFloat(style.gap) || 0;
    this.slideWidth = firstMovie.getBoundingClientRect().width + gap;
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.moveSlider();
      this.updateNavigation();
    }
  }

  nextSlide() {
    const maxSlide = this.movieList.children.length - this.slidesToShow;
    if (this.currentSlide < maxSlide) {
      this.currentSlide++;
      this.moveSlider();
      this.updateNavigation();
    }
  }

  moveSlider() {
    this.movieList.style.transform = `translateX(-${this.currentSlide * this.slideWidth}px)`;
  }

  updateNavigation() {
    const maxSlide = this.movieList.children.length - this.slidesToShow;
    this.prevBtn.disabled = this.currentSlide <= 0;
    this.nextBtn.disabled = this.currentSlide >= maxSlide;
  }

  createMovieCard(movie, rank) {
    const container = document.createElement('div');
    container.classList.add('movie-container');
    container.innerHTML = `
      <img class="movie-img" src="http://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
      <div class="movie-details inactive">
        <span class="top-number">#${rank}</span>
        <span class="movie-title">${movie.title}</span>
        <span class="movie-year">Año: ${movie.release_date.slice(0,4)}</span>
        <span class="movie-rate">Calificación: ${movie.vote_average}</span>
      </div>
    `;
    container.addEventListener('mouseenter', () => container.querySelector('.movie-details').classList.remove('inactive'));
    container.addEventListener('mouseleave', () => container.querySelector('.movie-details').classList.add('inactive'));
    this.movieList.appendChild(container);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  getTemplate() {
    const tpl = document.createElement('template');
    tpl.innerHTML = /* html */ `
      <section class="trendingPreview">
        <h2>Top Tendencias</h2>
        <div class="slider-wrapper">
          <button class="slider-btn prev">&#10094;</button>
          <div class="slider-container">
            <div class="trendingPreview-movieList"></div>
          </div>
          <button class="slider-btn next">&#10095;</button>
        </div>
      </section>
      <style>${this.getStyles()}</style>
    `;
    return tpl;
  }

  getStyles() {
    return /* css */ `
      :host {
        display: block;
      }
      .slider-wrapper {
        display: flex;
        align-items: center;
      }
      .slider-container {
        overflow: hidden;
        flex: 1;
      }
      .trendingPreview h2 { 
        margin: 0;
        padding-block: 25px;
        padding-inline-start: 35px;  
      }
      .trendingPreview-movieList { 
        display: flex;
        gap: 10px;
        transition: transform 0.3s ease;
      }
      .movie-container {
        flex: 0 0 auto;
        width: calc((100% - 10px * (${this.slidesToShow}-1)) / ${this.slidesToShow});
        position: relative;
      }
      .movie-img {
        width: 100%;
        display: block;
      }
      .movie-details {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px;
        box-sizing: border-box;
      }
      .inactive {
        display: none;
      }
      .slider-btn {
        background: none;
        border: none;
        font-size: 4rem;
        cursor: pointer;
        color: var(--white)
      }
      .slider-btn:disabled {
        opacity: 0.4;
        cursor: default;
      }
    `;
  }
}
