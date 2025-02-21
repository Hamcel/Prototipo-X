document.addEventListener("DOMContentLoaded", function () {
    const payButton = document.getElementById("payButton");
    const backButton = document.getElementById("backButton");
    const paymentDetails = document.getElementById("paymentDetails");
    const paymentOptions = document.querySelectorAll('input[name="payment"]');

    // Evento para detectar cuando el usuario selecciona un método
    payButton.addEventListener("click", function () {
        let selectedPayment;
        paymentOptions.forEach(option => {
            if (option.checked) {
                selectedPayment = option.value;
            }
        });

        if (!selectedPayment) {
            alert("Selecciona un método de pago.");
            return;
        }

        paymentDetails.innerHTML = ""; // Limpiar contenido anterior

        if (selectedPayment === "tarjeta") {
            paymentDetails.innerHTML = `
                <h3>Ingresa los datos de tu tarjeta</h3>
                <input type="text" placeholder="Número de Tarjeta" maxlength="16">
                <input type="text" placeholder="MM/YY" maxlength="5">
                <input type="text" placeholder="CVC" maxlength="3">
                <button id="confirmPayment" type="submit">Confirmar Pago</button>
            `;
        } else if (selectedPayment === "paypal") {
            window.location.href = "https://www.paypal.com"; // Simula redirección a PayPal
        } else if (selectedPayment === "presencial") {
            payButton.innerText = "Enviar Cita"; // Cambia el botón
        }

        payButton.style.display = "none"; // Ocultar botón pagar
        backButton.style.display = "block"; // Mostrar botón volver
    });

    // Botón para regresar a la selección de pago
    backButton.addEventListener("click", function () {
        paymentDetails.innerHTML = "";
        payButton.style.display = "block";
        payButton.innerText = "Pagar";
        backButton.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const serviceSelect = document.getElementById("service");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const priceDisplay = document.getElementById("price");

    const manualOption = document.getElementById("manual-option");
    const manualContainer = document.getElementById("manual-container");
    const manualDateInput = document.getElementById("manual-date");
    const manualTimeInput = document.getElementById("manual-time");

    const servicesData = {
        "certificacion-buena-conducta": { date: "2025-03-10", time: "10:00", price: 50 },
        "solicitud-pasaporte": { date: "2025-03-12", time: "09:00", price: 80 },
        "residencias": { date: "2025-03-15", time: "11:00", price: 100 }
    };

    function updateServiceInfo(service) {
        if (servicesData[service]) {
            dateInput.value = servicesData[service].date;
            timeInput.value = servicesData[service].time;
            priceDisplay.innerText = `Precio: $${servicesData[service].price}`;

            //Ocultar el cambio manual cuando se elige un servicio
            manualContainer.style.display = "none";
        } else {
            dateInput.value = "";
            timeInput.value = "";
            priceDisplay.innerText = "Precio: -";
        }
    }

    serviceSelect.addEventListener("change", function () {
        updateServiceInfo(serviceSelect.value);
    });

    //Mostrar los campos para cambiar fecha y horario manualmente
    manualOption.addEventListener("click", function () {
        manualContainer.style.display = "block";
        manualDateInput.value = dateInput.value; // Poner la fecha actual
        manualTimeInput.value = timeInput.value; // Poner el horario actual
    });

    //Actualizar los valores cuando el usuario cambie manualmente
    manualDateInput.addEventListener("change", function () {
        dateInput.value = manualDateInput.value;
    });

    manualTimeInput.addEventListener("change", function () {
        timeInput.value = manualTimeInput.value;
    });
});

function filtrarServicios() {
    var institucion = document.getElementById("institucion").value;
    var servicios = document.getElementById("service").options;
    
    for (var i = 0; i < servicios.length; i++) {
        if (institucion === "" || servicios[i].getAttribute("data-inst") === institucion) {
            servicios[i].disabled = false;
            servicios[i].style.opacity = "1";
        } else {
            servicios[i].disabled = true;
            servicios[i].style.opacity = "0.5";
        }
    }
}

function filtrarServicios() {
    let institucion = document.getElementById("institucion").value;
    let servicioSelect = document.getElementById("service");
    let opciones = servicioSelect.getElementsByTagName("option");
    
    if (institucion) {
        servicioSelect.disabled = false;
    } else {
        servicioSelect.disabled = true;
    }
    
    for (let opcion of opciones) {
        if (opcion.getAttribute("data-inst") === institucion || institucion === "") {
            opcion.style.display = "block";
            opcion.disabled = false;
        } else {
            opcion.style.display = "none";
            opcion.disabled = true;
        }
    }
    
    servicioSelect.selectedIndex = 0;
}

document.addEventListener("DOMContentLoaded", function () {
    const cedulaInput = document.getElementById("cedula");

    cedulaInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, ""); // Elimina cualquier carácter que no sea número

        if (value.length > 11) {
            value = value.slice(0, 11); // Limita a 11 dígitos (sin contar los "-")
        }

        let formattedCedula = "";
        if (value.length > 0) {
            formattedCedula = value.substring(0, 3);
        }
        if (value.length > 3) {
            formattedCedula += "-" + value.substring(3, 10);
        }
        if (value.length > 10) {
            formattedCedula += "-" + value.substring(10, 11);
        }

        e.target.value = formattedCedula;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const telefonoInput = document.getElementById("telefono");
    const paisSelect = document.getElementById("pais");

    paisSelect.addEventListener("change", function () {
        telefonoInput.value = ""; // Reinicia el input al cambiar país
    });

    telefonoInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, ""); // Solo números
        let formattedTelefono = "";
        const pais = paisSelect.value;

        if (pais === "RD") {
            // Formato para RD: (XXX)-XXX-XXXX
            if (value.length > 10) value = value.slice(0, 10);
            if (value.length > 0) formattedTelefono = "(" + value.substring(0, 3);
            if (value.length > 3) formattedTelefono += ")-" + value.substring(3, 6);
            if (value.length > 6) formattedTelefono += "-" + value.substring(6, 10);
        } else if (pais === "US") {
            // Formato para EE.UU.: (XXX) XXX-XXXX
            if (value.length > 10) value = value.slice(0, 10);
            if (value.length > 0) formattedTelefono = "(" + value.substring(0, 3);
            if (value.length > 3) formattedTelefono += ") " + value.substring(3, 6);
            if (value.length > 6) formattedTelefono += "-" + value.substring(6, 10);
        }

        e.target.value = formattedTelefono;
    });
});