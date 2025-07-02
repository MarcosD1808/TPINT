// Cargar datos
const peliculasJSON = localStorage.getItem("peliculas");
const seriesJSON = localStorage.getItem("series");

const peliculas = peliculasJSON ? JSON.parse(peliculasJSON) : DATA_PELICULAS;
const series = seriesJSON ? JSON.parse(seriesJSON) : DATA_SERIES;

// Elementos del DOM
const contenedor = document.querySelector(".ContainerContenidos");
const selectCategoria = document.getElementById("selectCategoria");
const inputBusqueda = document.getElementById("Busqueda");

// ------------------------------
// FUNCIONES AUXILIARES
// ------------------------------

// Normaliza texto: minúsculas + sin tildes
function normalizarTexto(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Renderiza las películas y series en pantalla
function renderContenido(filtradasPelis, filtradasSeries) {
  contenedor.innerHTML = "";

  filtradasPelis.forEach((peli) => {
    const card = document.createElement("div");
    card.className = "CardsContenidos";
    card.innerHTML = `  
      <ul class="CardTitle">
      <a href="DetallePeli.html?id=${peliculas.indexOf(peli)}"><li>${peli.titulo}</a></li>
      <li><span class="material-icons fav" data-id=${peliculas.indexOf(peli)}>favorite</span></li>
      </ul>  
      <a href="DetallePeli.html?id=${peliculas.indexOf(peli)}">     
        <img class="PosterContenidos" src="${peli.portadaJPG}" alt="${peli.titulo}">
      </a>
      <ul class="CardInfo">
        <li>${peli.rating}</li>
        <li>${peli.estreno}</li>
        <li>${peli.duracion} min</li>
        <li>${peli.clasificacion}</li>
      </ul>
    `;
    contenedor.appendChild(card);
  });

  filtradasSeries.forEach((serie) => {
    const card = document.createElement("div");
    card.className = "CardsContenidos";
    card.innerHTML = `
      <ul class="CardTitle">
      <a href="detalle-series.html?id=${series.indexOf(serie)}"><li>${serie.titulo}</a></li>
      <li><span class="material-icons fav" data-id=${series.indexOf(serie)} >favorite</span></li>
      </ul>  
      <a href="detalle-series.html?id=${series.indexOf(serie)}">
        <img class="PosterContenidos" src="${serie.portadaJPG}" alt="${serie.titulo}">
      </a>
      <ul class="CardInfo">
        <li>${serie.rating}</li>
        <li>${serie.estreno}</li>
        <li>${serie.temporadas} temp</li>
        <li>${serie.clasificacion}</li>
      </ul>
    `;
    contenedor.appendChild(card);
  });
}

// ------------------------------
// FILTROS
// ------------------------------

// Función principal para aplicar filtros
function aplicarFiltros() {
  const generoSeleccionado = normalizarTexto(selectCategoria.value);
  const textoBusqueda = normalizarTexto(inputBusqueda.value.trim());

  let pelisFiltradas = peliculas;
  let seriesFiltradas = series;

  // Filtrado por género
  if (generoSeleccionado !== "" && generoSeleccionado !== "todas") {
    pelisFiltradas = pelisFiltradas.filter(peli => {
      const generosPeli = peli.genero
        .split(",")
        .map(g => normalizarTexto(g.trim()));
      return generosPeli.includes(generoSeleccionado);
    });

    seriesFiltradas = seriesFiltradas.filter(serie => {
      const generosSerie = serie.genero
        .split(",")
        .map(g => normalizarTexto(g.trim()));
      return generosSerie.includes(generoSeleccionado);
    });
  }

  // Filtrado por texto en nombre
  if (textoBusqueda !== "") {
    pelisFiltradas = pelisFiltradas.filter(peli =>
      normalizarTexto(peli.titulo).includes(textoBusqueda)
    );

    seriesFiltradas = seriesFiltradas.filter(serie =>
      normalizarTexto(serie.titulo).includes(textoBusqueda)
    );
  }

  renderContenido(pelisFiltradas, seriesFiltradas);
}

// Cambia el filtro al seleccionar género
selectCategoria.addEventListener("change", () => {
  aplicarFiltros();
});

// Busca por nombre al tipear
inputBusqueda.addEventListener("input", () => {
  aplicarFiltros();
});

// Mostrar todo inicialmente
renderContenido(peliculas, series);