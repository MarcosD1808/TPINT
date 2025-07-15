
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

// Pagina de perfil
document.addEventListener('DOMContentLoaded', () => {

  // 1. Obtener usuarioActual
  let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

  // 2. Mostrar datos en pantalla
  document.getElementById('nombreUsuario').textContent = usuarioActual.nombre || '';
  document.getElementById('apellidoUsuario').textContent = usuarioActual.apellido || '';
  document.getElementById('correoUsuario').textContent = usuarioActual.email || '';
  document.getElementById('usuarioUsuario').textContent = `@${usuarioActual.usuario || ''}`;

  // Resetear radios
  document.querySelectorAll('input[name="FormaPago"]').forEach(radio => {
    radio.checked = false;
  });

  if (usuarioActual.metodoPago) {
    const metodo = usuarioActual.metodoPago;

    const radio = document.querySelector(`input[name="FormaPago"][value="${metodo}"]`);
    if (radio) radio.checked = true;

    if (metodo === 'Tarjeta') {
      document.getElementById('CardNumber').value = usuarioActual.cardNumber || '';
      document.getElementById('CVV').value = usuarioActual.cvv || '';
    }

    if (metodo === 'Cupon') {
      document.getElementById('PagoFacil').checked = usuarioActual.pagoFacil || false;
      document.getElementById('Rapipago').checked = usuarioActual.rapipago || false;
    }
  }

  // 3. Listener de submit
  const formEditar = document.getElementById('formEditarPerfil');
  if (formEditar) {
    formEditar.addEventListener('submit', function(e) {
      e.preventDefault();

      const passwordInput = document.getElementById('password');
      const confirmarPasswordInput = document.getElementById('confirmarPassword');
      const metodoPagoRadios = document.getElementsByName('FormaPago');
      const cardNumberInput = document.getElementById('CardNumber');
      const cvvInput = document.getElementById('CVV');
      const pagoFacilCheck = document.getElementById('PagoFacil');
      const rapipagoCheck = document.getElementById('Rapipago');

      // Validar password
      if (passwordInput.value !== confirmarPasswordInput.value) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      if (passwordInput.value.trim() !== '') {
        usuarioActual.password = passwordInput.value.trim();
      }

      // Actualizar usuarios en localStorage
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const index = usuarios.findIndex(u => u.usuario === usuarioActual.usuario);
      if (index !== -1) {
        usuarios[index] = {...usuarios[index], ...usuarioActual};
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
      }
    });
  }

});