// Selecciono en el DOM y guardo en variables el formulario y cada input
let formularioHogwarts = document.querySelector("form#hogwarts");

let inputNombre = document.querySelector("input#nombre");
let errorNombre = document.querySelector("small#errorNombre");

let inputPass = document.querySelector('input#pass');
let errorPass = document.querySelector('small#errorPass');

let inputTel = document.querySelector('input#tel');
let errorTel = document.querySelector('small#errorTel');

let hobbies = document.getElementsByName('hobbies'); // Uso el getElementsByName porque las checkbox tienen diferentes id
let errorHobbies = document.querySelector('small#errorHobbies');

let nacionalidad = document.getElementsByName('nacionalidad');
let errorNacionalidad = document.querySelector('small#errorNacionalidad');


formularioHogwarts.addEventListener("submit", function(event) {
    // Evito el envio del formulario y creo el array errores para cargar el mensaje correspondiente
    event.preventDefault();
    let errores = [];

    // Errores del nombre
    let inputNombreValue = inputNombre.value.trim();
    
    if(inputNombreValue === "") {
        errores.push({
            input: "nombre",
            mensaje: "Este campo es obligatorio"
        })
    }

    // Errores de la password
    if(inputPass.value === "") {
        errores.push({
            input: "pass",
            mensaje: "Este campo es obligatorio"
        })
    }

    if (inputPass.value.includes(' ')) { // Con el includes(' '), corroboro que la contraseña no contenga espacios
        errores.push({                   // Si los contiene, pusheo al array de errores un mensaje que indique que la contraseña no debe llevar espacios
            input: 'passContainsSB',
            mensaje: 'La contraseña no puede llevar espacios'
        })
    }

    if (inputPass.value.length < 7 && inputPass.value.length > 0) { // Con el .length corroboro que la longitud de la contraseña
        errores.push({                                          // sea menor a 7 caracteres y mayor a 0, pusheo al array de errores el mensaje
            input: 'passShort',
            mensaje: 'La contraseña debe ser mayor a 7 caracteres'
        })
    }

    // Errores del telefono
    if (inputTel.value === '') {
        errores.push({
            input: "tel",
            mensaje: "Este campo es obligatorio"
        })
    }

    if (isNaN(inputTel.value)) { // Si el valor del telefono contiene caracteres que no sean numeros,
        errores.push({           // pusheo al array de errores un mensaje indicando que solo debe contener numeros
            input: 'telNaN',
            mensaje: 'El telefono solo debe contener numeros'
        })
    }

    // Errores de hobbies
    let totalCheckHobbies = 0;
    hobbies.forEach(hobbie => {
        if (hobbie.checked) {
            totalCheckHobbies += 1;
        }
    })
    if (totalCheckHobbies > 4) {
        errores.push({
            input: 'hobbies',
            mensaje: 'Solo puedes seleccionar hasta 4 hobbies'
        })
    }
    
    // Errores de nacionalidad
    let totalCheckNacionalidad = 0; // Creo la variable y le asigno 0
    nacionalidad.forEach(pais => { // Hago un for each para revisar cada casilla
        if (pais.checked) {
            totalCheckNacionalidad += 1; // Si la condicion checked es true, le sumo 1 punto a la variable
        }
    })
    if (totalCheckNacionalidad === 0) { // Si la variable es 0, significa que no se selecciono ninguna nacionalidad, por lo que pusheo el error correspondiente
        errores.push({
            input: 'nacionalidad',
            mensaje: 'Debes seleccionar una nacionalidad'
        })
    }

    // Aca cargo los errores en el DOM
    if(errores.length !== 0) {             // Si el array errores no es 0, es decir que contiene errores, ejecuto un forEach de cada elemento
        errores.forEach(function(error) {  // En el forEach corroboro cual error es en especifico,
            switch(error.input) {          //  y asigno con un switch, al elemento HTML correspondiente, el mensaje determinado del error
                case "nombre":
                    errorNombre.innerText = error.mensaje;
                    break;
                case 'pass':
                    errorPass.innerText = error.mensaje;
                    break;
                case 'passContainsSB':
                    errorPass.innerText = error.mensaje;
                    break
                case 'passShort':
                    errorPass.innerText = error.mensaje;
                    break
                case 'tel':
                    errorTel.innerText = error.mensaje;
                    break
                case 'telNaN':
                    errorTel.innerText = error.mensaje;
                    break
                case 'hobbies':
                    errorHobbies.innerText = error.mensaje;
                    break
                case 'nacionalidad':
                    errorNacionalidad.innerText = error.mensaje;
                    break
            }
        })
    } else {
        formularioHogwarts.submit(); // Si no sucede ninguno de los casos anteriores, envio el formulario
    }

});