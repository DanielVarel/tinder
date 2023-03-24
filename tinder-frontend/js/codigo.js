var usuarios = [];
var aux = [];
var usuarioSeleccionado = {};
var usuarioSeleccionado1 = {};
var generoMujeres = false;
var generoHombres = false;

const obtenerUsuarios = () => {
    fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((res) => res.json())
        .then((respuestaUsuarios) => {
            console.log(respuestaUsuarios);
            usuarios = respuestaUsuarios;
            aux = respuestaUsuarios;
            renderizarUsuarios();
        });
        
}

obtenerUsuarios();
var usuarioMostradoActual=1;

function siguinetePerfil(){
    mostrarPerfil(usuarioMostradoActual)
    if(usuarioMostradoActual > usuarios.length -1){
        usuarioMostradoActual = 1;
    }else{
        usuarioMostradoActual++;
    }
}

function anteriorPerfil(){
    mostrarPerfil(usuarioMostradoActual)
    if(usuarioMostradoActual <= 1){
        usuarioMostradoActual = usuarios.length-1;
    }else{
        usuarioMostradoActual--;
    }
}



function mostrarPerfil(id){
    console.log("este es el usuario ", id);
    fetch('http://localhost:3000/users/' + id, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((respuesta) => respuesta.json())
        .then((usuario) => {
            console.log(usuario);
            usuarioSeleccionado = usuario;
        });

        let Check = "";

        if(usuarioSeleccionado.verificado == true){
            Check = `<i class="fa-regular fa-circle-check"></i>`;
        }else{
            Check  = ``;
        }

        if(generoMujeres == true){
            if(usuarioSeleccionado.genero == "F"){
                document.getElementById("detalles-perefil").innerHTML = ` <div class="contenedor-de-portada" id="contenedor-de-portada" style="background-image: url(Imagenes/${usuarioSeleccionado.imagenPortada});">
                                                                <div class="contenedor-infor-perfil">
                                                                    <p class="nombre-del-perfil">${usuarioSeleccionado.nombre} <span>${usuarioSeleccionado.edad}</span><span class="check" id="check">${Check}</span></p>
                                                                    <p><i class="fa-solid fa-briefcase"></i> ${usuarioSeleccionado.ocupacion}</p>
                                                                    <p><i class="fa-solid fa-location-dot"></i> ${usuarioSeleccionado.ciudad}</p>
                                                                </div>
                                                            </div>` 
            }
        }
        

        if(generoHombres == true){
            if(usuarioSeleccionado.genero == "M"){
                document.getElementById("detalles-perefil").innerHTML = ` <div class="contenedor-de-portada" id="contenedor-de-portada" style="background-image: url(Imagenes/${usuarioSeleccionado.imagenPortada});">
                                                                <div class="contenedor-infor-perfil">
                                                                    <p class="nombre-del-perfil">${usuarioSeleccionado.nombre} <span>${usuarioSeleccionado.edad}</span><span class="check" id="check">${Check}</span></p>
                                                                    <p><i class="fa-solid fa-briefcase"></i> ${usuarioSeleccionado.ocupacion}</p>
                                                                    <p><i class="fa-solid fa-location-dot"></i> ${usuarioSeleccionado.ciudad}</p>
                                                                </div>
                                                            </div>` 
            }
        }
 
        if(generoMujeres == true && generoMujeres == true){
            if(usuarioSeleccionado.genero == "F" && usuarioSeleccionado.genero == "M"){
                document.getElementById("detalles-perefil").innerHTML = ` <div class="contenedor-de-portada" id="contenedor-de-portada" style="background-image: url(Imagenes/${usuarioSeleccionado.imagenPortada});">
                                                                <div class="contenedor-infor-perfil">
                                                                    <p class="nombre-del-perfil">${usuarioSeleccionado.nombre} <span>${usuarioSeleccionado.edad}</span><span class="check" id="check">${Check}</span></p>
                                                                    <p><i class="fa-solid fa-briefcase"></i> ${usuarioSeleccionado.ocupacion}</p>
                                                                    <p><i class="fa-solid fa-location-dot"></i> ${usuarioSeleccionado.ciudad}</p>
                                                                </div>
                                                            </div>` 
            }
        }                              
}

const renderizarUsuarios = () => {
    document.getElementById('contenedor-usuarios').innerHTML = '';
    usuarios.forEach(usuario => {
        document.getElementById('contenedor-usuarios').innerHTML +=
            `<div class="contenedor-usuario" onclick="seleccionarUsuario(${usuario.id})">
            <img src="imagenes/${usuario.imagenPerfil}">
            <p>${usuario.nombre}</p>
        </div>`;
    });
}

mostrarPerfiles();

function seleccionarUsuario(idUsuario) {
    console.log("este es el usuario ", idUsuario);
    fetch('http://localhost:3000/users/' + idUsuario, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }).then((respuesta) => respuesta.json())
    .then((usuario) => {
            console.log(usuario);
            usuarioSeleccionado1 = usuario;

            console.log('ppppppppppppppppp', usuarioSeleccionado1.generoInteres);

            let arreglo = usuarioSeleccionado1.generoInteres;

            if(arreglo.includes('F')){
                generoMujeres = true;
            }else{
                generoMujeres = false;
            }

            if(arreglo.includes('M')){
                generoHombres = true;
            }else{
                generoHombres = false;
            }
        });

    mostrarPerfilesDeInteres();
}

