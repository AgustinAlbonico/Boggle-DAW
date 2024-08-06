'use strict';

// Elementos del DOM
var d = document;
var time = d.getElementById("time");
var gameTime = d.getElementById("gameTime");
var currentWordDom = d.getElementById("currentWord");
var sendWordButton = d.getElementById("sendWord");
var clearWordButton = d.getElementById("clearWord");
var pointsMessage = d.getElementById("pointsMessage");
var gameErrorMessage = d.getElementById("gameError");
var pointsDom = d.getElementById("points");
var foundWordsContainerDom = d.getElementById("foundWordsContainer");
var nameInput = d.getElementById("nameInput");

// Variables
var selectedCells = [];
var allCells = [];

var vowels = ["A", "E", "I", "O", "U"];
var consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];

//// Contador del tiempo restante de un juego
var remainingTime;
var currentWord = "";
//// Variable para ir almacenando el puntaje de un juego
var totalScore;
//// Intervalo para cada segundo del timer
var intervalID;
//// Variable para guardar las palabras encontradas
var foundWords;

// Funcion que empieza el juego
function startGame() {
  time.classList.remove("textRed");
  remainingTime = Number(gameTime.value) * 60;
  time.textContent = remainingTime;
  foundWords = [];

  resetSecondaryPanel();
  resetCurrentWord();
  initializeBoard();

  intervalID = setInterval(handleTimer, 1000);
}

// Funcion para manejar el temporizador
function handleTimer() {
  if (remainingTime === 0) {
    clearInterval(intervalID);
    showScore();
    saveGameData();
  }
  if (remainingTime === 10) {
    time.classList.add("textRed");
  }
  time.textContent = remainingTime;
  remainingTime--;
}

// Funcion para guardar en localStorage los datos del jugador y una partida
function saveGameData() {
  var savegame = JSON.parse(localStorage.getItem("savegame") || "[]");
  savegame.push({
    username: nameInput.value,
    score: totalScore,
    date: new Date().toLocaleString(),
    time: gameTime.value
  });
  var formatedSavegame = JSON.stringify(savegame);
  localStorage.setItem("savegame", formatedSavegame);
}

// Funcion que valida la palabra ingresada en una api
async function sendWord() {
  try {
    // Muestro el mensaje de error de palabra menor a 3 caracteres por un ratito y lo saco
    if (currentWord.length < 3) {
      showGameErrorMessage("La palabra debe contener mas de 3 caracteres");
    } else if (foundWords.indexOf(currentWord) !== -1) {
      showGameErrorMessage("La palabra ya ha sido ingresada");
    } else {
      gameErrorMessage.classList.add("hidden");
      var res = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + currentWord);
      handleSubmitWord(res.ok);
    }
  } catch (error) {
    handleError("Error al verificar la palabra");
  } finally {
    resetCurrentWord();
  }
}

// Funcion que se encarga de realizar la logica correspondiente segun si la palabra ingresa fue correcta o incorrecta
function handleSubmitWord(isValid) {
  if (isValid) {
    if (currentWord.length === 3 || currentWord.length === 4) {
      totalScore = totalScore + 1;
      messagePoints(1);
    }
    if (currentWord.length === 5) {
      totalScore = totalScore + 2;
      messagePoints(2);
    }
    if (currentWord.length === 6) {
      totalScore = totalScore + 3;
      messagePoints(3);
    }
    if (currentWord.length === 7) {
      totalScore = totalScore + 5;
      messagePoints(5);
    }
    if (currentWord.length > 7) {
      totalScore = totalScore + 11;
      messagePoints(11);
    }
    showGameErrorMessage("Correcto!");
    addWordToFound();
  } else {
    showGameErrorMessage("Incorrecto!")
    totalScore = totalScore - 1;
    messagePoints(-1);
  }
  pointsDom.textContent = totalScore;
  resetCurrentWord();
}

// Funcion general para mostrar modal de error
function handleError(msjError) {
  Swal.fire({
    position: "top",
    icon: "error",
    title: "Error!",
    text: msjError,
    width: 300,
    padding: "12",
    timer: "750",
    showConfirmButton: false
  });
}

// Funcion que muestra el puntaje del jugador una vez que finaliza el temporizador
function showScore() {
  Swal.fire({
    title: "Finalizó el juego",
    text: nameInput.value + " tu puntaje es " + totalScore,
    icon: "info",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Jugar de nuevo",
    cancelButtonText: "Salir", 
    showCancelButton: true,
    cancelButtonColor: "#d33"
  }).then(function(res) {
    if (res.isConfirmed) {
      startGame();
    } else {
      window.location.replace("/");
    }
  });
}

// Funcion para resetar la palabra ingresada
function resetCurrentWord() {
  currentWord = "";
  selectedCells = [];
  currentWordDom.textContent = currentWord;
  resetCellsStyle();
}

// Funcion que muestra el puntaje segun una palabra ingresada
function messagePoints(points) {
  if (points > 0) {
    pointsMessage.textContent = "+" + points + " puntos!";
    pointsMessage.style.color = "#00798C"; /* "Verde" */
    setTimeout(function() {
      pointsMessage.textContent = "";
    }, 1200);
  } else {
    pointsMessage.textContent = points + " puntos!";
    pointsMessage.style.color = "#d1495b"; /* "Rojo" */
    setTimeout(function() {
      pointsMessage.textContent = "";
    }, 1200);
  }
}

