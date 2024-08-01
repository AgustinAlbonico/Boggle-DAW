"use strict";

var d = document;

var welcomeForm = d.querySelector(".welcomeForm");
var boggleGame = d.querySelector(".boggleGame");

var nameError = d.getElementById("nameError");
var nameInput = d.getElementById("nameInput");

var gameTime = d.getElementById("game-time");

var rankingButton = d.getElementById("rankingButton");
var rankingButtonMobile = d.getElementById("rankingButtonMobile");

var listaJuegos = JSON.parse(localStorage.getItem("savegame") || "[]");

//Valida el nombre ingresado, cierra el formulario y abre el juego
var validateAndOpenGame = function (e) {
  e.preventDefault();

  let valido = true;

  if (nameInput.value.trim() === "") {
    nameError.textContent = "El nombre es obligatorio";
    valido = false;
  } else if (!/^[a-zA-Z0-9 ]+$/.test(nameInput.value)) {
    nameError.textContent =
      "El nombre solo puede contener letras, números y espacios";
    valido = false;
  } else if (nameInput.value.length < 3) {
    nameError.textContent = "El nombre debe tener como minimo 3 caracteres";
    valido = false;
  } else {
    nameError.textContent = "";
  }

  if (valido) {
    welcomeForm.classList.add("hidden");
    boggleGame.classList.remove("hidden");
    startGame();
  }
};

welcomeForm.addEventListener("submit", validateAndOpenGame);

// Mostrar ranking modal
function showRanking() {
  var tabla = crearTabla();
  Swal.fire({
    title: "Ranking",
    html: tabla.outerHTML,
    width: "600px",
    showCloseButton: true,
    focusConfirm: false,
  });
}

function crearTabla() {
  var tabla = document.createElement("table");
  var thead = tabla.createTHead();
  var tbody = tabla.createTBody();

  tabla.id = "rankingTable";

  var cabeceras = ["Usuario", "Fecha", "Puntaje", "Tiempo"];
  var filaCabecera = thead.insertRow();

  cabeceras.forEach((cabecera) => {
    var th = document.createElement("th");
    th.textContent = cabecera;
    filaCabecera.appendChild(th);
  });

  listaJuegos.forEach((juego) => {
    var fila = tbody.insertRow();
    var celdaUsuario = fila.insertCell(0);
    var celdaFecha = fila.insertCell(1);
    var celdaPuntaje = fila.insertCell(2);
    var celdaTiempo = fila.insertCell(3);

    celdaUsuario.textContent = juego.username;
    celdaFecha.textContent = juego.date;
    celdaPuntaje.textContent = juego.score;
    celdaTiempo.textContent =
      juego.time == 1 ? juego.time + " minuto" : juego.time + " minutos";
  });

  return tabla;
}

rankingButton.addEventListener("click", showRanking);
rankingButtonMobile.addEventListener("click", showRanking);
