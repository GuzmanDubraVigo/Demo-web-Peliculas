// Codigo que utiliza la API de The Movie Database (TMDb) para mostrar listas de películas,
// permitir búsquedas de películas por título y cambiar entre diferentes vistas (cuadrícula y lista)...

// Consultar README punto 1
const config = {
  apiKey: "15d2ea6d0dc1d476efbca3eba2b9bbfb",
  langIso: "es-ES",
  baseUrl: "https://api.themoviedb.org/3/",
};
const movieListType = {
  nowPlaying: "now_playing",
  popular: "popular",
  topRated: "top_rated",
  upcoming: "upcoming",
};
function filterMoviesData(movies) {
  return movies.map((movie) => {
    const { id, title, overview, poster_path, release_date, vote_average } =
      movie;
    return {
      cover: poster_path,
      title,
      description: overview,
      year: release_date.split("-").shift(),
      rating: vote_average,
      id,
    };
  });
}
// Consultar README punto 2
getListMoviesData(movieListType.popular, 1)
  .then((movies) => {
    console.log(movies);
  })
  .catch((error) => {
    console.error(error.message);
  });

// Consultar README punto 3  
async function getListMoviesData(movieListType, page = 1) {
  const movieListUrl = `${config.baseUrl}/movie/${movieListType}?language=${config.langIso}&api_key=${config.apiKey}&page=${page}`;
  const response = await fetch(movieListUrl);
  const data = await response.json();

  if (data?.success === false) {
    throw new Error(`Error(getListMoviesData): ${data.status_message}`);
  }

  return filterMoviesData(data?.results ?? [5]);
}
// Consultar README punto 4
window.onload = async function () {
  const moviesListContainer = document.getElementById("movies-list");
  const gridViewButton = document.getElementById("grid-view-button");
  const listViewButton = document.getElementById("list-view-button");
  const scrollToTopButton = document.getElementById("scroll-to-top-button");
  const movieListDropdown = document.getElementById("movie-list-dropdown"); // Obtener el dropdown

  let currentView = "grid"; // Vista inicial en cuadrícula
  let currentListType = "popular"; // Tipo de lista inicial

  // Función para cambiar entre vista en cuadrícula y vista en lista
  gridViewButton.addEventListener("click", function () {
    if (currentView !== "grid") {
      currentView = "grid";
      gridViewButton.classList.add("active");
      listViewButton.classList.remove("active");
      renderMovies();
    }
  });

  listViewButton.addEventListener("click", function () {
    if (currentView !== "list") {
      currentView = "list";
      gridViewButton.classList.remove("active");
      listViewButton.classList.add("active");
      renderMovies();
    }
  });

  // Función para renderizar las películas según la vista seleccionada
  async function renderMovies() {
    try {
      const movieList = await getListMoviesData(currentListType); // Obtener la lista de películas con el tipo seleccionado
      moviesListContainer.innerHTML = ""; // Limpiar contenido anterior en el contenedor de películas

      // Iterar sobre cada película en la lista y renderizarla en la interfaz de usuario
      movieList.forEach((movie) => {
        // Crear un elemento div para representar la película, con clases de estilo dependiendo de la vista actual
        const movieElement = document.createElement("div");
        movieElement.classList.add(
          "movie",
          currentView === "grid" ? "grid" : "list"
        );

        // Crear un elemento img para mostrar el póster de la película
        const imgElement = document.createElement("img");
        imgElement.classList.add("movie-poster");
        imgElement.src = `https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.cover}`;
        imgElement.alt = movie.title;

        // Crear un elemento div adicional para la información de la película
        const movieInfoElement = document.createElement("div");
        movieInfoElement.classList.add("movie-info");

        // Crear elementos para el título, año y descripción de la película
        const titleElement = document.createElement("h5");
        titleElement.classList.add("movie-title");
        titleElement.textContent = movie.title;

        const yearElement = document.createElement("p");
        yearElement.classList.add("movie-year");
        yearElement.textContent = `Año: ${movie.year}`;

        const descriptionElement = document.createElement("p");
        descriptionElement.classList.add("movie-description");
        descriptionElement.textContent = movie.description;

        const ratingElement = document.createElement("p");
        ratingElement.classList.add("movie-rating");
        ratingElement.textContent = `Rating: ${movie.rating}`;

        // Agregar los elementos de información de la película al elemento movieInfoElement
        movieInfoElement.appendChild(titleElement);
        movieInfoElement.appendChild(yearElement);
        movieInfoElement.appendChild(descriptionElement);
        movieInfoElement.appendChild(ratingElement);

        // Agregar el póster y la información de la película al elemento movieElement
        movieElement.appendChild(imgElement);
        movieElement.appendChild(movieInfoElement);

        // Agregar la película renderizada al contenedor principal de películas
        moviesListContainer.appendChild(movieElement);
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  // Llena el dropdown con opciones basadas en los tipos de lista
  for (const type in movieListType) {
    const option = document.createElement("option");
    option.value = movieListType[type];
    // Traducir los nombres de las opciones al español
    switch (type) {
      case "nowPlaying":
        option.textContent = "En cartelera";
        break;
      case "popular":
        option.textContent = "Populares";
        break;
      case "topRated":
        option.textContent = "Mejor valoradas";
        break;
      case "upcoming":
        option.textContent = "Próximas";
        break;
      default:
        break;
    }
    movieListDropdown.appendChild(option);
  }

  // Evento para detectar cuando el usuario cambie la selección en el dropdown
  movieListDropdown.addEventListener("change", function () {
    currentListType = this.value; // Actualizar el tipo de lista actual
    renderMovies(); // Volver a renderizar las películas con el nuevo tipo de lista seleccionado
  });

  // Renderizar inicialmente en cuadrícula
  renderMovies();

  // Mostrar el botón de scroll cuando se haga scroll
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 100) {
      // Mostrar el botón cuando se haya desplazado 100 píxeles
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  });

  // Función para desplazarse hacia arriba cuando se haga clic en el botón
  scrollToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};
// Consultar README punto 
// Busqueda de peliculas por titulo
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", function () {
    searchMovies();
  });

  function searchMovies() {
    const apiKey = "15d2ea6d0dc1d476efbca3eba2b9bbfb";
    const searchInput = document.getElementById("searchInput").value;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=es-ES&page=1&query=${encodeURIComponent(
      searchInput
    )}&api_key=${apiKey}`;

    fetch(searchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.results); // Mostrar los resultados en la consola
        displaySearchResults(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function displaySearchResults(results) {
    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = ""; // Limpiar resultados anteriores

    if (results.length === 0) {
      searchResultsDiv.textContent = "No se encontraron resultados.";
      return;
    }

    results.forEach((movie) => {
      const movieTitle = movie.title;
      const moviePoster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/150";
      const movieYear = movie.release_date
        ? movie.release_date.substring(0, 4)
        : "Desconocido";
      const movieOverview = movie.overview
        ? movie.overview
        : "Descripción no disponible";

      const movieElement = document.createElement("div");
      movieElement.classList.add("col-md-4", "mb-4");
      movieElement.innerHTML = `
          <div class="card">
            <img src="${moviePoster}" class="card-img-top" alt="${movieTitle}">
            <div class="card-body">
              <h5 class="card-title">${movieTitle}</h5>
              <p class="card-text">Descripción: ${movieOverview}</p>
              <p class="card-text">Año: ${movieYear}</p>
            </div>
          </div>
        `;
      searchResultsDiv.appendChild(movieElement);
    });
  }
});
