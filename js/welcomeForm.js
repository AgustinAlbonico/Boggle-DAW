"use strict";

var d = document;

var welcomeForm = d.querySelector(".welcomeForm");
var boggleGame = d.querySelector(".boggleGame");

var nameError = d.getElementById("nameError");
var nameInput = d.getElementById("nameInput");

var rankingButton = d.getElementById("rankingButton");
var rankingButtonMobile = d.getElementById("rankingButtonMobile");

var listaJuegos = JSON.parse(localStorage.getItem("savegame") || "[]");

// Valida el nombre ingresado, cierra el formulario y abre el juego
var validateAndOpenGame = function (e) {
  e.preventDefault();

  var valido = true;

  if (nameInput.value.trim() === "") {
    nameError.textContent = "El nombre es obligatorio";
    valido = false;
  } else if (!/^[a-zA-Z0-9 ]+$/.test(nameInput.value)) {
    nameError.textContent = "El nombre solo puede contener letras, números y espacios";
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
    showCloseButton: false,
    focusConfirm: true
  });
}

function crearTabla() {
  var table = document.createElement("table");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");

  table.id = "rankingTable";
  table.appendChild(thead);
  table.appendChild(tbody);

  // Crear fila de cabecera
  var cabeceras = ["Usuario", "Fecha", "Puntaje", "Tiempo"];

  var trCabecera = document.createElement("tr");
  thead.appendChild(trCabecera);

  cabeceras.forEach(function(cabecera) {
    var th = document.createElement("th");
    th.textContent = cabecera;
    trCabecera.appendChild(th);
  });

  // Ordenar las partidas por puntaje
  listaJuegos.sort(function(a, b) {
    return b.score - a.score;
  });

  // Crear filas de partidas jugadas
  listaJuegos.forEach(function(juego) {
    var trCuerpo = document.createElement("tr");
    tbody.appendChild(trCuerpo);

    var tdUsuario = document.createElement("td");
    var tdFecha = document.createElement("td");
    var tdPuntaje = document.createElement("td");
    var tdTiempo = document.createElement("td");

    tdUsuario.textContent = juego.username;
    tdFecha.textContent = juego.date;
    tdPuntaje.textContent = juego.score;
    tdTiempo.textContent = juego.time == 1 ? juego.time + " minuto" : juego.time + " minutos";

    trCuerpo.appendChild(tdUsuario);
    trCuerpo.appendChild(tdFecha);
    trCuerpo.appendChild(tdPuntaje);
    trCuerpo.appendChild(tdTiempo);
  });

  return table;
}

rankingButton.addEventListener("click", showRanking);
rankingButtonMobile.addEventListener("click", showRanking);