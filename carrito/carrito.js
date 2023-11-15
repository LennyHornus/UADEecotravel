const reservasCargadas = JSON.parse(localStorage.getItem('reservasCargadas')); // Traigo las reservas existentes
const divContainer = document.querySelector('#container')
console.log(reservasCargadas);


if (reservasCargadas) {                          // Si existen comentarios previos
    reservasCargadas.forEach(reserva => {              // los cargo en el div html con el contenido y formato correspondientes
        divContainer.innerHTML += 
        `
        <div class="card col-sm-4 mx-auto" style="width: 18rem;">
            <div class="card-body tx" id="container">
                <h5 class="card-title"> ${reserva.lugarDestino} </h5>

                <p class="card-text">${reserva.nombre}</p>
                <p class="card-text">${reserva.telefono}</p>
                <p class="card-text">${reserva.email}</p>
                <p class="card-text">${reserva.personas}</p>
                <p class="card-text">${reserva.metodoPago}</p>
                <a href="../reserva/reserva.html" class=" botonsito" id="eliminarReservaBtn" onclick='eliminarReserva()'>Eliminar Reserva</a>
            </div>
        </div>
        `             
    })
}

