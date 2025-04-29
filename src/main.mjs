// debugger;
/* Import components */
import { TheHero } from "./components/hero/hero.mjs";
import { HeaderNavbar } from "./components/header-navbar/header-navbar.mjs";
import { getTrendingMovies } from "./goHome.mjs";

/* Define components */
customElements.define('the-hero', TheHero);
customElements.define('header-navbar', HeaderNavbar);


/* function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function loading() {
  movieDetailsWindow.classList.remove('inactive');
  movieDetailsWindowLoader.classList.remove('inactive');
  await delay(1500);
  movieDetailsWindow.classList.add('inactive');
  movieDetailsWindowLoader.classList.add('inactive');
};

loading(); */

if(location.hash.startsWith('#peliculas')) {

} else if (location.hash.startsWith('#series')) {

} else if (location.hash.startsWith('#personas')) {

} else if (location.hash.startsWith('#Buscar')) {

} else if (location.hash.startsWith('#favoritos')){

} else {
  getTrendingMovies();
}