export class TheHero extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }
  static get ObservedAttribute() {
    return [];
  }
  attributeChangedCallback() {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  getTemplate(){
    const theHero = document.createElement('template');
    theHero.innerHTML = /*html*/`
      <slot name="the-header"></slot>
      <div id="hero-info" class="hero-info-container">
      <h2 class="hero-info__title"></h2>
      <div class="movie-yearRate">
        <span class="hero-info__year"></span>
        <span class="hero-info__rate"></span>
        <span class="hero-info__seasons"></span>
      </div>
      <p class="hero-info__synopsis"></p>
      <button class="hero-info__movie-btn details-button">Ver detalles
      </button>
    </div>
    ${this.getStyles()}
    `;
    return theHero;
  }
  getStyles(){
    return /*css*/`
      <style>
        :host {
          --primary-dark-color: #171934;
  --secondary-dark-color: #77767c;
  --tertiary-light-color: #b8b7f8;
  --secondary-light-color: #cb8dec;
  --primary-light-color: #e8ddff;
  --white: #e2e2e2;
          display: flex;
          flex-direction: column;
          justify-content: end;
          width: 100%;
          height: 92vh;
          background-image: url();
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        .hero-info-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
          height: 53vh;
          padding: 0 50px;
          background: linear-gradient(
            to top,
            #000,
            transparent
          );
          text-shadow: 1px 1px 3px rgb(0,0,0,0.35);
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
      </style>
    `;
  }
  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback(){
    this.render();
  }
}