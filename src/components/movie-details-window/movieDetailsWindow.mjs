// movieDetailsWindow.mjs

import { api } from '/src/constants.mjs'
export class MovieDetailsWindow extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Variables internas o bindings van aquí
    this.movieId = this.getAttribute('movie-id');
  }

  static get observedAttributes() {
    return ['movie-id']; // si necesitas escuchar atributos
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) 
    this.loadMovieDetails(newVal);
  }

  connectedCallback() {
    this.render();
    this.loadMovieDetails();
    // Listeners, inits, etc.
  }

  disconnectedCallback() {
    // Limpieza de listeners, intervals, observers, etc.
  }

  async loadMovieDetails(id) {
    if (!id) return;

    const { data: movie } = await api(`https://api.themoviedb.org/3/movie/${id}`);
    this.createMovieDetailsWindow(movie);
  }

  createMovieDetailsWindow(movie) {
    const container = document.createElement('section');
    container.classList.add('details-container');
    this.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

    container.innerHTML = /* html */ `
      <div class="movie-poster-container">
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"/>
      </div>
      <div class="movie-details">
        <h2 class="movie-details__title">${movie.title}</h2>
        <p class="movie-details__original-title">${movie.original_title}</p>
        <div class="movie-data">
          <span class="movie-details__year">${movie.release_date.slice(0,4)}</span>
          <span class="movie-details__rate">${movie.vote_average.toFixed(1)}</span>
        </div>
        <p class="movie-details__genres"></p>
        <p class="movie-details__overview">${movie.overview}</p>
        <span class="movie-details__close">x</span>
      </div>
    `

    const detailsBtn = container.querySelector('.movie-details__close');
    detailsBtn.addEventListener('click', () => {
      this.remove();
      document.body.style.position = 'static';
      document.body.style.inset = '0';
    });

    this.shadowRoot.querySelector('.movie-details-container').appendChild(container);

  }

  getTemplate() {
    
    const template = document.createElement('template');
    template.innerHTML = /* html */ `
      <div class="movie-details-container">

      </div>
      <style>${this.getStyles()}</style>
    `;
    return template;
  }

  getStyles() {
    return /* css */ `

      * {
        margin: 0;
        padding: 0;
      }

      :host {
        position: absolute;
        width: 100%;
        height: 100vh;
        background-image: url('');
        background-size: cover;
        background-position: center;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        z-index: 7;
      }

      .movie-details-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.85);
        backdrop-filter: blur(5px);
      }

      .details-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10%;
        width: 80%;
      }

      .movie-poster-container {
        width: 30%;
        height: fit-content;
      }

      .movie-poster {
        width: 100%;
      }

      .movie-details {
        display: flex;
        flex-direction: column;
        gap: 5.5vh;
      }

      .movie-details span {
        display: inline-block;
      }
    
    `;
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}
