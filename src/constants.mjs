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

async function getDOMConstants() {
    await customElements.whenDefined('movie-info-card')
    const movieInfoCard = document.querySelector('movie-info-card');
    // Ventana modal que muestra los detalles de la película
    const movieDetailsWindow = movieInfoCard.shadowRoot.querySelector('.movie-details-window');
    // Animación de carga dentro de la ventana de detalles
    const movieDetailsWindowLoader = movieInfoCard.shadowRoot.querySelector('.loader-animation');
    // Contenedor principal de la información de la película
    const movieDetailsContainer = movieInfoCard.shadowRoot.querySelector('.movie-details');
    // Div donde se inyectan dinámicamente elementos de detalle
    const movieDetailsDiv = movieInfoCard.shadowRoot.querySelector('.movie-details-div');

    return {
        api,
        movieInfoCard,
        movieDetailsWindow,
        movieDetailsWindowLoader,
        movieDetailsContainer,
        movieDetailsDiv,
        // Elementos específicos del contenedor de detalles:
        moviePoster: movieDetailsContainer.querySelector('.movie-poster'),           // Póster de la película
        movieTitle: movieDetailsContainer.querySelector('.movie-title'),             // Título en pantalla
        movieOriginalTitle: movieDetailsContainer.querySelector('.movie-originalTitle'), // Título original
        movieReleaseDate: movieDetailsContainer.querySelector('.movie-releaseDate'), // Fecha de estreno
        movieGenresList: movieDetailsContainer.querySelector('.movie-genres'),       // Lista de géneros
        movieRuntime: movieDetailsContainer.querySelector('.movie-runtime'),         // Duración en minutos
        movieRate: movieDetailsContainer.querySelector('.movie-rate'),               // Calificación promedio
        movieVotes: movieDetailsContainer.querySelector('.movie-votes'),             // Número de votos
        moviePopularity: movieDetailsContainer.querySelector('.movie-popularity'),   // Popularidad
        movieTagline: movieDetailsContainer.querySelector('.movie-tagline'),         // Lema de la película
        movieOverview: movieDetailsContainer.querySelector('.movie-overview'),       // Sinopsis

        // Fondo semitransparente de la ventana de detalles (para cerrar al clic)
        movieDetailsWindowBackground: movieDetailsWindow.querySelector('.movie-details-window__background'),
        // Botón de cierre de la ventana de detalles
        closeWindow: movieDetailsWindowBackground.querySelector('.close-window'),

        // Elementos del encabezado de la aplicación
        headerContainer: document.querySelector('.header-container'), // Wrapper del header
        headerLogo: document.querySelector('.header-logo'),           // Logo clicable

        // URLs base para las imágenes (backdrops y posters)
        backdropImagesURL: 'https://image.tmdb.org/t/p/original',
        posterImagesURL: 'https://image.tmdb.org/t/p/w500'
    }
}

export { api, getDOMConstants };