export function navbarScrollTransform () {
  const navbar = document.querySelector('#header');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      navbar.classList.add('header-container--scrolled');
    } else if (window.scrollY <= 50) {
      navbar.classList.remove('header-container--scrolled');
    }
  })
};