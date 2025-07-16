
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
 agregarEventosFavoritos();
 asegurarQueQuedenMarcadosLosFavoritosDelUsuarioActual();
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
