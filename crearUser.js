const form = document.getElementById('formCrearUsuario');
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

function actualizarEstadoBoton() {
  btnConfirmar.disabled = !esFormularioValido();
}

// Inicializa el botón como deshabilitado
// === Inicialización ===
[nombreInput, apellidoInput, emailInput, usuarioInput, passwordInput, confirmarPasswordInput, cardNumberInput, cvvInput]
  .forEach(input => input.addEventListener('input', actualizarEstadoBoton));
metodoPagoRadios.forEach(r => r.addEventListener('change', actualizarEstadoBoton));

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
    password: passwordInput.value.trim()
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