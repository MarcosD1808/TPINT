const form = document.getElementById('formCrearUsuario');
const formEditar = document.getElementById('formEditarPerfil');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const emailInput = document.getElementById('correoElectronico');
const usuarioInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');
const confirmarPasswordInput = document.getElementById('confirmarPassword');
const metodoPagoRadios = document.getElementsByName('FormaPago');
const cardNumberInput = document.getElementById('CardNumber');
const cvvInput = document.getElementById('CVV');
const btnConfirmar = document.getElementById('btn-registrarse');
const btnGuardar = document.getElementById('btn-guardarCambios'); // Nuevo
const btnSubmit = btnConfirmar || btnGuardar; // Nuevo
const pagoFacilCheck = document.getElementById('PagoFacil'); // Nuevo
const rapipagoCheck = document.getElementById('Rapipago'); // Nuevo
const btnDelete = document.getElementById('btn-cancelar'); // Nuevo
const btnCerrarSesion = document.getElementById('btn-cerrarSesion'); // Nuevo

// === Funciones de validación ===
const regexLetras = /^[a-zA-Z\sÀ-ÿ]+$/; //solo letras y espacios, incluyendo acentos
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //correo electrónico básico
const regexUsuario = /^[a-zA-Z0-9]{3,}$/; //mínimo 3 caracteres alfanuméricos
const regexCVV = /^[1-9][0-9]{2}$/;// CVV de 3 dígitos, no puede empezar con 0

function validarNombreApellido(valor) {
  return regexLetras.test(valor.trim());
}

function validarEmail(valor) {
  return regexEmail.test(valor.trim());
}

function validarUsuario(valor) {
  return regexUsuario.test(valor.trim());
}

function validarPassword(valor) {
  if (valor.length < 8) return false;
  const letras = valor.match(/[a-zA-Z]/g) || []; // al menos 2 letras
  const numeros = valor.match(/[0-9]/g) || []; // al menos 2 números
  const especiales = valor.match(/[^a-zA-Z0-9]/g) || []; // al menos 2 caracteres especiales
  return letras.length >= 2 && numeros.length >= 2 && especiales.length >= 2; 
}

function confirmarPassword(pass, confirmar) {
  return pass === confirmar;
}

function metodoPagoSeleccionado() {
  return Array.from(metodoPagoRadios).some(radio => radio.checked);
}

function validarTarjeta(numero) {
  if (!/^\d{16}$/.test(numero)) return false;
  const digitos = numero.split('').map(Number);
  const suma = digitos.slice(0, 15).reduce((acc, val) => acc + val, 0);
  const ultimo = digitos[15];
  return (suma % 2 === 0 && ultimo % 2 === 1) || (suma % 2 === 1 && ultimo % 2 === 0);
}

function validarCVV(cvv) {
  return regexCVV.test(cvv);
}

function validarCupon() {
  return pagoFacilCheck.checked || rapipagoCheck.checked;
} // nuevo

function mostrarError(input, mensaje) {
  eliminarError(input);
  const span = document.createElement('span');
  span.className = 'error';
  span.style.color = 'red';
  span.textContent = mensaje;
  input.insertAdjacentElement('afterend', span);
}
// Elimina el mensaje de error si ya existe
// Esto es para evitar que se acumulen mensajes de error al corregir los campos
function eliminarError(input) {
  const siguiente = input.nextElementSibling;
  if (siguiente && siguiente.classList.contains('error')) {
    siguiente.remove();
  }
}

