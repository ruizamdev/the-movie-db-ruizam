import { navbarScrollTransform } from './navbarScrollTransform.mjs';
import { searchBarInteractive } from './searchBarInteractive.mjs';
import { getTrendingMoviesPreview } from './getTrendingMoviesPreview.mjs';
import { header, headerLogo, movieDetailsWindow } from './constants.mjs';

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