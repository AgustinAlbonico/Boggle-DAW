var d = document

var contactForm = d.getElementById('contactForm')

const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')
const nameError = document.getElementById('nameError')
const emailError = document.getElementById('emailError')
const messageError = document.getElementById('messageError')

contactForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let valido = true

  if (nameInput.value.trim() === '') {
    nameError.textContent = 'El nombre es obligatorio'
    valido = false
  } else if (!/^[a-zA-Z0-9 ]+$/.test(nameInput.value)) {
    nameError.textContent =
      'El nombre solo puede contener letras, números y espacios'
    valido = false
  } else {
    nameError.textContent = ''
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

  if (messageInput.value.trim().length < 5) {
    messageError.textContent = 'El mensaje debe tener al menos 5 caracteres'
    valido = false
  } else {
    messageError.textContent = ''
  }

  if (valido) {
    const email = `mailto:agusalbo2024@gmail.com?subject=Boggle-Contacto&body=${messageInput.value}`

    window.location.href = email
  }
})
