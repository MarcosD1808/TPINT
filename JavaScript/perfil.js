
const peliculasJSON = localStorage.getItem("peliculas");
const peliculas = peliculasJSON ? JSON.parse(peliculasJSON) : DATA_PELICULAS;
const seriesJSON = localStorage.getItem("series");
const series = seriesJSON ? JSON.parse(seriesJSON) : DATA_SERIES;
let usuario = JSON.parse(localStorage.getItem("usuarioActual"));
let contenedorP=document.getElementById("ContainerPelis")
let contenedorS=document.getElementById("ContainerSeries")
const peliculasFavoritas = usuario.pelisfavoritos
const seriesFavoritas = usuario.seriesfavoritos

    peliculasFavoritas.forEach((peli) => {
    const card = document.createElement("div");
    card.className = "CardsContenidos";
    card.innerHTML = `  
      <ul class="CardTitle">
      <li><a class="IDTitle" href="DetallePeli.html?id=${peli}">${peliculas[peli].titulo}</a></li>
      <li><span class="material-icons fav" data-tipo="Peli" data-id=${peli}>favorite</span></li>
      </ul> 
      <a href="DetallePeli.html?id=${peli}">     
        <img class="PosterContenidos" src="${peliculas[peli].portadaJPG}" alt="${peliculas[peli].titulo}">
      </a> `;
    contenedorP.appendChild(card);
  });
seriesFavoritas.forEach((serie) => {
    const card = document.createElement("div");
    card.className = "CardsContenidos";
    card.innerHTML = `
      <ul class="CardTitle">
      <li><a class="IDTitle" href="detalle-series.html?id=${serie}">${series[serie].titulo}</a></li>
      <li><span class="material-icons fav" data-tipo="serie" data-id=${serie} >favorite</span></li>
      </ul>  
      <a href="detalle-series.html?id=${serie}">
        <img class="PosterContenidos" src="${series[serie].portadaJPG}" alt="${series[serie].titulo}">
      </a>`;
    contenedorS.appendChild(card);  });

