// Instancia de Axios preconfigurada para consumir la API de TMDB
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': 'bbda25d057b9c8c6bbf7f6966d3f9f1b',  // Clave de API pública
        'language': 'es-MX'                            // Idioma de respuesta
    }
});

// Ventana modal que muestra los detalles de la película
const movieDetailsWindow = document.querySelector('.movie-details-window');
// Animación de carga dentro de la ventana de detalles
const movieDetailsWindowLoader = document.querySelector('.loader-animation');
// Contenedor principal de la información de la película
const movieDetailsContainer = movieDetailsWindow.querySelector('.movie-details');
// Div donde se inyectan dinámicamente elementos de detalle
const movieDetailsDiv = movieDetailsWindow.querySelector('.movie-details-div');

// Elementos específicos del contenedor de detalles:
const moviePoster = movieDetailsContainer.querySelector('.movie-poster');           // Póster de la película
const movieTitle = movieDetailsContainer.querySelector('.movie-title');             // Título en pantalla
const movieOriginalTitle = movieDetailsContainer.querySelector('.movie-originalTitle'); // Título original
const movieReleaseDate = movieDetailsContainer.querySelector('.movie-releaseDate'); // Fecha de estreno
const movieGenresList = movieDetailsContainer.querySelector('.movie-genres');       // Lista de géneros
const movieRuntime = movieDetailsContainer.querySelector('.movie-runtime');         // Duración en minutos
const movieRate = movieDetailsContainer.querySelector('.movie-rate');               // Calificación promedio
const movieVotes = movieDetailsContainer.querySelector('.movie-votes');             // Número de votos
const moviePopularity = movieDetailsContainer.querySelector('.movie-popularity');   // Popularidad
const movieTagline = movieDetailsContainer.querySelector('.movie-tagline');         // Lema de la película
const movieOverview = movieDetailsContainer.querySelector('.movie-overview');       // Sinopsis

// Fondo semitransparente de la ventana de detalles (para cerrar al clic)
const movieDetailsWindowBackground = movieDetailsWindow.querySelector('.movie-details-window__background');
// Botón de cierre de la ventana de detalles
const closeWindow = movieDetailsWindowBackground.querySelector('.close-window');

// Elementos del encabezado de la aplicación
const headerContainer = document.querySelector('.header-container'); // Wrapper del header
const headerLogo = document.querySelector('.header-logo');           // Logo clicable

// URLs base para las imágenes (backdrops y posters)
const backdropImagesURL = 'https://image.tmdb.org/t/p/original';
const posterImagesURL = 'https://image.tmdb.org/t/p/w500';

export {
    api,
    movieDetailsWindow,
    movieDetailsWindowLoader,
    movieDetailsContainer,
    movieDetailsDiv,
    moviePoster,
    movieTitle,
    movieOriginalTitle,
    movieReleaseDate,
    movieGenresList,
    movieRuntime,
    movieRate,
    movieVotes,
    moviePopularity,
    movieTagline,
    movieOverview,
    movieDetailsWindowBackground,
    closeWindow,
    headerContainer,
    headerLogo,
    backdropImagesURL,
    posterImagesURL
}