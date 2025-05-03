// openMovieDetailsWindow.mjs

// Import API helper, DOM elements and constants from constants.mjs
import { api, getDOMConstants } from "./constants.mjs";


// Función principal que abre y llena la ventana de detalles de una película
export async function openMovieDetailsWindow(movieId) {

  const {
    movieInfoCard,
    movieDetailsWindow,
    movieDetailsWindowLoader,
    movieDetailsWindowBackground,
    movieDetailsContainer,
    movieDetailsDiv,
    moviePoster,
    movieTitle,
    movieOriginalTitle,
    movieReleaseDate,
    movieOverview,
    movieGenresList,
    movieCompaniesList
  } = getDOMConstants();

  // Actualizar hash en la url 
  window.location.hash = `#movieID=${movieId}`;

  console.group("Prueba de constantes")

  console.log(`Movie info card: ${movieInfoCard}`);

  console.groupEnd()

  // // Actualiza el hash de la URL para reflejar el ID de la película abierta
  // window.location.hash = `#movieID=${movieId}`;
  
  // // 2. Muestra la ventana de detalles y el loader
  // movieInfoCard.classList.remove("inactive");
  // movieDetailsWindowLoader.classList.remove("inactive");
  // movieDetailsWindowBackground.classList.remove("inactive");
  
  // // 3. Llama a la API de TMDB para obtener los datos de la película seleccionada
  // const { data } = await api(`/movie/${movieId}`);
  // const movieHomepage = data.homepage;            // captura la URL de la página oficial
  // console.log(movieHomepage);                     // debug: muestra la URL en consola

  // // 4. Establece la imagen de fondo de la ventana con el backdrop de la película
  // movieDetailsWindowBackground.style.backgroundImage = 
  //   `url("${backdropImagesURL}${data.backdrop_path}")`;

  // // 5. Asigna el poster de la película al elemento img correspondiente
  // moviePoster.setAttribute("src", `${posterImagesURL}${data.poster_path}`);

  // // 6. Rellena los campos de título y título original
  // movieTitle.innerHTML = data.title;
  // movieOriginalTitle.innerHTML = data.original_title;

  // // 7. Formatea y muestra la fecha de estreno en formato local (es-MX)
  // const getDate = data.release_date.split("-");
  // let [year, month, day] = getDate;
  // const date = new Date(Date.UTC(year, month, day));
  // movieReleaseDate.innerHTML = new Intl.DateTimeFormat("es-MX").format(date);

  // // 8. Extrae y lista los géneros de la película
  // const movieGenres = data.genres;                 // array de objetos { id, name }
  // const genres = [];
  // movieGenres.forEach((genre) => {
  //   genres.push(genre.name);
  // });
  // movieGenresList.innerHTML = genres;              // inyecta nombres de géneros

  // // 9. Calcula y muestra la duración en horas y minutos
  // const runtimeInMinutes = data.runtime;
  // const runtimeMinus1Hour = setRuntime();
  // function setRuntime() {
  //   if (runtimeInMinutes > 60 && runtimeInMinutes < 120) {
  //     return runtimeInMinutes - 60;                // menos 1 hora
  //   } else if (runtimeInMinutes > 120 && runtimeInMinutes < 180) {
  //     return runtimeInMinutes - 120;               // menos 2 horas
  //   } else {
  //     return;                                      // casos fuera de rango
  //   }
  // }
  // movieRuntime.innerHTML = `1h${runtimeMinus1Hour}m`;

  // // 10. Muestra calificación, votos y popularidad
  // movieRate.innerHTML = data.vote_average;         // promedio de votos
  // movieVotes.innerHTML = `${data.vote_count}`;     // número total de votos
  // moviePopularity.innerHTML = `${data.popularity.toFixed(1)}%`;

  // // 11. Si existe tagline, lo muestra; si no, emite advertencia en consola
  // if (!data.tagline) {
  //   console.warn('no tagline');
  // } else {
  //   movieTagline.innerHTML = `"${data.tagline}"`;
  // }

  // // 12. Inserta la sinopsis de la película
  // movieOverview.innerHTML = data.overview;

  // // 13. Si no existe botón de enlace, lo crea si hay URL de homepage
  // const movieLinkBtn = movieDetailsDiv.querySelector(".movie-linkBtn");
  // if (!movieLinkBtn) {
  //   if (!movieHomepage) {
  //     console.warn('No homepage link');
  //   } else {
  //     const movieLinkBtn = document.createElement("button");
  //     movieLinkBtn.classList.add("movie-linkBtn");
  //     movieLinkBtn.innerHTML = "Página Oficial";
  //     movieDetailsDiv.appendChild(movieLinkBtn);
  //     movieLinkBtn.addEventListener('click', () => {
  //       open(movieHomepage);                       // abre la página oficial en nueva ventana
  //     });
  //   }
  // }

  // // 14. Bloquea el scroll del body y quita el fondo del header
  // document.body.style.position = "fixed";
  // // header.setAttribute("style", "background: none");

  // // 15. Configura el evento de cerrar ventana para restaurar estado original
  // closeWindow.addEventListener("click", () => {
  //   window.location.hash = "";                     // limpia el hash de la URL
  //   movieInfoCard.classList.add("inactive");  // oculta la ventana
  //   document.body.style.position = "static";       // habilita scroll
  //   headerLogo.style = '';                             // restaura estilo de header
  // });

  // // Después de terminar toda la manipulación del DOM
  // requestAnimationFrame(() => {
  //   movieDetailsWindowLoader.classList.add("inactive"); // Ocultamos loader
  // });

};