function mostrarMatchesDeActual() {
    let matchesActuales = [];
    console.log('usuario actual tiene el id', usuarioSeleccionado1.id)
    let aux = ``;
    matchesActuales = usuarioSeleccionado1.matches;

    matchesActuales.sort();
    
    let a = matchesActuales[0];

    for (let i = 0; i < usuarios.length; i++) {
        if (Number(usuarios[i].id) === Number(a)) {
            console.log("este es el usuario ", i);

            a = matchesActuales[1];
            aux += ` <div class="match">
            <div class="contenedor-matches" id="contenedor-matches">
                <img src="Imagenes/${usuarios[i].imagenPerfil}">
            </div>
            <div class="info-matchas">
                <p class="nombre">${usuarios[i].nombre} <span class="edad"></span></p>
                <p class="ocupacion"><i class="fa-solid fa-briefcase"></i> ${usuarios[i].ocupacion}</p>
                <p class="ciudad"><i class="fa-solid fa-location-dot"></i> ${usuarios[i].ciudad}</p>
            </div>
            </div>`
        }
    }

    document.getElementById("match").innerHTML = `${aux}`;
}

// paradigma funcional
function mostrarPerfiles() {

    document.getElementById("perfiles").style.display = "block";
    document.getElementById("perfiles-de-interes").style.display = "none";
    document.getElementById("matches").style.display = "none";
    document.getElementById("contenedor-nuevo-usuario").style.display = "none";

    document.getElementById("usuario-selecionando").style.color = "#00ffff";
    document.getElementById("opction-perfiles").style.color = "#999797d3";
    document.getElementById("opcion-favoritos").style.color = "#999797d3";
}

function mostrarPerfilesDeInteres() {
    document.getElementById("perfiles").style.display = "none";
    document.getElementById("perfiles-de-interes").style.display = "block";
    document.getElementById("matches").style.display = "none";
    document.getElementById("contenedor-nuevo-usuario").style.display = "none";

    document.getElementById("usuario-selecionando").style.color = "#999797d3";
    document.getElementById("opction-perfiles").style.color = "#ff0000";
    document.getElementById("opcion-favoritos").style.color = "#999797d3";
    
}

function crearUsuario(){
    const nombre = document.getElementById('nombre').value;
    const genero = document.getElementById('genero').value;
    const edad = document.getElementById('edad').value;
    const ocupacion = document.getElementById('ocupacion').value;
    const intereses = document.getElementById('intereses').value;
    const ciudad = document.getElementById('ciudad').value;
    const generoInteres = document.getElementById('generoInteres').value;
    const imagenPerfil = document.getElementById('imagenPerfil').value;
    const imagenPortada = document.getElementById('imagenPortada').value;
    
    let user = {
        id: 1,
        nombre: nombre,
        genero: genero,
        edad: edad,
        imagenPerfil: imagenPerfil,
        imagenPortada: imagenPortada,
        ocupacion: ocupacion,
        ciudad: ciudad,
        intereses: intereses,
        matches: [7, 3],
        likes: [2, 3, 4],
        generoInteres: generoInteres
    }

    fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Se guardo esta usuario", data);
    })
}

function mostrarMatches() {
    document.getElementById("perfiles").style.display = "none";
    document.getElementById("perfiles-de-interes").style.display = "none";
    document.getElementById("matches").style.display = "block";
    document.getElementById("contenedor-nuevo-usuario").style.display = "none";

    document.getElementById("usuario-selecionando").style.color = "#999797d3";
    document.getElementById("opction-perfiles").style.color = "#999797d3";
    document.getElementById("opcion-favoritos").style.color = "#fbff00";

    mostrarMatchesDeActual();
}

function agregarNuevoUsuarios() {
    document.getElementById("perfiles").style.display = "none";
    document.getElementById("perfiles-de-interes").style.display = "none";
    document.getElementById("matches").style.display = "none";

    document.getElementById("contenedor-nuevo-usuario").style.display = "block";
    

    document.getElementById("usuario-selecionando").style.color = "#999797d3";
    document.getElementById("opction-perfiles").style.color = "#999797d3";
    document.getElementById("opcion-favoritos").style.color = "#999797d3";
}