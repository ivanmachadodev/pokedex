const button = document.getElementById("cargarPokemon");

button.addEventListener("click", cargarPokemon)

function cargarPokemon() {
    elegirPokemon();
}

const elegirPokemon = async () => {
    const { value: pokemon } = await Swal.fire({
        title: 'Elige a tu pokemon',
        input: 'text',
        inputLabel: 'Ingresa nombre o ID',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Yo te elijo!',
        inputValidator: (value) => {
            if (!value) {
                return 'Deberias elegir uno, no te parece?'
            }
        }
    })

    try {
        let pokemonElegido = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).
            then((respuesta) => respuesta.json()).
            then((respuestaFinal) => respuestaFinal);

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: `Elegiste a ${pokemonElegido.name}`
        })

        console.log(pokemonElegido);

        agregarPokemon(pokemonElegido);

    } catch {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontro el pokemon que buscabas',
        })
    }



}

function agregarPokemon(seleccion) {
    const section = document.getElementById("pokedex");

    section.classList.add("section-pokedex");
    const article = section.appendChild(document.createElement("article"));
    article.classList.add("card-pokemon");
    const div1 = article.appendChild(document.createElement("div"));
    const div2 = article.appendChild(document.createElement("div"));
    const imagen = div1.appendChild(document.createElement("img"));
    const nombre = div2.appendChild(document.createElement("h3"));


    nombre.innerHTML = `#${seleccion.id} - ${seleccion.name}`;
    imagen.src = seleccion.sprites.front_default;

    for (i = 0; i < seleccion.types.length; i++) {
        const tipo = div2.appendChild(document.createElement("p"));
        tipo.innerHTML = seleccion.types[i].type.name;
        tipo.style.color = colorTipo(seleccion.types[i].type.name);
    }

    article.style.backgroundColor = colorTipo(seleccion.types[0].type.name);

}

function colorTipo(expresion) {
    switch (expresion) {
        case 'water':
            return "aqua";
        case 'fire':
            return "orange";
        case 'electric':
            return "steelblue";
        case 'poison':
            return "coral";
        case 'grass':
            return "green";
        case 'normal':
            return "burlywood";
        default:
            return "turquoise";
    }
}





