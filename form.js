'use strict'
var d = document

var contactForm = d.getElementById('contactForm')

var nameInput = document.getElementById('name')
var emailInput = document.getElementById('email')
var messageInput = document.getElementById('message')
var nameError = document.getElementById('nameError')
var emailError = document.getElementById('emailError')
var messageError = document.getElementById('messageError')

var validateAndSendForm = function (e) {
  e.preventDefault()

  let valido = true

  //Valido el nombre
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

  //Valido el email
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

  //Valido el mensaje
  if (messageInput.value.trim().length < 5) {
    messageError.textContent = 'El mensaje debe tener al menos 5 caracteres'
    valido = false
  } else {
    messageError.textContent = ''
  }

  //Abro el email del sist. operativo con los datos del form
  if (valido) {
    var email = `mailto:agusalbo2024@gmail.com?subject=Boggle-Contacto&body=${messageInput.value}`

    window.location.href = email
  }
}

contactForm.addEventListener('submit', validateAndSendForm)
