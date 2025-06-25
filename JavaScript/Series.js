const seriesJSON = localStorage.getItem("series");
const series = seriesJSON ? JSON.parse(seriesJSON) : DATA_SERIES;

AgregarContenidoSeries(4);
function AgregarContenidoSeries(serieSeleccionada){
    console.log(series);

    const titulo = series[serieSeleccionada].titulo;
    document.getElementById("titulo").textContent = titulo;

    const genero = series[serieSeleccionada].genero;
    document.getElementById("genero").textContent = genero;

    const descripcion = series[serieSeleccionada].descripcion;
    document.getElementById("descripcion").textContent = descripcion;

    const iframe = series[serieSeleccionada].iframe;
    document.getElementById("iframe").src = iframe;

    const actor1 = series[serieSeleccionada].actores[0];
    const actor2 = series[serieSeleccionada].actores[1];
    const actor3 = series[serieSeleccionada].actores[2];
    const actor4 = series[serieSeleccionada].actores[3];

    const actor1Link = series[serieSeleccionada].linkActores[0];
    const actor2Link = series[serieSeleccionada].linkActores[1];
    const actor3Link = series[serieSeleccionada].linkActores[2];
    const actor4Link = series[serieSeleccionada].linkActores[3];

    document.getElementById("actor1").textContent = actor1;
    document.getElementById("actor2").textContent = actor2;
    document.getElementById("actor3").textContent = actor3;
    document.getElementById("actor4").textContent = actor4;

    document.getElementById("actor1").setAttribute("href", actor1Link);
    document.getElementById("actor2").setAttribute("href", actor2Link);
    document.getElementById("actor3").setAttribute("href", actor3Link);
    document.getElementById("actor4").setAttribute("href", actor4Link);

    //Logica del Select
    const capitulosArray = series[serieSeleccionada].episodiosPorTemporada;
    const selectTemporadas = document.getElementById("selectTemporadas");
    const selectCapitulos = document.getElementById("selectCapitulos");

  
    capitulosArray.forEach((_, indexTemporada) => {
        const option = document.createElement('option');
        option.value = indexTemporada + 1;
        option.textContent = "Temporada " + (indexTemporada + 1);
        selectTemporadas.appendChild(option); 
        
    });
    selectTemporadas.addEventListener('change', () => {
        const temporadaNum = parseInt(selectTemporadas.value);
        const numCapitulos = capitulosArray[temporadaNum - 1];

        selectCapitulos.innerHTML = 'option value="" disabled selected></option>'
        for(let i = 1; i<= numCapitulos; i++){
            const option = document.createElement('option');
            option.value = i;
            option.textContent = "Capitulo: " + i;
            selectCapitulos.appendChild(option);
        }
    })

    
    
    
}