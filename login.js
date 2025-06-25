
const btnLogin = document.getElementById('btnLogin');
const usernameInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');

function validarCampos() {
    userValido = usernameInput.value.trim() !== '';
    passValido = passwordInput.value.trim() !== '';

    btnLogin.disabled = !(userValido && passValido);
}


usernameInput.addEventListener('input', validarCampos);
passwordInput.addEventListener('input', validarCampos);

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioIngresado = usernameInput.value.trim();
    const passwordIngresado = passwordInput.value.trim();

    const usuarioValido = usuarios.find(usuario =>
        usuario.usuario === usuarioIngresado && usuario.password === passwordIngresado
    );
    if (usuarioValido) {
        window.location.href = 'home.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});