// Funcion que muestra error del juego
function showGameErrorMessage(msg) {
  gameErrorMessage.classList.remove("hidden");
  gameErrorMessage.textContent = msg;
  if (msg === "Correcto!"){
    gameErrorMessage.style.color = "#00798C"; /* "Verde" */ 
  }
  setTimeout(function() {
    gameErrorMessage.classList.add("hidden");
    gameErrorMessage.textContent = "";
    gameErrorMessage.style.removeProperty('color');
  }, 1500);
  return;
}

// Funcion que agrega la palabra encontrada a la lista de palabras encontradas y tambien lo muestra en el dom
function addWordToFound() {
  foundWords.push(currentWord);
  var liFoundWordElement = d.createElement("li");
  liFoundWordElement.textContent = currentWord;
  foundWordsContainerDom.appendChild(liFoundWordElement);
}

// Funcion que inicializa el tablero
function initializeBoard() {
  allCells = [];

  // Armo el tablero
  // Selecciona 6 vocales aleatorias
  var selectedVowels = [];
  for (var i = 0; i < 6; i++) {
    selectedVowels.push(vowels[Math.floor(Math.random() * vowels.length)]);
  }

  // Selecciona exactamente 10 consonantes aleatorias
  var selectedConsonants = [];
  for (var i = 0; i < 10; i++) {
    selectedConsonants.push(
      consonants[Math.floor(Math.random() * consonants.length)]
    );
  }

  // Combina y mezcla las letras
  var boardLetters = selectedVowels.concat(selectedConsonants);
  boardLetters = boardLetters.sort(function() {
    return Math.random() - 0.5;
  });
  
  for (var i = 1; i <= 16; i++) {
    var cell = d.getElementById("cell" + i);
    cell.textContent = boardLetters[i - 1];
    cell.addEventListener("click", handleCellClick);
    allCells.push(cell);
  }
}

// Maneja el click en una celda del tablero
function handleCellClick(event) {
  var cell = event.target;

  if (selectedCells.indexOf(cell) !== -1) {
    return;
  }

  if (selectedCells.length > 0) {
    var lastCell = selectedCells[selectedCells.length - 1];
    if(cell.classList.contains("ableToSelect")){
      lastCell.classList.remove("lastSelected"); 
    }
    if (!isAdjacent(lastCell, cell)) {
      return;
    }
  }

  // Restablece el color original de todas las celdas adyacentes no seleccionadas
  allCells.forEach(function(adjacentCell) {
    if (selectedCells.indexOf(adjacentCell) === -1) {
      adjacentCell.classList.remove("ableToSelect");
    }
  });

  // Añade las clases 'selected'
  cell.classList.add("selected");
  cell.classList.add("lastSelected");
  selectedCells.push(cell);
  currentWord += cell.textContent;
  currentWordDom.textContent = currentWord;

  // Obtiene las celdas adyacentes y marca las seleccionables
  var adjacentCells = getAdjacentCells(cell);
  adjacentCells.forEach(function(adjacentCell) {
    if (selectedCells.indexOf(adjacentCell) === -1) {
      adjacentCell.classList.add("ableToSelect");
    }
  });
}

// Obtiene las celdas adyacentes a una celda dada
function getAdjacentCells(cell) {
  var index = allCells.indexOf(cell);
  var row = Math.floor(index / 4);
  var col = index % 4;
  
  var adjacentCells = [];

  // Verifica las celdas adyacentes en la matriz 4x4
  for (var i = Math.max(0, row - 1); i <= Math.min(row + 1, 3); i++) {
    for (var j = Math.max(0, col - 1); j <= Math.min(col + 1, 3); j++) {
      if (!(i === row && j === col)) {
        adjacentCells.push(allCells[i * 4 + j]);
      }
    }
  }

  return adjacentCells;
}

// Verifica si dos celdas son adyacentes en el tablero
function isAdjacent(lastCell, cell) {
  var lastCellIndex = allCells.indexOf(lastCell);
  var cellIndex = allCells.indexOf(cell);

  var lastCellRow = Math.floor(lastCellIndex / 4);
  var lastCellCol = lastCellIndex % 4;

  var cellRow = Math.floor(cellIndex / 4);
  var cellCol = cellIndex % 4;

  var rowsAreAdjacent = Math.abs(lastCellRow - cellRow) <= 1;
  var colsAreAdjacent = Math.abs(lastCellCol - cellCol) <= 1;

  return rowsAreAdjacent && colsAreAdjacent; 
}

// Funcion que reinicia todos los estilos de las celdas en caso de jugar de nuevo
function resetCellsStyle() {
  for (var i = 1; i <= 16; i++) {
    var cell = d.getElementById("cell" + i);
    cell.classList.remove("selected");
    cell.classList.remove("lastSelected");
    cell.classList.remove("ableToSelect");
    cell.disabled = false;
  }
}

// Funcion para reiniciar puntaje y palabras encontardas
function resetSecondaryPanel() {
  totalScore = 0;
  pointsDom.textContent = totalScore;
  foundWordsContainerDom.innerHTML = '';
}

// Eventos
sendWordButton.addEventListener("click", sendWord);
clearWordButton.addEventListener("click", resetCurrentWord);
