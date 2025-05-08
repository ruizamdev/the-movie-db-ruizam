import { TheHero } from './components/the-hero/theHero.mjs';
import { HeaderNavbar } from './components/header-navbar/headerNavbar.mjs';
import { TrendingSection } from './components/trending-section/trendingSectionV2.mjs';
import { MovieDetailsWindow } from './components/movie-details-window/movieDetailsWindow.mjs'

customElements.define('the-hero', TheHero);
customElements.define('header-navbar', HeaderNavbar);
customElements.define('trending-section', TrendingSection);
customElements.define('movie-details-window', MovieDetailsWindow);