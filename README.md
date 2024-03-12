# Demo web Peliculas

Pruebas online

Este código es una aplicación web que utiliza la API de The Movie Database (TMDb) para mostrar listas de películas, permitir búsquedas de películas por título y cambiar entre diferentes vistas (cuadrícula y lista). A continuación, explicaré en detalle qué hace el código en cada parte:

1.-Configuración inicial y definición de funciones:

Se define un objeto config que contiene la clave de API de TMDb, el código de idioma y la URL base para las solicitudes a la API.
Se define un objeto movieListType que contiene los tipos de listas de películas disponibles, como "nowPlaying", "popular", "topRated" y "upcoming".
Se define una función filterMoviesData que toma un array de películas y devuelve un nuevo array con los datos filtrados y estructurados de cada película.

2.-Llamada inicial a getListMoviesData:

Se llama a la función getListMoviesData con el tipo de lista "popular" y la página 1.
Se imprime el resultado en la consola o maneja un error si ocurre.

3.-Función asíncrona getListMoviesData:

Esta función realiza una solicitud a la API de TMDb para obtener datos de películas según el tipo de lista y la página proporcionados.
Construye la URL de la solicitud utilizando los parámetros de configuración.
Realiza la solicitud a la API utilizando fetch y espera la respuesta.
Si la solicitud es exitosa, devuelve los datos de películas después de filtrarlos usando la función filterMoviesData. Si hay un error en la respuesta de la API, lanza una excepción.

4.-Carga de la ventana y configuración de la interfaz de usuario:

Se obtienen elementos del DOM como el contenedor de películas, los botones de cambio de vista, el botón de desplazamiento hacia arriba y el menú desplegable de tipos de lista.
Se establecen variables para la vista actual y el tipo de lista actual.
Se añaden escuchadores de eventos a los botones para cambiar entre vista de cuadrícula y vista de lista.
Se define la función renderMovies que se encarga de obtener las películas y renderizarlas en la interfaz de usuario según la vista seleccionada.
Se llena el menú desplegable con opciones basadas en los tipos de lista definidos.
Se añade un escuchador de eventos al menú desplegable para cambiar el tipo de lista actual y renderizar las películas nuevamente cuando se seleccione una opción diferente.
Se llama a renderMovies inicialmente para mostrar las películas populares en la vista de cuadrícula.
Se añade un escuchador de eventos al desplazamiento de la ventana para mostrar o ocultar el botón de desplazamiento hacia arriba.
Se define una función para desplazarse hacia arriba suavemente cuando se hace clic en el botón.

5.-Búsqueda de películas por título:

Se añade un escuchador de eventos al botón de búsqueda.
Cuando se hace clic en el botón, se llama a la función searchMovies.
Esta función construye la URL de búsqueda utilizando el término de búsqueda ingresado por el usuario y realiza una solicitud a la API de TMDb.
Si la solicitud es exitosa, muestra los resultados de la búsqueda en el elemento searchResultsDiv del DOM.
Si no se encuentran resultados, muestra un mensaje indicando que no se encontraron resultados.

*-Resumen

En resumen, este código utiliza la API de TMDb para mostrar listas de películas, permitir búsquedas de películas por título y cambiar entre diferentes vistas de cuadrícula y lista.
