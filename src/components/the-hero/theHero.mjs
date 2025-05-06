// Nombre: theHero.mjs

import { api } from  '/src/constants.mjs';
export class TheHero extends HTMLElement {
  
  constructor(){
    super();
    this.attachShadow({mode: 'open'});

    // Propiedades internas
    this.sliderContainer = null;
    this.currentIndex = 0;
    this.slideInterval = null;
    this.isPaused = false;

    // 🔒 Enlazar métodos a la instancia
    this.pauseSlider = this.pauseSlider.bind(this);
    this.resumeSlider = this.resumeSlider.bind(this);
  }

  static get ObservedAttribute() {
    return [];
  }

  attributeChangedCallback() {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback(){
    this.render();
    requestAnimationFrame(() => {
      this.sliderContainer = this.shadowRoot.getElementById('heroSlider');
      this.populateSlider();
      this.sliderContainer.addEventListener('mouseenter', this.pauseSlider);
      this.sliderContainer.addEventListener('mouseleave', this.resumeSlider);
      this.sliderContainer.addEventListener('touchstart', this.pauseSlider);
      this.sliderContainer.addEventListener('touchend', this.resumeSlider);
    })
  }

  createSlide(movie, counter) {
    const slide = document.createElement('div');
    slide.classList.add('hero-slide');

    slide.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

    slide.innerHTML = /* html */ `
      <div id="hero-info" class="hero-info-container">
        <span class="hero-info__rank">#${counter} en tendencias</span>
        <h2 class="hero-info__title">${movie.title}</h2>
        <div class="movie-yearRate">
          <span class="hero-info__year">${new Date(movie.release_date).getFullYear()}</span>
          <span class="hero-info__rate">⭐ ${movie.vote_average.toFixed(1)}</span>
          <span class="hero-info__seasons">${movie.media_type === 'tv' ? movie.number_of_seasons + ' temporadas' : ''}</span>
        </div>
        <p class="hero-info__synopsis">${movie.overview}</p>
        <button class="hero-info__movie-btn details-button" data-movie-id="${movie.id}">Ver detalles</button>
      </div>
    `;
    return slide;
  }

  async populateSlider() {
    const { data } = await api('/trending/movie/week');
    const moviesSorted = data.results.sort((a, b) => b.popularity - a.popularity);
    const top5 = moviesSorted.slice(0, 5);
    let counter = 0;

    top5.forEach((movie, index) => {
      counter++;
      const slide = this.createSlide(movie, counter);
      if (index === 0) slide.classList.add('active');
      this.sliderContainer.appendChild(slide);
    });

    this.startAutoSlide();
  }

  showSlide(index) {
    const slides = this.shadowRoot.querySelectorAll('.hero-slide');
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      if (!this.isPaused) {
        this.currentIndex = (this.currentIndex + 1) % 5;
        this.showSlide(this.currentIndex);
      }
    }, 5000);
  }

  pauseSlider() {
    this.isPaused = true;
  }

  resumeSlider() {
    this.isPaused = false;
  }

  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  getTemplate(){
    const theHero = document.createElement('template');
    theHero.innerHTML = /* html */`
      <slot name="header"></slot>
      <div class="hero-slider" id="heroSlider">

      </div>
      <style>
        ${this.getStyles()}
      </style>
    `;
    return theHero;
  }

  getStyles(){
    return /* css */ `
        :host {
          --primary-dark-color: #171934;
          --secondary-dark-color: #77767c;
          --tertiary-light-color: #b8b7f8;
          --secondary-light-color: #cb8dec;
          --primary-light-color: #e8ddff;
          --white: #e2e2e2;
          display: flex;
          flex-direction: column;
          /* justify-content: end; */
          width: 100%;
          background-image: url();
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        .hero-slider {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 6px;
          height: 92vh;
          padding: 0 50px;
          background: linear-gradient(
            to top,
            #000,
            transparent
          );
          text-shadow: 1px 1px 3px rgb(0,0,0,0.35);
        }

        .hero-slider::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background-image: linear-gradient(
            to top,
            black,
            transparent
          );
        }

        .hero-slide.active {
          left: 0;
          opacity: 1;
        }

        .hero-info-container {
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 6px;
          justify-content: flex-end;
          height: fit-content;
          padding: 35px 35px;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.10),
            transparent
          );
          text-shadow: 1px 1px 3px rgb(0,0,0,0.35);
        }

        .hero-slide {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 100%;
          opacity: 0;
          transition: opacity 1s, left 1s;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
        }

        .hero-info__title {
          font-size: 8rem;
          max-width: 920px;
          font-weight: 900;
          margin: 0;
        }

        .movie-yearRate {
          display: flex;
          gap: 0.75%;
          margin: 5px 0;
        }

        .hero-info__synopsis {
          font-size: 1.8rem;
          max-width: 520px;
        }

        .hero-info__movie-btn {
          margin: 20px 0;
          width: 150px;
          height: 42px;
          border-radius: 5px;
          border: none;
          color: var(--primary-dark-color);
          font-size: 1.9rem;
          background-color: rgb(from var(--tertiary-light-color) r g b / 0.65);
          cursor: pointer;
          box-shadow: 0px 10px 20px -18px rgb(0,0,0,0.35);
          transition: background 300ms, transform 300ms;
        }
        @media (hover: hover) {
          .hero-info__movie-btn:hover {
            transform: scale(1.03);
            background-color: rgb(from var(--secondary-light-color) r g b / 0.65);
            
          }
          .hero-info__movie-btn:active {
            transform: scale(1.08);
            color: var(--white);
            background-color: rgb(from var(--primary-dark-color) r g b / 0.65);
          }
        }
    `;
  }

}