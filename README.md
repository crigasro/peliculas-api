# peliculas-api
API REST para solicitar películas.

El usuario podrá solicitar un listado de películas a partir de una cadena de búsqueda mediante el endpoint `/search?chain=<lo que se quiera buscar>`.
Ejemplo: `http://localhost:8080/search?chain=the-godfather`

También podrá buscar un detalle de una película dado su ID haciendo peticiones a `/getById?id=<el id de la película>`, pasando como parámetro lo que se quiere obtener. Esto sería:
* `&detail=title` devuelve el título de la película.
* `&detail=description` devuelve la descripción de la película.
* `&detail=cast` devuelve el listado de actores de la película.
* `&detail=poster` devuelve la URL de la imagen de la película.
Ejemplo: `http://localhost:8080/getById?id=1893&detail=cast`

