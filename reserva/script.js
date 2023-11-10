// Selecciono en el DOM y guardo en variables el formulario y cada input
let formularioReserva = document.querySelector("form#reserva");

let inputNombre = document.querySelector("input#nombre");
let errorNombre = document.querySelector("small#errorNombre");

let inputTelefono = document.querySelector("input#telefono")
let errorTelefono = document.querySelector("small#errorTelefono")

let inputEmail = document.querySelector("input#email")
let errorEmail = document.querySelector("small#errorEmail")

let destinos = document.getElementsByName('destino'); // Uso el getElementsByName porque las checkbox tienen diferentes id
let errorDestinos = document.querySelector('small#errorDestino');

let personas = document.getElementsByName('personas');
let errorPersonas = document.querySelector('small#errorPersonas');

let metodoPago = document.getElementsByName('metodoPago');
let errorMetodoPago = document.querySelector('small#errorMetodoPago');


formularioReserva.addEventListener("submit", function(event) {
    // Evito el envio del formulario y creo el array errores para cargar el mensaje correspondiente
    event.preventDefault();
    let errores = [];

    // Errores del nombre, telefono y Email
    let inputNombreValue = inputNombre.value.trim();

    if(inputNombreValue === "") {
        errores.push({
            input: "nombre",
            mensaje: "Este campo es obligatorio"
        })
    }else if (!inputNombreValue.match(/^[a-zA-Z]+$/)) {
        errores.push({
            input: "nombreNoValido",
            mensaje: "Ingrese un nombre valido"
        })
    }

    // Errores del email
    if(inputEmail.value.trim() === "") {
        errores.push({
            input: "emailVacio",
            mensaje: "Este campo es obligatorio"
        })
    }else if (!inputEmail.value.match(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/)) {
        errores.push({
            input: "emailNoValido",
            mensaje: "Ingrese un email valido"
        })
    }

    // Errores del telefono
    if(inputTelefono.value.trim() === "") {
        errores.push({
            input: "telefonoVacio",
            mensaje: "Este campo es obligatorio"
        })
    }else if(isNaN(inputTelefono.value)) {
        errores.push({
            input: "telefonoNoValido",
            mensaje: "Solo puede ingresar numeros"
        })
    }
    
    // Errores de destinos
    let totalCheckDestinos = 0; // Creo la variable y le asigno 0
    destinos.forEach(destino => { // Hago un for each para revisar cada casilla
        if (destino.checked) {
            totalCheckDestinos += 1; // Si la condicion checked es true, le sumo 1 punto a la variable
        }
    })
    if (totalCheckDestinos === 0) { // Si la variable es 0, significa que no se selecciono ninguna nacionalidad, por lo que pusheo el error correspondiente
        errores.push({
            input: 'destino',
            mensaje: 'Debes seleccionar un destino'
        })
    }

    // Errores de personas
    let totalCheckPersonas = 0;
    personas.forEach(persona => { 
        if (persona.checked) {
            totalCheckPersonas += 1; 
        }
    })
    if (totalCheckPersonas === 0) {
        errores.push({
            input: 'personas',
            mensaje: 'Debes seleccionar un numero de personas'
        })
    }

    // Errores de pagos
    let totalCheckPagos = 0;
    metodoPago.forEach(metodo => {
        if (metodo.checked) {
            totalCheckPagos += 1; 
        }
    })
    if (totalCheckPagos === 0) {  
        errores.push({
            input: 'pagos',
            mensaje: 'Debes seleccionar un metodo de pago'
        })
    }

    // Aca cargo los errores en el DOM
    if(errores.length !== 0) {             // Si el array errores no es 0, es decir que contiene errores, ejecuto un forEach de cada elemento
        errores.forEach(function(error) {  // En el forEach corroboro cual error es en especifico,
            switch(error.input) {          //  y asigno con un switch, al elemento HTML correspondiente, el mensaje determinado del error
                case "nombre":
                    errorNombre.innerText = error.mensaje;
                    break;
                case 'telefonoVacio':
                    errorTelefono.innerText = error.mensaje;
                    break
                case 'telefonoNoValido':
                    errorTelefono.innerText = error.mensaje;
                    break
                case 'emailVacio':
                    errorEmail.innerText = error.mensaje
                case 'emailNoValido':
                    errorEmail.innerText = error.mensaje
                case 'destino':
                    errorDestinos.innerText = error.mensaje;
                    break
                case 'personas':
                    errorPersonas.innerText = error.mensaje;
                    break
                case 'pagos':
                    errorMetodoPago.innerText = error.mensaje;
            }
        })
    } else {
        // Swal.fire({
        //     title: "Reservado!",
        //     text: "Se genero tu reserva!",           // Se recarga la pagina y no se llega a ver
        //     icon: "success",
        //     confirmButtonText: 'Continuar'
        // });

        formularioReserva.submit(); // Si no sucede ninguno de los casos anteriores, envio el formulario
    }

});