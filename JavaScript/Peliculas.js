//ASI LO COMO LO HACE EL PROFE
/*let peliculas = [];
const peliculasJSON = localStorage.getItem("peliculas");
if(!peliculasJSON){
    localStorage.setItem("peliculas", JSON.stringify(DATA_PELICULAS));
    peliculas = DATA_PELICULAS
}else{
    peliculas = JSON.parse(peliculasJSON);
}*/
//ESTO ME LO RECOMENDO CHAT GPT
const peliculasJSON = localStorage.getItem("peliculas");
const peliculas = peliculasJSON ? JSON.parse(peliculasJSON) : DATA_PELICULAS;
AgregarContenido(1);


function AgregarContenido(numeroDePelicula){
    let peliculaSeleccionada = numeroDePelicula;
    console.log(peliculas);
    try{
    
    const titulo = peliculas[peliculaSeleccionada].titulo;
    document.getElementById("titulo").textContent = titulo;

    const duracion = peliculas[peliculaSeleccionada].duracion;
    document.getElementById("duracion").textContent = duracion + " Min";

    const genero = peliculas[peliculaSeleccionada].genero;
    document.getElementById("genero").textContent = genero;
    
    const descripcion = peliculas[peliculaSeleccionada].descripcion;
    document.getElementById("descripcion").textContent = descripcion;

    const iframe = peliculas[peliculaSeleccionada].iframe;
    document.getElementById("iframe").src = iframe;

    const linkComenzar = peliculas[peliculaSeleccionada].iframe;
    document.getElementById("linkComenzar").setAttribute("onclick", "window.open('https://www.youtube.com/watch?v=q9BOtSBq-00', '_blank')");
    
    //cargar actores
    
    const actor1 = peliculas[peliculaSeleccionada].actores[0];
    const actor2 = peliculas[peliculaSeleccionada].actores[1];
    const actor3 = peliculas[peliculaSeleccionada].actores[2];
    const actor4 = peliculas[peliculaSeleccionada].actores[3];

    const actor1Link = peliculas[peliculaSeleccionada].linkActores[0];
    const actor2Link = peliculas[peliculaSeleccionada].linkActores[1];
    const actor3Link = peliculas[peliculaSeleccionada].linkActores[2];
    const actor4Link = peliculas[peliculaSeleccionada].linkActores[3];

   
    
    if (peliculas[peliculaSeleccionada].length < 4){ //Se saltea el if nose porque
        document.getElementById("actor1").textContent = actor1;
        document.getElementById("actor2").textContent = actor2;
        document.getElementById("actor3").textContent = actor3;

        document.getElementById("actor1").setAttribute("href", actor1Link);
        document.getElementById("actor2").setAttribute("href", actor2Link);
        document.getElementById("actor3").setAttribute("href", actor3Link);
        
    }else{
        document.getElementById("actor1").textContent = actor1;
        document.getElementById("actor2").textContent = actor2;
        document.getElementById("actor3").textContent = actor3;
        document.getElementById("actor4").textContent = actor4;

        document.getElementById("actor1").setAttribute("href", actor1Link);
        document.getElementById("actor2").setAttribute("href", actor2Link);
        document.getElementById("actor3").setAttribute("href", actor3Link);
        document.getElementById("actor4").setAttribute("href", actor4Link);

    }
    }catch(error){
        console.error("Error al generar contenido" + error);
    }
}
