var d = document

var welcomeForm = d.querySelector('.welcomeForm')
var boggleGame = d.querySelector('.boggleGame')

var nameError = d.getElementById('nameError')
var nameInput = d.getElementById('nameInput')

//Valida el nombre ingresado, cierra el formulario y abre el juego
var validateAndOpenGame = function (e) {
  e.preventDefault()

  let valido = true

  if (nameInput.value.trim() === '') {
    nameError.textContent = 'El nombre es obligatorio'
    valido = false
  } else if (!/^[a-zA-Z0-9 ]+$/.test(nameInput.value)) {
    nameError.textContent =
      'El nombre solo puede contener letras, números y espacios'
    valido = false
  } else if (nameInput.value.length < 3) {
    nameError.textContent = 'El nombre debe tener como minimo 3 caracteres'
    valido = false
  } else {
    nameError.textContent = ''
  }

  if (valido) {
    welcomeForm.classList.add('hidden')
    boggleGame.classList.remove('hidden')
  }
}

welcomeForm.addEventListener('submit', validateAndOpenGame)
