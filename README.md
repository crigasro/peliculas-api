# peliculas-api
API REST para solicitar películas.

El usuario podrá solicitar un listado de películas a partir de una cadena de búsqueda mediante el endpoint `/search?chain=<lo que se quiera buscar>`. Se le devolverá en formato JSON.
Ejemplo: `http://localhost:8080/search?chain=the-godfather`

También podrá buscar un detalle de una película dado su ID haciendo peticiones a `/getById?id=<el id de la película>`, pasando como parámetro lo que se quiere obtener. Esto sería:
* `&detail=title` devuelve el título de la película.
* `&detail=description` devuelve la descripción de la película.
* `&detail=cast` devuelve el listado de actores de la película.
* `&detail=poster` devuelve la URL de la imagen de la película.
Ejemplo: `http://localhost:8080/getById?id=1893&detail=cast`

Ambas rutas están protegidas con JWT. Se ha añadido un usario mock, que es el que se autentica cuando se hace una petición POST a /login. El token generado, que será necesario añadir a la cabecera de la petición a `/search` o `/getById`, es el siguiente:
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImpvaG4iLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSJ9LCJpYXQiOjE1NzcyMTAzNzl9.y0IU2XkHefvwYQCyV8WQWVcRnHNRIHiHfCJ75jRVi6o`