// === Validación al enviar ===
function validarFormulario() {
  let valido = true;

  if (!validarNombreApellido(nombreInput.value)) {
    mostrarError(nombreInput, 'Solo letras y espacios.');
    valido = false;
  } else eliminarError(nombreInput);

  if (!validarNombreApellido(apellidoInput.value)) {
    mostrarError(apellidoInput, 'Solo letras y espacios.');
    valido = false;
  } else eliminarError(apellidoInput);

  if (!validarEmail(emailInput.value)) {
    mostrarError(emailInput, 'Correo inválido.');
    valido = false;
  } else eliminarError(emailInput);

  if (!validarUsuario(usuarioInput.value)) {
    mostrarError(usuarioInput, 'Mínimo 3 caracteres alfanuméricos.');
    valido = false;
  } else eliminarError(usuarioInput);

  if (!validarPassword(passwordInput.value)) {
    mostrarError(passwordInput, 'Debe tener 8+ caracteres, 2 letras, 2 números, 2 especiales.');
    valido = false;
  } else eliminarError(passwordInput);

  if (!confirmarPassword(passwordInput.value, confirmarPasswordInput.value)) {
    mostrarError(confirmarPasswordInput, 'Las contraseñas no coinciden.');
    valido = false;
  } else eliminarError(confirmarPasswordInput);

  if (!metodoPagoSeleccionado()) {
    alert('Seleccioná un método de pago.');
    valido = false;
  }
// Validación del método de pago seleccionado
  const metodo = Array.from(metodoPagoRadios).find(r => r.checked);
  if (metodo?.value === 'Tarjeta') {
    if (!validarTarjeta(cardNumberInput.value)) {
      mostrarError(cardNumberInput, 'Tarjeta inválida.');
      valido = false;
    } else eliminarError(cardNumberInput);

    if (!validarCVV(cvvInput.value)) {
      mostrarError(cvvInput, 'CVV inválido.');
      valido = false;
    } else eliminarError(cvvInput);
  }

  return valido;
}


function esFormularioValido() {
  return (
    validarNombreApellido(nombreInput.value) &&
    validarNombreApellido(apellidoInput.value) &&
    validarEmail(emailInput.value) &&
    validarUsuario(usuarioInput.value) &&
    validarPassword(passwordInput.value) &&
    confirmarPassword(passwordInput.value, confirmarPasswordInput.value) &&
    metodoPagoSeleccionado()
  ); // Verifica si el formulario es válido
  // Si el método de pago es tarjeta, también valida los campos de tarjeta y CVV
}

function validarFormularioComun() {   // VALIDACION DE PERFIL.HTML
  let valido = true;

  if (!validarPassword(passwordInput.value)) {
    valido = false;
  }
  if (!confirmarPassword(passwordInput.value, confirmarPasswordInput.value)) {
    valido = false;
  }

  if (!metodoPagoSeleccionado()) {
    valido = false;
  } else {
    const metodo = Array.from(metodoPagoRadios).find(r => r.checked);
    if (metodo?.value === 'Tarjeta') {
      if (!validarTarjeta(cardNumberInput.value)) {
        valido = false;
      }
      if (!validarCVV(cvvInput.value)) {
        valido = false;
      }
    }
    if (metodo?.value === 'Cupon') {
      if (!validarCupon()) valido = false;
    }
  }

  return valido;
}


function actualizarEstadoBoton() {
  if (btnSubmit) btnSubmit.disabled = !validarFormularioComun();
}

