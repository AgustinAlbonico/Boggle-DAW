//Elementos del DOM
var time = d.getElementById("time");
var currentWordDom = d.getElementById("current-word");
var sendWordButton = d.getElementById("send-word");
var clearWordButton = d.getElementById("clear-word");
var cell = d.querySelectorAll(".cell");
var pointsMessage = d.getElementById("points-message");
var gameErrorMessage = d.getElementById("game-error");
var pointsDom = d.getElementById("points");
var foundWordsContainerDom = d.getElementById("found-words-container");

//Constantes
var vowels = ["A", "E", "I", "O", "U"];
var consonants = [
  "B",
  "C",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "V",
  "W",
  "X",
  "Y",
  "Z",

//Variables
////Variable para saber cuando el juego esta activo y cuando no
var gameStart = false;
////Contador del tiempo restante de un juego
var remainingTime;
var currentWord;
////Variable para ir almacenando el puntaje de un juego
var currentScore = 0;
////Intervalo para cada segundo del timer
var timer;
////Variable para guardar las palabras encontradas
var foundWords = [];

//Funcion que empieza el juego
function startGame() {
  time.classList.remove("text-red");
  gameStart = true;
  remainingTime = parseInt(gameTime.value, 10) * 60;
  time.textContent = remainingTime;
  currentWord = "";
  totalScore = 0;

  initializeBoard();

  timer = setInterval(handleTimer, 1000);
}

//Funcion para manejar el temporizador
function handleTimer() {
  if (remainingTime === 0) {
    clearInterval(timer);
    gameStart = false;
    showScore();
    saveGameData();
  }
  if (remainingTime === 10) {
    time.classList.add("text-red");
  }
  time.textContent = remainingTime;
  remainingTime--;
}

//Funcion para guardar en localStorage los datos del jugador y una partida
function saveGameData() {
  var savegame = JSON.parse(localStorage.getItem("savegame") || "[]");
  savegame.push({
    username: nameInput.value,
    score: totalScore,
    date: new Date().toLocaleString(),
    time: gameTime.value,
  });
  var formatedSavegame = JSON.stringify(savegame);
  localStorage.setItem("savegame", formatedSavegame);
}

//Funcion que valida la palabra ingresada en una api
async function sendWord() {
  try {
    sendWordButton.disabled = true;
    console.log(currentWord.length);
    //Muestro el mensaje de error de palabra menor a 3 caracteres por un ratito y lo saco
    if (currentWord.length < 3) {
      showGameErrorMessage("La palabra debe contener mas de 3 caracteres");
    } else if (foundWords.includes(currentWord)) {
      showGameErrorMessage("La palabra ya ha sido ingresada");
    } else {
      gameErrorMessage.classList.add("hidden");
      var res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`
      );
      handleSubmitWord(res.ok);
    }
  } catch (error) {
    handleError("Error al verificar la palabra");
  } finally {
    sendWordButton.disabled = false;
  }
}

//Funcion que se encarga de realizar la logica correspondiente segun si la palabra ingresa fue correcta o incorrecta
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
    addWordToFound();
  } else {
    totalScore = totalScore - 1;
    messagePoints(-1, "#d1495b");
  }
  pointsDom.textContent = totalScore;
  resetCurrentWord();
}

//Funcion general para mostrar modal de error
function handleError(msjError) {
  Swal.fire({
    position: "top",
    icon: "error",
    title: "Error!",
    text: msjError,
    width: 300,
    padding: "12",
    timer: "750",
    showConfirmButton: false,
  });
}

//Funcion que muestra el puntaje del jugador una vez que finaliza el temporizador
function showScore() {
  Swal.fire({
    title: "Finalizó el juego",
    text: `Su puntaje: ${totalScore}`,
    icon: "info",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Jugar de nuevo",
    showCancelButton: true,
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      startGame();
    } else {
      window.location.replace("/");
    }
  });
}

//Funcion para resetar la palabra ingresada
function resetCurrentWord() {
  currentWord = "";
  currentWordDom.textContent = currentWord;
  gameErrorMessage.classList.add("hidden");
}

//Funcion que muestra el puntaje segun una palabra ingresada
function messagePoints(points, color = "#00798C") {
  if (points > 0) {
    pointsMessage.textContent = `+${points} puntos!`;
    pointsMessage.style.color = color;
    setTimeout(() => {
      pointsMessage.textContent = "";
    }, 1200);
  } else {
    pointsMessage.textContent = `${points} puntos!`;
    pointsMessage.style.color = color;
    setTimeout(() => {
      pointsMessage.textContent = "";
    }, 1200);
  }
}

//Funcion que muestra error del juego
function showGameErrorMessage(msg) {
  gameErrorMessage.classList.remove("hidden");
  gameErrorMessage.textContent = msg;
  setTimeout(() => {
    gameErrorMessage.classList.add("hidden");
    gameErrorMessage.textContent = "";
  }, 1500);
  return;
}

//Funcion que agrega la palabra encontrada a la lista de palabras encontradas y tambien lo muestra en el dom
function addWordToFound() {
  foundWords.push(currentWord);
  var liFoundWordElement = d.createElement("li");
  liFoundWordElement.textContent = currentWord;
  foundWordsContainerDom.appendChild(liFoundWordElement);
}

//Funcion que inicializa el tablero
function initializeBoard() {
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
  boardLetters = boardLetters.sort(() => Math.random() - 0.5);

  for (let i = 1; i <= 16; i++) {
    var cell = d.getElementById(`cell-${i}`);
    cell.textContent = boardLetters[i - 1];
    cell.addEventListener('click', handleCellClick)
  }
}

//Funcion que asocia
function handleCellClick(e) {
  var cell = e.target;
  console.log(cell.textContent);
}

//Eventos
sendWordButton.addEventListener("click", () => {
  sendWord();
});

clearWordButton.addEventListener("click", () => {
  resetCurrentWord();
});
