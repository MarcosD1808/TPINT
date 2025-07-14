

function agregarEventosFavoritos() {
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
const botonesFav = document.querySelectorAll(".fav");

botonesFav.forEach((boton) => {
    boton.addEventListener("click", () => {
        const tipoDeElemento = boton.dataset.tipo;
        if(tipoDeElemento == "Peli") {
            const idPelis = boton.dataset.id;
            const indiceEnUsuarios = usuarios.findIndex(u => u.usuario === usuarioActual.usuario);
            const index = usuarioActual.pelisfavoritos.indexOf(idPelis);

            if (index ===-1){
                usuarioActual.pelisfavoritos.push(idPelis);
                boton.classList.add("favorito-active");

                if(indiceEnUsuarios !== -1){
                    usuarios[indiceEnUsuarios] = usuarioActual;
                }
       
            } else{
                usuarioActual.pelisfavoritos.splice(index, 1)
                boton.classList.remove("favorito-active");

            if(indiceEnUsuarios !== -1){
                usuarios[indiceEnUsuarios] = usuarioActual;
            }
        
        }
        }else if(tipoDeElemento == "serie") {
            const idSeries = boton.dataset.id;
            const indiceEnUsuarios = usuarios.findIndex(u => u.usuario === usuarioActual.usuario);
            const index = usuarioActual.seriesfavoritos.indexOf(idSeries);

            if (index ===-1){
                usuarioActual.seriesfavoritos.push(idSeries);
                boton.classList.add("favorito-active");

                if(indiceEnUsuarios !== -1){
                    usuarios[indiceEnUsuarios] = usuarioActual;
                }
       
            } else{
                usuarioActual.seriesfavoritos.splice(index, 1)
                boton.classList.remove("favorito-active");

            if(indiceEnUsuarios !== -1){
                usuarios[indiceEnUsuarios] = usuarioActual;
            }
        
        }
        
        }

        localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log(usuarios);
    });
});
}

function asegurarQueQuedenMarcadosLosFavoritosDelUsuarioActual() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const botonesFav = document.querySelectorAll(".fav");
    const seriesFavoritasDelUsuarioActual = usuarioActual.seriesfavoritos?.map(Number);
    const pelisFavoritasDelUsuarioActual = usuarioActual.pelisfavoritos?.map(Number);

    botonesFav.forEach((boton) => {
        
        const tipo= boton.dataset.tipo;
        const id=Number(boton.dataset.id);
        if(
            (tipo == "Peli" && pelisFavoritasDelUsuarioActual.includes(id)) ||
            (tipo == "serie" && seriesFavoritasDelUsuarioActual.includes(id))
        ){
            boton.classList.add("favorito-active");
        } else{
            boton.classList.remove("favorito-active");//Esto para cuando el usuario cambia
        }
        
    
    })
};