export function searchBarInteractive () {
  const searchIconContainer = document.querySelector('.search-icon-container');
  const searchIconPath = searchIconContainer.querySelector('#search-icon .path');
  const searchFormInput = document.querySelector('.searchForm-input');
  searchIconContainer.addEventListener('mouseenter', () => {
    searchIconPath.setAttribute('style', 'fill:#e2e2e2;');
  });
  searchIconContainer.addEventListener('mouseleave', () => {
    searchIconPath.setAttribute('style', 'fill:#77767c;')
  });
  searchIconContainer.addEventListener('click', () => {
    searchFormInput.classList.remove('inactive');
    searchFormInput.focus();
    document.addEventListener('click', (e) => {
      if (e.target.id === 'search-icon' || e.target.id === 'search-input') {
        return;
      } else {
        searchFormInput.classList.add('inactive');
      }
    })
  });
};