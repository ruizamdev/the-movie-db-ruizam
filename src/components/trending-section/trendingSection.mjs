// Nombre: mi-componente.js

class TrendingSection extends HTMLElement {
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
    template.innerHTML = /* html */ `
      <section id="trendingPreview" class="trendingPreview-container">
      <div class="trendingPreview-header">
        <h2 class="trendingPreview-title">20 Tendencias de hoy</h2>
        <button class="trendingPreview-btn">Ver más</button>
      </div>
  
      <article class="trendingPreview-movieList">
        
      </article>
    </section>
      <style>${this.getStyles()}</style>
    `;
    return template;
  }

  getStyles() {
    return /* css */ `
      .trendingPreview-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px 50px;
      }

      .trendingPreview-header {
        display: flex;
        justify-content: space-between;
      }


      .trendingPreview-btn {
        color: var(--white);
        font-size: 1.8rem;
        background-color: rgb(0,0,0,0.0);
        border: none;
        cursor: pointer;
      }

      .trendingPreview-movieList {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2.5%;
        flex-wrap: wrap;
      }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}
