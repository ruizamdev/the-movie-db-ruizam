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
    this.style.backgroundImage = `url('https://api.themoviedb.org/3/movie/${movie.backgdrop_path}')`

    container.innerHTML = /* html */ `
      <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"/>
      <div class="movie-details">
        <h2 class="movie-details_title">${movie.title}</h2>
        <p class="movie-details_original-title">${movie.original_title}</p>
        <span class="movie-details_year">${movie.release_date.slice(0,4)}</span>
        <span class="movie-details_rate">${movie.vote_average.toFixed(1)}</span>
        <p class="movie-details_genres"></p>
        <p class="movie-details_overview">${movie.overview}</p>
        <div>x</div>
      </div>
    `
    this.shadowRoot.querySelector('.movie-details').appendChild(container);

  }

  getTemplate() {
    
    const template = document.createElement('template');
    template.innerHTML = /* html */ `
      <div class="movie-details">

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
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        z-index: 7;
      }

      .movie-details {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.75);
        backdrop-filter: blur(5px);
      }


    `;
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}