// Inicializa el botón como deshabilitado
// === Inicialización ===
if (form || formEditar) {
  [passwordInput, confirmarPasswordInput, cardNumberInput, cvvInput]
    .forEach(input => input?.addEventListener('input', actualizarEstadoBoton));

  metodoPagoRadios.forEach(r => r.addEventListener('change', actualizarEstadoBoton));

  if (pagoFacilCheck) pagoFacilCheck.addEventListener('change', actualizarEstadoBoton);
  if (rapipagoCheck) rapipagoCheck.addEventListener('change', actualizarEstadoBoton);
}
if (form) {
// === Evento de envío del formulario ===
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita el envío automático

  if (!validarFormulario()) {
    alert('Por favor corregí los errores antes de continuar.');
    return;
  }
// Si el formulario es válido, se procede a crear el usuario
// === Crear usuario ===
  const nuevoUsuario = {
    nombre: nombreInput.value.trim(),
    apellido: apellidoInput.value.trim(),
    email: emailInput.value.trim(),
    usuario: usuarioInput.value.trim(),
    password: passwordInput.value.trim(),
    favoritos: []
  }; 

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Validar si ya existe el usuario
  if (usuarios.some(u => u.usuario === nuevoUsuario.usuario)) {
    alert('El usuario ya existe. Por favor, elige otro nombre de usuario.');
    return;
  }

  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios)); 
  // Guardar en localStorage

  alert('Usuario creado exitosamente. Ahora podés iniciar sesión.');
  window.location.href = 'index.html';
});
}
// === Evento de envío del formulario de edición ===
// Solo se activa si el formulario de edición existe
if (formEditar) {
  formEditar.addEventListener('submit', function(e) {
    e.preventDefault();

   if (!validarFormularioComun()) {
      return;
    }

    // Obtener usuario actual y lista de usuarios
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar usuario en array
    const index = usuarios.findIndex(u => u.usuario === usuarioActual.usuario);
    if (index === -1) {
      return;
    }

    // Actualizar datos básicos 
    // actualiza solo la contraseña si se ingresó
    if (passwordInput.value.trim() !== '') {
      usuarios[index].password = passwordInput.value.trim();
      usuarioActual.password = passwordInput.value.trim();
    }

    // Actualizar método de pago
     const metodoSeleccionado = Array.from(metodoPagoRadios).find(r => r.checked);
    if (metodoSeleccionado) {
      usuarioActual.metodoPago = metodoSeleccionado.value;

      if (metodoSeleccionado.value === 'Tarjeta') {
        usuarioActual.cardNumber = cardNumberInput.value.trim();
        usuarioActual.cvv = cvvInput.value.trim();

        // Elimina posibles datos anteriores de cupón
        delete usuarioActual.pagoFacil;
        delete usuarioActual.rapipago;

      } else if (metodoSeleccionado.value === 'Cupon') {
        usuarioActual.pagoFacil = pagoFacilCheck.checked;
        usuarioActual.rapipago = rapipagoCheck.checked;

        // Elimina posibles datos anteriores de tarjeta
        delete usuarioActual.cardNumber;
        delete usuarioActual.cvv;

      } else {
        // Transferencia: eliminar ambos tipos de datos
        usuarioActual.metodoPago = 'Transferencia';
        delete usuarioActual.cardNumber;
        delete usuarioActual.cvv;
        delete usuarioActual.pagoFacil;
        delete usuarioActual.rapipago;
      }
      }

    // Actualizar array de usuarios con los datos modificados
    usuarios[index] = {...usuarios[index], ...usuarioActual};

    // Guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

    alert('Perfil actualizado con éxito.');

    window.location.href = 'home.html';
  });
// === Evento de clic en el botón de cerrar sesión ===
  if (btnDelete) {
    btnDelete.addEventListener('click', function(e) {
      e.preventDefault();
      const confirmacion = confirm('¿Estás seguro de que querés cancelar tu suscripción? Esta acción no se puede deshacer.');
      if (confirmacion) {
        // Eliminar usuario actual del localStorage
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.filter(u => u.usuario !== usuarioActual.usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.removeItem('usuarioActual'); // Elimina el usuario actual

        alert('Suscripción cancelada exitosamente.');
        window.location.href = 'index.html'; // Redirigir a la página de inicio
      }
    });
  }
}

// === Evento de clic en el botón de cerrar sesión ===
if (btnCerrarSesion) {
  btnCerrarSesion.addEventListener('click', function(e) {
    e.preventDefault();
    const confirmacion = confirm('¿Estás seguro de que querés cerrar sesión?');
    if (confirmacion) {
      localStorage.removeItem('usuarioActual'); // Elimina el usuario actual
      alert('Sesión cerrada exitosamente.');
      window.location.href = 'index.html'; // Redirigir a la página de inicio
    }
  });
}

