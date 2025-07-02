
const peliculasJSON = localStorage.getItem("peliculas");
const peliculas = peliculasJSON ? JSON.parse(peliculasJSON) : DATA_PELICULAS;
const seriesJSON = localStorage.getItem("series");
const series = seriesJSON ? JSON.parse(seriesJSON) : DATA_SERIES;
let usuario = JSON.parse(localStorage.getItem("usuarioActual"));
let contenedorP=document.getElementById("ContainerPelis")
let contenedorS=document.getElementById("ContainerSeries")
const favoritos = usuario?.favoritos

function filtrarFavoritos(favoritosStrings, contenidoArray) {
  return contenidoArray.filter(item =>
    favoritosStrings.some(fav => fav.trim().toLowerCase() === item.titulo.trim().toLowerCase())
  );
}
const peliculasFavoritas = filtrarFavoritos(favoritos, peliculas);
const seriesFavoritas = filtrarFavoritos(favoritos, series);
console.log("Películas favoritas:", peliculasFavoritas);
console.log("Series favoritas:", seriesFavoritas);

    peliculasFavoritas.forEach((peli) => {
    const card = document.createElement("div");
    card.className = "CardsContenidos";
    card.innerHTML = `  
      <ul class="CardTitle">
      <li><a class="IDTitle" href="DetallePeli.html?id=${peliculas.indexOf(peli)}">${peli.titulo}</a></li>
      <li><span class="material-icons fav" >favorite</span></li>
      </ul> 
      <a href="DetallePeli.html?id=${peliculas.indexOf(peli)}">     
        <img class="PosterContenidos" src="${peli.portadaJPG}" alt="${peli.titulo}">
      </a> `;
    contenedorP.appendChild(card);
  });
seriesFavoritas.forEach((serie) => {
    const card = document.createElement("div");
    card.className = "CardsContenidos";
    card.innerHTML = `
      <ul class="CardTitle">
      <li><a class="IDTitle" href="detalle-series.html?id=${series.indexOf(serie)}">${serie.titulo}</a></li>
      <li><span class="material-icons fav" >favorite</span></li>
      </ul>  
      <a href="detalle-series.html?id=${series.indexOf(serie)}">
        <img class="PosterContenidos" src="${serie.portadaJPG}" alt="${serie.titulo}">
      </a>`;
    contenedorS.appendChild(card);  });

