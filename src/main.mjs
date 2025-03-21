import { navbarScrollTransform } from './navbarScrollTransform.mjs';
import { searchBarInteractive } from './searchBarInteractive.mjs';
import { getTrendingMoviesPreview } from './getTrendingMoviesPreview.mjs';
import { header, headerLogo, movieDetailsWindow, movieDetailsWindowLoader } from './constants.mjs';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loading() {
  movieDetailsWindow.classList.remove('inactive');
  movieDetailsWindowLoader.classList.remove('inactive');
  await delay(1500);
  movieDetailsWindow.classList.add('inactive');
  movieDetailsWindowLoader.classList.add('inactive');
}
// debugger;
loading();

headerLogo.addEventListener('click', () => {
  window.location.hash = '';
  movieDetailsWindow.classList.add('inactive');
  document.body.style.position = 'static';
  header.style = '';
});

navbarScrollTransform();
searchBarInteractive();

if (window.location.hash.startsWith('') || window.location.hash.startsWith('#')) {
  getTrendingMoviesPreview();
};