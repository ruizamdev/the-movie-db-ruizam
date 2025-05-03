// movieInfoCard.mjs

export class MovieInfoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Variables internas o bindings van aquí
  }

  static get observedAttributes() {
    return []; // si necesitas escuchar atributos
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.render();
  }

  connectedCallback() {
    this.render();
    // Listeners, inits, etc.
  }

  disconnectedCallback() {
    // Limpieza de listeners, intervals, observers, etc.
  }

  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = /* html */`
      <div class="movie-details-window inactive">
    <div class="loader-animation inactive">
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>

    <section class="movie-details-window__background inactive">
      <article class="movie-details">
        <span class="close-window">
          <svg width="50px" height="50px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#e2e2e2" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
        </span>
        <figure class="movie-poster-container">
          <img class="movie-poster">
        </figure>
        <div class="movie-details-div">
          <h2 class="movie-title"></h2>
          <div class="divider"></div>
          <h3 class="movie-originalTitle"></h3>
          <div class="date-genres-div">
            <span class="movie-releaseDate"></span>
            <div class="movie-genres"></div>
            <span class="movie-runtime"></span>
          </div>

          <div class="movie-rates">
            <div class="movie-rate-container movie-rate-container">
              <span class="movie-rate movie-rate"></span>
              <span>Calificación</span>
            </div>
            <div class="movie-rate-container movie-votes-container">
              <span class="movie-votes"></span>
              <span>Votos</span>
            </div>
            <div class="movie-rate-container movie-popularity-container">
              <span class="movie-popularity"></span>
              <span>Popularidad</span>
            </div>
          </div>
          <p><i class="movie-tagline"></i></p>
          <p class="movie-overview"></p>
        </div>
      </article>
    </section>
  </div>
    `;
    return template;
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
    `;
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}
