//Elementos del DOM
var time = d.getElementById('time')

//Constantes
var vowels = ['A', 'E', 'I', 'O', 'U']
var consonants = [
    'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K',
    'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T',
    'V', 'W', 'X', 'Y', 'Z'
];

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

//Funcion que empieza el juego
function startGame() {
    remainingTime = parseInt(gameTime.value, 10) * 60;
    time.textContent = remainingTime
    currentWord = ''
    totalScore = 0;
    timer = setInterval(handleTimer, 100)
}

function handleTimer() {
    if(remainingTime === 0) {
        clearInterval(timer)
        gameStart = false;
    }
    if(remainingTime === 10) {
        time.classList.add('text-red')
    }
    time.textContent = remainingTime
    remainingTime--
}

function saveGameData() {

}

async function sendWord() {

}

