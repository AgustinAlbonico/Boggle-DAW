var d = document

var contactForm = d.getElementById('contactForm')

const nombreInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const mensajeInput = document.getElementById('message')
const nombreError = document.getElementById('nameError')
const emailError = document.getElementById('emailError')
const mensajeError = document.getElementById('messageError')

contactForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let valido = true

  if (nombreInput.value.trim() === '') {
    nombreError.textContent = 'El nombre es obligatorio'
    valido = false
  } else if (!/^[a-zA-Z0-9 ]+$/.test(nombreInput.value)) {
    nombreError.textContent =
      'El nombre solo puede contener letras, números y espacios'
    valido = false
  } else {
    nombreError.textContent = ''
  }

  if (emailInput.value.trim() === '') {
    emailError.textContent = 'El correo electrónico es obligatorio'
    valido = false
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)
  ) {
    emailError.textContent = 'El correo electrónico no es válido'
    valido = false
  } else {
    emailError.textContent = ''
  }

  if (mensajeInput.value.trim().length < 5) {
    mensajeError.textContent = 'El mensaje debe tener al menos 5 caracteres'
    valido = false
  } else {
    mensajeError.textContent = ''
  }

  if (valido) {
    const email = `mailto:agusalbo2024@gmail.com?subject=Boggle-Contacto&body=${mensajeInput.value}`

    window.location.href = email
  }
})
