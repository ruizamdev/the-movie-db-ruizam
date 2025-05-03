import { TheHero } from "./hero/hero.mjs";
import { HeaderNavbar } from "./header-navbar/header-navbar.mjs";
import { MovieInfoCard } from "./movie-info-card/movieInfoCard.mjs";

customElements.define('the-hero', TheHero);
customElements.define('header-navbar', HeaderNavbar);
customElements.define('movie-info-card', MovieInfoCard);