//Elementos del DOM
var time = d.getElementById("time");
var currentWordDom = d.getElementById("current-word");
var sendWordButton = d.getElementById("send-word");
var clearWordButton = d.getElementById("clear-word");
var cell = d.querySelectorAll(".cell");
var pointsMessage = d.getElementById("points-message");
var lengthErrorMessage = d.getElementById("length-error");
var pointsDom = d.getElementById("points");

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
  gameStart = true;
  remainingTime = parseInt(gameTime.value, 10) * 60;
  time.textContent = remainingTime;
  currentWord = "";
  totalScore = 0;

  currentWord = "banana";
  currentWordDom.textContent = currentWord;
  sendWord();

  timer = setInterval(handleTimer, 1000);
}

function handleTimer() {
  if (remainingTime === 0) {
    clearInterval(timer);
    gameStart = false;
    showScore();
  }
  if (remainingTime === 10) {
    time.classList.add("text-red");
  }
  time.textContent = remainingTime;
  remainingTime--;
}

function saveGameData() {
  var savegame = JSON.parse(localStorage.getItem("savegame") || "[]");
  savegame.push({
    username: nameInput,
    score: totalScore,
    date: new Date().toLocaleString(),
    time: gameTime,
  });
  var formatedSavegame = JSON.stringify(savegame);
  localStorage.setItem("savegame", formatedSavegame);
}

async function sendWord() {
  try {
    if (currentWord.length < 3) {
      //Muestro el mensaje de error de palabra menor a 3 caracteres por un ratito y lo saco
      lengthErrorMessage.classList.remove("hidden");
      setTimeout(() => {
        lengthErrorMessage.classList.add("hidden");
      }, 1500);
    } else {
      lengthErrorMessage.classList.add("hidden");
      var res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`
      );
      handleSubmitWord(res.ok);
    }
  } catch (error) {
    handleError("Error al verificar la palabra");
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
  } else {
    totalScore = totalScore - 1;
    messagePoints(1, "#d1495b");
  }
  pointsDom.textContent = totalScore;
  resetCurrentWord();
}

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

sendWordButton.addEventListener("click", () => {
  sendWord();
});

clearWordButton.addEventListener("click", () => {
  resetCurrentWord();
});

function resetCurrentWord() {
  currentWord = "";
  currentWordDom.textContent = currentWord;
  lengthErrorMessage.classList.add("hidden");
}

function messagePoints(points, color = "#00798C") {
  if (points > 0) {
    pointsMessage.textContent = `+${points} puntos!`;
    pointsMessage.style.color = color;
    setTimeout(() => {
      pointsMessage.textContent = "";
    }, 1200);
  } else {
    pointsMessage.textContent = `-${points} puntos!`;
    pointsMessage.style.color = color;
    setTimeout(() => {
      pointsMessage.textContent = "";
    }, 1200);
  }
}
