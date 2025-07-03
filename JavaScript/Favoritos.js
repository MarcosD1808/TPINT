const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));


const botonesFav = document.querySelectorAll(".fav");

botonesFav.forEach((boton) => {
    boton.addEventListener("click", () => {
        const id = boton.dataset.id;
        const indiceEnUsuarios = usuarios.findIndex(u => u.usuario === usuarioActual.usuario);
        const index = usuarioActual.favoritos.indexOf(id);

        if (index ===-1){
            usuarioActual.favoritos.push(id);
            boton.classList.add("favorito-active");

            if(indiceEnUsuarios !== -1){
                usuarios[indiceEnUsuarios] = usuarioActual;
            }
       
        } else{
            usuarioActual.favoritos.splice(index, 1)
            boton.classList.remove("favorito-active");

            if(indiceEnUsuarios !== -1){
                usuarios[indiceEnUsuarios] = usuarioActual;
            }
        
        }
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    });
});
