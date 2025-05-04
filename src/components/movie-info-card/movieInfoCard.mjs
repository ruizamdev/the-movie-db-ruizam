// movieInfoCard.mjs

import { api } from '../../constants.mjs'
export class MovieInfoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.posterImagesURL = 'https://image.tmdb.org/t/p/w300';
    this.backdropImagesURL = 'https://image.tmdb.org/t/p/w780';
    this.movieData = null;
    this.externalListener = this.handleExternalTrigger.bind(this);
  }

  static get observedAttributes() {
    return ['movie-id'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'movie-id' && newVal && newVal !== oldVal) {
      this.clear();
      this.fetchMovieData(newVal);
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
    window.addEventListener('open-movie-info', this.externalListener);
  }

  disconnectedCallback() {
    window.removeEventListener('open-movie-info', this.externalListener);
  }

  handleExternalTrigger(event){
    const movieId = event.detail?.movieId;
    if(movieId) {
      this.setAttribute('movie-id', movieId)
    }
  }

  async fetchMovieData(movieId) {
    this.showLoader(true);
    try {
      const { data } = await api(`/movie/${movieId}`);
      this.movieData = data;
      this.render();
    } catch (error) {
      console.error('Error al cargar datos de película:', error);
    } finally {
      this.showLoader(false);
      this.classList.remove('inactive');
    }
  }

  showLoader(state) {
    const loader = this.shadowRoot?.querySelector('.loader-animation');
    if (loader) {
      loader.classList.toggle('inactive', !state);
    }
  }

  clear() {
    this.movieData = null;
    const window = this.shadowRoot?.querySelector('.movie-details-window');
    if (window) window.innerHTML = '';
  }

  close() {
    this.classList.add('inactive');
    this.clear();
  }

  addEventListeners() {
    this.shadowRoot.addEventListener('click', (e) => {
      if (e.target.closest('.close-window')) {
        this.close();
      }
    });
  }

  render() {
    if (!this.shadowRoot) return;

    const data = this.movieData;

    this.shadowRoot.innerHTML = '';
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="movie-details-window inactive">
        <div class="loader-animation inactive">
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>

        <section class="movie-details-window__background" style="background-image: url('${this.backdropImagesURL}${data?.backdrop_path || ''}');">
          <article class="movie-details">
            <span class="close-window">
              <svg width="50px" height="50px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#e2e2e2" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
            </span>
            <figure class="movie-poster-container">
              <img class="movie-poster" src="${this.posterImagesURL}${data?.poster_path || ''}" alt="Poster" />
            </figure>
            <div class="movie-details-div">
              <h2 class="movie-title">${data?.title || ''}</h2>
              <div class="divider"></div>
              <h3 class="movie-originalTitle">${data?.original_title || ''}</h3>
              <div class="date-genres-div">
                <span class="movie-releaseDate">${this.formatDate(data?.release_date)}</span>
                <div class="movie-genres">${(data?.genres || []).map(g => `<span>${g.name}</span>`).join(', ')}</div>
                <span class="movie-runtime">${data?.runtime ? data.runtime + ' min' : ''}</span>
              </div>
              <div class="movie-rates">
                <div class="movie-rate-container"><span class="movie-rate">${data?.vote_average || ''}</span><span>Calificación</span></div>
                <div class="movie-rate-container"><span class="movie-votes">${data?.vote_count || ''}</span><span>Votos</span></div>
                <div class="movie-rate-container"><span class="movie-popularity">${data?.popularity || ''}</span><span>Popularidad</span></div>
              </div>
              <p><i class="movie-tagline">${data?.tagline || ''}</i></p>
              <p class="movie-overview">${data?.overview || ''}</p>
            </div>
          </article>
        </section>
      </div>
      <style>${this.getStyles()}</style>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getStyles() {
    return /* css */ `

      .movie-details-window {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(
          to bottom,
          #000000,
          var(--primary-dark-color)
        );
        z-index: 2;
      }

      .movie-details-window__background {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        }

      .movie-details {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height:100vh;
        padding-block-start: 25vh;
        padding-block-end: 100px;
        background-color: rgba(0,0,0,0.75);
        backdrop-filter: blur(5px);
        text-shadow: 1px 1px 3px rgb(0,0,0,0.35);
      }

      .movie-poster-container {
        width: 300px;
        height: fit-content;
      }

      .movie-poster {
        width: 100%;
        box-shadow: 7px 9px 12px 8px rgba(0, 0, 0, 0.23);
      }

      .movie-details-div {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        width: 50%;
        height: fit-content;
        margin-inline-start: 20px;
        padding: 4%;
      }

      .movie-details-div .movie-title {
        width: 100%;
        padding-block: 20px;
        font-size: 6.5rem;
      }

      .divider {
        width: 100%;
        height: 1px;
        background-color: var(--white);
      }

      .movie-details-div .movie-originalTitle {
        width: 100%;
        margin: 10px 0;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-weight: 300;
        font-style: italic;
        font-size: 1.8rem;
      }

      .date-genres-div {
        display: flex;
        gap: 15px;
      }

      .movie-releaseDate {
        display: inline-block;
        margin: 5px 0;
      }

      .movie-genres {
        display: inline-block;
        margin: 5px 0;
      }

      .movie-runtime {
        display: inline-block;
        margin: 5px 0;
      }

      .movie-rates {
        display: flex;
        padding-block: 20px;
        gap: 35px;
      }

      .movie-rate-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100px;
      }

      .movie-rate-container span:nth-child(1) {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #000;
        text-align: center;
        text-justify: inter-word;
      }

      .movie-details-div .movie-tagline {
        font-family: var(--font-logo);
      }

      .movie-details-div .movie-tagline {
        padding-block: 20px;
      }

      .movie-details-div .movie-overview {
        padding-block: 20px;
      }

      .movie-linkBtn {
        cursor: pointer;
        margin: 20px 0;
        width: 150px;
        height: 42px;
        border-radius: 5px;
        border: none;
        color: var(--white);
        font-size: 1.9rem;
        background-color: rgb(from var(--primary-dark-color) r g b / 0.85);
        cursor: pointer;
        box-shadow: 0px 10px 20px -18px rgb(0, 0, 0, 0.35);
      }

      .close-window {
        position: absolute;
        top: 25%;
        right: 14%;
        display: inline-block;
        width: 35px;
        height: 35px;
      }

      .close-window svg {
        cursor: pointer;
        width: 100%;
        height: 100%;
        filter: drop-shadow(1px 1px 3px rgba(0,0,0,0.35))
      }

      /* From Uiverse.io by barisdogansutcu */
      .loader-animation {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          #000000,
          var(--primary-dark-color)
        );
        z-index: 3;
      }

      .loader-animation svg {
        width: 3.25em;
        transform-origin: center;
        animation: rotate4 2s linear infinite;
      }

      circle {
        fill: none;
        stroke: var(--secondary-light-color);
        stroke-width: 2;
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        animation: dash4 1.5s ease-in-out infinite;
      }

      @keyframes rotate4 {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes dash4 {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }

        50% {
          stroke-dasharray: 90, 200;
          stroke-dashoffset: -35px;
        }

        100% {
          stroke-dashoffset: -125px;
        }
      }

      .inactive {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: opacity 0.3s ease;
      }
    `;
  }
}
