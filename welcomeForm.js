"use strict";

var d = document;

var welcomeForm = d.querySelector(".welcomeForm");
var boggleGame = d.querySelector(".boggleGame");

var nameError = d.getElementById("nameError");
var nameInput = d.getElementById("nameInput");

var gameTime = d.getElementById("game-time");

var rankingButton = d.getElementById("rankingButton");

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
  let tabla = crearTabla();
  Swal.fire({
    title: "Ranking",
    html: tabla.outerHTML,
    width: "600px",
    showCloseButton: true,
    focusConfirm: false,
  });
}

const listaJuegos = JSON.parse(localStorage.getItem('savegame') || []);

function crearTabla() {
  let tabla = document.createElement("table");
  let thead = tabla.createTHead();
  let tbody = tabla.createTBody();

  tabla.id = "rankingTable"

  let cabeceras = ["Usuario", "Fecha", "Puntaje", "Tiempo"];
  let filaCabecera = thead.insertRow();

  cabeceras.forEach((cabecera) => {
    let th = document.createElement("th");
    th.textContent = cabecera;
    filaCabecera.appendChild(th);
  });

  console.log(listaJuegos)

  listaJuegos.forEach((juego) => {
    let fila = tbody.insertRow();
    let celdaUsuario = fila.insertCell(0);
    let celdaFecha = fila.insertCell(1);
    let celdaPuntaje = fila.insertCell(2);
    let celdaTiempo = fila.insertCell(3);

    celdaUsuario.textContent = juego.username;
    celdaFecha.textContent = juego.date;
    celdaPuntaje.textContent = juego.score;
    celdaTiempo.textContent = juego.time ;
  });

  return tabla;
}

rankingButton.addEventListener("click", showRanking);
