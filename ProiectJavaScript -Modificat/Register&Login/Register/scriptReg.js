"use strict";
const email = document.querySelector("#email");
const userName = document.querySelector("#username");
const pass = document.querySelector("#password");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const age = document.querySelector("#age");
const signUp = document.querySelector("#signUp");
const emailWrong = document.querySelector("#emailWrong");
const userWrong = document.querySelector("#userWrong");
const passWrong = document.querySelector("#passWrong");
const firstNWrong = document.querySelector("#firstNWrong");
const lastNWrong = document.querySelector("#lastNWrong");
const ageWrong = document.querySelector("#ageWrong");
let letterCountF = 0;
let letterCountL = 0;
let users = JSON.parse(localStorage.getItem("users")) || [];
//Email check
const validChar = "abcdefghijklmnopqrstuvwxyz.0123456789_-".split("");
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let emailArr, emailName, emailDomain;

class NewUser {
  constructor(email, userName, pass, firstName, lastName, age) {
    this.email = email;
    this.userName = userName;
    this.pass = pass;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}

signUp.addEventListener("click", function (e) {
  e.preventDefault();
  emailArr = email.value.split("@");
  emailName = emailArr[0];
  emailDomain = emailArr[1];

  emailWrong.innerHTML =
    userWrong.innerHTML =
    passWrong.innerHTML =
    firstNWrong.innerHTML =
    lastNWrong.innerHTML =
    ageWrong.innerHTML =
      "";

  if (email.value === "") {
    emailWrong.innerHTML = "Please provide an email address";
    return;
  }

  if (!email.value.includes("@")) {
    emailWrong.innerHTML = `invalid, doesn't have @ character`;
    return;
  }

  if (emailArr.length !== 2) {
    emailWrong.innerHTML = "Must have just one @";
    return;
  }
  if (emailName.length < 1) {
    emailWrong.innerHTML = "Must be at least one character before @";
    return;
  }
  if (emailDomain.length < 3) {
    emailWrong.innerHTML = "Must be 3 characters after @";
    return;
  }
  if (emailDomain.startsWith(".")) {
    emailWrong.innerHTML = 'domain must include but not start with "."';
    return;
  }

  for (const letter of emailName) {
    if (!validChar.includes(letter)) {
      emailWrong.innerHTML = `invalid characters(${letter}) in name section`;
      return;
    }
  }

  for (const letter of emailDomain) {
    if (!validChar.includes(letter)) {
      emailWrong.innerHTML = `invalid characters(${letter}) in domain section`;
      return;
    }
  }

  if (emailDomain.length - (emailDomain.lastIndexOf(".") + 1) < 3) {
    emailWrong.innerHTML = `invalid, domain's last "." should be 2 characters or more from the end.`;
    return;
  }

  if (userName.value.length < 6) {
    userWrong.innerHTML = "Username must be al leat 6 characters long";
    return;
  }
  if (pass.value.length < 6) {
    passWrong.innerHTML = "Password must be al leat 6 characters long";
    return;
  }
  for (const letter of firstName.value.split("")) {
    if (alphabet.includes(letter.toLowerCase())) letterCountF++;
  }

  if (letterCountF < 2) {
    firstNWrong.innerHTML = "Must including at least 2 letters";
    return;
  }
  for (const letter of lastName.value.split("")) {
    if (alphabet.includes(letter.toLowerCase())) letterCountL++;
  }

  if (letterCountL < 2) {
    lastNWrong.innerHTML = "Must including at least 2 letters";
    return;
  }

  if (!(+age.value >= 18 && +age.value <= 65)) {
    ageWrong.innerHTML = "Age must be between 18 and 65";
    return;
  }
  const sameUser = users.find((obj) => obj.userName === userName.value);
  const sameEmail = users.find((obj) => obj.email === email.value);
  if (sameUser) {
    alert("Username already exist");
    return;
  }
  if (sameEmail) {
    alert("Email already registered");
    return;
  }
  const user = new NewUser(
    email.value,
    userName.value,
    pass.value,
    firstName.value,
    lastName.value,
    age.value
  );

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "../Login/Login.html";
});
