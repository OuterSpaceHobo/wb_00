// Валидация

let checkOut;

const nameSurnameRegex = new RegExp("^[а-яёА-ЯЁ]+$");

const validationErr = (inputName, errName, labelName) => {
  let text = ''
  if (inputName === 'name') {
    text = 'Укажите имя'
  } else if  (inputName === 'surname') {
    text = 'Укажите фамилию'
  } else if (inputName === 'phone') {
    text = 'Формат +9 999 999 99 99'
  } else if (inputName === 'inn') {
    text = 'Проверьте ИНН'
  } else {
    text = 'Проверьте адрес электронной почты'
  }
  document.getElementById(errName).innerHTML = text;
  document.getElementById(inputName).style.borderBottom = "1px solid #F55123";
  document.getElementById(inputName).style.color = "#F55123";
  document.getElementById(labelName).style.color = "#F55123";
}
window.validationErr = validationErr


function validateName(){
  let x = document.getElementById("name").value;
  let elem = document.getElementById("name");
  if (x === '' && !checkOut) {
    return null
  } else if ( !x && checkOut ) {
    validationErr("name", "name__err", "name__label")
    document.getElementById("name").oninput = validateName
  } else if (!nameSurnameRegex.test(x)) {
    validationErr("name", "name__err", "name__label")
    document.getElementById("name").oninput = validateName
  } else {
    console.log('reseting')
    inputStyleReset('name', 'name__err', 'name__label')
    document.getElementById("name").oninput = ''
  }
}
window.validateName = validateName


function validateSurname(){
  let x = document.getElementById("surname").value;
  let elem = document.getElementById("surname");
  if ( x === '' && !checkOut ) {
    return null
  } else if (!x && checkOut) {
    validationErr("surname", "surname__err", "surname__label")
    document.getElementById("surname").oninput = validateSurname
  } else if (!nameSurnameRegex.test(x)) {
    validationErr("surname", "surname__err", "surname__label")
    document.getElementById("surname").oninput = validateSurname
  } else {
    console.log('reseting')
    inputStyleReset("surname", "surname__err", "surname__label")
    document.getElementById("surname").oninput = ''
  }
}
window.validateSurname = validateSurname

  
function validateEmail(){
  let x = document.getElementById("email").value;
  let elem = document.getElementById("email");
  const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
  if ( x === '' && !checkOut ) {
    return null
  } else if (!x && checkOut) {
    validationErr("email", "email__err", "email__label")
    document.getElementById("email").oninput = validateEmail
  } else if (!emailRegex.test(x)) {
    validationErr("email", "email__err", "email__label")
    document.getElementById("email").oninput = validateEmail
  } else {
    console.log('reseting')
    inputStyleReset("email", "email__err", "email__label")
    document.getElementById("email").oninput = ''
  }
}
window.validateEmail = validateEmail


function validatePhone(){
  let x = document.getElementById("phone").value;
  let elem = document.getElementById("phone");
  const reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
  if ( x === '' && !checkOut ) {
    return null
  } else if (!x && checkOut) {
    validationErr("phone", "phone__err", "phone__label")
    document.getElementById("phone").oninput = validatePhone
  } else if (!reg.test(x)) {
    validationErr("phone", "phone__err", "phone__label")
    document.getElementById("phone").oninput = validatePhone
  } else {
    console.log('reseting')
    inputStyleReset("phone", "phone__err", "phone__label")
    document.getElementById("phone").oninput = ''
  }
}
window.validatePhone = validatePhone


function validateInn(){
  let x = document.getElementById("inn").value;
  let elem = document.getElementById("inn");
  const reg = /^[\d+]{14}$/
  
  if ( x === '' && !checkOut ) {
    return null
  } else if (!x && checkOut) {
    validationErr("inn", "inn__err", "inn__label")
    document.getElementById("inn").oninput = validateInn
  } else if (!reg.test(x)) {
    validationErr("inn", "inn__err", "inn__label")
    document.getElementById("inn").oninput = validateInn
  } else {
    console.log('reseting')
    inputStyleReset("inn", "inn__err", "inn__label")
    document.getElementById("inn").oninput = ''
  }
}
window.validateInn = validateInn


function validateForm() {
  checkOut = true
  validateName()
  validateSurname()
  validateEmail()
  validatePhone()
  validateInn()
}
window.validateForm = validateForm


function inputStyleReset(id, errId, labelId) {
  document.getElementById(id).style.borderBottom = "1px solid #A0A0A4";
  document.getElementById(id).style.color = "black";
  document.getElementById(labelId).style.color = "#A0A0A4";
  document.getElementById(errId).innerHTML = "";
}
window.inputStyleReset = inputStyleReset